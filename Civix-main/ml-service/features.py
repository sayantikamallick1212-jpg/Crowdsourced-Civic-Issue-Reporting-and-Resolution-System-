"""Feature extraction shared by the training and inference paths."""
from io import BytesIO
import numpy as np
from PIL import Image, ImageOps

IMAGE_SIZE = (64, 64)

def extract_features(image_bytes: bytes) -> np.ndarray:
    """Create deterministic colour, intensity and edge features from an image."""
    with Image.open(BytesIO(image_bytes)) as source:
        image = ImageOps.exif_transpose(source).convert("RGB").resize(IMAGE_SIZE)
        pixels = np.asarray(image, dtype=np.float32) / 255.0
    grayscale = pixels.mean(axis=2)
    gradient_y, gradient_x = np.gradient(grayscale)
    gradient_magnitude = np.hypot(gradient_x, gradient_y)
    colour_histograms = [np.histogram(pixels[:, :, channel], bins=16, range=(0, 1), density=True)[0] for channel in range(3)]
    edge_histogram = np.histogram(gradient_magnitude, bins=16, range=(0, 1), density=True)[0]
    return np.concatenate([pixels.reshape(-1), *colour_histograms, edge_histogram]).astype(np.float32)
