"""Train a real local civic-issue image classifier from labelled image folders."""
import argparse
import json
from pathlib import Path
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from features import extract_features

CLASSES = ("pothole", "garbage", "waterlogging", "damaged_road", "broken_streetlight", "other")
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}

def load_dataset(dataset_dir: Path):
    features, labels = [], []
    for label in CLASSES:
        folder = dataset_dir / label
        for image_path in sorted(folder.glob("**/*")) if folder.exists() else []:
            if image_path.suffix.lower() not in IMAGE_SUFFIXES:
                continue
            try:
                features.append(extract_features(image_path.read_bytes()))
                labels.append(label)
            except Exception as error:
                print(f"Skipping unreadable image {image_path}: {error}")
    missing = [label for label in CLASSES if label not in labels]
    if missing:
        raise ValueError(f"Dataset needs at least one valid image for every class. Missing: {', '.join(missing)}")
    return np.stack(features), np.array(labels)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", default="dataset", help="Directory with one subfolder per class")
    parser.add_argument("--model", default="model/civic_issue_classifier.joblib")
    parser.add_argument("--metrics", default="model/evaluation_metrics.json")
    args = parser.parse_args()
    features, labels = load_dataset(Path(args.dataset))
    class_counts = {label: int((labels == label).sum()) for label in CLASSES}
    if min(class_counts.values()) < 2:
        raise ValueError("Each class needs at least two images to create an evaluation split.")
    test_size = max(0.2, len(CLASSES) / len(labels))
    train_x, test_x, train_y, test_y = train_test_split(features, labels, test_size=test_size, random_state=42, stratify=labels)
    classifier = RandomForestClassifier(n_estimators=250, random_state=42, class_weight="balanced", n_jobs=-1)
    classifier.fit(train_x, train_y)
    prediction = classifier.predict(test_x)
    precision, recall, f1, _ = precision_recall_fscore_support(test_y, prediction, labels=CLASSES, average="weighted", zero_division=0)
    metrics = {"sample_count": int(len(labels)), "class_counts": class_counts, "test_sample_count": int(len(test_y)), "accuracy": float(accuracy_score(test_y, prediction)), "weighted_precision": float(precision), "weighted_recall": float(recall), "weighted_f1": float(f1), "classification_report": classification_report(test_y, prediction, labels=CLASSES, output_dict=True, zero_division=0)}
    model_path, metrics_path = Path(args.model), Path(args.metrics)
    model_path.parent.mkdir(parents=True, exist_ok=True); metrics_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump({"model": classifier, "classes": CLASSES}, model_path)
    metrics_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    print(json.dumps({key: metrics[key] for key in ("sample_count", "accuracy", "weighted_precision", "weighted_recall", "weighted_f1")}, indent=2))

if __name__ == "__main__": main()
