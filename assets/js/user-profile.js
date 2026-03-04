// user-profile.js — Tab switching and profile save

function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}

function saveProfile(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  btn.textContent = '✓ Đã lưu!';
  btn.style.background = '#22C55E';
  setTimeout(() => {
    btn.innerHTML = '<span class="material-symbols-rounded" style="font-size:1rem">save</span> Lưu thay đổi';
    btn.style.background = '';
  }, 2000);
}

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
