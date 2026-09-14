// Review aid: source deltas for a bounded editorial pass, not factual verification.
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const baseline = '3f3b9cb';
const readBefore = file => cp.execFileSync('git', ['show', `${baseline}:${file}`], {
  cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024,
});
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const headings = text => text.split(/\r?\n/).filter(line => /^#{1,6}\s/.test(line));
const links = text => [...text.matchAll(/\]\(([^)]+)\)|\bhref=["']([^"']+)["']|https?:\/\/[^\s<>"')\]]+/g)].map(match => match[1] || match[2] || match[0]);
const numericTokens = text => text.match(/\d+(?:[.,]\d+)*/g) || [];
function addedTokens(before, after) {
  const count = new Map();
  for (const token of before) count.set(token, (count.get(token) || 0) + 1);
  const added = new Map();
  for (const token of after) {
    if (count.get(token)) count.set(token, count.get(token) - 1);
    else added.set(token, (added.get(token) || 0) + 1);
  }
  return Object.fromEntries(added);
}
const lessons = [];
for (const [directory, pattern] of [['modules', /^\d\d-.*\.md$/], ['survey', /^S\d\d-.*\.md$/]]) {
  for (const name of fs.readdirSync(path.join(root, 'course', directory)).filter(name => pattern.test(name)).sort()) {
    const file = `course/${directory}/${name}`;
    const before = readBefore(file), after = fs.readFileSync(path.join(root, file), 'utf8');
    const beforeNumbers = numericTokens(before), afterNumbers = numericTokens(after);
    lessons.push({ file, changed: before !== after, sourceSha256: hash(after),
      headingsPreserved: JSON.stringify(headings(before)) === JSON.stringify(headings(after)),
      linksAdded: addedTokens(links(before), links(after)), linksRemoved: addedTokens(links(after), links(before)),
      numericTokensAdded: addedTokens(beforeNumbers, afterNumbers), numericTokensRemoved: addedTokens(afterNumbers, beforeNumbers),
    });
  }
}
const quizStructure = quiz => ({ module: quiz.module, questions: quiz.questions.map(q => ({ options: q.options, answer: q.answer })) });
const quizzes = fs.readdirSync(path.join(root, 'course', 'quizzes')).filter(name => /^\d\d-.*\.json$/.test(name)).sort().map(name => {
  const file = `course/quizzes/${name}`, oldText = readBefore(file), currentText = fs.readFileSync(path.join(root, file), 'utf8');
  const before = JSON.parse(oldText.replace(/^\uFEFF/, '')), after = JSON.parse(currentText.replace(/^\uFEFF/, ''));
  return { file, changed: oldText !== currentText, sourceSha256: hash(currentText),
    structurePreserved: JSON.stringify(quizStructure(before)) === JSON.stringify(quizStructure(after)),
    wordingChanges: after.questions.flatMap((q, index) => ['q', 'explanation'].filter(key => q[key] !== before.questions[index]?.[key]).map(key => ({question: index + 1, field: key, before: before.questions[index]?.[key], after: q[key]}))),
  };
});
const report = {
  checkedAt: new Date().toISOString(), baseline,
  purpose: 'Identify editorial source changes for human review. Token deltas do not prove preservation or correctness of factual claims, units, context, or spelled-out quantities. Repeated/moved values can change counts without changing a claim; unchanged counts can still hide changed meanings.',
  lessonCount: lessons.length, changedLessons: lessons.filter(l => l.changed).length,
  headingChanges: lessons.filter(l => !l.headingsPreserved).length,
  lessonsWithLinkDeltas: lessons.filter(l => Object.keys(l.linksAdded).length || Object.keys(l.linksRemoved).length).length,
  lessonsWithNumericTokenDeltas: lessons.filter(l => Object.keys(l.numericTokensAdded).length || Object.keys(l.numericTokensRemoved).length).length,
  quizCount: quizzes.length, quizStructureChanges: quizzes.filter(q => !q.structurePreserved).length,
  lessons, quizzes,
};
fs.writeFileSync(path.join(root, 'qa/reports/language-content-deltas.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({lessons: report.lessonCount, changed: report.changedLessons, headingChanges: report.headingChanges, linkDeltas: report.lessonsWithLinkDeltas, numericTokenDeltas: report.lessonsWithNumericTokenDeltas, quizzes: report.quizCount, quizStructureChanges: report.quizStructureChanges}, null, 2));
if (report.headingChanges || report.quizStructureChanges) process.exitCode = 1;
