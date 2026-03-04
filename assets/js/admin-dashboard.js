// admin-dashboard.js — Admin dashboard charts and sidebar toggle

const lineCtx = document.getElementById('activityChart').getContext('2d');
new Chart(lineCtx, {
  type: 'bar',
  data: {
    labels: ['T2','T3','T4','T5','T6','T7','CN'],
    datasets: [{
      label: 'Lượt thi',
      data: [980, 1120, 890, 1380, 1420, 1680, 1284],
      backgroundColor: 'rgba(220,38,38,.8)',
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } },
      x: { grid: { display: false }, ticks: { font: { family: 'Nunito' } } }
    }
  }
});

const donutCtx = document.getElementById('subjectChart').getContext('2d');
new Chart(donutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Toán học', 'Vật lý', 'Hóa học', 'Sinh học', 'Tiếng Anh', 'Lịch sử'],
    datasets: [{
      data: [28, 18, 15, 12, 16, 11],
      backgroundColor: ['#DC2626','#3B82F6','#F97316','#22C55E','#A855F7','#EAB308'],
      borderWidth: 0, hoverOffset: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false, cutout: '65%',
    plugins: { legend: { position: 'bottom', labels: { font: { family: 'Nunito', weight: '700' }, boxWidth: 12 } } }
  }
});

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
