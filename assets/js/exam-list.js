// exam-list.js — Exam list filtering and rendering

const exams = [
  { id:1, title:'Đề thi THPT Quốc gia 2025 — Toán', subject:'Toán học', subjectColor:'', desc:'Đề thi chính thức kỳ thi THPT Quốc gia 2025 — Toán. Bao gồm đại số, giải tích và hình học không gian.', questions:50, time:90, attempts:1284, diff:'hard', banner:'' },
  { id:2, title:'Kiểm tra 15 phút — Vật lý cơ học', subject:'Vật lý', subjectColor:'blue', desc:'Bài kiểm tra nhanh về cơ học Newton: lực, gia tốc, chuyển động thẳng đều.', questions:15, time:15, attempts:842, diff:'medium', banner:'blue' },
  { id:3, title:'Ngữ pháp Tiếng Anh cơ bản', subject:'Tiếng Anh', subjectColor:'green', desc:'Ôn tập các thì động từ, mệnh đề quan hệ, câu điều kiện. Dành cho học sinh lớp 10–11.', questions:25, time:30, attempts:2103, diff:'easy', banner:'green' },
  { id:4, title:'Hóa học hữu cơ — Ôn tập kỳ 2', subject:'Hóa học', subjectColor:'orange', desc:'Tổng hợp kiến thức hóa hữu cơ: hiđrocacbon, dẫn xuất halogen, ancol, axit carboxylic.', questions:30, time:45, attempts:620, diff:'medium', banner:'orange' },
  { id:5, title:'Đề thử Sinh học — Di truyền học', subject:'Sinh học', subjectColor:'green', desc:'Ôn tập di truyền Mendel, di truyền liên kết, đột biến gen và nhiễm sắc thể.', questions:40, time:60, attempts:510, diff:'hard', banner:'green' },
  { id:6, title:'Toán đại số tuyến tính cơ bản', subject:'Toán học', subjectColor:'', desc:'Ma trận, định thức, hệ phương trình tuyến tính. Phù hợp học sinh lớp 12.', questions:20, time:30, attempts:734, diff:'medium', banner:'' },
];

const diffLabel = { easy:'Dễ', medium:'Trung bình', hard:'Khó' };

function renderCards(list) {
  const grid = document.getElementById('exam-grid');
  if (!list.length) {
    grid.innerHTML = '<p style="color:var(--gray-500);font-weight:700;grid-column:1/-1;text-align:center;padding:40px 0;">Không tìm thấy đề thi phù hợp</p>';
    return;
  }
  grid.innerHTML = list.map(e => `
    <div class="exam-card" onclick="window.location.href='exam-taking.html'">
      <div class="exam-card__banner ${e.banner}"></div>
      <div class="exam-card__body">
        <span class="exam-card__subject ${e.subjectColor}">
          <span class="material-symbols-rounded" style="font-size:.85rem">subject</span>${e.subject}
        </span>
        <p class="exam-card__title">${e.title}</p>
        <p class="exam-card__desc">${e.desc}</p>
        <div class="exam-card__meta">
          <span class="exam-meta-item"><span class="material-symbols-rounded">format_list_numbered</span>${e.questions} câu</span>
          <span class="exam-meta-item"><span class="material-symbols-rounded">timer</span>${e.time} phút</span>
          <span class="exam-meta-item"><span class="material-symbols-rounded">people</span>${e.attempts.toLocaleString('vi')} lượt thi</span>
        </div>
      </div>
      <div class="exam-card__footer">
        <span class="difficulty-badge ${e.diff}">${diffLabel[e.diff]}</span>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();window.location.href='exam-taking.html'">
          <span class="material-symbols-rounded" style="font-size:.9rem">play_arrow</span> Bắt đầu thi
        </button>
      </div>
    </div>
  `).join('');
}

function applyFilters() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const subj = document.getElementById('filter-subject').value;
  const diff = document.getElementById('filter-diff').value;
  const filtered = exams.filter(e =>
    (!q || e.title.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q)) &&
    (!subj || e.subject === subj) &&
    (!diff || e.diff === diff)
  );
  renderCards(filtered);
}

document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('filter-subject').addEventListener('change', applyFilters);
document.getElementById('filter-diff').addEventListener('change', applyFilters);
renderCards(exams);

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
