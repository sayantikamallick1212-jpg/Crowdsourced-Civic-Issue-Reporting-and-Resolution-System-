# Civix AI-Powered Civic Issue Reporting and Resolution System

Civix lets citizens file civic complaints with a photo and location. A separate local Python service classifies the submitted image; Express stores the resulting prediction with the complaint in MongoDB for an administrator to verify or correct.

## Implemented features

- Vanilla HTML, CSS, and JavaScript frontend—no React runtime or React dependencies.
- Image preview, browser geolocation capture, upload progress messaging, and model-returned ranked confidence display.
- Express/MongoDB complaint workflow with JPEG/PNG/WebP validation, 10 MB limit, randomized upload names, server-side ML timeout handling, and CSRF protection.
- FastAPI ML API that loads a persisted, trained scikit-learn model.
- Admin JWT-protected AI review endpoint; a verified category may be retained or corrected.
- Existing issue status, MongoDB persistence, optional Cloudinary storage, JWT authorization, and email-status capabilities remain in the backend.

## Architecture

```text
Vanilla browser → Express (/api/issues) → FastAPI (/predict) → saved ML model
        ← prediction + confidence ←                    ↓
                         MongoDB ← stored issue + AI metadata
                                      ↓
                              admin verification UI
```

## Technology stack

HTML, CSS, vanilla JavaScript, Node.js, Express, MongoDB/Mongoose, Python, FastAPI, Pillow, NumPy, and scikit-learn.

## ML model and dataset

The model is a trainable `RandomForestClassifier` over 64×64 RGB pixels, colour histograms, and grayscale-gradient features. It supports: `pothole`, `garbage`, `waterlogging`, `damaged_road`, `broken_streetlight`, and `other`.

Add real licensed images to `ml-service/dataset/<class>/` then run `python train.py --dataset dataset` from `ml-service`. Training saves `model/civic_issue_classifier.joblib` and measures a stratified test split. Its actual accuracy, precision, recall, F1, class counts, and test count are written to `model/evaluation_metrics.json`; no metrics are claimed before you train with your dataset.

See [the ML service guide](ml-service/README.md) for the precise dataset layout and commands.

## Local setup

1. Install Node dependencies:

   ```powershell
   cd backend
   npm install
   ```

2. Install and train the Python service:

   ```powershell
   cd ..\ml-service
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   # Copy real labelled images into dataset/<class>/ first.
   python train.py --dataset dataset
   ```

3. Copy `backend/.env.example` to `backend/.env`, set a real `JWT_SECRET`, and start MongoDB.

4. In one terminal, start the ML service:

   ```powershell
   cd ml-service
   .\.venv\Scripts\Activate.ps1
   uvicorn app:app --host 127.0.0.1 --port 8000
   ```

5. In another terminal, start Express:

   ```powershell
   cd backend
   npm start
   ```

6. Open `http://localhost:5000`. Submit an image to see the predicted category, confidence, and the leading alternatives. Load the dashboard and provide an admin JWT to verify/correct a prediction.

## Important API endpoints

| Service | Endpoint | Purpose |
| --- | --- | --- |
| Express | `GET /api/csrf-token` | CSRF token for state-changing browser requests |
| Express | `POST /api/issues` | Upload image, call Python service, create complaint |
| Express | `GET /api/issues` | List complaints |
| Express | `PATCH /api/issues/:id/status` | Admin status update |
| Express | `PATCH /api/issues/:id/ai-review` | Admin verifies/corrects AI category |
| FastAPI | `GET /health` | Service and persisted-model availability |
| FastAPI | `POST /predict` | Multipart image prediction API with ranked category probabilities |

## Manual test checklist

1. Submit a valid labelled-style civic image and confirm the stored category, confidence, and alternatives in the dashboard.
2. Try a non-image, missing image, and an image above 10 MB; each must return a validation error.
3. Stop FastAPI and submit; Express should return a meaningful service-unavailable/timeout error without creating a complaint.
4. Stop MongoDB and submit; Express should return an error rather than crash.
5. Test a low-confidence result and ensure the displayed percentage is the returned model probability.
6. With an admin JWT, verify and then correct a category; confirm `aiValidated` and `aiValidatedCategory` update.
7. Permit geolocation, then confirm latitude/longitude and location text persist.
8. Update complaint status with an administrator token and confirm optional email notifications still behave as configured.
