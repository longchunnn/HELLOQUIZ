/**
 * Trang Thống kê Admin
 */

(function () {
    'use strict';

    // ---- Dữ liệu fix ----
    const STATS_DATA = [
        { stt: 1, name: 'Nguyễn Văn An', mssv: 'B23DCCN001', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '92/100', time: '18m 45s', date: '15/10/2024' },
        { stt: 2, name: 'Trần Thị Bình', mssv: 'B23DCCN002', exam: 'Cuối kỳ - Lập trình Web', status: 'Hoàn thành', score: '84/100', time: '24m 10s', date: '20/11/2024' },
        { stt: 3, name: 'Lê Hoàng Cường', mssv: 'B23DCCN003', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Hoàn thành', score: '76/100', time: '32m 00s', date: '05/09/2024' },
        { stt: 4, name: 'Phạm Minh Đức', mssv: 'B23DCCN004', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '88/100', time: '22m 30s', date: '15/10/2024' },
        { stt: 5, name: 'Hoàng Thị Hương', mssv: 'B23DCCN005', exam: 'Cuối kỳ - Lập trình Web', status: 'Hoàn thành', score: '67/100', time: '35m 55s', date: '20/11/2024' },
        { stt: 6, name: 'Vũ Đình Khôi', mssv: 'B23DCCN006', exam: 'Tuyển sinh 2024', status: 'Hoàn thành', score: '95/100', time: '45m 12s', date: '01/07/2024' },
        { stt: 7, name: 'Đặng Thị Lan', mssv: 'B23DCCN007', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Chưa hoàn thành', score: '—', time: '—', date: '08/09/2024' },
        { stt: 8, name: 'Ngô Quang Minh', mssv: 'B23DCCN008', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '72/100', time: '28m 20s', date: '15/10/2024' },
        { stt: 9, name: 'Chu Thị Nga', mssv: 'B23DCCN009', exam: 'Cuối kỳ - Lập trình Web', status: 'Hoàn thành', score: '91/100', time: '20m 15s', date: '20/11/2024' },
        { stt: 10, name: 'Bùi Văn Phong', mssv: 'B23DCCN010', exam: 'Tuyển sinh 2024', status: 'Hoàn thành', score: '78/100', time: '42m 00s', date: '01/07/2024' },
        { stt: 11, name: 'Đinh Thị Quỳnh', mssv: 'B23DCCN011', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '85/100', time: '25m 40s', date: '15/10/2024' },
        { stt: 12, name: 'Lý Minh Tuấn', mssv: 'B23DCCN012', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Hoàn thành', score: '70/100', time: '30m 22s', date: '12/09/2024' },
        { stt: 13, name: 'Kim Anh Thư', mssv: 'B23DCCN013', exam: 'Cuối kỳ - Lập trình Web', status: 'Hoàn thành', score: '82/100', time: '26m 18s', date: '20/11/2024' },
        { stt: 14, name: 'Hồ Sỹ Việt', mssv: 'B23DCCN014', exam: 'Tuyển sinh 2024', status: 'Hoàn thành', score: '89/100', time: '40m 05s', date: '01/07/2024' },
        { stt: 15, name: 'Mai Thị Xuân', mssv: 'B23DCCN015', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '79/100', time: '27m 50s', date: '15/10/2024' },
        { stt: 16, name: 'Tạ Đức Dũng', mssv: 'B23DCCN016', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Hoàn thành', score: '94/100', time: '19m 33s', date: '05/09/2024' },
        { stt: 17, name: 'Phan Thị Hà', mssv: 'B23DCCN017', exam: 'Cuối kỳ - Lập trình Web', status: 'Chưa hoàn thành', score: '—', time: '—', date: '20/11/2024' },
        { stt: 18, name: 'Võ Minh Khoa', mssv: 'B23DCCN018', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '81/100', time: '23m 45s', date: '15/10/2024' },
        { stt: 19, name: 'Trương Thị Linh', mssv: 'B23DCCN019', exam: 'Tuyển sinh 2024', status: 'Hoàn thành', score: '86/100', time: '43m 20s', date: '01/07/2024' },
        { stt: 20, name: 'Lâm Văn Nam', mssv: 'B23DCCN020', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Hoàn thành', score: '73/100', time: '31m 10s', date: '08/09/2024' },
        { stt: 21, name: 'Huỳnh Thị Oanh', mssv: 'B23DCCN021', exam: 'Cuối kỳ - Lập trình Web', status: 'Hoàn thành', score: '90/100', time: '21m 00s', date: '20/11/2024' },
        { stt: 22, name: 'Cao Minh Phát', mssv: 'B23DCCN022', exam: 'Giữa kỳ - Toán cao cấp', status: 'Hoàn thành', score: '68/100', time: '33m 55s', date: '15/10/2024' },
        { stt: 23, name: 'Dương Thị Quế', mssv: 'B23DCCN023', exam: 'Tuyển sinh 2024', status: 'Hoàn thành', score: '92/100', time: '44m 18s', date: '01/07/2024' },
        { stt: 24, name: 'Tô Văn Sơn', mssv: 'B23DCCN024', exam: 'Luyện tập - Cấu trúc dữ liệu', status: 'Hoàn thành', score: '77/100', time: '29m 40s', date: '12/09/2024' },
    ];

    const SCORE_DISTRIBUTION = {
        labels: ['0-20', '20-40', '40-60', '60-80', '80-90', '90-100'],
        data: [18, 42, 156, 312, 198, 88],
    };

    let currentPage = 1;
    const PAGE_SIZE = 10;
    let filteredData = STATS_DATA.slice();

    const primaryColor = '#d2232a';

    function parseScore(scoreStr) {
        if (!scoreStr || scoreStr === '—') return null;
        var m = String(scoreStr).match(/^(\d+)\/\d+$/);
        return m ? parseInt(m[1], 10) : null;
    }

    function examKeyToLabel(key) {
        var map = { gk: 'Giữa kỳ - Toán cao cấp', ck: 'Cuối kỳ - Lập trình Web', lt: 'Luyện tập - Cấu trúc dữ liệu', tn: 'Tuyển sinh 2024' };
        return map[key] || '';
    }

    function rowMatchesExam(row, examId) {
        if (!examId) return false;
        if (examId === 'gk') return row.exam.indexOf('Giữa kỳ') >= 0;
        if (examId === 'ck') return row.exam.indexOf('Cuối kỳ') >= 0;
        if (examId === 'lt') return row.exam.indexOf('Luyện tập') >= 0;
        if (examId === 'tn') return row.exam.indexOf('Tuyển sinh') >= 0;
        return false;
    }
    const primaryLight = 'rgba(210, 35, 42, 0.2)';

    // ---- Render bảng ----
    function renderTable() {
        const tbody = document.getElementById('statsTableBody');
        const start = (currentPage - 1) * PAGE_SIZE;
        const slice = filteredData.slice(start, start + PAGE_SIZE);

        tbody.innerHTML = slice.map(function (row) {
            const statusClass = row.status === 'Hoàn thành' ? 'badge--live' : 'badge--draft';
            return (
                '<tr>' +
                '<td>' + row.stt + '</td>' +
                '<td>' + row.name + '</td>' +
                '<td>' + row.mssv + '</td>' +
                '<td>' + row.exam + '</td>' +
                '<td><span class="badge ' + statusClass + '">' + row.status + '</span></td>' +
                '<td>' + row.score + '</td>' +
                '<td>' + row.time + '</td>' +
                '<td>' + row.date + '</td>' +
                '</tr>'
            );
        }).join('');

        document.getElementById('statsTotalRows').textContent = filteredData.length;

        document.getElementById('pagPrev').disabled = currentPage <= 1;
        document.getElementById('pagNext').disabled = currentPage >= Math.ceil(filteredData.length / PAGE_SIZE);
    }

    // ---- Biểu đồ phân phối điểm ----
    let scoreChart = null;

    function initScoreChart() {
        const ctx = document.getElementById('scoreDistributionChart');
        if (!ctx) return;

        const isDark = document.documentElement.classList.contains('dark');
        const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
        const textColor = isDark ? '#94a3b8' : '#64748b';

        scoreChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: SCORE_DISTRIBUTION.labels,
                datasets: [{
                    label: 'Số sinh viên',
                    data: SCORE_DISTRIBUTION.data,
                    backgroundColor: SCORE_DISTRIBUTION.data.map(function (_, i) {
                        return i === 3 ? primaryColor : primaryLight;
                    }),
                    borderColor: primaryColor,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleFont: { family: 'Plus Jakarta Sans', size: 12 },
                        bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
                    },
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: textColor },
                    },
                    y: {
                        grid: { color: gridColor },
                        ticks: { font: { family: 'Plus Jakarta Sans', size: 11 }, color: textColor },
                    },
                },
            },
        });
    }

    // ---- Lọc ----
    function applyFilter() {
        var examId = document.getElementById('filterExam').value;
        var dateFrom = document.getElementById('filterDateFrom').value;
        var dateTo = document.getElementById('filterDateTo').value;
        var scoreMinRaw = document.getElementById('filterScoreMin').value.trim();
        var scoreMaxRaw = document.getElementById('filterScoreMax').value.trim();
        var scoreMin = scoreMinRaw === '' ? null : parseInt(scoreMinRaw, 10);
        var scoreMax = scoreMaxRaw === '' ? null : parseInt(scoreMaxRaw, 10);

        filteredData = STATS_DATA.filter(function (row) {
            var examMatch = !examId || (examId === 'gk' && row.exam.indexOf('Giữa kỳ') >= 0) ||
                (examId === 'ck' && row.exam.indexOf('Cuối kỳ') >= 0) ||
                (examId === 'lt' && row.exam.indexOf('Luyện tập') >= 0) ||
                (examId === 'tn' && row.exam.indexOf('Tuyển sinh') >= 0);
            if (!examMatch) return false;
            var d = row.date.split('/');
            var rowDate = d[2] + '-' + d[1] + '-' + d[0];
            if (dateFrom && rowDate < dateFrom) return false;
            if (dateTo && rowDate > dateTo) return false;
            var numScore = parseScore(row.score);
            if (numScore === null) {
                if (scoreMin != null || scoreMax != null) return false;
            } else {
                if (scoreMin != null && numScore < scoreMin) return false;
                if (scoreMax != null && numScore > scoreMax) return false;
            }
            return true;
        });

        currentPage = 1;
        renderTable();
        renderRanking(document.getElementById('rankingExam').value);
    }

    function resetFilter() {
        document.getElementById('filterExam').value = '';
        document.getElementById('filterDateFrom').value = '2024-01-01';
        document.getElementById('filterDateTo').value = '2024-12-31';
        document.getElementById('filterScoreMin').value = '';
        document.getElementById('filterScoreMax').value = '';
        filteredData = STATS_DATA.slice();
        currentPage = 1;
        renderTable();
        renderRanking(document.getElementById('rankingExam').value);
    }

    // ---- Bảng xếp hạng theo môn ----
    function getRankingByExam(examId) {
        if (!examId) return [];
        var rows = filteredData.filter(function (r) { return rowMatchesExam(r, examId); });
        var withScore = rows.map(function (r) {
            return { name: r.name, mssv: r.mssv, score: r.score, scoreNum: parseScore(r.score), time: r.time, date: r.date };
        }).filter(function (r) { return r.scoreNum != null; });
        withScore.sort(function (a, b) { return b.scoreNum - a.scoreNum; });
        return withScore.map(function (r, i) {
            return { rank: i + 1, name: r.name, mssv: r.mssv, score: r.score, time: r.time, date: r.date };
        });
    }

    function renderRanking(examId) {
        var placeholder = document.getElementById('rankingPlaceholder');
        var tableWrap = document.getElementById('rankingTableWrap');
        var tbody = document.getElementById('rankingTableBody');
        if (!examId) {
            placeholder.hidden = false;
            tableWrap.hidden = true;
            return;
        }
        var list = getRankingByExam(examId);
        if (list.length === 0) {
            placeholder.hidden = false;
            tableWrap.hidden = true;
            placeholder.querySelector('p').textContent = 'Không có dữ liệu xếp hạng cho kỳ thi này (hoặc không có bài hoàn thành).';
            return;
        }
        placeholder.hidden = true;
        tableWrap.hidden = false;
        placeholder.querySelector('p').textContent = 'Chọn một kỳ thi ở trên để xem bảng xếp hạng';
        tbody.innerHTML = list.map(function (r) {
            var rowClass = r.rank <= 3 ? ' ranking-row ranking-row--' + r.rank : '';
            var rankContent = r.rank <= 3 ? '<span class="ranking-medal ranking-medal--' + r.rank + '">' + r.rank + '</span>' : r.rank;
            return '<tr class="' + rowClass + '"><td class="ranking-rank-cell">' + rankContent + '</td><td>' + r.name + '</td><td>' + r.mssv + '</td><td>' + r.score + '</td><td>' + r.time + '</td><td>' + r.date + '</td></tr>';
        }).join('');
    }

    // ---- Xuất PDF ----
    function exportPdf() {
        window.print();
    }

    // ---- Pagination ----
    function bindEvents() {
        document.getElementById('btnApplyFilter').addEventListener('click', applyFilter);
        document.getElementById('btnResetFilter').addEventListener('click', resetFilter);
        document.getElementById('btnExportPdf').addEventListener('click', exportPdf);
        document.getElementById('rankingExam').addEventListener('change', function () {
            renderRanking(this.value);
        });

        document.getElementById('pagPrev').addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        document.getElementById('pagNext').addEventListener('click', function () {
            if (currentPage < Math.ceil(filteredData.length / PAGE_SIZE)) {
                currentPage++;
                renderTable();
            }
        });
    }

    // Dark mode: cập nhật màu biểu đồ
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class' && scoreChart) {
                var isDark = document.documentElement.classList.contains('dark');
                scoreChart.options.scales.y.grid.color = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
                scoreChart.options.scales.x.ticks.color = isDark ? '#94a3b8' : '#64748b';
                scoreChart.options.scales.y.ticks.color = isDark ? '#94a3b8' : '#64748b';
                scoreChart.update();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });

    renderTable();
    initScoreChart();
    bindEvents();
    renderRanking(document.getElementById('rankingExam').value);
})();
