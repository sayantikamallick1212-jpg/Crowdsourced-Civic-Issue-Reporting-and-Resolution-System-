# Civix ML service

This is a genuine, local scikit-learn image classifier. It uses 64×64 RGB pixels, per-channel colour histograms, and grayscale gradient features, then trains a 250-tree Random Forest. It does not contain rules or hard-coded category detection.

## Dataset layout

Place real, licensed civic-issue images in these folders. Keep images of the same class together and use at least two images per class; substantially more images are required for meaningful results.

```text
dataset/
  pothole/  garbage/  waterlogging/  damaged_road/  broken_streetlight/  other/
```

Use public labelled datasets only where their licences allow it. Combine or relabel source classes carefully and reserve representative images for the automatic stratified test split. Dataset images and generated model files are ignored by Git.

## Run

```powershell
cd ml-service
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python train.py --dataset dataset
uvicorn app:app --host 127.0.0.1 --port 8000
```

Training writes `model/civic_issue_classifier.joblib` and measured `model/evaluation_metrics.json`. The API only loads this saved model; it never retrains on startup. `GET /health` reports readiness and `POST /predict` accepts a multipart `file` image.

`POST /predict` returns the winning category and confidence plus a `predictions` array ordered from most to least likely. Civix saves that ranking with each report so an administrator can consider plausible alternatives during review.
