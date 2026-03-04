// exam-taking.js — Exam taking logic: questions, timer, navigator

const TOTAL = 30;
const questions = [
  { text: 'Cho ma trận A = [[2, 1], [1, 3]]. Hãy tính định thức det(A)?', opts: ['5', '6', '4', '7'], correct: 0 },
  { text: 'Giá trị của sin(90°) là bao nhiêu?', opts: ['0', '1', '-1', '0.5'], correct: 1 },
  { text: 'Đạo hàm của f(x) = x³ tại x=2 là?', opts: ['6', '8', '12', '4'], correct: 2 },
];

let current = 0;
let answers = new Array(TOTAL).fill(null);
let marked  = new Array(TOTAL).fill(false);
let totalSec = 45 * 60;

// Build navigator
const navEl = document.getElementById('question-nav');
for (let i = 0; i < TOTAL; i++) {
  const btn = document.createElement('button');
  btn.className = 'nav-btn' + (i === 0 ? ' current' : '');
  btn.textContent = String(i + 1).padStart(2, '0');
  btn.addEventListener('click', () => goTo(i));
  navEl.appendChild(btn);
}

function renderQuestion() {
  const q = questions[current] || { text: `Câu hỏi số ${current + 1} (Dữ liệu mẫu)`, opts: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'] };
  document.getElementById('q-num').textContent = `Câu ${current + 1} / ${TOTAL}`;
  document.getElementById('question-text').textContent = q.text;
  const list = document.getElementById('options-list');
  list.innerHTML = '';
  ['A','B','C','D'].forEach((key, idx) => {
    const opt = document.createElement('div');
    opt.className = 'option-item' + (answers[current] === idx ? ' selected' : '');
    opt.innerHTML = `<div class="option-key">${key}</div><p class="option-text">${q.opts[idx]}</p>`;
    opt.addEventListener('click', () => selectOption(opt, idx));
    list.appendChild(opt);
  });
  // Mark btn
  const mb = document.getElementById('mark-btn');
  mb.classList.toggle('marked', marked[current]);
  // Nav btns
  document.getElementById('prev-btn').disabled = current === 0;
  document.getElementById('next-btn').textContent = current === TOTAL - 1 ? 'Nộp bài →' : 'Câu tiếp →';
  // Navigator highlight
  document.querySelectorAll('.nav-btn').forEach((b, i) => {
    b.classList.toggle('current', i === current);
    b.classList.toggle('answered', answers[i] !== null && i !== current && !marked[i]);
    b.classList.toggle('marked', marked[i] && i !== current);
  });
  // Progress
  const done = answers.filter(a => a !== null).length;
  document.getElementById('progress-text').textContent = `${done}/${TOTAL} câu`;
  document.getElementById('progress-bar').style.width = `${(done/TOTAL)*100}%`;
}

function selectOption(el, idx) {
  answers[current] = idx;
  renderQuestion();
}

function navigate(dir) {
  if (dir === 1 && current === TOTAL - 1) {
    if (confirm('Nộp bài?')) window.location.href = 'exam-result.html';
    return;
  }
  current = Math.max(0, Math.min(TOTAL - 1, current + dir));
  renderQuestion();
}

function goTo(i) { current = i; renderQuestion(); }

function toggleMark() {
  marked[current] = !marked[current];
  renderQuestion();
}

// Timer countdown
const timerEl = document.getElementById('timer');
const timerVal = document.getElementById('timer-value');
const timerInterval = setInterval(() => {
  totalSec--;
  if (totalSec <= 0) { clearInterval(timerInterval); window.location.href = 'exam-result.html'; return; }
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  timerVal.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (totalSec <= 300) timerEl.classList.add('warning');
}, 1000);

renderQuestion();
