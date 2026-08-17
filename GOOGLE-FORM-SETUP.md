# Cấu hình Google Form — DẤU VẾT TRI THỨC CÔNG NGHỆ 12

## 1. Kiến trúc và giới hạn

Website là frontend tĩnh. Học sinh nhập thông tin và link Google Drive/Slides; trình duyệt gửi một `POST` dạng `URLSearchParams` đến endpoint `formResponse` của Google Form bằng `fetch` với `mode: "no-cors"`. Google Form ghi câu trả lời vào Google Sheet liên kết. Website không nhận file thật, không cần server và không đặt token bí mật trong mã nguồn.

Vì `no-cors` không cho phép website đọc phản hồi từ Google, thông báo “đã gửi” chỉ có nghĩa là trình duyệt đã thực hiện request. Giáo viên cần kiểm tra Google Sheet để xác nhận bản ghi thật. Dữ liệu thống kê hiển thị trên website chỉ là bản ghi cục bộ của trình duyệt hiện tại, không phải sổ điểm tập trung.

## 2. Tạo Google Form

Tạo Form gồm **9 câu hỏi dạng trả lời ngắn hoặc đoạn văn**, theo bảng sau. Tên câu hỏi có thể khác, nhưng cần giữ đúng ý nghĩa và kiểu dữ liệu.

| Thứ tự | Nội dung cần tạo | Dữ liệu website gửi | Ghi chú |
|---|---|---|---|
| 1 | Họ và tên | `student` | Không dùng biệt danh khi giáo viên cần đối chiếu |
| 2 | Lớp | `className` | Ví dụ `12A1` |
| 3 | Mã lớp | `classCode` | Mã thống nhất do giáo viên quy định |
| 4 | Mã nhóm | `groupCode` | Ví dụ `N1`, `N2` |
| 5 | Nhóm chủ đề | `group` | Website tự gửi tên nhóm và chương |
| 6 | Tên báo cáo | `reportTitle` | Tên ngắn, phản ánh đúng sản phẩm |
| 7 | Link Google Drive / Slides | `reportLink` | Học sinh phải kiểm tra quyền xem trước khi gửi |
| 8 | Điểm tự chấm | `score` | Website gửi dạng `77/100` |
| 9 | Chi tiết rubric | `rubric` | Website gửi mức 1/4–4/4 của 5 tiêu chí |

Không bật yêu cầu đăng nhập nếu học sinh dùng tài khoản ngoài miền trường, trừ khi nhà trường có chủ trương bắt buộc đăng nhập. Không yêu cầu học sinh tải file trực tiếp lên Form nếu quy trình đã dùng link Drive/Slides.

## 3. Lấy các mã `entry.<id>`

Mở Form ở chế độ điền, dùng **Get pre-filled link** hoặc xem mã nguồn của trang điền để lấy mã `entry.<id>` tương ứng với từng câu hỏi. Mã cần dùng có dạng `entry.123456789`; không dùng mã câu hỏi trong giao diện chỉnh sửa nếu đó không phải mã entry của trường dữ liệu.

## 4. Lấy URL nộp

Mở Form ở chế độ điền, sao chép URL cơ bản rồi thay phần cuối thành `formResponse`:

```text
https://docs.google.com/forms/d/e/FORM_ID/formResponse
```

Không đưa URL chỉnh sửa có `/edit` vào website.

## 5. Cấu hình trong mã nguồn

Mở `client/src/pages/Home.tsx`, tìm `FORM_CONFIG` và thay URL cùng các mã entry:

```ts
const FORM_CONFIG = {
  actionUrl: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
  entries: {
    student: "entry.1111111111",
    className: "entry.2222222222",
    classCode: "entry.3333333333",
    groupCode: "entry.4444444444",
    group: "entry.5555555555",
    reportTitle: "entry.6666666666",
    reportLink: "entry.7777777777",
    score: "entry.8888888888",
    rubric: "entry.9999999999",
  },
};
```

Không đưa mật khẩu, API key, token, URL chỉnh sửa Form hoặc thông tin riêng tư của học sinh vào mã nguồn. Form công khai nên chỉ thu thập dữ liệu cần thiết cho hoạt động học tập; giáo viên chịu trách nhiệm quản lí quyền truy cập Sheet.

## 6. Kiểm thử trước khi dùng thật

Dùng một bản Form thử nghiệm. Chọn đủ 5 tiêu chí, gửi một bản ghi dễ nhận biết và mở tab Responses/Google Sheet để đối chiếu **đủ 9 trường**. Kiểm tra tên nhóm, mã lớp, mã nhóm, link báo cáo, điểm tổng và chuỗi rubric. Kiểm tra link ở chế độ ẩn danh hoặc bằng tài khoản học sinh để chắc chắn giáo viên có thể xem tài liệu.

Nếu Form không có bản ghi, kiểm tra URL `formResponse`, mã `entry.<id>`, quyền chia sẻ Form và Console trình duyệt. Vì `no-cors` không trả nội dung phản hồi, không dùng mã HTTP 200 của trình duyệt làm bằng chứng duy nhất.

Nếu chưa cấu hình, website sẽ không gửi dữ liệu ra ngoài; nút gửi tải bản tóm tắt JSON về máy để tránh mất dữ liệu.

## 7. Quyền chia sẻ và an toàn dữ liệu

Học sinh chỉ chia sẻ quyền xem đối với đúng báo cáo cần nộp. Không đưa số điện thoại, địa chỉ, ảnh khuôn mặt, vị trí nhạy cảm hoặc thông tin sức khỏe vào slide công khai. Khi dùng ảnh, số liệu hoặc công cụ AI, học sinh phải ghi nguồn và nêu rõ nội dung nào là ví dụ minh họa, nội dung nào là kết quả do nhóm tự thu thập.

## 8. Triển khai GitHub Pages

Workflow nằm ở `.github/workflows/static.yml`. Sau khi đẩy mã nguồn lên repository, bật GitHub Pages dùng **GitHub Actions**. Workflow truyền `VITE_BASE_PATH` theo tên repository để route và ảnh dùng đúng project site. Tài sản ảnh đã được đóng gói trong `client/public/assets`, không phụ thuộc vào proxy phát triển của Manus.

Website vẫn là ứng dụng tĩnh. `localStorage` chỉ lưu bản nháp và lịch sử trên trình duyệt hiện tại; dữ liệu có thể mất khi xóa dữ liệu trình duyệt. Google Sheet mới là nơi giáo viên lưu bản ghi chính thức sau khi xác nhận luồng Form hoạt động.
