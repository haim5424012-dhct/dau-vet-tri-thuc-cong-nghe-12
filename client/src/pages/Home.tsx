// Style reminder: This page is a biophilic editorial field journal. Keep asymmetry, paper texture, green/blue hierarchy, field-note labels, and visible submission status.
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowDown, ArrowRight, BarChart3, Check, ClipboardList, Download, ExternalLink, FileText, Leaf, Link2, Loader2, Menu, RefreshCw, Send, Sprout, Trash2, Waves, X } from "lucide-react";
import * as XLSX from "xlsx";

const ASSET_BASE = `${import.meta.env.BASE_URL}assets`;
const COFFEE_MARK = `${ASSET_BASE}/coffee-tree-mark.png`;
const TEACHER_PROFILE = {
  name: "Võ Văn Bé Hai",
  role: "Giáo viên Công nghệ 12 · Tổ chuyên môn",
  school: "Trường Trung học phổ thông Đốc Binh Kiều – Cai Lậy",
  motto: "Học bằng tò mò. Quyết định bằng bằng chứng.",
};

const FORM_CONFIG = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfr6aguXg_kGhF_IM0s-mTWCrN0u0lK2eyPIVt7pfKhBnuAxw/formResponse",
  entries: {
    student: "entry.299711186",
    className: "entry.417395979",
    classCode: "entry.1285290589",
    groupCode: "entry.902018661",
    group: "entry.1098548488",
    reportTitle: "entry.287486772",
    reportLink: "entry.1136418837",
    score: "entry.2068320805",
    rubric: "entry.764422736",
  },
};

const groups = [
  { id: "N1", chapter: "Cụm 1 · Lâm nghiệp", title: "Vai trò và nhiệm vụ trồng rừng", lessons: "Bài 3", codes: ["12.C2"], kind: "forest", outcome: "Trình bày vai trò, nhiệm vụ của trồng và chăm sóc rừng; đề xuất một cách dùng dữ liệu bản đồ hoặc ảnh hiện trường để lập kế hoạch theo dõi, nhưng không coi AI là yêu cầu bắt buộc của bài học.", reports: [{ code: "N1-B1", title: "Kế hoạch theo dõi một lô trồng", scope: "Bài 3", deliverable: "Mục tiêu, chỉ số và lịch chăm sóc." }, { code: "N1-B2", title: "Phương thức nuôi thủy sản phù hợp địa phương", scope: "Bài 8–9", deliverable: "Bảng so sánh loài nuôi, phương thức, điều kiện và rủi ro." }] },
  { id: "N2", chapter: "Cụm 1 · Lâm nghiệp", title: "Sinh trưởng và phát triển cây rừng", lessons: "Bài 4", codes: ["12.C2"], kind: "forest", outcome: "Giải thích quy luật sinh trưởng, phát triển của cây rừng; có thể minh họa cách ảnh drone hoặc bảng số liệu hỗ trợ ước lượng chiều cao, đường kính và nhóm sinh trưởng, kèm giới hạn đo đạc.", reports: [{ code: "N2-B1", title: "Theo dõi sinh trưởng cây rừng", scope: "Bài 4", deliverable: "Bảng hoặc biểu đồ theo dõi theo thời điểm." }, { code: "N2-B2", title: "Quản lí môi trường nuôi thủy sản", scope: "Bài 10–12", deliverable: "Phiếu theo dõi chỉ tiêu nước hoặc sơ đồ xử lí có nguồn." }] },
  { id: "N3", chapter: "Cụm 1 · Lâm nghiệp", title: "Kĩ thuật trồng và chăm sóc rừng", lessons: "Bài 5", codes: ["12.C2"], kind: "forest", outcome: "Mô tả thời vụ, kĩ thuật trồng và chăm sóc rừng; xây dựng bảng theo dõi tỉ lệ cây sống để đề xuất trồng dặm, chỉ dùng công cụ phân tích ảnh như một phương án hỗ trợ có kiểm chứng.", reports: [{ code: "N3-B1", title: "Quy trình trồng và chăm sóc rừng", scope: "Bài 5", deliverable: "Sơ đồ quy trình và tiêu chí đề xuất trồng dặm." }, { code: "N3-B2", title: "Công nghệ giống thủy sản", scope: "Bài 13–15", deliverable: "Sơ đồ vai trò giống, sinh sản và chọn/nhân giống." }] },
  { id: "N4", chapter: "Cụm 1 · Lâm nghiệp", title: "Bảo vệ và khai thác rừng bền vững", lessons: "Bài 6–7", codes: ["12.C2", "12.A1"], kind: "forest", outcome: "Phân tích thực trạng, biện pháp bảo vệ và khai thác rừng; phân biệt cảnh báo từ ảnh vệ tinh/camera với kiểm tra thực địa và quyết định cuối cùng của cơ quan chuyên môn.", reports: [{ code: "N4-B1", title: "Nguy cơ và biện pháp bảo vệ rừng", scope: "Bài 6–7", deliverable: "Phân tích một nguy cơ và phương án xử lí có kiểm soát." }, { code: "N4-B2", title: "Công nghệ thức ăn thủy sản", scope: "Bài 16–18", deliverable: "Bảng thành phần, bảo quản/chế biến và giảm lãng phí." }] },
  { id: "N5", chapter: "Cụm 2 · Thủy sản", title: "Vai trò, phương thức và môi trường nuôi", lessons: "Bài 8–12", codes: ["12.C2", "12.A1"], kind: "water", outcome: "Trình bày vai trò, nhóm thủy sản, phương thức nuôi và các yếu tố môi trường; phân biệt cảm biến chỉ đo với phần mềm phân tích pH, oxygen, nhiệt độ hoặc độ mặn, đồng thời nêu bước xác minh và xử lí của người nuôi.", reports: [{ code: "N5-B1", title: "Hồ sơ một mô hình nuôi", scope: "Bài 8–12", deliverable: "Loài, phương thức, chỉ tiêu môi trường và biện pháp xử lí." }, { code: "N5-B2", title: "Công nghệ nuôi thủy sản", scope: "Bài 19–22", deliverable: "Sơ đồ quy trình nuôi hoặc mô hình RAS/Biofloc/VietGAP." }] },
  { id: "N6", chapter: "Cụm 2 · Thủy sản", title: "Công nghệ giống thủy sản", lessons: "Bài 13–15", codes: ["12.C2"], kind: "water", outcome: "Trình bày vai trò giống, sinh sản cá tôm và ứng dụng công nghệ sinh học trong chọn, nhân giống; nếu liên hệ AI, chỉ dùng như mở rộng về phân tích kích thước/hình dạng, không thay thế kiến thức sinh học và quy trình chuyên môn.", reports: [{ code: "N6-B1", title: "Quy trình chọn và nhân giống", scope: "Bài 13–15", deliverable: "Sơ đồ quy trình và tiêu chí chất lượng giống." }, { code: "N6-B2", title: "Phòng, trị bệnh thủy sản", scope: "Bài 23–25", deliverable: "Bảng dấu hiệu, nguyên nhân và biện pháp phòng trị." }] },
  { id: "N7", chapter: "Cụm 2 · Thủy sản", title: "Công nghệ thức ăn thủy sản", lessons: "Bài 16–18", codes: ["12.C2"], kind: "water", outcome: "Phân tích thành phần, bảo quản, chế biến và ứng dụng công nghệ sinh học trong thức ăn; có thể minh họa camera/phần mềm hỗ trợ theo dõi hành vi bắt mồi, nhưng phải nêu dữ liệu, sai số và người nuôi kiểm tra trước khi điều chỉnh.", reports: [{ code: "N7-B1", title: "Khẩu phần và bảo quản thức ăn", scope: "Bài 16–18", deliverable: "Phân tích khẩu phần, bảo quản/chế biến và tác động môi trường." }, { code: "N7-B2", title: "Bảo vệ nguồn lợi thủy sản", scope: "Bài 26–27", deliverable: "Bản đồ hoặc infographic về bảo vệ và khai thác đúng quy định." }] },
  { id: "N8", chapter: "Cụm 2 · Thủy sản", title: "Nuôi, bệnh và nguồn lợi thủy sản", lessons: "Bài 19–27", codes: ["12.C2", "12.A3"], kind: "water", outcome: "Tổng hợp quy trình nuôi, VietGAP, công nghệ cao, bảo quản, phòng trị bệnh và bảo vệ nguồn lợi; phân tích một ứng dụng dữ liệu/AI có thể cảnh báo, đồng thời nhấn mạnh truy xuất trung thực, kiểm tra chuyên môn và không tự chẩn đoán hay quyết định khai thác.", reports: [{ code: "N8-B1", title: "Hồ sơ chuỗi nuôi thủy sản", scope: "Bài 19–27", deliverable: "Quy trình, VietGAP, bệnh và nguồn lợi trong một hồ sơ." }, { code: "N8-B2", title: "Chuỗi thủy sản bền vững", scope: "Bài 8–27", deliverable: "Báo cáo tích hợp giống–thức ăn–môi trường–nuôi–bệnh–nguồn lợi." }] },
];

const aiEvidence = [
  { title: "Thiết bị đo không tự động là AI", text: "Cảm biến pH, nhiệt độ hoặc oxygen tạo ra số đo. AI chỉ xuất hiện khi dữ liệu được mô hình phân tích để nhận diện mẫu, dự báo hoặc cảnh báo; nhóm phải mô tả rõ đầu vào, đầu ra và giới hạn.", tag: "Phân biệt khái niệm" },
  { title: "AI hỗ trợ, con người xác minh", text: "Ảnh vệ tinh, camera hay phần mềm có thể phát hiện dấu hiệu bất thường, nhưng cảnh báo có thể sai hoặc thiếu dữ liệu. Kiểm tra thực địa, chuyên môn và quyết định xử lí vẫn thuộc về con người.", tag: "12.A1" },
  { title: "Dữ liệu phải có nguồn và quyền sử dụng", text: "Ghi tác giả, tổ chức, năm và đường dẫn của ảnh, số liệu hoặc công cụ AI. Không tải ảnh học sinh, vị trí nhạy cảm hay dữ liệu cá nhân lên công cụ công khai nếu chưa được phép.", tag: "Đạo đức & riêng tư" },
  { title: "Không ép mọi nhóm phải có cùng một sản phẩm AI", text: "Các nhóm N1–N8 có thể chọn minh chứng khác nhau: bảng số liệu, ảnh hiện trường, sơ đồ quy trình, nhật kí nuôi hoặc phân tích cảnh báo. Nội dung AI chỉ là phần liên hệ khi phù hợp; mọi nhóm vẫn phải đạt yêu cầu cần đạt của bài học trước.", tag: "Phân hóa nhiệm vụ" },
];

const criteria = [
  { id: "knowledge", label: "Nội dung kiến thức", weight: 30, levels: ["Chưa đạt: thiếu ý chính hoặc sai nhiều", "Đạt: nêu được ý cơ bản", "Khá: giải thích đúng, có liên hệ", "Tốt: đầy đủ, chính xác, có lập luận"] },
  { id: "evidence", label: "Minh chứng thực hành", weight: 20, levels: ["Chưa có minh chứng", "Có minh chứng còn ít", "Có số liệu/hình ảnh phù hợp", "Minh chứng rõ, có nguồn và phân tích"] },
  { id: "presentation", label: "Kỹ năng trình bày", weight: 20, levels: ["Khó theo dõi", "Trình bày được ý chính", "Rõ ràng, tương tác tốt", "Tự tin, mạch lạc, thu hút"] },
  { id: "slides", label: "Slide / hình thức trực quan", weight: 15, levels: ["Thiếu cấu trúc", "Đủ dùng nhưng còn rối", "Bố cục dễ đọc", "Trực quan, nhất quán, có chọn lọc"] },
  { id: "teamwork", label: "Trả lời & phối hợp nhóm", weight: 15, levels: ["Chưa phối hợp", "Trả lời được một phần", "Phối hợp khá tốt", "Trả lời thuyết phục, vai trò rõ"] },
];

type RubricState = Record<string, number>;
const defaultRubric: RubricState = Object.fromEntries(criteria.map((item) => [item.id, 0]));

const emptyForm = { student: "", className: "", classCode: "", groupCode: "", reportCode: "N1-B1", reportTitle: "", reportLink: "" };
type FormState = typeof emptyForm;
type SubmissionRecord = FormState & { group: string; groupTitle: string; score: number; submittedAt: string };
const normalizeForm = (value: Partial<FormState> | null | undefined): FormState => ({
  student: typeof value?.student === "string" ? value.student.slice(0, 120) : "",
  className: typeof value?.className === "string" ? value.className.slice(0, 40) : "",
  classCode: typeof value?.classCode === "string" ? value.classCode.slice(0, 24) : "",
  groupCode: typeof value?.groupCode === "string" ? value.groupCode.slice(0, 24) : "",
  reportCode: typeof value?.reportCode === "string" ? value.reportCode.slice(0, 12) : "N1-B1",
  reportTitle: typeof value?.reportTitle === "string" ? value.reportTitle.slice(0, 180) : "",
  reportLink: typeof value?.reportLink === "string" ? value.reportLink.slice(0, 500) : "",
});

const validGroupIds = new Set(groups.map((group) => group.id));
const validReportCodes = new Set(groups.flatMap((group) => group.reports.map((report) => report.code)));
const normalizeRubric = (value: unknown): RubricState => Object.fromEntries(criteria.map((item) => {
  const candidate = value && typeof value === "object" ? (value as Record<string, unknown>)[item.id] : 0;
  const numeric = typeof candidate === "number" && Number.isInteger(candidate) ? candidate : 0;
  return [item.id, Math.min(3, Math.max(0, numeric))];
}));
const isSafeReportLink = (value: string) => {
  try { const url = new URL(value); return url.protocol === "https:" && (url.hostname === "docs.google.com" || url.hostname.endsWith("googleusercontent.com") || url.hostname === "drive.google.com"); } catch { return false; }
};
const normalizeSubmission = (value: unknown): SubmissionRecord | null => {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<SubmissionRecord>;
  const normalized = normalizeForm(item);
  if (!validGroupIds.has(item.group ?? "") || !validReportCodes.has(normalized.reportCode) || !normalized.student || !normalized.classCode || !normalized.groupCode || !normalized.reportTitle || !isSafeReportLink(normalized.reportLink)) return null;
  const score = typeof item.score === "number" && Number.isFinite(item.score) ? Math.min(100, Math.max(0, Math.round(item.score))) : 0;
  const submittedAt = typeof item.submittedAt === "string" && !Number.isNaN(Date.parse(item.submittedAt)) ? item.submittedAt : new Date(0).toISOString();
  return { ...normalized, group: item.group ?? "", groupTitle: typeof item.groupTitle === "string" ? item.groupTitle.slice(0, 180) : "", score, submittedAt };
};
const spreadsheetSafe = (value: unknown) => { const text = String(value ?? ""); return /^[=+\-@]/.test(text) ? `'${text}` : text; };

export default function Home() {
  const [activeGroup, setActiveGroup] = useState("N1");
  const [rubric, setRubric] = useState<RubricState>(defaultRubric);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [statsClass, setStatsClass] = useState("all");
  const [statsGroup, setStatsGroup] = useState("all");
  const [statsReport, setStatsReport] = useState("all");
  const selected = groups.find((group) => group.id === activeGroup) ?? groups[0];

  useEffect(() => {
    const saved = localStorage.getItem("cn12-fieldnote-draft");
    if (saved) {
      try { const parsed = JSON.parse(saved); setForm(normalizeForm(parsed.form)); setRubric(normalizeRubric(parsed.rubric)); } catch { /* ignore malformed local draft */ }
    }
  }, []);

  useEffect(() => { localStorage.setItem("cn12-fieldnote-draft", JSON.stringify({ form, rubric })); }, [form, rubric]);

  useEffect(() => {
    const firstReport = selected.reports[0]?.code ?? `${activeGroup}-B1`;
    setForm((current) => current.reportCode.startsWith(`${activeGroup}-`) ? current : { ...current, reportCode: firstReport });
  }, [activeGroup, selected.reports]);

  useEffect(() => {
    const saved = localStorage.getItem("cn12-submissions");
    if (saved) { try { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) setSubmissions(parsed.map(normalizeSubmission).filter((item): item is SubmissionRecord => Boolean(item)).slice(0, 200)); } catch { /* ignore malformed history */ } }
  }, []);

  useEffect(() => { localStorage.setItem("cn12-submissions", JSON.stringify(submissions)); }, [submissions]);

  const score = useMemo(() => criteria.reduce((total, item) => total + ((rubric[item.id] ?? 0) / 3) * item.weight, 0), [rubric]);
  const answered = Object.values(rubric).filter((value) => value > 0).length;

  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const clearDraft = () => {
    if (!window.confirm("Xóa toàn bộ bản nháp và lựa chọn rubric hiện tại? Dữ liệu đã gửi trong Google Sheet không bị xóa.")) return;
    localStorage.removeItem("cn12-fieldnote-draft");
    setForm(emptyForm); setRubric(defaultRubric); setSubmitted(false);
    toast.success("Đã xóa bản nháp cục bộ.");
  };

  const exportDraft = () => {
    const payload = { ...form, group: selected.id, groupTitle: selected.title, score: Math.round(score), rubric, savedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `tu-cham-${selected.id.toLowerCase()}.json`; anchor.click(); URL.revokeObjectURL(url);
    toast.success("Đã tải bản tóm tắt dự phòng về máy.");
  };

  const submit = async () => {
    if (isSubmitting) return;
    const reportMatchesGroup = selected.reports.some((report) => report.code === form.reportCode);
    if (!form.student || !form.className || !form.classCode || !form.groupCode || !form.reportCode || !form.reportTitle || !form.reportLink || answered < criteria.length) {
      toast.error("Vui lòng hoàn thiện họ tên, lớp, mã lớp, mã nhóm, mã báo cáo, đường dẫn và đủ 5 tiêu chí."); return;
    }
    if (!reportMatchesGroup || !isSafeReportLink(form.reportLink)) {
      toast.error("Mã báo cáo không khớp nhóm hoặc link chưa phải địa chỉ Google Drive/Slides HTTPS hợp lệ."); return;
    }
    setIsSubmitting(true);
    const body = new URLSearchParams({
      [FORM_CONFIG.entries.student]: form.student, [FORM_CONFIG.entries.className]: form.className,
      [FORM_CONFIG.entries.classCode]: form.classCode, [FORM_CONFIG.entries.groupCode]: form.groupCode,
      [FORM_CONFIG.entries.group]: `${selected.id} — ${selected.title}`, [FORM_CONFIG.entries.reportTitle]: `[${form.reportCode}] ${form.reportTitle}`,
      [FORM_CONFIG.entries.reportLink]: form.reportLink, [FORM_CONFIG.entries.score]: `${Math.round(score)}/100`,
      [FORM_CONFIG.entries.rubric]: criteria.map((item) => `${item.label}: ${rubric[item.id] + 1}/4`).join(" | "),
    });
    if (!FORM_CONFIG.actionUrl) { exportDraft(); toast.info("Google Form chưa được cấu hình. Bản tóm tắt đã được lưu để không mất dữ liệu."); setIsSubmitting(false); return; }
    try {
      await fetch(FORM_CONFIG.actionUrl, { method: "POST", mode: "no-cors", body });
      const record: SubmissionRecord = { ...form, reportTitle: `[${form.reportCode}] ${form.reportTitle}`, group: selected.id, groupTitle: selected.title, score: Math.round(score), submittedAt: new Date().toISOString() };
      setSubmissions((current) => [record, ...current].slice(0, 200));
      setSubmitted(true); toast.success("Đã gửi kết quả thành công. Giáo viên sẽ xem bản ghi trong Google Sheet.");
      window.setTimeout(() => { localStorage.removeItem("cn12-fieldnote-draft"); setForm(emptyForm); setRubric(defaultRubric); setSubmitted(false); }, 1800);
    }
    catch { toast.error("Chưa gửi được kết quả. Hãy kiểm tra kết nối và thử lại."); }
    finally { setIsSubmitting(false); }
  };

  const classOptions = Array.from(new Set(submissions.map((item) => item.classCode).filter(Boolean)));
  const groupOptions = Array.from(new Set(submissions.map((item) => item.groupCode).filter(Boolean)));
  const reportPlans = groups.flatMap((group) => group.reports.map((report) => ({ ...report, groupId: group.id, groupTitle: group.title })));
  const reportOptions = reportPlans.map((report) => report.code);
  const getReportCode = (item: SubmissionRecord) => item.reportCode || item.reportTitle.match(/\[([^\]]+)\]/)?.[1] || "Chưa xác định";
  const filteredSubmissions = submissions.filter((item) => (statsClass === "all" || item.classCode === statsClass) && (statsGroup === "all" || item.groupCode === statsGroup) && (statsReport === "all" || getReportCode(item) === statsReport));
  const progressRows = reportPlans.map((plan) => {
    const records = submissions.filter((item) => (statsClass === "all" || item.classCode === statsClass) && (statsGroup === "all" || item.groupCode === statsGroup) && getReportCode(item) === plan.code);
    const latest = records[0];
    return { ...plan, status: latest ? "Đã nộp" : "Chưa nộp", latestAt: latest?.submittedAt, count: records.length };
  });
  const averageScore = filteredSubmissions.length ? Math.round(filteredSubmissions.reduce((sum, item) => sum + item.score, 0) / filteredSubmissions.length) : 0;
  const highestScore = filteredSubmissions.length ? Math.max(...filteredSubmissions.map((item) => item.score)) : 0;
  const exportRows = filteredSubmissions.map((item) => ({
    "Mã lớp": item.classCode, "Mã nhóm": item.groupCode, "Họ và tên": item.student, "Lớp": item.className,
    "Nhóm chủ đề": `${item.group} — ${item.groupTitle}`, "Mã báo cáo": item.reportCode, "Tên báo cáo": item.reportTitle, "Link báo cáo": item.reportLink,
    "Điểm tự chấm": item.score, "Thời gian nộp": new Date(item.submittedAt).toLocaleString("vi-VN"),
  }));
  const ensureExportable = () => { if (!exportRows.length) { toast.info("Chưa có bản ghi phù hợp để xuất."); return false; } return true; };
  const downloadCsv = () => {
    if (!ensureExportable()) return;
    const headers = Object.keys(exportRows[0]);
    const csv = [headers, ...exportRows.map((row) => headers.map((header) => spreadsheetSafe(row[header as keyof typeof row])))]
      .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\\n");
    const blob = new Blob(["\\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `bang-diem-${new Date().toISOString().slice(0, 10)}.csv`; anchor.click(); URL.revokeObjectURL(url);
    toast.success(`Đã xuất ${exportRows.length} bản ghi CSV.`);
  };
  const downloadExcel = () => {
    if (!ensureExportable()) return;
    const worksheet = XLSX.utils.json_to_sheet(exportRows.map((row) => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, spreadsheetSafe(value)]))));
    worksheet["!cols"] = [{ wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 10 }, { wch: 38 }, { wch: 14 }, { wch: 42 }, { wch: 58 }, { wch: 16 }, { wch: 22 }];
    const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, worksheet, "Bang diem");
    XLSX.writeFile(workbook, `bang-diem-${new Date().toISOString().slice(0, 10)}.xlsx`);
    toast.success(`Đã xuất ${exportRows.length} bản ghi Excel.`);
  };

  return <div className="min-h-screen bg-[#f5f1e8] text-[#17352d]">
    <header className="sticky top-0 z-30 border-b border-[#d9d3c6] bg-[#f5f1e8]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3"><img src={`${ASSET_BASE}/fieldnote-logo.png`} className="h-11 w-11 rounded-full" alt="Biểu tượng hạt giống dữ liệu" /><span><span className="block font-serif text-lg font-semibold tracking-tight">DẤU VẾT TRI THỨC / CÔNG NGHỆ 12</span><span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6c8578]">Báo cáo số · Tự đánh giá</span></span></a>
        <nav className={`${mobileNav ? "flex" : "hidden"} absolute left-0 top-[74px] w-full flex-col gap-4 border-b border-[#d9d3c6] bg-[#f5f1e8] px-5 py-5 text-sm font-semibold lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}><a href="#quy-trinh">Quy trình</a><a href="#chu-de">8 nhóm chủ đề</a><a href="#rubric">Tự chấm</a><a href="#thong-ke">Thống kê</a><a href="#huong-dan" className="text-[#1f6b57]">Hướng dẫn giáo viên</a><a href="#bao-mat">Bảo vệ dữ liệu</a><a href="#kiem-chung">Kiểm chứng AI</a></nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Mở menu"><Menu size={20} /></Button>
      </div>
      <div className="border-t border-[#e3ded2] bg-[#f0ece2]/75 px-5 py-3 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#a9c4b5] bg-[#e4efe8] p-1.5 shadow-sm"><img src={COFFEE_MARK} alt="Biểu tượng cây cà phê có quả chín" className="h-full w-full object-contain" /></div>
            <div className="min-w-0"><p className="truncate text-sm font-semibold text-[#315d4d]">{TEACHER_PROFILE.name} <span className="font-normal text-[#87938a]">· {TEACHER_PROFILE.role}</span></p><p className="truncate text-xs text-[#748279]">{TEACHER_PROFILE.school}</p></div>
          </div>
          <div className="hidden text-right md:block"><p className="font-serif text-base text-[#315d4d]">{TEACHER_PROFILE.motto}</p><p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[#87938a]">Nội dung học tập phục vụ dạy học</p></div>
        </div>
      </div>
    </header>

    <main id="top"><aside className="journal-rail" aria-label="Mục lục sổ tay"><span className="journal-rail-mark">INDEX / 01</span><a href="#quy-trinh">Quy trình</a><a href="#chu-de">YCCĐ · NLS</a><a href="#rubric">Rubric</a><a href="#gui-bai">Nộp bài</a><a href="#kiem-chung">Kiểm chứng AI</a><span className="journal-rail-line" /></aside>
      <section className="relative overflow-hidden border-b border-[#d9d3c6]">
        <div className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pb-16 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a9c4b5] bg-[#e4efe8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.17em] text-[#1f6b57]"><Sprout size={14} /> Nhật ký học tập số</div><h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#17352d] md:text-7xl">Biến báo cáo thành <em className="text-[#1f6b57]">dấu vết tri thức.</em></h1><p className="mt-7 max-w-md text-lg leading-8 text-[#53675f]">Một không gian nộp báo cáo, khám phá công nghệ và tự phản tư dành cho 8 nhóm chủ đề Lâm nghiệp – Thủy sản.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#rubric"><Button className="h-12 rounded-full bg-[#1f6b57] px-6 text-white hover:bg-[#174e40]">Bắt đầu tự chấm <ArrowRight className="ml-2" size={17} /></Button></a><a href="#quy-trinh"><Button variant="outline" className="h-12 rounded-full border-[#a9b8ad] bg-transparent px-6">Xem quy trình</Button></a></div></div>
          <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] border border-[#c8d8cc] bg-[#dcebe1] shadow-[0_18px_50px_rgba(31,107,87,0.12)]"><img src={`${ASSET_BASE}/fieldnote-hero.jpg`} alt="Minh họa hệ sinh thái rừng và thủy sản" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80" /><div className="absolute bottom-5 left-5 max-w-xs rounded-2xl border border-white/50 bg-[#f5f1e8]/90 p-4 backdrop-blur-sm"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1f6b57]"><Leaf size={14} /> Field note 01</div><p className="mt-2 font-serif text-xl leading-tight">“AI cảnh báo — con người kiểm tra và quyết định.”</p></div></div>
        </div>
      </section>

      <section id="quy-trinh" className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="eyebrow">Đường đi của dữ liệu</p><h2 className="section-title">Một lần nộp, cả lớp cùng nhìn thấy.</h2></div><p className="hidden max-w-xs text-sm leading-6 text-[#6d7c74] lg:block">Website chỉ là lớp giao diện. Google Form nhận dữ liệu ngầm, Google Sheet là nơi giáo viên duyệt tập trung.</p></div><div className="pencil-path" aria-hidden="true"><span /></div><div className="grid gap-3 md:grid-cols-4">
        {[{n:"01", icon:<FileText size={22}/>, title:"Trang web tĩnh", text:"Học sinh nhập thông tin, link báo cáo và tự chấm."},{n:"02", icon:<Send size={22}/>, title:"Google Form ẩn", text:"Nhận dữ liệu bằng fetch no-cors, không cần token."},{n:"03", icon:<ClipboardList size={22}/>, title:"Google Sheet", text:"Lưu bản ghi tập trung theo thời gian gửi."},{n:"04", icon:<Check size={22}/>, title:"Giáo viên", text:"Xem, đối chiếu và duyệt điểm chính thức."}].map((step, index) => <div key={step.n} className="relative rounded-2xl border border-[#d7d1c3] bg-[#fbf9f3] p-6 transition-transform duration-200 hover:-translate-y-1"><span className="ledger-tag">field note / data path</span><div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs text-[#8d9b92]">{step.n}</span><span className="text-[#1f6b57]">{step.icon}</span></div><h3 className="font-serif text-2xl">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#697970]">{step.text}</p>{index < 3 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden rounded-full bg-[#f5f1e8] p-1 text-[#a1aaa3] md:block" size={28} />}</div>)}</div></section>

      <section id="chu-de" className="border-y border-[#d9d3c6] bg-[#e8efe9] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="max-w-2xl"><p className="eyebrow">Bản đồ nội dung</p><h2 className="section-title">Chọn đúng nhóm, mở đúng yêu cầu.</h2><p className="mt-4 text-[#5b7067]">Mỗi thẻ dưới đây được ánh xạ từ PL1/PL3, gồm cụm nội dung, bài học, mã Khung 3439 và yêu cầu cần đưa vào báo cáo. Bài 1–2 “Giới thiệu chung về lâm nghiệp” không còn là nhóm lựa chọn trong phiên bản này.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{groups.map((group) => <button key={group.id} onClick={() => setActiveGroup(group.id)} className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${activeGroup === group.id ? "border-[#1f6b57] bg-[#1f6b57] text-white shadow-lg shadow-[#1f6b57]/15" : "border-[#c9d8cd] bg-[#f4f6ef] hover:border-[#8db39f]"}`}><span><span className={`block text-xs font-bold uppercase tracking-[0.14em] ${activeGroup === group.id ? "text-[#c8e4d0]" : "text-[#80948a]"}`}>{group.id} · {group.chapter}</span><span className="mt-1 block font-serif text-lg">{group.title}</span></span><ArrowRight size={18} /></button>)}</div><Card className="overflow-hidden border-[#cbd9ce] bg-[#fbf9f3] shadow-none"><div className="grid md:grid-cols-[0.75fr_1.25fr]"><div className="relative min-h-[260px] overflow-hidden bg-[#d6e6db]"><img src={selected.kind === "forest" ? `${ASSET_BASE}/fieldnote-forest.jpg` : `${ASSET_BASE}/fieldnote-aquaculture.jpg`} alt="Minh họa chủ đề" className="h-full w-full object-cover mix-blend-multiply opacity-85" /><div className="absolute left-5 top-5 flex gap-2">{selected.codes.map((code) => <Badge key={code} className="border border-white/40 bg-[#f5f1e8]/90 text-[#1f6b57]">{code}</Badge>)}</div></div><CardContent className="p-7 lg:p-10"><div className="flex items-center justify-between"><span className="eyebrow">{selected.lessons}</span><span className="rounded-full bg-[#e4efe8] px-3 py-1 text-xs font-bold text-[#1f6b57]">{selected.id}</span></div><h3 className="mt-4 font-serif text-3xl leading-tight">{selected.title}</h3><div className="mt-7 border-l-2 border-[#a9c4b5] pl-4"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#71857a]">Điểm cần có trong báo cáo</p><p className="mt-2 leading-7 text-[#4c6258]">{selected.outcome}</p></div><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="sm:col-span-2"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#71857a]">Hai báo cáo trong học kỳ</p><p className="mt-1 text-xs text-[#74857b]">Chọn đúng mã khi nộp để giáo viên theo dõi tiến độ từng nhóm.</p></div>{selected.reports.map((report) => <article key={report.code} className="rounded-xl border border-[#d8e3da] bg-[#f1f5ef] p-4"><div className="flex items-start justify-between gap-2"><span className="font-mono text-xs font-bold text-[#1f6b57]">{report.code}</span><span className="text-xs text-[#83938a]">{report.scope}</span></div><h4 className="mt-2 font-semibold text-[#315d4d]">{report.title}</h4><p className="mt-1 text-xs leading-5 text-[#63766c]">{report.deliverable}</p></article>)}</div><a href="#rubric" className="mt-8 inline-flex items-center text-sm font-bold text-[#1f6b57]">Đến phần tự chấm <ArrowDown size={16} className="ml-2" /></a></CardContent></div></Card></div></div></section>

      <section id="kiem-chung" className="border-y border-[#d9d3c6] bg-[#fbf9f3] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="max-w-2xl"><p className="eyebrow">Bộ lọc khoa học · trước khi làm slide</p><h2 className="section-title">Đừng để AI biến thành một lời khẳng định.</h2><p className="mt-4 leading-7 text-[#5b7067]">Mỗi nhóm cần chứng minh mình hiểu nội dung Công nghệ 12 trước, sau đó mới liên hệ AI. Hãy dùng bốn thẻ dưới đây như một bảng kiểm: nguồn dữ liệu là gì, hệ thống làm gì, sai số ở đâu và con người chịu trách nhiệm nào.</p></div><div className="mt-9 grid gap-4 md:grid-cols-2">{aiEvidence.map((item) => <article key={item.title} className="rounded-2xl border border-[#ded8ca] bg-[#f5f1e8] p-6"><span className="ledger-tag">{item.tag}</span><h3 className="mt-5 font-serif text-2xl leading-tight">{item.title}</h3><p className="mt-3 leading-7 text-[#5d7067]">{item.text}</p></article>)}</div><div className="mt-6 rounded-2xl border border-[#a9c4b5] bg-[#e4efe8] p-5 text-sm leading-6 text-[#315d4d]"><strong>Quy tắc nộp bài:</strong> nếu dùng ảnh, số liệu hoặc công cụ AI, ghi nguồn và quyền sử dụng; nếu chưa có dữ liệu thực tế, ghi rõ đó là ví dụ minh họa, không trình bày như kết quả thí nghiệm của nhóm.</div></div></section>

      <section id="rubric" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24"><div><p className="eyebrow">Rubric phản tư · 100 điểm</p><h2 className="section-title">Tự nhìn lại trước khi gửi.</h2><p className="mt-4 max-w-xl leading-7 text-[#62736b]"><span className="field-caption">YCCĐ · NLS · KHUNG 3439</span>Chọn một mức mô tả cho mỗi tiêu chí. Điểm hiển thị là tham khảo để nhóm tự điều chỉnh; giáo viên vẫn là người duyệt điểm chính thức.</p><div className="mt-8 space-y-4">{criteria.map((item) => <div key={item.id} className="rounded-2xl border border-[#ded8ca] bg-[#fbf9f3] p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{item.label}</h3><p className="mt-1 text-xs text-[#87938c]">Trọng số {item.weight}%</p></div><span className="font-mono text-sm font-bold text-[#1f6b57]">{Math.round(((rubric[item.id] ?? 0) / 3) * item.weight)} / {item.weight}</span></div><div className="mt-4 grid gap-2 sm:grid-cols-4 rubric-ledger">{item.levels.map((level, index) => <button key={level} onClick={() => setRubric((current) => ({ ...current, [item.id]: index }))} className={`min-h-[66px] rounded-xl border px-3 py-2 text-left text-xs leading-5 transition-all duration-150 ${rubric[item.id] === index ? "border-[#1f6b57] bg-[#e2efe6] text-[#1f6b57] ring-2 ring-[#1f6b57]/15" : "border-[#e0dbcf] bg-[#f6f3eb] text-[#718078] hover:border-[#a9c4b5]"}`}><span className="mb-1 block font-mono font-bold">{index + 1}/4 {rubric[item.id] === index && <Check className="inline" size={13} />}</span>{level.split(": ")[1]}</button>)}</div></div>)}</div></div>
        <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-[2rem] bg-[#1f6b57] p-7 text-[#f5f1e8] shadow-xl shadow-[#1f6b57]/20 lg:p-9"><span className="ledger-tag ledger-tag-light">evidence ledger / 3439</span><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9d9c2]">Điểm phản tư</p><div className="mt-3 flex items-end gap-2"><span className="font-serif text-7xl leading-none">{Math.round(score)}</span><span className="pb-2 font-mono text-sm text-[#b9d9c2]">/ 100</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-[#356f5d]"><div className="h-full rounded-full bg-[#e7bc65] transition-all duration-300" style={{ width: `${score}%` }} /></div><p className="mt-4 text-sm leading-6 text-[#d5e6d8]">Đã chọn {answered}/5 tiêu chí. Hãy hoàn thiện biểu mẫu bên dưới để gửi kết quả.</p><a href="#gui-bai" className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#e7bc65] px-5 py-3 text-sm font-bold text-[#17352d] transition-transform active:scale-[0.97]">Điền thông tin gửi bài <ArrowDown size={16} /></a></div></aside></section>

      <section id="gui-bai" className="border-t border-[#d9d3c6] bg-[#fbf9f3] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Bước cuối</p><h2 className="section-title">Gửi bản ghi vào sổ lớp.</h2><p className="mt-4 leading-7 text-[#64756c]">Hãy dùng link chia sẻ của Google Drive hoặc Google Slides. Trang web không nhận file thật, vì vậy học sinh kiểm soát quyền xem của báo cáo. Trước khi gửi, kiểm tra quyền “bất kỳ ai có liên kết có thể xem” theo hướng dẫn của giáo viên và không đưa dữ liệu cá nhân nhạy cảm vào tài liệu.</p><div className="mt-8 rounded-2xl border border-[#e4c98f] bg-[#fff8e6] p-5 text-sm leading-6 text-[#775d2d]"><strong>Trạng thái đường ống:</strong> {FORM_CONFIG.actionUrl ? "Đã cấu hình Google Form." : "Chưa cấu hình Google Form — nút gửi sẽ tải bản tóm tắt dự phòng."}</div></div><Card className="submit-sheet border-[#ded8ca] bg-[#f5f1e8] shadow-none"><span className="ledger-tag">submission sheet / google form</span><CardHeader><CardTitle className="font-serif text-2xl">Thông tin báo cáo</CardTitle></CardHeader><CardContent className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-semibold">Họ và tên<input value={form.student ?? ""} onChange={(e) => updateForm("student", e.target.value)} placeholder="Nguyễn Văn A" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Lớp<input value={form.className ?? ""} onChange={(e) => updateForm("className", e.target.value)} placeholder="12A1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Mã lớp<input value={form.classCode ?? ""} onChange={(e) => updateForm("classCode", e.target.value.toUpperCase())} placeholder="VD: 12A1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-mono font-normal uppercase outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Mã nhóm<input value={form.groupCode ?? ""} onChange={(e) => updateForm("groupCode", e.target.value.toUpperCase())} placeholder="VD: N1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-mono font-normal uppercase outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label></div><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-semibold">Mã báo cáo học kỳ<select value={form.reportCode ?? ""} onChange={(e) => updateForm("reportCode", e.target.value)} className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15">{selected.reports.map((report) => <option key={report.code} value={report.code}>{report.code} — {report.title}</option>)}</select></label><label className="space-y-2 text-sm font-semibold">Tên báo cáo<input value={form.reportTitle ?? ""} onChange={(e) => updateForm("reportTitle", e.target.value)} placeholder="Viết tên sản phẩm nhóm đã thực hiện" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label></div><label className="space-y-2 text-sm font-semibold">Link Google Drive / Slides<input type="url" value={form.reportLink ?? ""} onChange={(e) => updateForm("reportLink", e.target.value)} placeholder="https://docs.google.com/..." className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#ddd6c8] pt-5"><div className="text-sm text-[#697970]">Nhóm đang chọn: <strong className="text-[#1f6b57]">{selected.id} — {selected.title}</strong></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button type="button" variant="outline" onClick={clearDraft} className="min-h-12 w-full rounded-full border-[#b9c8bc] bg-transparent sm:w-auto"><Trash2 size={16} className="mr-2" />Xóa bản nháp</Button><Button type="button" variant="outline" onClick={exportDraft} className="min-h-12 w-full rounded-full border-[#b9c8bc] bg-transparent sm:w-auto"><ExternalLink size={16} className="mr-2" />Tải dự phòng</Button><Button type="button" onClick={submit} disabled={isSubmitting || submitted} aria-busy={isSubmitting} className={`min-h-12 w-full rounded-full bg-[#1f6b57] text-white shadow-[0_8px_20px_rgba(31,107,87,0.2)] transition-all hover:bg-[#174e40] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${isSubmitting ? "submit-button-loading" : ""}`}>{isSubmitting ? <Loader2 size={16} className="mr-2 animate-spin" /> : submitted ? <Check size={16} className="mr-2" /> : <Send size={16} className="mr-2" />}{isSubmitting ? "Đang gửi…" : submitted ? "Đã gửi thành công" : "Gửi kết quả"}</Button></div></div>{isSubmitting && <div className="submit-status submit-status-loading" role="status" aria-live="polite"><span className="submit-status-icon"><Loader2 size={19} className="animate-spin" /></span><span><strong>Đang gửi bản ghi…</strong><small>Đang chuyển dữ liệu tới Google Form. Vui lòng không đóng trang.</small></span></div>}{submitted && <div className="submit-status submit-status-success" role="status" aria-live="polite"><span className="submit-status-icon"><Check size={19} /></span><span><strong>Đã gửi thành công</strong><small>Bản ghi đã được chuyển tới Google Form. Giáo viên sẽ xem dữ liệu trong Google Sheet.</small></span></div>}</CardContent></Card></div></section>

      <section id="thong-ke" className="border-t border-[#d9d3c6] bg-[#e8efe9] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">Evidence ledger / local view</p><h2 className="section-title">Thống kê theo mã lớp, nhóm và báo cáo.</h2><p className="mt-4 max-w-2xl leading-7 text-[#5b7067]">Bảng này tổng hợp các bản ghi đã gửi từ trình duyệt hiện tại. Google Sheet vẫn là nguồn dữ liệu chính thức để giáo viên đối chiếu toàn lớp; trạng thái “Chưa nộp” chỉ có nghĩa là chưa có bản ghi cục bộ phù hợp bộ lọc.</p></div><BarChart3 className="text-[#1f6b57]" size={38} /></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8] p-5"><span className="ledger-tag">records</span><strong className="mt-3 block font-serif text-4xl">{filteredSubmissions.length}</strong><span className="text-sm text-[#6c7c73]">bản ghi đang lọc</span></div><div className="rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8] p-5"><span className="ledger-tag">average</span><strong className="mt-3 block font-serif text-4xl">{averageScore}<small className="ml-1 font-mono text-base">/100</small></strong><span className="text-sm text-[#6c7c73]">điểm trung bình</span></div><div className="rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8] p-5"><span className="ledger-tag">highest</span><strong className="mt-3 block font-serif text-4xl">{highestScore}<small className="ml-1 font-mono text-base">/100</small></strong><span className="text-sm text-[#6c7c73]">điểm cao nhất</span></div><div className="rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8] p-5"><span className="ledger-tag">source</span><strong className="mt-3 block font-serif text-2xl">Trình duyệt</strong><span className="text-sm text-[#6c7c73]">không thay thế Google Sheet</span></div></div><div className="mt-8 flex flex-wrap gap-3"><select value={statsClass} onChange={(e) => setStatsClass(e.target.value)} className="h-11 rounded-full border border-[#b9c8bc] bg-[#f5f1e8] px-4 text-sm font-semibold text-[#17352d]"><option value="all">Tất cả mã lớp</option>{classOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select><select value={statsGroup} onChange={(e) => setStatsGroup(e.target.value)} className="h-11 rounded-full border border-[#b9c8bc] bg-[#f5f1e8] px-4 text-sm font-semibold text-[#17352d]"><option value="all">Tất cả mã nhóm</option>{groupOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select><select value={statsReport} onChange={(e) => setStatsReport(e.target.value)} className="h-11 rounded-full border border-[#b9c8bc] bg-[#f5f1e8] px-4 text-sm font-semibold text-[#17352d]"><option value="all">Tất cả mã báo cáo</option>{reportOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select><button type="button" onClick={() => { setStatsClass("all"); setStatsGroup("all"); setStatsReport("all"); }} className="inline-flex h-11 items-center gap-2 rounded-full border border-[#b9c8bc] px-4 text-sm font-semibold text-[#1f6b57]"><RefreshCw size={15} />Đặt lại bộ lọc</button><button type="button" onClick={downloadCsv} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1f6b57] px-4 text-sm font-semibold text-white shadow-sm"><Download size={15} />CSV</button><button type="button" onClick={downloadExcel} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#e7bc65] px-4 text-sm font-semibold text-[#17352d] shadow-sm"><Download size={15} />Excel</button></div><div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{progressRows.filter((row) => statsReport === "all" || row.code === statsReport).map((row) => <article key={row.code} className="rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8] p-4"><div className="flex items-center justify-between gap-2"><span className="font-mono text-xs font-bold text-[#1f6b57]">{row.code}</span><span className={`rounded-full px-2 py-1 text-[11px] font-bold ${row.status === "Đã nộp" ? "bg-[#d9eee0] text-[#1f6b57]" : "bg-[#fff1cc] text-[#896a24]"}`}>{row.status}</span></div><h3 className="mt-3 text-sm font-semibold text-[#315d4d]">{row.title}</h3><p className="mt-1 text-xs text-[#74857b]">{row.groupId} · {row.scope}</p><p className="mt-3 text-xs text-[#63766c]">{row.latestAt ? `Nộp gần nhất: ${new Date(row.latestAt).toLocaleString("vi-VN")}` : "Chưa có bản ghi phù hợp"}</p></article>)}</div><div className="mt-5 overflow-x-auto rounded-2xl border border-[#cbd8ce] bg-[#f5f1e8]"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-[#d9d3c6] text-xs uppercase tracking-[0.12em] text-[#728279]"><tr><th className="px-5 py-4">Mã lớp</th><th className="px-5 py-4">Mã nhóm</th><th className="px-5 py-4">Mã báo cáo</th><th className="px-5 py-4">Tên học sinh</th><th className="px-5 py-4">Báo cáo</th><th className="px-5 py-4">Điểm</th><th className="px-5 py-4">Ngày nộp</th><th className="px-5 py-4">Trạng thái</th></tr></thead><tbody>{filteredSubmissions.length ? filteredSubmissions.map((item) => <tr key={`${item.submittedAt}-${item.student}`} className="border-b border-[#e4dfd4] last:border-0"><td className="px-5 py-4 font-mono font-semibold text-[#1f6b57]">{item.classCode}</td><td className="px-5 py-4 font-mono">{item.groupCode}</td><td className="px-5 py-4 font-mono text-xs">{getReportCode(item)}</td><td className="px-5 py-4">{item.student}</td><td className="max-w-[280px] truncate px-5 py-4">{item.reportTitle}</td><td className="px-5 py-4 font-mono font-bold">{item.score}/100</td><td className="px-5 py-4 text-xs text-[#718078]">{new Date(item.submittedAt).toLocaleString("vi-VN")}</td><td className="px-5 py-4"><span className="rounded-full bg-[#d9eee0] px-2 py-1 text-xs font-bold text-[#1f6b57]">Đã nộp</span></td></tr>) : <tr><td colSpan={8} className="px-5 py-10 text-center text-[#718078]">Chưa có bản ghi cục bộ phù hợp. Hãy gửi một bài hoặc đổi bộ lọc.</td></tr>}</tbody></table></div></div></section>

      <section id="huong-dan" className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10"><div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#cbd8ce] bg-[#e4efe8] p-6"><div><p className="eyebrow">Dành cho giáo viên</p><p className="mt-2 text-sm text-[#51675b]">Sau khi cấu hình Google Form, mở Google Sheet để xem toàn bộ bản ghi. Không cần server, token hoặc nơi lưu file. Website chỉ là giao diện nộp bài; Google Sheet mới là nguồn chính thức và giáo viên cần đối chiếu link, nguồn trích dẫn, sản phẩm và phần thuyết trình trước khi chốt điểm.</p></div><a href="https://docs.google.com/forms/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#1f6b57]">Mở Google Forms <Link2 size={15} /></a></div></section>
      <section id="bao-mat" className="border-y border-[#d9d3c6] bg-[#f0ece2] px-5 py-12 lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="max-w-2xl"><p className="eyebrow">Bảo vệ dữ liệu · giới hạn minh bạch</p><h2 className="section-title">Giữ bản ghi đúng, không tạo cảm giác bảo mật giả.</h2><p className="mt-4 leading-7 text-[#5b7067]">Website kiểm tra cấu trúc bản nháp, mã nhóm, mã báo cáo và link Google Drive/Slides trước khi gửi. Bản ghi trong giao diện chỉ là lịch sử cục bộ để theo dõi; Google Sheet của giáo viên mới là nguồn chính thức.</p></div><div className="mt-7 grid gap-4 md:grid-cols-3"><article className="rounded-2xl border border-[#d8cba9] bg-[#fff8e6] p-5"><p className="ledger-tag">01 · Nguồn chính thức</p><h3 className="mt-3 font-serif text-xl text-[#315d4d]">Google Sheet giữ bản ghi lớp</h3><p className="mt-2 text-sm leading-6 text-[#6c6045]">Không xóa hoặc sửa dữ liệu đã gửi trong website sẽ xóa bản ghi ở Google Sheet. Giáo viên cần giới hạn quyền chỉnh sửa Sheet.</p></article><article className="rounded-2xl border border-[#cbd8ce] bg-[#e4efe8] p-5"><p className="ledger-tag">02 · Chống sai cấu trúc</p><h3 className="mt-3 font-serif text-xl text-[#315d4d]">Kiểm tra trước khi xuất</h3><p className="mt-2 text-sm leading-6 text-[#51675b]">Dữ liệu localStorage sai cấu trúc sẽ bị loại khỏi thống kê; CSV/Excel thêm dấu bảo vệ cho ô bắt đầu bằng ký tự công thức để giảm rủi ro khi mở bằng bảng tính.</p></article><article className="rounded-2xl border border-[#cbd8ce] bg-[#e8efe9] p-5"><p className="ledger-tag">03 · Giới hạn cần biết</p><h3 className="mt-3 font-serif text-xl text-[#315d4d]">Frontend không phải két sắt</h3><p className="mt-2 text-sm leading-6 text-[#51675b]">Người dùng vẫn có thể sửa mã JavaScript hoặc localStorage bằng công cụ trình duyệt. Muốn chống giả mạo ở cấp hệ thống, cần xác thực và backend/Google Workspace do nhà trường quản trị.</p></article></div></div></section>
    </main>
    <footer className="border-t border-[#d9d3c6] bg-[#f0ece2] px-5 py-8 lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="flex items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#a9c4b5] bg-[#e4efe8] p-2"><img src={COFFEE_MARK} alt="Cây cà phê có quả chín" className="h-full w-full object-contain" /></div><div><p className="font-serif text-lg text-[#315d4d]">{TEACHER_PROFILE.name}</p><p className="text-xs text-[#748279]">{TEACHER_PROFILE.role}</p><p className="mt-1 text-xs text-[#87938a]">{TEACHER_PROFILE.school}</p></div></div><div className="max-w-md text-left text-xs leading-6 text-[#7c8b83] md:text-right"><p className="font-semibold text-[#315d4d]">DẤU VẾT TRI THỨC / CÔNG NGHỆ 12</p><p>Công nghệ 12 Lâm nghiệp – Thủy sản · Dữ liệu tự chấm là phản tư tham khảo · AI hỗ trợ, con người kiểm chứng.</p><p className="mt-1">{TEACHER_PROFILE.motto}</p></div></div></footer>
  </div>;
}
