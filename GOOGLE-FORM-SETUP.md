# Cấu hình Google Form/Sheet cho FIELDNOTE / CN12

## Kiến trúc

Website là frontend tĩnh. Học sinh nhập thông tin và link Google Drive/Slides; trình duyệt gửi một `POST` dạng `URLSearchParams` đến endpoint `formResponse` của Google Form bằng `fetch` với `mode: "no-cors"`. Google Form ghi câu trả lời vào Google Sheet liên kết. Website không nhận file thật, không cần server và không đặt token bí mật trong mã nguồn.

## Tạo Form

Tạo một Google Form mới với 7 câu hỏi, theo đúng thứ tự hoặc tên tùy ý: Họ và tên, Lớp, Nhóm, Tên báo cáo, Link Google Drive/Slides, Điểm tự chấm, Chi tiết rubric. Nên để các câu hỏi dạng câu trả lời ngắn hoặc đoạn văn; không bật yêu cầu đăng nhập nếu học sinh dùng tài khoản ngoài miền trường.

Trong Google Form, chọn **Get pre-filled link** hoặc mở mã nguồn/chức năng xem trước để lấy các mã `entry.<id>` tương ứng với từng câu hỏi. Mã thường có dạng `entry.123456789`. Không dùng mã câu hỏi ở giao diện chỉnh sửa nếu đó không phải mã entry của trường dữ liệu.

## Lấy URL nộp

Mở Form ở chế độ điền, sao chép URL cơ bản rồi thay phần cuối thành `formResponse`. Ví dụ:

```text
https://docs.google.com/forms/d/e/FORM_ID/formResponse
```

Không điền URL chỉnh sửa có `/edit` vào website.

## Điền cấu hình trong mã nguồn

Mở `client/src/pages/Home.tsx`, tìm hằng số `FORM_CONFIG` và thay URL cùng các mã entry:

```ts
const FORM_CONFIG = {
  actionUrl: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
  entries: {
    student: "entry.1111111111",
    className: "entry.2222222222",
    group: "entry.3333333333",
    reportTitle: "entry.4444444444",
    reportLink: "entry.5555555555",
    score: "entry.6666666666",
    rubric: "entry.7777777777",
  },
};
```

Không đưa mật khẩu, API key, token, URL chỉnh sửa Form hoặc thông tin riêng tư của học sinh vào mã nguồn. `no-cors` khiến trình duyệt không đọc được phản hồi từ Google; do đó giao diện chỉ có thể báo request đã được gửi, còn việc xác nhận bản ghi phải kiểm tra ở Google Sheet.

## Kiểm thử trước khi dùng thật

Dùng một bản Form thử nghiệm. Điền đầy đủ 5 tiêu chí, gửi một bản ghi có tên dễ nhận biết, sau đó mở tab Responses/Google Sheet để đối chiếu 7 trường. Kiểm tra cả link báo cáo, điểm tổng và chuỗi rubric. Nếu Form không có bản ghi, kiểm tra lại URL `formResponse`, các mã `entry.<id>`, quyền chia sẻ Form và Console của trình duyệt.

Nếu chưa cấu hình, website không gửi dữ liệu ra ngoài: nút gửi sẽ tải bản tóm tắt JSON về máy. Đây là cơ chế dự phòng để tránh học sinh mất bản tự chấm trong lúc giáo viên đang thiết lập Form.

## Quyền chia sẻ báo cáo

Học sinh phải đặt quyền xem phù hợp cho link Drive/Slides trước khi nộp. Website chỉ lưu link; Google Form/Sheet không tự thay đổi quyền chia sẻ file. Giáo viên nên hướng dẫn học sinh chỉ chia sẻ đúng phạm vi cần thiết và không đưa thông tin nhạy cảm vào slide công khai.

## Triển khai GitHub Pages

Workflow nằm ở `.github/workflows/static.yml`. Sau khi đẩy mã nguồn lên repository, bật GitHub Pages dùng **GitHub Actions**. Với project site, workflow cung cấp `VITE_BASE_PATH` theo tên repository để asset dùng đúng đường dẫn. Nếu dùng custom domain, có thể đặt base path là `/` trong biến môi trường workflow.

Website vẫn là sổ ghi tạm trên trình duyệt khi chưa kết nối Form. `localStorage` không phải cơ sở dữ liệu tập trung và có thể mất khi người dùng xóa dữ liệu trình duyệt; Google Sheet mới là nơi giáo viên lưu bản ghi sau khi kết nối thành công.
