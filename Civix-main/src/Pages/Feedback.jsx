import { useState } from "react";
import { Send, MessageSquare, Loader2, Star, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Feedback = () => {
  const [formData, setFormData] = useState({
    category: "",
    rating: 0,
    feedback: "",
    name: "",
    email: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const { category, rating, feedback, name, email, phone } = formData;

  const emojis = ["😡", "😞", "😐", "🙂", "🤩"];

  const validateForm = () => {
    const newErrors = {};
    if (!category.trim()) newErrors.category = "Please select a category";
    if (rating === 0) newErrors.rating = "Please rate your experience";
    if (!feedback.trim()) newErrors.feedback = "Please provide your feedback";
    else if (feedback.trim().length < 10) newErrors.feedback = "Feedback must be at least 10 characters long";
    else if (feedback.trim().length > 500) newErrors.feedback = "Feedback must be less than 500 characters";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address";
    if (phone && !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) newErrors.phone = "Please enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field) => setTouched(prev => ({ ...prev, [field]: true }));

  const isFieldValid = (field) => touched[field] && !errors[field] && formData[field];
  const isFieldInvalid = (field) => touched[field] && errors[field];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ category: "", rating: 0, feedback: "", name: "", email: "", phone: "" });
      setErrors({});
      setTouched({});
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-green-950/50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-emerald-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full shadow-lg shadow-green-500/20">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent">
            Share Your Voice
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Your feedback shapes better governance. Help us serve you better.
          </p>
        </div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="relative p-8 space-y-6 rounded-3xl shadow-xl shadow-green-500/5 border border-green-100/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Personal Information (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["name", "email", "phone"].map((field) => (
                  <motion.div whileFocus={{ scale: 1.02 }} key={field} className="space-y-2">
                    <label className="block text-sm font-medium capitalize">
                      {field.replace(/^\w/, c => c.toUpperCase())} {field !== "name" && "(optional)"}
                    </label>
                    <div className="relative">
                      <input
                        type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        onBlur={() => handleBlur(field)}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 transition ${
                          isFieldValid(field) ? 'border-green-500' : ''
                        } ${isFieldInvalid(field) ? 'border-red-500' : ''}`}
                        placeholder={`Enter your ${field}`}
                      />
                      {isFieldValid(field) && <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />}
                      {isFieldInvalid(field) && <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />}
                    </div>
                    {isFieldInvalid(field) && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors[field]}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-700" />

            {/* Feedback Details */}
            <div className="space-y-4">
              {/* Category */}
              <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                <label className="block text-sm font-medium">Select Category <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    onBlur={() => handleBlur('category')}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 transition ${
                      isFieldValid('category') ? 'border-green-500' : ''
                    } ${isFieldInvalid('category') ? 'border-red-500' : ''}`}
                  >
                    <option value="">-- Choose Category --</option>
                    <option value="elections">Elections & Governance</option>
                    <option value="schemes">Government Schemes</option>
                    <option value="transport">Traffic & Vehicle Info</option>
                    <option value="infrastructure">Infrastructure & Development</option>
                    <option value="healthcare">Healthcare Services</option>
                    <option value="education">Education</option>
                    <option value="environment">Environment & Sanitation</option>
                    <option value="safety">Public Safety</option>
                    <option value="others">Others</option>
                  </select>
                  {isFieldValid('category') && <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />}
                  {isFieldInvalid('category') && <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />}
                </div>
                {isFieldInvalid('category') && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.category}</p>
                )}
              </motion.div>

              {/* Emoji Rating */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Rate Your Experience <span className="text-red-500">*</span></label>
                <div className="flex gap-3 justify-center p-4 bg-gradient-to-r from-green-50/30 to-emerald-50/40 dark:from-slate-800/30 dark:to-green-900/20 rounded-2xl border border-green-100/50 dark:border-slate-700/30">
                  {emojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => handleInputChange('rating', index + 1)}
                      whileTap={{ scale: 0.8, rotate: -10 }}
                      animate={rating === index + 1 ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl transition-all ${
                        rating === index + 1 ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg' : 'bg-white/60 dark:bg-slate-700/60 border-green-100/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:shadow-md'
                      } ${isFieldInvalid('rating') ? 'border-red-500' : ''}`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
                {isFieldInvalid('rating') && (
                  <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.rating}</p>
                )}
              </div>

              {/* Feedback */}
              <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                <label className="block text-sm font-medium">Your Feedback <span className="text-red-500">*</span></label>
                <div className="relative">
                  <textarea
                    value={feedback}
                    onChange={(e) => handleInputChange('feedback', e.target.value)}
                    onBlur={() => handleBlur('feedback')}
                    rows="4"
                    maxLength={500}
                    placeholder="Share your thoughts..."
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 transition ${
                      isFieldValid('feedback') ? 'border-green-500' : ''
                    } ${isFieldInvalid('feedback') ? 'border-red-500' : ''}`}
                  />
                  <Sparkles className="absolute bottom-2 right-2 w-5 h-5 text-slate-400" />
                  {isFieldValid('feedback') && <CheckCircle className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />}
                  {isFieldInvalid('feedback') && <AlertCircle className="absolute right-3 top-2.5 w-5 h-5 text-red-500" />}
                </div>
                <div className="flex justify-between items-center">
                  {isFieldInvalid('feedback') && (
                    <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.feedback}</p>
                  )}
                  <p className="text-sm text-slate-500 ml-auto">{feedback.length}/500 characters</p>
                </div>
              </motion.div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-medium py-3 px-4 rounded-xl shadow-md bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Feedback</>}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-3xl shadow-xl shadow-green-500/5 border border-green-200/30 dark:border-green-700/30 bg-gradient-to-r from-green-50/30 via-white to-emerald-50/40 dark:from-green-900/10 dark:via-slate-800/60 dark:to-emerald-900/10 text-center space-y-4"
          >
            <p className="text-4xl animate-bounce">🎉</p>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Thank You!</h2>
            <p className="text-slate-600 dark:text-slate-400">Your feedback has been submitted successfully. We appreciate your input!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2 rounded-2xl border border-green-300 dark:border-green-600 bg-white/80 dark:bg-slate-700/80 shadow-md hover:shadow-lg transition"
            >
              Share More Feedback
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Feedback;