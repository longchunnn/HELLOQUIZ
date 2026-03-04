// admin-user-manager.js — User manager: search/filter table rows, modal

/* ===== SIDEBAR ===== */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }

/* ===== SEARCH & FILTER ===== */
function applyUserFilters() {
  const q      = document.getElementById('user-search-input').value.toLowerCase();
  const role   = document.getElementById('filter-role').value;
  const status = document.getElementById('filter-status').value;

  document.querySelectorAll('#user-tbody tr').forEach(row => {
    const text       = row.textContent.toLowerCase();
    const matchQ      = !q      || text.includes(q);
    const matchRole   = !role   || row.dataset.role   === role;
    const matchStatus = !status || row.dataset.status === status;
    row.style.display = (matchQ && matchRole && matchStatus) ? '' : 'none';
  });
}

document.getElementById('user-search-input').addEventListener('input', applyUserFilters);
document.getElementById('filter-role').addEventListener('change', applyUserFilters);
document.getElementById('filter-status').addEventListener('change', applyUserFilters);

/* ===== MODAL ===== */
function openModal() { document.getElementById('user-modal').classList.add('open'); }
function closeModal() { document.getElementById('user-modal').classList.remove('open'); }
function saveUser() { alert('Người dùng đã được lưu!'); closeModal(); }
function confirmDelete() {
  if (confirm('Bạn có chắc muốn xóa người dùng này?')) alert('Đã xóa người dùng.');
}
document.getElementById('user-modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
