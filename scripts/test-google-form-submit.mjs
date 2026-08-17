const actionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfr6aguXg_kGhF_IM0s-mTWCrN0u0lK2eyPIVt7pfKhBnuAxw/formResponse';
const body = new URLSearchParams({
  'entry.299711186': 'Nguyễn Minh Anh',
  'entry.417395979': '12A1',
  'entry.1285290589': '12A1',
  'entry.902018661': 'N1',
  'entry.1098548488': 'N1 — Vai trò và nhiệm vụ trồng rừng',
  'entry.287486772': 'Theo dõi nhiệm vụ trồng và chăm sóc rừng bằng dữ liệu hiện trường',
  'entry.1136418837': 'https://docs.google.com/presentation/d/REPORT-MAU-N1/view',
  'entry.2068320805': '77/100',
  'entry.764422736': 'Nội dung kiến thức: 4/4 | Minh chứng: 3/4 | Trình bày: 3/4 | Slide: 3/4 | Phối hợp nhóm: 3/4',
});

const response = await fetch(actionUrl, { method: 'POST', body, redirect: 'manual' });
console.log(JSON.stringify({
  status: response.status,
  redirected: response.redirected,
  location: response.headers.get('location'),
  submittedFields: 9,
  included: ['mã lớp', 'mã nhóm'],
}, null, 2));
if (![200, 302].includes(response.status)) process.exitCode = 1;
