const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  phone: { type: String, trim: true, maxlength: 20 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  fileUrl: { type: String, required: true },
  location: { type: String, required: true, trim: true, maxlength: 300 },
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
  aiPredictedCategory: { type: String, enum: ["pothole", "garbage", "waterlogging", "damaged_road", "broken_streetlight", "other"], required: true },
  aiConfidence: { type: Number, min: 0, max: 1, required: true },
  aiPredictions: [{
    category: { type: String, enum: ["pothole", "garbage", "waterlogging", "damaged_road", "broken_streetlight", "other"], required: true },
    confidence: { type: Number, min: 0, max: 1, required: true },
  }],
  aiValidated: { type: Boolean, default: false },
  aiValidatedCategory: { type: String, enum: ["pothole", "garbage", "waterlogging", "damaged_road", "broken_streetlight", "other", null], default: null },
  aiPredictionTimestamp: { type: Date, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Pending'
  },
  notifyByEmail: {
    type: Boolean,
    default: false, // Default to false if not specified
  },
});

module.exports = mongoose.model('Issue', issueSchema);
