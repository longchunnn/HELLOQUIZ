// exam-result.js — Animate score circle and sidebar toggle

window.addEventListener('load', () => {
  const circle = document.getElementById('score-circle');
  const circumference = 2 * Math.PI * 70;
  const score = 8/10;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  setTimeout(() => {
    circle.style.strokeDashoffset = circumference * (1 - score);
  }, 300);
});

function printPage() { window.print(); }

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
}
