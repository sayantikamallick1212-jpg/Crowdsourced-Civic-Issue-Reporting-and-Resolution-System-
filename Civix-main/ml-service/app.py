from pathlib import Path
import os
import joblib
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import UnidentifiedImageError
from features import extract_features

MAX_FILE_BYTES = 10 * 1024 * 1024
ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}
MODEL_PATH = Path(os.getenv("MODEL_PATH", Path(__file__).parent / "model" / "civic_issue_classifier.joblib"))
app = FastAPI(title="Civix ML Service", version="1.0.0")
_model_bundle = None

def get_model():
    global _model_bundle
    if _model_bundle is None:
        if not MODEL_PATH.exists():
            raise HTTPException(status_code=503, detail="ML model is unavailable. Train it before starting predictions.")
        try: _model_bundle = joblib.load(MODEL_PATH)
        except Exception as error: raise HTTPException(status_code=503, detail="ML model could not be loaded.") from error
    return _model_bundle

@app.get("/health")
def health(): return {"status": "ok", "model_loaded": _model_bundle is not None, "model_available": MODEL_PATH.exists()}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_TYPES: raise HTTPException(status_code=415, detail="Only JPEG, PNG, and WebP images are supported.")
    data = await file.read()
    if not data: raise HTTPException(status_code=400, detail="Image file is empty.")
    if len(data) > MAX_FILE_BYTES: raise HTTPException(status_code=413, detail="Image must be 10 MB or smaller.")
    try: features = extract_features(data).reshape(1, -1)
    except (UnidentifiedImageError, OSError, ValueError) as error: raise HTTPException(status_code=400, detail="Uploaded file is not a valid image.") from error
    bundle = get_model(); model = bundle["model"]
    probabilities = model.predict_proba(features)[0]
    ranked_predictions = sorted(
        (
            {"category": str(category), "confidence": float(confidence)}
            for category, confidence in zip(model.classes_, probabilities)
        ),
        key=lambda prediction: prediction["confidence"],
        reverse=True,
    )
    best_prediction = ranked_predictions[0]
    return {
        "success": True,
        "predicted_class": best_prediction["category"],
        "confidence": best_prediction["confidence"],
        "predictions": ranked_predictions,
    }
