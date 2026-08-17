from pathlib import Path

import cv2

image_path = Path("/home/ubuntu/cong-nghe-12-nls-google-form/qr-dau-vet-cong-nghe-12.png")
image = cv2.imread(str(image_path))
if image is None:
    raise SystemExit("Không đọc được file mã QR")

detector = cv2.QRCodeDetector()
data, points, _ = detector.detectAndDecode(image)
print(f"Decoded: {data}")
print(f"Detected: {points is not None}")
if not data:
    raise SystemExit("Không giải mã được mã QR")
