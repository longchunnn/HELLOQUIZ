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
  const searchInputEl = document.getElementById('user-search-input');
  const roleEl        = document.getElementById('filter-role');
  const statusEl      = document.getElementById('filter-status');

  const q = (searchInputEl?.value || '').toLowerCase();

  let role = roleEl ? roleEl.value : '';
  if (role === 'Tất cả vai trò') role = '';

  let status = statusEl ? statusEl.value : '';
  if (status === 'Tất cả trạng thái') status = '';

  document.querySelectorAll('#user-tbody tr').forEach(row => {
    const text        = row.textContent.toLowerCase();
    const matchQ      = !q      || text.includes(q);
    const matchRole   = !role   || row.dataset.role   === role;
    const matchStatus = !status || row.dataset.status === status;
    row.style.display = (matchQ && matchRole && matchStatus) ? '' : 'none';
  });
}

const userSearchInput = document.getElementById('user-search-input');
if (userSearchInput) userSearchInput.addEventListener('input', applyUserFilters);
const filterRole = document.getElementById('filter-role');
if (filterRole) filterRole.addEventListener('change', applyUserFilters);
const filterStatusUser = document.getElementById('filter-status');
if (filterStatusUser) filterStatusUser.addEventListener('change', applyUserFilters);

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
