/**
 * Trang Kết quả theo sinh viên 
 */

(function () {
    'use strict';

    // ---- Dữ liệu fix: sinh viên và kỳ thi + chi tiết câu hỏi ----
    var STUDENTS = [
        {
            id: 'sv1',
            name: 'Nguyễn Văn An',
            mssv: 'B23DCCN001',
            email: 'nguyenvanan@student.ptit.edu.vn',
            initial: 'A',
            exams: [
                {
                    examId: 'gk1',
                    examName: 'Giữa kỳ - Toán cao cấp',
                    status: 'Hoàn thành',
                    score: '92/100',
                    time: '18m 45s',
                    date: '15/10/2024',
                    details: [
                        {
                            question: 'Giới hạn lim(x→0) sin(x)/x bằng bao nhiêu?',
                            options: ['0', '1', '∞', 'Không tồn tại'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'Đây là giới hạn cơ bản trong giải tích. lim(x→0) sin(x)/x = 1.'
                        },
                        {
                            question: 'Đạo hàm của hàm số f(x) = x² là:',
                            options: ['x', '2x', 'x²', '2'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'Quy tắc đạo hàm (x^n)\' = n.x^(n-1) nên (x²)\' = 2x.'
                        },
                        {
                            question: 'Tích phân ∫₀¹ x dx bằng:',
                            options: ['0', '1/2', '1', '2'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: '∫ x dx = x²/2, thay cận 0 và 1 ta được 1/2.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sv2',
            name: 'Trần Thị Bình',
            mssv: 'B23DCCN002',
            email: 'tranthibinh@student.ptit.edu.vn',
            initial: 'B',
            exams: [
                {
                    examId: 'ck1',
                    examName: 'Cuối kỳ - Lập trình Web',
                    status: 'Hoàn thành',
                    score: '84/100',
                    time: '24m 10s',
                    date: '20/11/2024',
                    details: [
                        {
                            question: 'Thẻ HTML nào dùng để tạo tiêu đề lớn nhất?',
                            options: ['<h2>', '<head>', '<h1>', '<header>'],
                            studentAnswer: 2,
                            correctAnswer: 2,
                            explanation: 'Thẻ <h1> dùng cho tiêu đề cấp 1 (lớn nhất).'
                        },
                        {
                            question: 'CSS viết tắt của cụm từ nào?',
                            options: ['Computer Style Sheet', 'Cascading Style Sheet', 'Creative Style Sheet', 'Colorful Style Sheet'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'Cascading Style Sheets - định dạng giao diện trang web.'
                        },
                        {
                            question: 'JavaScript là ngôn ngữ loại gì?',
                            options: ['Biên dịch', 'Thông dịch', 'Assembly', 'Đánh dấu'],
                            studentAnswer: 0,
                            correctAnswer: 1,
                            explanation: 'JavaScript thường chạy dưới dạng thông dịch (interpreted) trong trình duyệt.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sv3',
            name: 'Lê Hoàng Cường',
            mssv: 'B23DCCN003',
            email: 'lehoangcuong@student.ptit.edu.vn',
            initial: 'C',
            exams: [
                {
                    examId: 'lt1',
                    examName: 'Luyện tập - Cấu trúc dữ liệu',
                    status: 'Hoàn thành',
                    score: '76/100',
                    time: '32m 00s',
                    date: '05/09/2024',
                    details: [
                        {
                            question: 'Cấu trúc dữ liệu nào hoạt động theo nguyên tắc LIFO?',
                            options: ['Hàng đợi', 'Ngăn xếp', 'Cây', 'Danh sách liên kết'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'Stack (ngăn xếp) - Last In First Out.'
                        },
                        {
                            question: 'Độ phức tạp thời gian của tìm kiếm tuyến tính trên mảng n phần tử?',
                            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                            studentAnswer: 2,
                            correctAnswer: 2,
                            explanation: 'Duyệt từng phần tử nên là O(n).'
                        },
                        {
                            question: 'Cây nhị phân tìm kiếm (BST): nút con trái có giá trị thế nào so với nút gốc?',
                            options: ['Lớn hơn', 'Nhỏ hơn', 'Bằng', 'Tùy thuộc'],
                            studentAnswer: 0,
                            correctAnswer: 1,
                            explanation: 'Trong BST, nút trái nhỏ hơn gốc, nút phải lớn hơn gốc.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sv4',
            name: 'Phạm Minh Đức',
            mssv: 'B23DCCN004',
            email: 'phamminhduc@student.ptit.edu.vn',
            initial: 'D',
            exams: [
                {
                    examId: 'gk1',
                    examName: 'Giữa kỳ - Toán cao cấp',
                    status: 'Hoàn thành',
                    score: '88/100',
                    time: '22m 30s',
                    date: '15/10/2024',
                    details: [
                        {
                            question: 'Giới hạn lim(x→0) sin(x)/x bằng bao nhiêu?',
                            options: ['0', '1', '∞', 'Không tồn tại'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'Giới hạn cơ bản: lim(x→0) sin(x)/x = 1.'
                        },
                        {
                            question: 'Đạo hàm của hàm số f(x) = x² là:',
                            options: ['x', '2x', 'x²', '2'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: '(x²)\' = 2x.'
                        },
                        {
                            question: 'Tích phân ∫₀¹ x dx bằng:',
                            options: ['0', '1/2', '1', '2'],
                            studentAnswer: 0,
                            correctAnswer: 1,
                            explanation: '∫ x dx = x²/2; thay cận [0,1] được 1/2.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sv5',
            name: 'Hoàng Thị Hương',
            mssv: 'B23DCCN005',
            email: 'hoangthihuong@student.ptit.edu.vn',
            initial: 'H',
            exams: [
                {
                    examId: 'ck1',
                    examName: 'Cuối kỳ - Lập trình Web',
                    status: 'Hoàn thành',
                    score: '67/100',
                    time: '35m 55s',
                    date: '20/11/2024',
                    details: [
                        {
                            question: 'Thẻ HTML nào dùng để tạo tiêu đề lớn nhất?',
                            options: ['<h2>', '<head>', '<h1>', '<header>'],
                            studentAnswer: 2,
                            correctAnswer: 2,
                            explanation: 'Thẻ <h1> dùng cho tiêu đề cấp 1.'
                        },
                        {
                            question: 'CSS viết tắt của cụm từ nào?',
                            options: ['Computer Style Sheet', 'Cascading Style Sheet', 'Creative Style Sheet', 'Colorful Style Sheet'],
                            studentAnswer: 0,
                            correctAnswer: 1,
                            explanation: 'Cascading Style Sheets.'
                        },
                        {
                            question: 'JavaScript là ngôn ngữ loại gì?',
                            options: ['Biên dịch', 'Thông dịch', 'Assembly', 'Đánh dấu'],
                            studentAnswer: 1,
                            correctAnswer: 1,
                            explanation: 'JavaScript là ngôn ngữ thông dịch.'
                        }
                    ]
                }
            ]
        }
    ];

    var currentStudent = null;
    var currentExamDetail = null;

    function normalize(str) {
        return (str || '').toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function searchStudent() {
        var q = normalize(document.getElementById('studentSearch').value);
        if (!q) {
            alert('Vui lòng nhập tên hoặc mã số sinh viên.');
            return;
        }
        var found = STUDENTS.filter(function (s) {
            return normalize(s.name).indexOf(q) >= 0 || normalize(s.mssv).indexOf(q) >= 0;
        });
        if (found.length === 0) {
            alert('Không tìm thấy sinh viên nào phù hợp. Thử B23DCCN001, B23DCCN002, Nguyễn Văn An, Trần Thị Bình.');
            return;
        }
        currentStudent = found[0];
        showStudent(currentStudent);
        hideDetail();
    }

    function showStudent(student) {
        document.getElementById('studentInfoAvatar').textContent = student.initial;
        document.getElementById('studentInfoName').textContent = student.name;
        document.getElementById('studentInfoMssv').textContent = 'Mã SV: ' + student.mssv;
        document.getElementById('studentInfoEmail').textContent = student.email;
        document.getElementById('studentInfoCard').hidden = false;

        var tbody = document.getElementById('examsTableBody');
        tbody.innerHTML = student.exams.map(function (exam, i) {
            var statusClass = exam.status === 'Hoàn thành' ? 'badge--live' : 'badge--draft';
            return (
                '<tr data-exam-index="' + i + '">' +
                '<td>' + exam.examName + '</td>' +
                '<td><span class="badge ' + statusClass + '">' + exam.status + '</span></td>' +
                '<td>' + exam.score + '</td>' +
                '<td>' + exam.time + '</td>' +
                '<td>' + exam.date + '</td>' +
                '<td style="text-align:right">' +
                '<button type="button" class="action-btn action-btn--edit btn-view-detail" data-exam-index="' + i + '">' +
                '<span class="material-icons-round" style="font-size:1rem">visibility</span> Xem chi tiết' +
                '</button>' +
                '</td>' +
                '</tr>'
            );
        }).join('');

        document.getElementById('examsSection').hidden = false;

        tbody.querySelectorAll('.btn-view-detail').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(this.getAttribute('data-exam-index'), 10);
                showExamDetail(student, student.exams[idx]);
            });
        });
    }

    function showExamDetail(student, exam) {
        currentExamDetail = { student: student, exam: exam };
        document.getElementById('detailExamTitle').textContent = 'Chi tiết: ' + exam.examName;
        document.getElementById('detailScore').textContent = exam.score;
        document.getElementById('detailStatus').textContent = exam.status;
        document.getElementById('detailTime').textContent = exam.time;

        var container = document.getElementById('detailQuestions');
        container.innerHTML = (exam.details || []).map(function (q, i) {
            var isCorrect = q.studentAnswer === q.correctAnswer;
            var cardClass = isCorrect ? 'correct' : 'incorrect';
            var optionsHtml = q.options.map(function (opt, j) {
                var c = [];
                if (j === q.studentAnswer) c.push('student-answer');
                if (j === q.correctAnswer) c.push('correct-answer');
                if (j === q.studentAnswer && j !== q.correctAnswer) c.push('incorrect');
                return '<div class="q-option ' + c.join(' ') + '">' + (j + 1) + '. ' + opt + '</div>';
            }).join('');
            var expl = q.explanation ? '<div class="q-explanation"><strong>Giải thích:</strong> ' + q.explanation + '</div>' : '';
            return (
                '<div class="question-detail-card ' + cardClass + '">' +
                '<div class="q-number">Câu ' + (i + 1) + '</div>' +
                '<div class="q-text">' + q.question + '</div>' +
                '<div class="q-options">' + optionsHtml + '</div>' +
                expl +
                '</div>'
            );
        }).join('');

        document.getElementById('detailSection').hidden = false;
        document.getElementById('detailSection').scrollIntoView({ behavior: 'smooth' });
    }

    function hideDetail() {
        document.getElementById('detailSection').hidden = true;
        currentExamDetail = null;
    }

    function exportReport() {
        if (!currentStudent) {
            alert('Vui lòng tìm kiếm và chọn sinh viên trước.');
            return;
        }
        var s = currentStudent;
        var html = '<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8"><title>Báo cáo kết quả - ' + s.name + '</title>';
        html += '<style>body{font-family:Plus Jakarta Sans,sans-serif;padding:2rem;color:#0f172a;} table{border-collapse:collapse;width:100%;} th,td{border:1px solid #e2e8f0;padding:10px;text-align:left;} th{background:#f8fafc;} h1{color:#d2232a;} h2{margin-top:1.5rem;}</style></head><body>';
        html += '<div class="print-report">';
        html += '<h1>Báo cáo kết quả thi - Hello Quizz</h1>';
        html += '<p><strong>Sinh viên:</strong> ' + s.name + '</p>';
        html += '<p><strong>Mã SV:</strong> ' + s.mssv + '</p>';
        html += '<p><strong>Email:</strong> ' + s.email + '</p>';
        html += '<p><strong>Ngày xuất:</strong> ' + new Date().toLocaleDateString('vi-VN') + '</p>';
        html += '<h2>Danh sách kỳ thi đã tham gia</h2>';
        html += '<table><tr><th>Kỳ thi</th><th>Trạng thái</th><th>Điểm</th><th>Thời gian</th><th>Ngày thi</th></tr>';
        s.exams.forEach(function (e) {
            html += '<tr><td>' + e.examName + '</td><td>' + e.status + '</td><td>' + e.score + '</td><td>' + e.time + '</td><td>' + e.date + '</td></tr>';
        });
        html += '</table>';
        if (currentExamDetail && currentExamDetail.exam) {
            var ex = currentExamDetail.exam;
            html += '<h2>Chi tiết: ' + ex.examName + '</h2>';
            html += '<p>Điểm: ' + ex.score + ' | Trạng thái: ' + ex.status + ' | Thời gian: ' + ex.time + '</p>';
            (ex.details || []).forEach(function (q, i) {
                html += '<div style="margin-bottom:1rem; padding:0.75rem; border:1px solid #e2e8f0; border-radius:8px;">';
                html += '<p><strong>Câu ' + (i + 1) + ':</strong> ' + q.question + '</p>';
                html += '<p>Đáp án sinh viên chọn: ' + (q.options[q.studentAnswer] || '—') + '</p>';
                html += '<p>Đáp án đúng: ' + (q.options[q.correctAnswer] || '—') + '</p>';
                if (q.explanation) html += '<p><em>Giải thích: ' + q.explanation + '</em></p>';
                html += '</div>';
            });
        } else {
            html += '<p><em>Mở "Xem chi tiết" một kỳ thi để in kèm nội dung câu hỏi và đáp án.</em></p>';
        }
        html += '</div></body></html>';
        var w = window.open('', '_blank');
        w.document.write(html);
        w.document.close();
        w.focus();
        w.onload = function () { w.print(); };
    }

    document.getElementById('btnSearch').addEventListener('click', searchStudent);
    document.getElementById('studentSearch').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') searchStudent();
    });
    document.getElementById('btnCloseDetail').addEventListener('click', hideDetail);
    document.getElementById('btnExportReport').addEventListener('click', exportReport);
})();
