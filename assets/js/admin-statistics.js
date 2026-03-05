// admin-statistics.js — Statistics page charts and sidebar toggle

// Trend chart
new Chart(document.getElementById('trendChart'), {
  type: 'line',
  data: {
    labels: ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'],
    datasets: [
      { label: 'Điểm TB', data: [6.2,6.4,6.1,6.8,6.6,7.0,6.9,7.2,7.0,7.4,7.1,7.8], borderColor: '#DC2626', backgroundColor: 'rgba(220,38,38,.08)', borderWidth: 2.5, tension: 0.4, fill: true, pointRadius: 3 },
      { label: 'Điểm cao nhất', data: [9.2,9.5,9.0,9.8,9.6,9.7,9.5,9.9,9.6,10,9.8,10], borderColor: '#22C55E', borderWidth: 2, tension: 0.4, pointRadius: 3 }
    ]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { font: { family: 'Nunito' } } } }, scales: { y: { min: 0, max: 10, grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } }, x: { grid: { display: false }, ticks: { font: { family: 'Nunito' } } } } }
});

// Distribution chart
new Chart(document.getElementById('distChart'), {
  type: 'bar',
  data: {
    labels: ['0-2', '2-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'],
    datasets: [{ label: 'Số học sinh', data: [120, 280, 420, 860, 1240, 1580, 820, 460], backgroundColor: ['#EF4444','#F97316','#F97316','#EAB308','#3B82F6','#3B82F6','#22C55E','#22C55E'], borderRadius: 6 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } }, x: { grid: { display: false }, ticks: { font: { family: 'Nunito' } } } } }
});

// Subject avg
new Chart(document.getElementById('subjectAvgChart'), {
  type: 'bar', indexAxis: 'y',
  data: {
    labels: ['Toán', 'Lý', 'Hóa', 'Sinh', 'Anh', 'Sử'],
    datasets: [{ data: [7.2, 6.8, 6.5, 7.0, 7.5, 6.9], backgroundColor: '#DC2626', borderRadius: 6 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { min: 0, max: 10, grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } }, y: { grid: { display: false }, ticks: { font: { family: 'Nunito', weight: '700' } } } } }
});

// Peak hours
new Chart(document.getElementById('peakChart'), {
  type: 'line',
  data: {
    labels: ['7h','9h','11h','13h','15h','17h','19h','21h'],
    datasets: [{ label: 'Lượt thi', data: [120, 380, 280, 420, 680, 920, 1280, 840], borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,.1)', borderWidth: 2.5, tension: 0.4, fill: true, pointRadius: 3 }]
  },
  options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Nunito' } } }, x: { grid: { display: false }, ticks: { font: { family: 'Nunito' } } } } }
});

const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});
function closeSidebar() { sidebar.classList.remove('open'); overlay.style.display = 'none'; }
