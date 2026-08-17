# Checklist — Thông báo lỗi nhập liệu dễ sửa

- [x] Audit các trường biểu mẫu và thông báo lỗi hiện tại.
- [x] Thêm trạng thái lỗi theo từng trường: mã nhóm, mã báo cáo, link.
- [x] Hiển thị hướng dẫn sửa ngay dưới ô nhập, focus lỗi đầu tiên và toast tổng hợp khi gửi.
- [x] Tự chuẩn hóa chữ hoa/khoảng trắng ở mã lớp, mã nhóm và mã báo cáo.
- [x] Giữ accessibility: aria-invalid, aria-describedby, role=alert và focus tới lỗi đầu tiên.
- [x] Chạy check/test/build, kiểm tra desktop/mobile; GitHub Actions run 32068173038 thành công, Pages HTTP 200.
- [x] Chuẩn bị lưu checkpoint và bàn giao cách học sinh sửa lỗi.
