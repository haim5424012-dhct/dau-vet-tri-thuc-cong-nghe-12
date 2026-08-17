# Hồ sơ audit khoa học — DẤU VẾT TRI THỨC CÔNG NGHỆ 12

## Phạm vi đã kiểm tra

Website hiện tổ chức 8 nhóm chủ đề Công nghệ 12 Lâm nghiệp–Thủy sản, gắn YCCĐ/NLS/Khung 3439, yêu cầu báo cáo có liên hệ AI, rubric tự phản tư 5 tiêu chí và gửi dữ liệu qua Google Form/Sheet.

## Phát hiện từ nguồn chính thức

Nguồn Bộ Giáo dục và Đào tạo về Quyết định 3439/QĐ-BGDĐT ngày 15/12/2025 mô tả [1] Khung nội dung thí điểm giáo dục AI theo bốn mạch: tư duy lấy con người làm trung tâm; đạo đức AI; các kĩ thuật và ứng dụng AI; thiết kế hệ thống AI. Ở cấp THPT, học sinh được khuyến khích khám phá, thiết kế và cải tiến công cụ AI đơn giản thông qua dự án; việc đánh giá cần coi trọng khả năng vận dụng, kiểm chứng, hiệu quả, tính nhân văn, đạo đức, tư duy phản biện, giao tiếp và hợp tác.

Nguồn Bộ GDĐT: https://moet.gov.vn/tin-tuc/ban-hanh-khung-noi-dung-thi-diem-giao-duc-tri-tue-nhan-tao-ai-cho-hoc-sinh-pho-thong2.html

Nguồn tìm kiếm của Bộ GDĐT về Khung năng lực số cho người học cho biết Thông tư 02/2025/TT-BGDĐT quy định 6 miền năng lực và 24 năng lực thành phần. Cần tránh diễn giải các mã NLS nội bộ trong bảng PL1 như thể đó là toàn bộ mã chính thức nếu chưa đối chiếu bản phụ lục gốc.

Nguồn: https://moet.gov.vn/tintuc/Pages/tin-tong-hop.aspx%3FItemID (liên kết kết quả tìm kiếm hiện trả 404; chỉ dùng như dấu vết tìm kiếm, không dùng làm trích dẫn chính).

## Phát hiện kỹ thuật về AI trong thủy sản

Bài tổng quan Rather et al. (2024), Food Chemistry: X, DOI 10.1016/j.fochx.2024.101309, cho rằng [2] AI/IoT/camera/thuật toán có thể hỗ trợ giám sát sức khỏe đàn nuôi, tối ưu thức ăn và quản lí tài nguyên nước; đồng thời nêu các hạn chế về thu thập dữ liệu, chuẩn hóa, độ chính xác, khả năng giải thích và tích hợp hệ thống. Vì vậy nội dung website phải dùng các động từ “có thể hỗ trợ”, “phân tích/cảnh báo”, “cần kiểm tra lại”, không khẳng định AI tự chẩn đoán hay tự quyết định.

Nguồn: https://pmc.ncbi.nlm.nih.gov/articles/PMC10972841/

## Rủi ro khoa học cần xử lý

1. Một số outcome hiện dùng cụm “AI dự báo thời điểm khai thác”, “AI nhận diện bệnh qua ảnh”, “đánh giá độ tươi”, “dự báo ngư trường” nhưng chưa nêu dữ liệu đầu vào, đầu ra, giới hạn và người kiểm tra.
2. Cảm biến đo pH, oxygen, nhiệt độ không mặc nhiên là AI; cần tách rõ thiết bị đo, phần mềm phân tích và mô hình dự báo.
3. N5 (Bài 13–14) và N6 (Bài 17–18) được bảng nguồn ghi rõ không có mã Khung 3439 riêng; không nên bắt buộc mọi nhóm phải có một sản phẩm AI như nhau.
4. Cần bổ sung đạo đức AI, quyền riêng tư, bản quyền hình ảnh/dữ liệu, kiểm chứng nguồn, thiên lệch và trách nhiệm con người vào yêu cầu báo cáo/rubric.

## Rủi ro GitHub Pages cần xử lý

`Home.tsx` đang tham chiếu ảnh `/manus-storage/...`; đây là đường dẫn được proxy trong môi trường dev nhưng không chắc tồn tại trên GitHub Pages. Cần chuyển các ảnh/logo sang asset được đóng gói hoặc URL HTTPS ổn định trước khi chia sẻ công khai.

Workflow `.github/workflows/static.yml` đã có base path và deploy Pages nhưng cần kiểm tra lại việc chạy test trước build, artifact `dist/public`, và tính tương thích của route/asset với project site.

`GOOGLE-FORM-SETUP.md` còn mô tả 7 trường, trong khi `Home.tsx` hiện gửi 9 trường, gồm Mã lớp và Mã nhóm. Tài liệu phải được cập nhật đồng bộ.

## Tài liệu tham khảo

[1]: https://moet.gov.vn/tin-tuc/ban-hanh-khung-noi-dung-thi-diem-giao-duc-tri-tue-nhan-tao-ai-cho-hoc-sinh-pho-thong2.html "Bộ GDĐT — Ban hành Khung nội dung thí điểm giáo dục trí tuệ nhân tạo cho học sinh phổ thông"

[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC10972841/ "Rather et al. (2024) — Exploring opportunities of Artificial Intelligence in aquaculture to meet increasing food demand"

## Kết luận audit sơ bộ

Dự án có nền tảng sư phạm và kỹ thuật tốt để dùng như hồ sơ học tập số, nhưng chưa nên tuyên bố “đã hoàn chỉnh khoa học/GitHub-ready” cho đến khi sửa cách diễn đạt AI, bổ sung truy vết nguồn, cập nhật hướng dẫn 9 trường và xử lý tài sản `/manus-storage`.

## Kiểm thử giao diện sau chỉnh sửa

Trang chủ hiển thị đúng logo, hero và menu bổ sung “Kiểm chứng AI” trên desktop; ở viewport 390px, tiêu đề, mô tả, nút thao tác và ảnh hero co giãn phù hợp, menu chuyển sang nút mobile. Ba đường dẫn ảnh dùng `BASE_URL` và asset nội bộ `client/public/assets`.

Build production đã tạo đủ bốn asset ảnh trong `dist/public/assets`. Sau khi sửa favicon, cần chạy lại build cuối để xác nhận không còn chuỗi `/manus-storage` trong artifact.

## Chẩn đoán lỗi 404 GitHub Pages ngày 17/08/2026

GitHub Pages và artifact hoạt động, nhưng ứng dụng React hiển thị trang `NotFound` khi mở project site `/dau-vet-tri-thuc-cong-nghe-12/`. Nguyên nhân là `App.tsx` dùng Wouter mà chưa truyền `base={import.meta.env.BASE_URL}`; vì vậy URL có tiền tố tên repository không khớp route `/`. Đã sửa bằng `WouterRouter` với `base={import.meta.env.BASE_URL}`, chạy lại check/test/build, đẩy commit và deploy thành công. Sau sửa, trình duyệt hiển thị đầy đủ trang chủ, 8 nhóm, rubric, biểu mẫu và khu vực Kiểm chứng AI.

## Kiểm thử fragment sau commit fallback

URL gốc có query cache-bust hiển thị đúng Home, nhưng URL trực tiếp có `#kiem-chung` vẫn hiển thị NotFound. Điều này cho thấy cơ chế Switch của Wouter vẫn coi fragment là một đường dẫn không khớp trong môi trường GitHub Pages. Cách sửa chắc chắn cho ứng dụng one-page là giữ `WouterRouter` chỉ làm lớp base và render `Home` không điều kiện; các anchor hash trong Home sẽ được trình duyệt xử lí nội bộ.

## Kiểm thử sau render Home không điều kiện

Sau deploy run 32019724677 thành công, URL gốc có query vẫn hiển thị Home nhưng browser mở trực tiếp `/#kiem-chung` vẫn nhận nội dung NotFound. Vì code mới render `Home` không điều kiện trong WouterRouter, cần điều tra khả năng browser/proxy đang giữ bundle cũ hoặc GitHub Pages có phân biệt URL fragment ở lớp khác. Không kết luận sửa lỗi hoàn tất cho đến khi kiểm tra bundle đang phục vụ và trạng thái cache/CDN.
