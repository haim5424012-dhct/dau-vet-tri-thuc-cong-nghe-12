# DẤU VẾT TRI THỨC CÔNG NGHỆ 12

Website học tập tĩnh dành cho học sinh lớp 12 thực hiện báo cáo nhóm và tự phản tư trong môn **Công nghệ 12 — Lâm nghiệp và Thủy sản**. Sản phẩm dùng giao diện tùy biến, không hiển thị Google Form mặc định; dữ liệu gửi ngầm qua Google Form vào Google Sheet do giáo viên quản lí.

## Mục tiêu sư phạm

Website hỗ trợ học sinh chọn một trong tám nhóm chủ đề, đọc yêu cầu cần đạt và liên hệ phù hợp với năng lực số/giáo dục AI. Học sinh phải trình bày kiến thức Công nghệ 12 trước khi mở rộng sang AI. Nội dung AI được diễn đạt theo nguyên tắc **AI hỗ trợ phân tích hoặc cảnh báo; con người kiểm chứng và quyết định**. Dữ liệu tự chấm chỉ là phản tư tham khảo, không thay thế đánh giá chính thức của giáo viên.

| Thành phần | Cách dùng |
|---|---|
| 8 nhóm chủ đề | Chọn N1–N8 để xem chương, bài học, mã liên hệ và yêu cầu báo cáo |
| Bộ lọc kiểm chứng AI | Kiểm tra dữ liệu đầu vào, đầu ra, sai số, nguồn và trách nhiệm con người |
| Rubric 100 điểm | Kiến thức 30%, minh chứng 20%, trình bày 20%, trực quan 15%, phối hợp 15% |
| Nộp bài | Nhập mã lớp, mã nhóm, tên báo cáo và link Drive/Slides; gửi qua Form ẩn |
| Thống kê cục bộ | Lọc và xuất CSV/Excel các bản ghi của trình duyệt hiện tại |

## Cấu trúc nhóm hiện tại

Phiên bản mới không dùng Bài 1–2 “Giới thiệu chung về lâm nghiệp” làm nhóm lựa chọn. Tám nhóm được tổ chức thành hai cụm nội dung để học sinh làm việc đa dạng hơn nhưng vẫn bám mục lục sách. **Cụm 1 — Lâm nghiệp** gồm N1 Bài 3, N2 Bài 4, N3 Bài 5 và N4 Bài 6–7. **Cụm 2 — Thủy sản** gồm N5 Bài 8–12, N6 Bài 13–15, N7 Bài 16–18 và N8 Bài 19–27. Đây là cách tổ chức nhóm của dự án, không gọi là Chương I/Chương II của sách giáo khoa để tránh nhầm lẫn với Chương I “Giới thiệu chung về lâm nghiệp” và Chương II “Trồng và chăm sóc rừng”.

Mỗi nhóm có trọng tâm riêng: kiến thức nền và trồng rừng, sinh trưởng cây rừng, kĩ thuật chăm sóc, bảo vệ–khai thác bền vững; sau đó là môi trường nuôi, giống, thức ăn, nuôi–bệnh–nguồn lợi thủy sản. Liên hệ AI là phần mở rộng có điều kiện, không thay thế yêu cầu cần đạt của môn học.

## Công nghệ và dữ liệu

Dự án dùng React 19, Vite, Tailwind CSS 4, Wouter, Lucide React, Sonner và XLSX. Ảnh minh họa đã được tối ưu và đặt trong `client/public/assets` để artifact GitHub Pages không phụ thuộc proxy phát triển. Google Sheet là nguồn lưu trữ tập trung; `localStorage` chỉ dùng cho bản nháp và lịch sử cục bộ.

Không đưa mật khẩu, token, API key hoặc dữ liệu nhạy cảm của học sinh vào mã nguồn. Khi dùng ảnh, số liệu hoặc công cụ AI, học sinh phải ghi nguồn, quyền sử dụng và phân biệt ví dụ minh họa với dữ liệu do nhóm tự thu thập.

## Chạy tại máy giáo viên

Cài Node.js 22 và pnpm 10, sau đó chạy:

```bash
pnpm install
pnpm dev
```

Các lệnh kiểm tra trước khi chia sẻ:

```bash
pnpm check
pnpm test
pnpm build
```

`pnpm test` kiểm tra phép tính rubric mẫu 76,67 và quy tắc làm tròn thành 77/100. Cảnh báo bundle JavaScript lớn hơn 500 kB của Vite không làm thất bại build; có thể tối ưu code-splitting ở vòng phát triển sau.

## Kết nối Google Form

Giáo viên tạo Form gồm 9 trường: Họ và tên, Lớp, Mã lớp, Mã nhóm, Nhóm chủ đề, Tên báo cáo, Link Google Drive/Slides, Điểm tự chấm và Chi tiết rubric. Sau đó điền URL `formResponse` cùng 9 mã `entry.<id>` vào `FORM_CONFIG` trong `client/src/pages/Home.tsx`. Hướng dẫn đầy đủ nằm trong [`GOOGLE-FORM-SETUP.md`](./GOOGLE-FORM-SETUP.md).

Do trình duyệt gửi bằng `no-cors`, website không thể đọc phản hồi của Google. Giáo viên phải gửi một bản thử nghiệm và đối chiếu đủ 9 cột trong Google Sheet trước khi đưa đường dẫn cho học sinh.

## Bảo vệ dữ liệu và giới hạn bảo mật

Website có các lớp bảo vệ ở mức giao diện: giới hạn độ dài trường nhập, chỉ chấp nhận link HTTPS thuộc Google Drive/Slides, kiểm tra mã báo cáo khớp nhóm, chuẩn hóa rubric và loại bản ghi localStorage sai cấu trúc khỏi thống kê. Khi xuất CSV/Excel, các ô bắt đầu bằng `=`, `+`, `-` hoặc `@` được đánh dấu để giảm nguy cơ bị bảng tính hiểu thành công thức.

Các bản ghi đã gửi trong giao diện không có nút sửa/xóa; nút “Xóa bản nháp” chỉ xóa dữ liệu chưa gửi trên trình duyệt và không xóa Google Sheet. Google Sheet là nguồn chính thức, vì vậy giáo viên cần giới hạn quyền chỉnh sửa, bật xác thực tài khoản trường nếu phù hợp và kiểm tra quyền chia sẻ của từng báo cáo.

> Đây là website tĩnh. Người dùng có kỹ thuật vẫn có thể sửa JavaScript hoặc localStorage bằng công cụ trình duyệt. Các lớp frontend giúp giảm sửa nhầm và dữ liệu sai cấu trúc, nhưng không thể chống giả mạo ở cấp hệ thống. Muốn bảo vệ điểm chính thức cần backend, xác thực người dùng, phân quyền giáo viên và nhật ký thay đổi do nhà trường quản trị.

## Triển khai GitHub Pages

Tạo một repository GitHub, đẩy toàn bộ mã nguồn trừ `node_modules`, `dist`, log và cache, rồi bật **Settings → Pages → Source: GitHub Actions**. Workflow [`static.yml`](./.github/workflows/static.yml) sẽ cài phụ thuộc, chạy `pnpm check`, `pnpm test`, build với `VITE_BASE_PATH=/<tên-repository>/`, đóng gói `dist/public` và deploy lên Pages.

Sau khi workflow thành công, đường dẫn project site có dạng:

```text
https://TEN-TAI-KHOAN.github.io/TEN-REPOSITORY/
```

Nếu dùng tên miền riêng, chỉnh `VITE_BASE_PATH` trong workflow thành `/` và cấu hình DNS/Pages theo hướng dẫn của GitHub. Không mở trực tiếp file `index.html` bằng `file://`; cần chạy qua Vite hoặc GitHub Pages để `BASE_URL` và các asset hoạt động đúng.

## Tài liệu giáo viên và học sinh

Giáo viên nên đọc [`GOOGLE-FORM-SETUP.md`](./GOOGLE-FORM-SETUP.md) để cấu hình đường ống dữ liệu. Học sinh đọc [`huong-dan-nop-bai-hoc-sinh.md`](./huong-dan-nop-bai-hoc-sinh.md) trước khi tạo link Drive/Slides. Hồ sơ audit khoa học và các giới hạn nội dung nằm trong [`scientific-audit.md`](./scientific-audit.md).

## Nguồn tham khảo nội dung AI

[1]: https://moet.gov.vn/tin-tuc/ban-hanh-khung-noi-dung-thi-diem-giao-duc-tri-tue-nhan-tao-ai-cho-hoc-sinh-pho-thong2.html "Bộ GDĐT — Ban hành Khung nội dung thí điểm giáo dục trí tuệ nhân tạo cho học sinh phổ thông"
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10972841/ "Rather et al. (2024), Exploring opportunities of Artificial Intelligence in aquaculture to meet increasing food demand"
