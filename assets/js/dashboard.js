// dashboard.js — Dashboard charts and sidebar toggle

// Charts
const lineCtx = document.getElementById('progressChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['T2','T3','T4','T5','T6','T7','CN'],
    datasets: [{
      label: 'Điểm trung bình',
      data: [6.5, 7.0, 6.8, 8.0, 7.5, 8.5, 9.0],
      borderColor: '#DC2626',
      backgroundColor: 'rgba(220,38,38,.08)',
      borderWidth: 2.5,
      pointRadius: 4,
      pointBackgroundColor: '#DC2626',
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 10, grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } },
      x: { grid: { display: false }, ticks: { font: { family: 'Nunito' } } }
    }
  }
});

const donutCtx = document.getElementById('scoreChart').getContext('2d');
new Chart(donutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Xuất sắc (≥9)', 'Tốt (7-8.9)', 'TB (5-6.9)', 'Yếu (<5)'],
    datasets: [{
      data: [8, 14, 7, 3],
      backgroundColor: ['#22C55E','#3B82F6','#F97316','#EF4444'],
      borderWidth: 0,
      hoverOffset: 6,
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Nunito', weight: '700' }, boxWidth: 12 } }
    }
  }
});

// Mobile sidebar
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
