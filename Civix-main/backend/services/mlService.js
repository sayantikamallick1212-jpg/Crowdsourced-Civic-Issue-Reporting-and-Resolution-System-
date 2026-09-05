const fs = require("fs");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";
const ML_TIMEOUT_MS = Number(process.env.ML_REQUEST_TIMEOUT_MS || 15000);

async function predictIssueImage(file) {
  const image = await fs.promises.readFile(file.path);
  const body = new FormData();
  body.append("file", new Blob([image], { type: file.mimetype }), "issue-image");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ML_TIMEOUT_MS);
  try {
    const response = await fetch(`${ML_SERVICE_URL}/predict`, { method: "POST", body, signal: controller.signal });
    const payload = await response.json().catch(() => null);
    const predictionsAreValid = Array.isArray(payload?.predictions) && payload.predictions.length > 0 && payload.predictions.every(
      (prediction) => prediction && typeof prediction.category === "string" && typeof prediction.confidence === "number" && prediction.confidence >= 0 && prediction.confidence <= 1
    );
    if (!response.ok || !payload?.success || typeof payload.confidence !== "number" || !payload.predicted_class || !predictionsAreValid) {
      const error = new Error(payload?.detail || "ML service returned an invalid response."); error.statusCode = 503; throw error;
    }
    return payload;
  } catch (error) {
    const unavailable = new Error(error.name === "AbortError" ? "AI analysis timed out. Please try again." : "AI analysis service is unavailable. Please try again later.");
    unavailable.statusCode = error.statusCode || 503;
    throw unavailable;
  } finally { clearTimeout(timeout); }
}

module.exports = { predictIssueImage };
