// Style reminder: This page is a biophilic editorial field journal. Keep asymmetry, paper texture, green/blue hierarchy, field-note labels, and visible submission status.
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowDown, ArrowRight, Check, ClipboardList, ExternalLink, FileText, Leaf, Link2, Loader2, Menu, Send, Sprout, Waves, X } from "lucide-react";

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
  { id: "N1", chapter: "Chương I", title: "Giới thiệu chung về lâm nghiệp", lessons: "Bài 1–2", codes: ["12.C2", "12.A1"], kind: "forest", outcome: "Nêu ứng dụng AI trong phân tích ảnh vệ tinh, nhận diện loài cây hoặc sâu bệnh; phân biệt cảnh báo của AI với quyết định của kiểm lâm." },
  { id: "N2", chapter: "Chương II", title: "Trồng và chăm sóc rừng", lessons: "Bài 3–5", codes: ["12.C2"], kind: "forest", outcome: "Giải thích cách ảnh vệ tinh/drone hỗ trợ theo dõi độ che phủ, ước lượng cây và chọn thời vụ." },
  { id: "N3", chapter: "Chương III", title: "Bảo vệ và khai thác rừng bền vững", lessons: "Bài 6–7", codes: ["12.C2", "12.A1"], kind: "forest", outcome: "Mô tả AI phát hiện suy giảm rừng, cháy rừng hoặc chặt phá; nêu vai trò kiểm tra và quyết định của con người." },
  { id: "N4", chapter: "Chương IV + V", title: "Thuỷ sản và môi trường nuôi", lessons: "Bài 8–12", codes: ["12.C2", "12.A1"], kind: "water", outcome: "Phân biệt cảm biến chỉ đo với AI phân tích, dự báo và cảnh báo pH, oxygen, nhiệt độ; con người quyết định xử lí." },
  { id: "N5", chapter: "Chương VI", title: "Công nghệ giống thuỷ sản", lessons: "Bài 13–15", codes: ["12.C2"], kind: "water", outcome: "Liên hệ phần mềm phân tích kích thước, hình dạng để chọn cá/tôm bố mẹ sinh trưởng tốt; Bài 13–14 không có mã AI riêng trong PL1." },
  { id: "N6", chapter: "Chương VII", title: "Công nghệ thức ăn nuôi thuỷ sản", lessons: "Bài 16–18", codes: ["12.C2"], kind: "water", outcome: "Giải thích hệ thống cho ăn thông minh dùng camera phân tích hành vi bắt mồi để giảm lãng phí và ô nhiễm." },
  { id: "N7", chapter: "Chương VIII", title: "Công nghệ nuôi thuỷ sản", lessons: "Bài 19–22", codes: ["12.C2", "12.A3"], kind: "water", outcome: "Phân tích cảnh báo sớm từ cảm biến/camera; trình bày trách nhiệm ghi nhật kí số trung thực, minh bạch theo VietGAP." },
  { id: "N8", chapter: "Chương IX + X", title: "Bệnh và nguồn lợi thuỷ sản", lessons: "Bài 23–27", codes: ["12.C2"], kind: "water", outcome: "Nêu cách AI nhận diện dấu hiệu bệnh, giám sát khu bảo tồn hoặc dự báo ngư trường; nhấn mạnh kiểm tra lại bằng chuyên môn." },
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

const emptyForm = { student: "", className: "", classCode: "", groupCode: "", reportTitle: "", reportLink: "" };
type FormState = typeof emptyForm;
const normalizeForm = (value: Partial<FormState> | null | undefined): FormState => ({
  student: typeof value?.student === "string" ? value.student : "",
  className: typeof value?.className === "string" ? value.className : "",
  classCode: typeof value?.classCode === "string" ? value.classCode : "",
  groupCode: typeof value?.groupCode === "string" ? value.groupCode : "",
  reportTitle: typeof value?.reportTitle === "string" ? value.reportTitle : "",
  reportLink: typeof value?.reportLink === "string" ? value.reportLink : "",
});

export default function Home() {
  const [activeGroup, setActiveGroup] = useState("N1");
  const [rubric, setRubric] = useState<RubricState>(defaultRubric);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const selected = groups.find((group) => group.id === activeGroup) ?? groups[0];

  useEffect(() => {
    const saved = localStorage.getItem("cn12-fieldnote-draft");
    if (saved) {
      try { const parsed = JSON.parse(saved); setForm(normalizeForm(parsed.form)); setRubric(parsed.rubric ?? defaultRubric); } catch { /* ignore malformed local draft */ }
    }
  }, []);

  useEffect(() => { localStorage.setItem("cn12-fieldnote-draft", JSON.stringify({ form, rubric })); }, [form, rubric]);

  const score = useMemo(() => criteria.reduce((total, item) => total + ((rubric[item.id] ?? 0) / 3) * item.weight, 0), [rubric]);
  const answered = Object.values(rubric).filter((value) => value > 0).length;

  const updateForm = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const exportDraft = () => {
    const payload = { ...form, group: selected.id, groupTitle: selected.title, score: Math.round(score), rubric, savedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `tu-cham-${selected.id.toLowerCase()}.json`; anchor.click(); URL.revokeObjectURL(url);
    toast.success("Đã tải bản tóm tắt dự phòng về máy.");
  };

  const submit = async () => {
    if (isSubmitting) return;
    if (!form.student || !form.className || !form.classCode || !form.groupCode || !form.reportTitle || !form.reportLink || answered < criteria.length) {
      toast.error("Vui lòng hoàn thiện họ tên, lớp, mã lớp, mã nhóm, đường dẫn báo cáo và đủ 5 tiêu chí."); return;
    }
    setIsSubmitting(true);
    const body = new URLSearchParams({
      [FORM_CONFIG.entries.student]: form.student, [FORM_CONFIG.entries.className]: form.className,
      [FORM_CONFIG.entries.classCode]: form.classCode, [FORM_CONFIG.entries.groupCode]: form.groupCode,
      [FORM_CONFIG.entries.group]: `${selected.id} — ${selected.title}`, [FORM_CONFIG.entries.reportTitle]: form.reportTitle,
      [FORM_CONFIG.entries.reportLink]: form.reportLink, [FORM_CONFIG.entries.score]: `${Math.round(score)}/100`,
      [FORM_CONFIG.entries.rubric]: criteria.map((item) => `${item.label}: ${rubric[item.id] + 1}/4`).join(" | "),
    });
    if (!FORM_CONFIG.actionUrl) { exportDraft(); toast.info("Google Form chưa được cấu hình. Bản tóm tắt đã được lưu để không mất dữ liệu."); setIsSubmitting(false); return; }
    try { await fetch(FORM_CONFIG.actionUrl, { method: "POST", mode: "no-cors", body }); setSubmitted(true); toast.success("Đã gửi kết quả thành công. Giáo viên sẽ xem bản ghi trong Google Sheet."); }
    catch { toast.error("Chưa gửi được kết quả. Hãy kiểm tra kết nối và thử lại."); }
    finally { setIsSubmitting(false); }
  };

  return <div className="min-h-screen bg-[#f5f1e8] text-[#17352d]">
    <header className="sticky top-0 z-30 border-b border-[#d9d3c6] bg-[#f5f1e8]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3"><img src="/manus-storage/fieldnote-logo_5f80fd0f.png" className="h-11 w-11 rounded-full" alt="Biểu tượng hạt giống dữ liệu" /><span><span className="block font-serif text-lg font-semibold tracking-tight">DẤU VẾT TRI THỨC / CÔNG NGHỆ 12</span><span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6c8578]">Báo cáo số · Tự đánh giá</span></span></a>
        <nav className={`${mobileNav ? "flex" : "hidden"} absolute left-0 top-[74px] w-full flex-col gap-4 border-b border-[#d9d3c6] bg-[#f5f1e8] px-5 py-5 text-sm font-semibold lg:static lg:flex lg:w-auto lg:flex-row lg:border-0 lg:bg-transparent lg:p-0`}><a href="#quy-trinh">Quy trình</a><a href="#chu-de">8 nhóm chủ đề</a><a href="#rubric">Tự chấm</a><a href="#huong-dan" className="text-[#1f6b57]">Hướng dẫn giáo viên</a></nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(!mobileNav)} aria-label="Mở menu"><Menu size={20} /></Button>
      </div>
    </header>

    <main id="top"><aside className="journal-rail" aria-label="Mục lục sổ tay"><span className="journal-rail-mark">INDEX / 01</span><a href="#quy-trinh">Quy trình</a><a href="#chu-de">YCCĐ · NLS</a><a href="#rubric">Rubric</a><a href="#gui-bai">Nộp bài</a><span className="journal-rail-line" /></aside>
      <section className="relative overflow-hidden border-b border-[#d9d3c6]">
        <div className="mx-auto grid max-w-[1440px] items-end gap-10 px-5 pb-16 pt-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a9c4b5] bg-[#e4efe8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.17em] text-[#1f6b57]"><Sprout size={14} /> Nhật ký học tập số</div><h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#17352d] md:text-7xl">Biến báo cáo thành <em className="text-[#1f6b57]">dấu vết tri thức.</em></h1><p className="mt-7 max-w-md text-lg leading-8 text-[#53675f]">Một không gian nộp báo cáo, khám phá công nghệ và tự phản tư dành cho 8 nhóm chủ đề Lâm nghiệp – Thủy sản.</p><div className="mt-9 flex flex-wrap gap-3"><a href="#rubric"><Button className="h-12 rounded-full bg-[#1f6b57] px-6 text-white hover:bg-[#174e40]">Bắt đầu tự chấm <ArrowRight className="ml-2" size={17} /></Button></a><a href="#quy-trinh"><Button variant="outline" className="h-12 rounded-full border-[#a9b8ad] bg-transparent px-6">Xem quy trình</Button></a></div></div>
          <div className="relative min-h-[310px] overflow-hidden rounded-[2rem] border border-[#c8d8cc] bg-[#dcebe1] shadow-[0_18px_50px_rgba(31,107,87,0.12)]"><img src="/manus-storage/fieldnote-hero_0fe835b8.jpg" alt="Minh họa hệ sinh thái rừng và thủy sản" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-80" /><div className="absolute bottom-5 left-5 max-w-xs rounded-2xl border border-white/50 bg-[#f5f1e8]/90 p-4 backdrop-blur-sm"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1f6b57]"><Leaf size={14} /> Field note 01</div><p className="mt-2 font-serif text-xl leading-tight">“AI cảnh báo — con người kiểm tra và quyết định.”</p></div></div>
        </div>
      </section>

      <section id="quy-trinh" className="mx-auto max-w-[1440px] px-5 py-16 lg:px-10 lg:py-24"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="eyebrow">Đường đi của dữ liệu</p><h2 className="section-title">Một lần nộp, cả lớp cùng nhìn thấy.</h2></div><p className="hidden max-w-xs text-sm leading-6 text-[#6d7c74] lg:block">Website chỉ là lớp giao diện. Google Form nhận dữ liệu ngầm, Google Sheet là nơi giáo viên duyệt tập trung.</p></div><div className="pencil-path" aria-hidden="true"><span /></div><div className="grid gap-3 md:grid-cols-4">
        {[{n:"01", icon:<FileText size={22}/>, title:"Trang web tĩnh", text:"Học sinh nhập thông tin, link báo cáo và tự chấm."},{n:"02", icon:<Send size={22}/>, title:"Google Form ẩn", text:"Nhận dữ liệu bằng fetch no-cors, không cần token."},{n:"03", icon:<ClipboardList size={22}/>, title:"Google Sheet", text:"Lưu bản ghi tập trung theo thời gian gửi."},{n:"04", icon:<Check size={22}/>, title:"Giáo viên", text:"Xem, đối chiếu và duyệt điểm chính thức."}].map((step, index) => <div key={step.n} className="relative rounded-2xl border border-[#d7d1c3] bg-[#fbf9f3] p-6 transition-transform duration-200 hover:-translate-y-1"><span className="ledger-tag">field note / data path</span><div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs text-[#8d9b92]">{step.n}</span><span className="text-[#1f6b57]">{step.icon}</span></div><h3 className="font-serif text-2xl">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#697970]">{step.text}</p>{index < 3 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden rounded-full bg-[#f5f1e8] p-1 text-[#a1aaa3] md:block" size={28} />}</div>)}</div></section>

      <section id="chu-de" className="border-y border-[#d9d3c6] bg-[#e8efe9] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-[1440px]"><div className="max-w-2xl"><p className="eyebrow">Bản đồ nội dung</p><h2 className="section-title">Chọn đúng nhóm, mở đúng yêu cầu.</h2><p className="mt-4 text-[#5b7067]">Mỗi thẻ dưới đây được ánh xạ từ PL1/PL3, gồm chương, bài học, mã Khung 3439 và yêu cầu cần đưa vào báo cáo.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{groups.map((group) => <button key={group.id} onClick={() => setActiveGroup(group.id)} className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${activeGroup === group.id ? "border-[#1f6b57] bg-[#1f6b57] text-white shadow-lg shadow-[#1f6b57]/15" : "border-[#c9d8cd] bg-[#f4f6ef] hover:border-[#8db39f]"}`}><span><span className={`block text-xs font-bold uppercase tracking-[0.14em] ${activeGroup === group.id ? "text-[#c8e4d0]" : "text-[#80948a]"}`}>{group.id} · {group.chapter}</span><span className="mt-1 block font-serif text-lg">{group.title}</span></span><ArrowRight size={18} /></button>)}</div><Card className="overflow-hidden border-[#cbd9ce] bg-[#fbf9f3] shadow-none"><div className="grid md:grid-cols-[0.75fr_1.25fr]"><div className="relative min-h-[260px] overflow-hidden bg-[#d6e6db]"><img src={selected.kind === "forest" ? "/manus-storage/fieldnote-forest_f36f197b.jpg" : "/manus-storage/fieldnote-aquaculture_b97a2ec6.jpg"} alt="Minh họa chủ đề" className="h-full w-full object-cover mix-blend-multiply opacity-85" /><div className="absolute left-5 top-5 flex gap-2">{selected.codes.map((code) => <Badge key={code} className="border border-white/40 bg-[#f5f1e8]/90 text-[#1f6b57]">{code}</Badge>)}</div></div><CardContent className="p-7 lg:p-10"><div className="flex items-center justify-between"><span className="eyebrow">{selected.lessons}</span><span className="rounded-full bg-[#e4efe8] px-3 py-1 text-xs font-bold text-[#1f6b57]">{selected.id}</span></div><h3 className="mt-4 font-serif text-3xl leading-tight">{selected.title}</h3><div className="mt-7 border-l-2 border-[#a9c4b5] pl-4"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#71857a]">Điểm cần có trong báo cáo</p><p className="mt-2 leading-7 text-[#4c6258]">{selected.outcome}</p></div><a href="#rubric" className="mt-8 inline-flex items-center text-sm font-bold text-[#1f6b57]">Đến phần tự chấm <ArrowDown size={16} className="ml-2" /></a></CardContent></div></Card></div></div></section>

      <section id="rubric" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-24"><div><p className="eyebrow">Rubric phản tư · 100 điểm</p><h2 className="section-title">Tự nhìn lại trước khi gửi.</h2><p className="mt-4 max-w-xl leading-7 text-[#62736b]"><span className="field-caption">YCCĐ · NLS · KHUNG 3439</span>Chọn một mức mô tả cho mỗi tiêu chí. Điểm hiển thị là tham khảo để nhóm tự điều chỉnh; giáo viên vẫn là người duyệt điểm chính thức.</p><div className="mt-8 space-y-4">{criteria.map((item) => <div key={item.id} className="rounded-2xl border border-[#ded8ca] bg-[#fbf9f3] p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{item.label}</h3><p className="mt-1 text-xs text-[#87938c]">Trọng số {item.weight}%</p></div><span className="font-mono text-sm font-bold text-[#1f6b57]">{Math.round(((rubric[item.id] ?? 0) / 3) * item.weight)} / {item.weight}</span></div><div className="mt-4 grid gap-2 sm:grid-cols-4 rubric-ledger">{item.levels.map((level, index) => <button key={level} onClick={() => setRubric((current) => ({ ...current, [item.id]: index }))} className={`min-h-[66px] rounded-xl border px-3 py-2 text-left text-xs leading-5 transition-all duration-150 ${rubric[item.id] === index ? "border-[#1f6b57] bg-[#e2efe6] text-[#1f6b57] ring-2 ring-[#1f6b57]/15" : "border-[#e0dbcf] bg-[#f6f3eb] text-[#718078] hover:border-[#a9c4b5]"}`}><span className="mb-1 block font-mono font-bold">{index + 1}/4 {rubric[item.id] === index && <Check className="inline" size={13} />}</span>{level.split(": ")[1]}</button>)}</div></div>)}</div></div>
        <aside className="lg:sticky lg:top-28 lg:self-start"><div className="rounded-[2rem] bg-[#1f6b57] p-7 text-[#f5f1e8] shadow-xl shadow-[#1f6b57]/20 lg:p-9"><span className="ledger-tag ledger-tag-light">evidence ledger / 3439</span><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b9d9c2]">Điểm phản tư</p><div className="mt-3 flex items-end gap-2"><span className="font-serif text-7xl leading-none">{Math.round(score)}</span><span className="pb-2 font-mono text-sm text-[#b9d9c2]">/ 100</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-[#356f5d]"><div className="h-full rounded-full bg-[#e7bc65] transition-all duration-300" style={{ width: `${score}%` }} /></div><p className="mt-4 text-sm leading-6 text-[#d5e6d8]">Đã chọn {answered}/5 tiêu chí. Hãy hoàn thiện biểu mẫu bên dưới để gửi kết quả.</p><a href="#gui-bai" className="mt-7 flex items-center justify-center gap-2 rounded-full bg-[#e7bc65] px-5 py-3 text-sm font-bold text-[#17352d] transition-transform active:scale-[0.97]">Điền thông tin gửi bài <ArrowDown size={16} /></a></div></aside></section>

      <section id="gui-bai" className="border-t border-[#d9d3c6] bg-[#fbf9f3] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow">Bước cuối</p><h2 className="section-title">Gửi bản ghi vào sổ lớp.</h2><p className="mt-4 leading-7 text-[#64756c]">Hãy dùng link chia sẻ của Google Drive hoặc Google Slides. Trang web không nhận file thật, vì vậy học sinh kiểm soát quyền xem của báo cáo.</p><div className="mt-8 rounded-2xl border border-[#e4c98f] bg-[#fff8e6] p-5 text-sm leading-6 text-[#775d2d]"><strong>Trạng thái đường ống:</strong> {FORM_CONFIG.actionUrl ? "Đã cấu hình Google Form." : "Chưa cấu hình Google Form — nút gửi sẽ tải bản tóm tắt dự phòng."}</div></div><Card className="submit-sheet border-[#ded8ca] bg-[#f5f1e8] shadow-none"><span className="ledger-tag">submission sheet / google form</span><CardHeader><CardTitle className="font-serif text-2xl">Thông tin báo cáo</CardTitle></CardHeader><CardContent className="space-y-5"><div className="grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-semibold">Họ và tên<input value={form.student ?? ""} onChange={(e) => updateForm("student", e.target.value)} placeholder="Nguyễn Văn A" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Lớp<input value={form.className ?? ""} onChange={(e) => updateForm("className", e.target.value)} placeholder="12A1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Mã lớp<input value={form.classCode ?? ""} onChange={(e) => updateForm("classCode", e.target.value.toUpperCase())} placeholder="VD: 12A1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-mono font-normal uppercase outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Mã nhóm<input value={form.groupCode ?? ""} onChange={(e) => updateForm("groupCode", e.target.value.toUpperCase())} placeholder="VD: N1" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-mono font-normal uppercase outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label></div><label className="space-y-2 text-sm font-semibold">Tên báo cáo<input value={form.reportTitle ?? ""} onChange={(e) => updateForm("reportTitle", e.target.value)} placeholder="Ví dụ: AI trong quản lí môi trường ao nuôi" className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><label className="space-y-2 text-sm font-semibold">Link Google Drive / Slides<input type="url" value={form.reportLink ?? ""} onChange={(e) => updateForm("reportLink", e.target.value)} placeholder="https://docs.google.com/..." className="mt-1 h-12 w-full rounded-xl border border-[#d3cec1] bg-[#fbf9f3] px-4 font-normal outline-none focus:border-[#1f6b57] focus:ring-2 focus:ring-[#1f6b57]/15" /></label><div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#ddd6c8] pt-5"><div className="text-sm text-[#697970]">Nhóm đang chọn: <strong className="text-[#1f6b57]">{selected.id} — {selected.title}</strong></div><div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Button type="button" variant="outline" onClick={exportDraft} className="min-h-12 w-full rounded-full border-[#b9c8bc] bg-transparent sm:w-auto"><ExternalLink size={16} className="mr-2" />Tải dự phòng</Button><Button type="button" onClick={submit} disabled={isSubmitting || submitted} aria-busy={isSubmitting} className="min-h-12 w-full rounded-full bg-[#1f6b57] text-white hover:bg-[#174e40] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">{isSubmitting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Send size={16} className="mr-2" />}{isSubmitting ? "Đang gửi…" : submitted ? "Đã gửi thành công" : "Gửi kết quả"}</Button></div></div></CardContent></Card></div></section>

      <section id="huong-dan" className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10"><div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-[#cbd8ce] bg-[#e4efe8] p-6"><div><p className="eyebrow">Dành cho giáo viên</p><p className="mt-2 text-sm text-[#51675b]">Sau khi cấu hình Google Form, mở Google Sheet để xem toàn bộ bản ghi. Không cần server, token hoặc nơi lưu file.</p></div><a href="https://docs.google.com/forms/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-[#1f6b57]">Mở Google Forms <Link2 size={15} /></a></div></section>
    </main>
    <footer className="border-t border-[#d9d3c6] px-5 py-8 text-center text-xs text-[#7c8b83]">DẤU VẾT TRI THỨC / CÔNG NGHỆ 12 · Công nghệ 12 Lâm nghiệp – Thủy sản · Dữ liệu tự chấm là phản tư tham khảo · Công nghệ vì thực tiễn</footer>
  </div>;
}
