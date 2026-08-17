const criteria = [
  { id: 'knowledge', weight: 30, level: 3 },
  { id: 'evidence', weight: 20, level: 2 },
  { id: 'presentation', weight: 20, level: 2 },
  { id: 'slides', weight: 15, level: 2 },
  { id: 'teamwork', weight: 15, level: 2 },
];

const score = criteria.reduce((total, item) => total + (item.level / 3) * item.weight, 0);
const rounded = Math.round(score);
const expected = 76.66666666666667;
if (Math.abs(score - expected) > 0.000001 || rounded !== 77) {
  throw new Error(`Rubric mismatch: ${score} -> ${rounded}`);
}
const payload = {
  student: 'Nguyễn Minh Anh',
  className: '12A1',
  group: "N1 — Vai trò và nhiệm vụ trồng rừng",
  reportTitle: 'Theo dõi nhiệm vụ trồng và chăm sóc rừng bằng dữ liệu hiện trường',
  reportLink: 'https://docs.google.com/presentation/d/REPORT-MAU-N1/view',
  score: `${rounded}/100`,
  rubric: 'knowledge: 4/4 | evidence: 3/4 | presentation: 3/4 | slides: 3/4 | teamwork: 3/4',
};
console.log(JSON.stringify({ score, rounded, payload }, null, 2));
