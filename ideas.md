# Định hướng thiết kế — Công nghệ 12: Báo cáo & Tự chấm

## Ba hướng thẩm mỹ

### Theme Name: Sổ tay thực địa
**Very Brief Intro:** Giao diện sáng, giàu chất liệu giấy và màu xanh rừng–nước, gợi cảm giác một cuốn sổ khảo sát được số hóa. Các khối nội dung lệch nhịp nhẹ để tạo trải nghiệm khám phá thay vì một biểu mẫu khô cứng.
**Probability:** 0.07

### Theme Name: Phòng điều khiển dữ liệu
**Very Brief Intro:** Bảng điều khiển tối, sắc nét, tập trung vào tiến độ, điểm số và các chỉ báo dữ liệu. Phù hợp khi ưu tiên cảm giác công nghệ cao và thao tác nhanh.
**Probability:** 0.04

### Theme Name: Vườn học tập ven sông
**Very Brief Intro:** Một không gian giáo dục ấm áp dùng nền kem, xanh lá non và xanh nước, kết hợp các đường nét hữu cơ và minh họa khoa học tối giản. Cảm xúc chính là gần gũi, tin cậy và khuyến khích học sinh tự nhìn lại quá trình làm việc nhóm.
**Probability:** 0.09

## Lựa chọn chính: Sổ tay thực địa

### Design Movement
Biophilic editorial design kết hợp visual system của field journal và dashboard giáo dục hiện đại.

### Core Principles
1. Nội dung học tập là trung tâm: mỗi nhóm chủ đề được trình bày như một trang ghi chép có thể tra cứu nhanh.
2. Giao diện phải phân biệt rõ ba lớp: yêu cầu cần đạt, năng lực số/Khung 3439 và minh chứng báo cáo.
3. Tự chấm là công cụ phản tư, không giả danh điểm giáo viên; mọi nhãn và hướng dẫn đều nói rõ giới hạn này.
4. Sự mềm mại của màu sắc đi cùng cấu trúc chặt chẽ của dữ liệu Google Sheet.

### Color Philosophy
Nền giấy ngà tạo cảm giác đọc lâu không mỏi mắt; xanh rừng là màu chủ đạo của tri thức thực địa và trách nhiệm bảo vệ tài nguyên; xanh nước làm điểm nhấn cho phần thủy sản; vàng đất chỉ dùng cho trạng thái cần chú ý. Bảng màu tránh neon và gradient tím để giữ tính học thuật, thân thiện với lớp học.

### Layout Paradigm
Bố cục hai nhịp: thanh điều hướng dọc ở desktop và nội dung chính dạng dòng thời gian/chồng lớp ở bên phải. Trang đầu dùng hero lệch trục với sơ đồ 4 tầng “Giao diện → Google Form → Google Sheet → Giáo viên”, bám theo hình tham chiếu. Trang tự chấm dùng panel tiêu chí dạng xếp lớp và một cột tổng điểm luôn hiện ở màn hình lớn.

### Signature Elements
- Đường nối nét chì màu xanh giữa các tầng của quy trình nộp bài.
- Nhãn “Field note” dạng thẻ nhỏ cho YCCĐ, NLS và mã Khung 3439.
- Huy hiệu hình hạt giống/lá cách điệu, dùng làm mark thương hiệu và favicon.

### Interaction Philosophy
Mỗi thao tác phải trả lời ngay bằng thay đổi trực quan: chọn mức rubric cập nhật điểm và thanh tiến độ; chọn nhóm mở đúng YCCĐ; lưu tạm trên trình duyệt được báo rõ; khi chưa cấu hình Google Form, nút nộp chuyển sang chế độ xem trước thay vì âm thầm thất bại.

### Animation
Chỉ dùng chuyển động ngắn dưới 300ms, chủ yếu transform và opacity. Các thẻ nhóm xuất hiện lệch nhịp 40ms; panel rubric trượt nhẹ từ phía cột điểm; nút gửi có phản hồi scale khi nhấn. Tôn trọng prefers-reduced-motion và không dùng hiệu ứng gây xao nhãng trong lúc làm bài.

### Typography System
Dùng Fraunces cho tiêu đề lớn và nhãn chương để tạo chất biên tập; dùng Be Vietnam Pro cho nội dung, biểu mẫu và số liệu vì hỗ trợ tiếng Việt rõ. H1 đậm, có khoảng cách chữ chặt; heading phụ dùng semibold; văn bản hướng dẫn tối thiểu 16px; điểm số dùng tabular numerals.

### Brand Essence
Một trạm nộp báo cáo và tự phản tư dành cho học sinh Công nghệ 12 Lâm nghiệp–Thủy sản, giúp nhóm biến yêu cầu học tập thành minh chứng có cấu trúc và gửi kết quả tập trung cho giáo viên. Ba tính cách: **thực địa, minh bạch, khích lệ**.

### Brand Voice
Tiêu đề và CTA nói ngắn, cụ thể, không dùng khẩu hiệu chung chung. Microcopy giải thích vì sao cần một trường dữ liệu và dữ liệu đi đâu.

Ví dụ:
- “Chọn nhóm của bạn, rồi mở đúng yêu cầu cần đạt.”
- “Gửi bản tự chấm vào sổ lớp — giáo viên vẫn là người duyệt cuối.”

### Wordmark & Logo
Wordmark dùng chữ “FIELDNOTE / CN12” với dấu gạch chéo nhỏ như ký hiệu bản đồ. Logo là một hạt giống tạo bởi hai nét cong và một điểm dữ liệu, không chứa chữ, đặt cạnh wordmark ở header và dùng làm favicon.

### Signature Brand Color
**Rừng tràm #1F6B57** — một xanh lục trầm, đủ khác biệt để nhận diện, đồng thời giữ được độ tin cậy khi dùng trong nút, đường nối và huy hiệu trạng thái.

## Quyết định nội dung

Website dùng 8 nhóm chủ đề Công nghệ 12 Lâm nghiệp – Thủy sản từ tài liệu người dùng cung cấp. Điểm tự chấm mặc định được thể hiện là **phản tư/tham khảo**, còn điểm chính thức do giáo viên duyệt riêng. Học sinh nhập tên, lớp, nhóm, tiêu đề báo cáo, link Google Drive/Slides, sau đó chọn 4 mức cho 5 tiêu chí: kiến thức 30%, minh chứng thực hành 20%, kỹ năng trình bày 20%, slide/hình thức 15%, trả lời câu hỏi/phối hợp nhóm 15%.

## Kiến trúc gửi dữ liệu

Trang tĩnh không lưu file báo cáo. Người học chỉ gửi link công khai hoặc link chia sẻ phù hợp đến Google Drive/Slides. Khi giáo viên điền URL action của Google Form và các `entry.<id>` tương ứng vào phần cấu hình, JavaScript tạo `FormData` và gửi bằng `fetch(..., { mode: 'no-cors' })`. Trình duyệt không đọc được phản hồi do chính sách CORS, vì vậy giao diện chỉ xác nhận “đã gửi yêu cầu” sau khi request hoàn tất ở phía trình duyệt; Google Form/Sheet là nơi giáo viên kiểm tra bản ghi.

## Giới hạn và an toàn

Không đưa token bí mật vào mã nguồn. Không upload file học sinh lên website. Không coi localStorage là sổ điểm tập trung. Nếu URL Google Form hoặc mapping entry chưa được cấu hình, website phải hiển thị trạng thái “chưa kết nối” và cho phép tải bản tóm tắt JSON/CSV cục bộ để tránh mất dữ liệu.
