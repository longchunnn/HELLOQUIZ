// admin-exam-manager.js — Exam manager: search/filter, modal, question builder

/* ===== SIDEBAR ===== */
const sidebar = document.getElementById('sidebar');
const overlaySb = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlaySb.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlaySb.style.display = 'none'; }

/* ===== SEARCH & FILTER ===== */
function applyExamFilters() {
  const searchInputEl = document.getElementById('exam-search-input');
  const subjectEl     = document.getElementById('filter-subject');
  const statusEl      = document.getElementById('filter-status');
  const levelEl       = document.getElementById('filter-level');

  const q = (searchInputEl?.value || '').toLowerCase();

  let subject = subjectEl ? subjectEl.value : '';
  if (subject === 'Tất cả môn học') subject = '';

  let status = statusEl ? statusEl.value : '';
  if (status === 'Tất cả trạng thái') status = '';

  let level = levelEl ? levelEl.value : '';
  if (level === 'Tất cả cấp độ') level = '';

  document.querySelectorAll('#exam-table-body tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    const levelText = (row.querySelector('td:nth-child(6) .badge')?.textContent || '').trim();

    const matchQ       = !q       || text.includes(q);
    const matchSubject = !subject || row.dataset.subject === subject;
    const matchStatus  = !status  || row.dataset.status  === status;
    const matchLevel   = !level   || levelText === level;

    row.style.display = (matchQ && matchSubject && matchStatus && matchLevel) ? '' : 'none';
  });
}

const examSearchInput = document.getElementById('exam-search-input');
if (examSearchInput) {
  examSearchInput.addEventListener('input', applyExamFilters);
}
const filterSubject = document.getElementById('filter-subject');
if (filterSubject) filterSubject.addEventListener('change', applyExamFilters);
const filterStatus = document.getElementById('filter-status');
if (filterStatus) filterStatus.addEventListener('change', applyExamFilters);
const filterLevel = document.getElementById('filter-level');
if (filterLevel) filterLevel.addEventListener('change', applyExamFilters);

/* ===== MODAL ===== */
let questionCount = 0;

function openModal() {
  questionCount = 0;
  document.getElementById('questions-container').innerHTML = '';
  document.getElementById('q-count').textContent = '0';
  document.getElementById('exam-title-input').value = '';
  switchStep(1);
  document.getElementById('exam-modal').classList.add('open');
}
function closeModal() { document.getElementById('exam-modal').classList.remove('open'); }

function switchStep(n) {
  document.getElementById('step-1').style.display = n === 1 ? 'block' : 'none';
  document.getElementById('step-2').style.display = n === 2 ? 'block' : 'none';
  document.getElementById('tab-btn-1').classList.toggle('active', n === 1);
  document.getElementById('tab-btn-2').classList.toggle('active', n === 2);
  const badge = document.getElementById('step2-badge');
  badge.style.background = n === 2 ? 'var(--red)' : 'var(--gray-300)';
  if (n === 2 && questionCount === 0) addQuestion();
}

function addQuestion() {
  questionCount++;
  document.getElementById('q-count').textContent = questionCount;
  const idx = questionCount;
  const container = document.getElementById('questions-container');
  const card = document.createElement('div');
  card.className = 'q-card';
  card.id = 'q-card-' + idx;
  card.innerHTML = `
    <div class="q-card__header">
      <span class="q-card__num">Câu ${idx}</span>
      <button class="q-card__del" onclick="removeQuestion(${idx})" title="Xóa câu hỏi">
        <span class="material-symbols-rounded" style="font-size:1rem">delete</span>
      </button>
    </div>
    <div class="form-group" style="margin-bottom:14px;">
      <label style="font-size:.8rem;font-weight:800;color:var(--gray-600);margin-bottom:6px;display:block;">Nội dung câu hỏi *</label>
      <textarea class="form-control" rows="2" placeholder="Nhập câu hỏi..." style="resize:vertical;" id="q-text-${idx}"></textarea>
    </div>
    <p style="font-size:.78rem;font-weight:900;color:var(--gray-500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;">
      Đáp án — <span style="color:#22C55E;">chọn ô tròn để đánh dấu đáp án đúng</span>
    </p>
    ${['A','B','C','D'].map((key, i) => `
      <div class="option-row" id="opt-row-${idx}-${i}">
        <div class="option-key-label">${key}</div>
        <input type="text" class="option-input" placeholder="Nhập đáp án ${key}..." id="opt-${idx}-${i}"/>
        <input type="radio" class="correct-radio" name="correct-${idx}" value="${i}"
          title="Đánh dấu là đáp án đúng"
          onchange="markCorrect(${idx}, ${i})"/>
      </div>
    `).join('')}
  `;
  container.appendChild(card);
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function markCorrect(qIdx, optIdx) {
  ['A','B','C','D'].forEach((_, i) => {
    const row = document.getElementById('opt-row-' + qIdx + '-' + i);
    if (row) row.classList.toggle('is-correct', i === optIdx);
  });
}

function removeQuestion(idx) {
  const card = document.getElementById('q-card-' + idx);
  if (card) card.remove();
  questionCount = document.querySelectorAll('.q-card').length;
  document.getElementById('q-count').textContent = questionCount;
}

function saveExam() {
  const title = document.getElementById('exam-title-input').value.trim();
  if (!title) { alert('Vui lòng nhập tên đề thi!'); switchStep(1); return; }
  if (questionCount === 0) { alert('Vui lòng thêm ít nhất 1 câu hỏi!'); return; }
  alert(`Đề thi "${title}" đã được lưu với ${questionCount} câu hỏi!`);
  closeModal();
}

function confirmDelete() {
  if (confirm('Bạn có chắc muốn xóa đề thi này?')) alert('Đã xóa đề thi.');
}

document.getElementById('exam-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
