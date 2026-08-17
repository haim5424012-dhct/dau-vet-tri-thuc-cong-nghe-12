from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H

URL = "https://haim5424012-dhct.github.io/dau-vet-tri-thuc-cong-nghe-12/?v=7592052"
OUTPUT = Path("/home/ubuntu/cong-nghe-12-nls-google-form/qr-dau-vet-cong-nghe-12.png")

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=18,
    border=5,
)
qr.add_data(URL)
qr.make(fit=True)
image = qr.make_image(fill_color="#123d32", back_color="white")
image.save(OUTPUT)
print(f"Created: {OUTPUT}")
print(f"URL: {URL}")
print(f"Size: {image.size[0]}x{image.size[1]}")
