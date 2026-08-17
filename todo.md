# Checklist — Sửa lỗi URL fragment GitHub Pages

- [x] Kiểm tra App Router và các liên kết hash trong Home.
- [x] Bổ sung Router one-page để mọi fragment giữ Home; xác định cache cũ là nguyên nhân còn lại trên URL không có query.
- [x] Chạy check/test/build và đẩy commit mới lên GitHub.
- [x] Chờ GitHub Actions deploy thành công.
- [x] URL gốc và URL có `?v=2e58868#kiem-chung` hiển thị Home; URL hash không query còn phụ thuộc cache trình duyệt cũ.
- [x] Bàn giao link có query phiên bản mới và hướng dẫn Ctrl+F5/ẩn danh khi cache cũ còn lưu.
