// result-list.js — Result list rendering, search filter, and Q&A modal

const results = [
  {
    id:1, title:'Đề thi THPT Quốc gia 2025 — Toán', subject:'Toán học',
    date:'04/03/2026', time:'01:12:34', score:8.5, total:10, correct:42, wrong:8,
    pass:true,
    qa:[
      { q:'Cho ma trận A = [[2,1],[1,3]]. Hãy tính định thức det(A)?', opts:['5','6','4','7'], userAns:0, correctAns:0 },
      { q:'Giá trị của sin(90°) là bao nhiêu?', opts:['0','1','-1','0.5'], userAns:2, correctAns:1 },
      { q:'Đạo hàm của f(x) = x³ tại x = 2 là?', opts:['6','8','12','4'], userAns:2, correctAns:2 },
      { q:'Giới hạn lim(x→0) sin(x)/x bằng?', opts:['0','1','∞','Không tồn tại'], userAns:1, correctAns:1 },
      { q:'Tích phân ∫₀¹ x² dx bằng?', opts:['1/2','1/3','1/4','1'], userAns:3, correctAns:1 },
    ]
  },
  {
    id:2, title:'Kiểm tra 15 phút — Vật lý cơ học', subject:'Vật lý',
    date:'02/03/2026', time:'00:13:50', score:9.0, total:10, correct:14, wrong:1,
    pass:true,
    qa:[
      { q:'Công thức tính gia tốc là?', opts:['a = v/t','a = Δv/Δt','a = F×m','a = v²/r'], userAns:1, correctAns:1 },
      { q:'Đơn vị của lực trong hệ SI là?', opts:['kg','m/s','N','J'], userAns:2, correctAns:2 },
      { q:'Định luật I Newton phát biểu về?', opts:['Quán tính','Gia tốc','Tác dụng phản tác dụng','Trọng lực'], userAns:0, correctAns:0 },
    ]
  },
  {
    id:3, title:'Ngữ pháp Tiếng Anh cơ bản', subject:'Tiếng Anh',
    date:'01/03/2026', time:'00:28:10', score:4.0, total:10, correct:10, wrong:15,
    pass:false,
    qa:[
      { q:'Choose the correct form: She ___ to school every day.', opts:['go','goes','going','gone'], userAns:0, correctAns:1 },
      { q:'The passive voice of "They built the house" is?', opts:['The house built','The house was built','The house is built','The house will be built'], userAns:2, correctAns:1 },
    ]
  },
];

const keyLabels = ['A','B','C','D'];

function renderResults(list) {
  const el = document.getElementById('result-list');
  if (!list.length) {
    el.innerHTML = '<p style="text-align:center;color:var(--gray-500);font-weight:700;padding:40px 0;">Không có kết quả phù hợp</p>';
    return;
  }
  el.innerHTML = list.map(r => `
    <div class="result-item" onclick="openModal(${r.id})">
      <div class="result-score-circle ${r.pass ? 'score-pass':'score-fail'}">
        <span class="score-num">${r.score}</span>
        <span class="score-max">/ 10</span>
      </div>
      <div class="result-info">
        <p class="result-info__title">${r.title}</p>
        <div class="result-info__meta">
          <span class="result-meta-item"><span class="material-symbols-rounded">calendar_today</span>${r.date}</span>
          <span class="result-meta-item"><span class="material-symbols-rounded">timer</span>${r.time}</span>
          <span class="result-meta-item"><span class="material-symbols-rounded">check_circle</span><span style="color:var(--green)">${r.correct} đúng</span></span>
          <span class="result-meta-item"><span class="material-symbols-rounded">cancel</span><span style="color:#EF4444">${r.wrong} sai</span></span>
        </div>
      </div>
      <div class="result-item__action">
        <span style="font-size:.75rem;color:var(--gray-400);font-weight:700;display:block;text-align:right;">Xem chi tiết →</span>
      </div>
    </div>
  `).join('');
}

function applyFilters() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const filtered = results.filter(r =>
    (!q || r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q))
  );
  renderResults(filtered);
}
document.getElementById('search-input').addEventListener('input', applyFilters);
renderResults(results);

function openModal(id) {
  const r = results.find(x => x.id === id);
  document.getElementById('modal-title').textContent = r.title;
  document.getElementById('modal-subtitle').textContent = `Ngày thi: ${r.date} · ${r.subject}`;
  document.getElementById('modal-stats').innerHTML = `
    <div class="modal-stat"><div class="modal-stat__val" style="color:var(--red)">${r.score}</div><div class="modal-stat__label">Điểm số</div></div>
    <div class="modal-stat"><div class="modal-stat__val" style="color:var(--green)">${r.correct}</div><div class="modal-stat__label">Câu đúng</div></div>
    <div class="modal-stat"><div class="modal-stat__val" style="color:#EF4444">${r.wrong}</div><div class="modal-stat__label">Câu sai</div></div>
    <div class="modal-stat"><div class="modal-stat__val">${r.time}</div><div class="modal-stat__label">Thời gian</div></div>
  `;
  document.getElementById('qa-list').innerHTML = r.qa.map((qa, qi) => {
    const isCorrect = qa.userAns === qa.correctAns;
    return `
      <div class="qa-item ${isCorrect ? 'correct':'wrong'}">
        <div class="qa-question">
          <div class="qa-status-icon ${isCorrect ? 'correct':'wrong'}">${isCorrect ? '✓':'✗'}</div>
          <span>Câu ${qi+1}: ${qa.q}</span>
        </div>
        <div class="qa-options">
          ${qa.opts.map((opt, oi) => {
            let cls = '';
            if (oi === qa.userAns && oi === qa.correctAns) cls = 'user-answer correct';
            else if (oi === qa.userAns && oi !== qa.correctAns) cls = 'user-answer wrong';
            else if (oi === qa.correctAns) cls = 'correct-answer';
            return `<div class="qa-option ${cls}">
              <div class="qa-option-key">${keyLabels[oi]}</div>
              <span>${opt}</span>
              ${oi === qa.userAns && oi !== qa.correctAns ? '<span style="margin-left:auto;font-size:.72rem;color:#EF4444;font-weight:800;">Bạn chọn</span>' : ''}
              ${oi === qa.correctAns && oi !== qa.userAns ? '<span style="margin-left:auto;font-size:.72rem;color:#22C55E;font-weight:800;">Đáp án đúng</span>' : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');
  document.getElementById('detail-modal').classList.add('open');
}

function closeModal() { document.getElementById('detail-modal').classList.remove('open'); }
document.getElementById('detail-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
