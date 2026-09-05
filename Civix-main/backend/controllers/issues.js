const mongoose = require("mongoose");
const fs = require("fs");
const Issue = require("../models/issues");
const sendEmail = require("../utils/sendEmail");
const { asyncHandler } = require("../utils/asyncHandler");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const { predictIssueImage } = require("../services/mlService");

const categories = ["pothole", "garbage", "waterlogging", "damaged_road", "broken_streetlight", "other"];
const localUrl = (file) => `/uploads/${file.filename}`;
const removeFile = (file) => file?.path && fs.promises.unlink(file.path).catch(() => {});

const createIssue = asyncHandler(async (req, res) => {
  const { title, description, phone, email, notifyByEmail, location, latitude, longitude } = req.body;
  if (!title?.trim() || !description?.trim() || !email?.trim() || !location?.trim()) return res.status(400).json({ error: "Title, description, email, and location are required." });
  if (!req.file) return res.status(400).json({ error: "An issue image is required." });
  const lat = latitude === "" || latitude === undefined ? undefined : Number(latitude);
  const lng = longitude === "" || longitude === undefined ? undefined : Number(longitude);
  if ((lat !== undefined && (!Number.isFinite(lat) || lat < -90 || lat > 90)) || (lng !== undefined && (!Number.isFinite(lng) || lng < -180 || lng > 180))) { await removeFile(req.file); return res.status(400).json({ error: "Invalid latitude or longitude." }); }

  let prediction;
  try { prediction = await predictIssueImage(req.file); }
  catch (error) { await removeFile(req.file); return res.status(error.statusCode || 503).json({ error: error.message }); }

  let fileUrl = localUrl(req.file);
  try { const cloudinaryResponse = await uploadOnCloudinary(req.file.path); if (cloudinaryResponse?.secure_url) fileUrl = cloudinaryResponse.secure_url; }
  catch (error) { await removeFile(req.file); return res.status(500).json({ error: "Image storage failed." }); }

  const issue = await Issue.create({ title, description, phone, email, location, latitude: lat, longitude: lng, notifyByEmail: notifyByEmail === "true", fileUrl, aiPredictedCategory: prediction.predicted_class, aiConfidence: prediction.confidence, aiPredictions: prediction.predictions, aiPredictionTimestamp: new Date() });
  return res.status(201).json({ message: "Issue submitted and analysed successfully.", issue });
});

const getAllIssues = asyncHandler(async (req, res) => res.json(await Issue.find().sort({ createdAt: -1 })));
const getIssueById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid issue ID format" });
  const issue = await Issue.findById(req.params.id); if (!issue) return res.status(404).json({ error: "Issue not found" }); return res.json(issue);
});
const updateIssueStatus = asyncHandler(async (req, res) => {
  const { id } = req.params; const { newStatus } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid issue ID format" });
  if (!["Pending", "In Progress", "Resolved", "Rejected"].includes(newStatus)) return res.status(400).json({ error: "Invalid status." });
  const issue = await Issue.findById(id); if (!issue) return res.status(404).json({ error: "Issue not found" }); issue.status = newStatus; await issue.save();
  if (issue.notifyByEmail && issue.email) await sendEmail(issue.email, "Civix - Issue Status Update", `<p>Your issue <strong>${issue.title}</strong> is now <strong>${newStatus}</strong>.</p>`);
  return res.json({ message: "Status updated successfully.", issue });
});
const reviewAiPrediction = asyncHandler(async (req, res) => {
  const { id } = req.params; const { correctedCategory } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid issue ID format" });
  if (correctedCategory !== undefined && !categories.includes(correctedCategory)) return res.status(400).json({ error: "Invalid corrected category." });
  const issue = await Issue.findById(id); if (!issue) return res.status(404).json({ error: "Issue not found" });
  issue.aiValidated = true; issue.aiValidatedCategory = correctedCategory || issue.aiPredictedCategory; await issue.save();
  return res.json({ message: "AI prediction reviewed.", issue });
});
const deleteIssue = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid issue ID format" });
  const issue = await Issue.findByIdAndDelete(req.params.id); if (!issue) return res.status(404).json({ error: "Issue not found" }); return res.json({ message: "Issue deleted successfully", issue });
});
const updateIssue = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid issue ID format" });
  const allowed = ["title", "description", "phone", "email", "location", "notifyByEmail"]; const update = {};
  allowed.forEach((key) => { if (req.body[key] !== undefined) update[key] = key === "notifyByEmail" ? req.body[key] === "true" : req.body[key]; });
  const issue = await Issue.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }); if (!issue) return res.status(404).json({ error: "Issue not found" }); return res.json({ message: "Issue updated successfully", issue });
});

module.exports = { createIssue, getAllIssues, updateIssueStatus, getIssueById, deleteIssue, updateIssue, reviewAiPrediction };
