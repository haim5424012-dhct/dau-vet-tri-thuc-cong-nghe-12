# Audit tái cấu trúc 8 nhóm

## Kết quả đối chiếu

Bảng ánh xạ nội bộ và hai nguồn tham khảo đều thống nhất rằng sách Công nghệ 12 Lâm nghiệp–Thủy sản Kết nối tri thức có 10 chương: Chương I “Giới thiệu chung về lâm nghiệp” gồm Bài 1–2; Chương II “Trồng và chăm sóc rừng” gồm Bài 3–5; Chương III “Bảo vệ và khai thác tài nguyên rừng bền vững” gồm Bài 6–7; các chương IV–X thuộc thủy sản, từ Bài 8 đến Bài 27. Nguồn phân phối chương trình tham khảo cũng ghi Chương I 5 tiết và Chương II 6 tiết.

Nguồn nội bộ người dùng cung cấp là bảng PL1/PL3 dùng cho website và có các mã 12.C2, 12.A1, 12.A3. Hai nguồn web dùng để đối chiếu mục lục là [1] và [2].

## Điểm cần chốt trước khi sửa

Yêu cầu “N1–N4 chủ đề chương 1, N5–N8 chủ đề chương 2” có thể hiểu theo hai cách. Cách thứ nhất là Chương 1/2 của **cấu trúc dự án mới**, trong đó cụm 1 và cụm 2 lần lượt gom nội dung lâm nghiệp và thủy sản; cách thứ hai là Chương I/II của sách giáo khoa, trong đó Chương I và II đều là lâm nghiệp và không bao phủ nhóm thủy sản. Nếu áp dụng cách thứ hai, yêu cầu “N5–N8 Chương 2” sẽ mâu thuẫn với phạm vi sách.

Để bảo toàn tính khoa học và vẫn đáp ứng ý định đa dạng chủ đề, phương án đề xuất là gọi rõ **Cụm 1 — Lâm nghiệp: trồng, chăm sóc, bảo vệ và khai thác bền vững** cho N1–N4; **Cụm 2 — Thủy sản: môi trường, giống, thức ăn, nuôi, bệnh và nguồn lợi** cho N5–N8. Không gọi hai cụm này là “Chương I/Chương II” nếu chúng không tương ứng với chương sách. Bài 1–2 sẽ được loại khỏi nhóm học sinh; nội dung “Giới thiệu chung về lâm nghiệp” không còn là một nhóm riêng.

## Tài liệu tham khảo

[1]: https://kenhgiaovien.com/tai-lieu/ppct-cong-nghe-12-lam-nghiep-thuy-san-ket-noi-tri-thuc "Phân phối chương trình Công nghệ 12 Lâm nghiệp – Thủy sản Kết nối tri thức"

[2]: https://vietjack.com/cong-nghe-12-kn/ly-thuyet-cong-nghe-lam-nghiep-thuy-san.jsp "Lý thuyết Công nghệ 12 Lâm nghiệp – Thủy sản Kết nối tri thức"

## Cấu trúc đã áp dụng trên website

| Nhóm | Cụm dự án | Phạm vi sách | Trọng tâm sản phẩm |
|---|---|---|---|
| N1 | Cụm 1 — Lâm nghiệp | Bài 3 | Vai trò, nhiệm vụ trồng và chăm sóc rừng; bảng theo dõi hiện trường |
| N2 | Cụm 1 — Lâm nghiệp | Bài 4 | Sinh trưởng, phát triển cây rừng; phân tích số liệu/ảnh có giới hạn |
| N3 | Cụm 1 — Lâm nghiệp | Bài 5 | Kĩ thuật trồng, chăm sóc và đề xuất trồng dặm |
| N4 | Cụm 1 — Lâm nghiệp | Bài 6–7 | Bảo vệ, khai thác rừng bền vững; cảnh báo và xác minh |
| N5 | Cụm 2 — Thủy sản | Bài 8–12 | Vai trò, phương thức và môi trường nuôi |
| N6 | Cụm 2 — Thủy sản | Bài 13–15 | Công nghệ giống thủy sản |
| N7 | Cụm 2 — Thủy sản | Bài 16–18 | Công nghệ thức ăn thủy sản |
| N8 | Cụm 2 — Thủy sản | Bài 19–27 | Công nghệ nuôi, bệnh và nguồn lợi thủy sản |

Cấu trúc này được dùng trong `Home.tsx`, báo cáo mẫu, JSON mẫu và các script kiểm thử. “Cụm 1/Cụm 2” là nhãn tổ chức dự án, không phải tên chương chính thức của sách.
