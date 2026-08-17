# Checklist — Khắc phục lỗi 404 GitHub Pages

- [x] Kiểm tra URL Pages, trạng thái Pages và lần chạy Actions mới nhất.
- [x] Kiểm tra artifact có index.html ở thư mục gốc và base path đúng tên repository.
- [x] Xác định lỗi do Wouter thiếu `base={import.meta.env.BASE_URL}`, không phải lỗi artifact Pages.
- [x] Sửa App.tsx, chạy check/test/build và đẩy commit mới.
- [x] Chạy lại GitHub Actions thành công; trình duyệt hiển thị trang chủ và asset đúng.
- [x] Bàn giao URL chính xác và hướng dẫn học sinh tải lại trang nếu còn cache.
