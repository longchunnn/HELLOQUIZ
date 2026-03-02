// admin.html - Participation Chart Logic
const ctx = document.getElementById('participationChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Participation',
            data: [800, 1100, 950, 1420, 1200, 700, 1100],
            borderColor: '#d2232a',
            backgroundColor: 'rgba(210, 35, 42, 0.05)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#d2232a',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#1e293b',
                titleFont: { family: 'Plus Jakarta Sans', size: 12 },
                bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
                padding: 10,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: { family: 'Plus Jakarta Sans', size: 10 },
                    color: '#94a3b8'
                }
            },
            y: {
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    font: { family: 'Plus Jakarta Sans', size: 10 },
                    color: '#94a3b8'
                }
            }
        }
    }
});

// Toggle dark mode and update chart colors
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark');
            chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
            chart.update();
        }
    });
});
observer.observe(document.documentElement, { attributes: true });

document.getElementById('create-exam').addEventListener('click',function(){
    window.location.href = 'creat.html';
});