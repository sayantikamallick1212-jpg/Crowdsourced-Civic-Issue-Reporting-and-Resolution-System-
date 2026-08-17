import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Scale, Info, Phone, HelpCircle, ChevronDown, FileText } from 'lucide-react';

const AnimatedAccordion = ({ item, index, isOpen, onToggle }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className="group border border-green-100/60 dark:border-green-800/40 rounded-2xl overflow-hidden bg-white/90 dark:bg-green-950/90 backdrop-blur-[2px] hover:border-green-200 dark:hover:border-green-700 transition-all duration-300">
            <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-green-50/50 dark:hover:bg-green-900/50 transition-all duration-200"
                onClick={() => onToggle(index)}
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-900 dark:text-white pr-4 text-base">
                    {item.question}
                </span>
                <div className={`w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center shadow-inner transition-all duration-300 ${isOpen ? 'rotate-180 bg-green-200 dark:bg-green-800' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
            </button>
            <div className="overflow-hidden transition-all duration-300 ease-out" style={{ height: `${height}px` }}>
                <div ref={contentRef} className="px-6 pb-5 border-t border-green-50 dark:border-green-800">
                    <p className="text-gray-700 dark:text-gray-300 text-base pt-4 px-1">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const faqData = [
    {
        question: 'Can I file a complaint anonymously?',
        answer: 'Currently, you must register to file a complaint so authorities can track and respond.',
    },
    {
        question: 'What happens after I submit a complaint?',
        answer: 'Your complaint is reviewed by the appropriate department and progress is tracked.',
    },
    {
        question: 'How long does it take to resolve?',
        answer: 'Timelines vary, but we aim to address issues within 7 working days.',
    },
    {
        question: 'Will I be notified of status changes?',
        answer: "Yes, you'll receive email or dashboard updates on status changes.",
    },
];

const Resources = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-gray-900 dark:to-green-950/30 relative">
            {/* Floating Decorative Circles */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-emerald-300/20 dark:bg-green-700/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-60 right-16 w-56 h-56 bg-green-400/20 dark:bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-32 w-32 h-32 bg-emerald-100/30 dark:bg-green-800/10 rounded-full blur-3xl animate-pulse delay-1500"></div>
            {/* Back button */}
            <button
                className="absolute top-7 left-7 z-20 group flex items-center gap-2 px-4 py-2.5 text-emerald-800 hover:text-emerald-900 dark:text-emerald-200 dark:hover:text-white bg-white/80 dark:bg-green-950/80 backdrop-blur-md rounded-xl border border-emerald-100/70 dark:border-green-800/50 hover:border-emerald-200 dark:hover:border-green-700 transition-all duration-200 hover:shadow"
                onClick={() => window.history.back()}
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-base font-medium">Back</span>
            </button>

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-16">
                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-800 via-green-700 to-green-500 dark:from-white dark:via-green-300 dark:to-green-400 bg-clip-text text-transparent mb-4 tracking-tight">
                        Citizen Resources
                    </h1>
                    <p className="text-emerald-600 dark:text-green-200 max-w-xl mx-auto text-lg">
                        Everything you need to know about filing complaints and accessing civic services
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Rights & Responsibilities */}
                    <div className="group bg-white/95 dark:bg-emerald-950/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-200 dark:border-green-900 hover:border-emerald-400 dark:hover:border-green-700 shadow-lg hover:shadow-emerald-100/10 dark:hover:shadow-green-900/20 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Scale className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Rights & Responsibilities</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                            You have the right to file civic complaints and receive timely updates. Please note that misuse or filing false complaints may lead to appropriate action being taken.
                        </p>
                    </div>

                    {/* How to File */}
                    <div className="group bg-white/95 dark:bg-emerald-950/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-200 dark:border-green-900 hover:border-emerald-400 dark:hover:border-green-700 shadow-lg hover:shadow-emerald-100/10 dark:hover:shadow-green-900/20 transition duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How to File a Complaint</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                'Login to your account using your credentials',
                                'Click "File a Complaint" from your dashboard',
                                'Provide complete and accurate issue details',
                                'Submit your complaint and track the status anytime',
                            ].map((step, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-7 h-7 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-full flex items-center justify-center text-green-700 dark:text-green-200 font-semibold flex-shrink-0 mt-1">
                                        {index + 1}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="group bg-white/95 dark:bg-emerald-950/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-200 dark:border-green-900 hover:border-emerald-400 dark:hover:border-green-700 shadow-lg hover:shadow-emerald-100/10 dark:hover:shadow-green-900/20 transition duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-700 to-green-800 rounded-2xl flex items-center justify-center shadow-lg">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Emergency Contacts</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {[
                                { name: 'Police', number: '100' },
                                { name: 'Fire', number: '101' },
                                { name: 'Women Helpline', number: '1091' },
                                { name: 'Child Helpline', number: '1098' },
                                { name: 'Cyber Crime', number: '155260' },
                            ].map((contact, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-green-900/50 rounded-xl border border-emerald-100/80 dark:border-green-800/50 shadow-sm">
                                    <span className="font-medium text-emerald-900 dark:text-white">{contact.name}</span>
                                    <span className="font-bold text-green-800 dark:text-green-400 text-lg">{contact.number}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Laws */}
                    <div className="group bg-white/95 dark:bg-emerald-950/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-200 dark:border-green-900 hover:border-emerald-400 dark:hover:border-green-700 shadow-lg hover:shadow-emerald-100/10 dark:hover:shadow-green-900/20 transition duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-800 to-green-900 rounded-2xl flex items-center justify-center shadow-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Related Laws & Acts</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Access simplified summaries of local civic laws, nuisance acts, and safety regulations that govern citizen services and complaint procedures.
                        </p>
                    </div>

                    {/* FAQ */}
                    <div className="group bg-white/95 dark:bg-emerald-950/80 backdrop-blur-md rounded-3xl p-8 border border-emerald-200 dark:border-green-900 hover:border-emerald-400 dark:hover:border-green-700 shadow-lg hover:shadow-emerald-100/10 dark:hover:shadow-green-900/20 transition duration-300">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg">
                                <HelpCircle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-3">
                            {faqData.map((item, index) => (
                                <AnimatedAccordion
                                    key={index}
                                    item={item}
                                    index={index}
                                    isOpen={openIndex === index}
                                    onToggle={toggleFAQ}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resources;
