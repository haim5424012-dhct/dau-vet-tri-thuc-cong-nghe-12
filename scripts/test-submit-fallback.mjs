import { writeFile } from 'node:fs/promises';

const actionUrl = '';
const payload = {
  student: 'Nguyễn Minh Anh',
  className: '12A1',
  group: 'N1 — Giới thiệu chung về lâm nghiệp',
  reportTitle: 'Ứng dụng AI trong phát hiện suy thoái và bảo vệ rừng',
  reportLink: 'https://docs.google.com/presentation/d/REPORT-MAU-N1/view',
  score: '77/100',
  rubric: {
    knowledge: '4/4', evidence: '3/4', presentation: '3/4', slides: '3/4', teamwork: '3/4',
  },
};

if (actionUrl) throw new Error('Test must remain offline: unexpected actionUrl');
await writeFile('sample-group-1-submission.json', JSON.stringify({ ...payload, mode: 'fallback-local-export' }, null, 2));
console.log('SAFE_FALLBACK_OK: no external request sent; local JSON created.');
