// Tìm các phần tử trên giao diện
const btnAddQuestion = document.getElementById('btnAddQuestion');
const questionsContainer = document.getElementById('questions-container');

// Hàm: Tự động đánh lại số thứ tự cho toàn bộ câu hỏi
function updateQuestionNumbers() {
    // Tìm tất cả các thẻ có class là 'question-card' nằm trong container
    const allQuestions = questionsContainer.querySelectorAll('.question-card');
    
    // Lặp qua từng câu hỏi và sửa lại con số
    allQuestions.forEach((question, index) => {
        const badge = question.querySelector('.question-badge');
        if (badge) {
            // index bắt đầu từ 0, nên cộng 1 để ra số thứ tự (1, 2, 3...)
            badge.textContent = `Question #${index + 1}`;
        }
    });
}

if (btnAddQuestion && questionsContainer) {
    
    // 1. SỰ KIỆN KHI BẤM NÚT "ADD ANOTHER QUESTION"
    btnAddQuestion.addEventListener('click', function() {
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('question-card');
        
        // Lưu ý: Mình đã XÓA đoạn onclick="this.closest..." ở nút delete trong chuỗi HTML này
        newQuestion.innerHTML = `
            <div class="question-card__header">
                <span class="question-badge"></span> 
                <button type="button" class="question-delete-btn">
                    <span class="material-icons-round">delete</span>
                </button>
            </div>
            <div class="question-body">
                <div>
                    <textarea class="question-textarea" placeholder="Enter your question here..."></textarea>
                    <div class="answer-grid">
                        <div class="answer-option"><span class="answer-letter">A</span><input class="answer-input" placeholder="Option A" type="text"/><input class="answer-checkbox" type="checkbox"/></div>
                        <div class="answer-option"><span class="answer-letter">B</span><input class="answer-input" placeholder="Option B" type="text"/><input class="answer-checkbox" type="checkbox"/></div>
                        <div class="answer-option"><span class="answer-letter">C</span><input class="answer-input" placeholder="Option C" type="text"/><input class="answer-checkbox" type="checkbox"/></div>
                        <div class="answer-option"><span class="answer-letter">D</span><input class="answer-input" placeholder="Option D" type="text"/><input class="answer-checkbox" type="checkbox"/></div>
                    </div>
                </div>
                <div class="image-drop">
                    <span class="material-icons-round">add_photo_alternate</span>
                    <span class="image-drop__label">Upload Image/SVG</span>
                    <p class="image-drop__hint">Optional helper image</p>
                </div>
            </div>
        `;

        // Thêm câu hỏi vào container
        questionsContainer.appendChild(newQuestion);
        
        // Gọi hàm để đánh lại số thứ tự
        updateQuestionNumbers();
    });

    // 2. SỰ KIỆN KHI BẤM NÚT "DELETE" CHO BẤT KỲ CÂU HỎI NÀO (Kể cả câu có sẵn hay câu mới thêm)
    questionsContainer.addEventListener('click', function(event) {
        // Kiểm tra xem vị trí người dùng click có phải là nút delete (hoặc icon sọt rác) không
        const deleteBtn = event.target.closest('.question-delete-btn');
        
        if (deleteBtn) {
            // Xác nhận trước khi xóa (bạn có thể bỏ qua alert này nếu muốn xóa luôN)
            if(confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
                // Xóa cả khối question-card chứa nút delete đó
                deleteBtn.closest('.question-card').remove();
                
                // Bắt buộc: Đánh lại số thứ tự sau khi xóa
                updateQuestionNumbers();
            }
        }
    });

} else {
    console.error("Lỗi: Không tìm thấy nút Add hoặc container.");
}

// ==========================================
// TÍNH NĂNG UPLOAD FILE EXCEL
// ==========================================
const btnUploadExcel = document.getElementById('btnUploadExcel');
const excelFileInput = document.getElementById('excelFileInput');

if (btnUploadExcel && excelFileInput) {
    // 1. Khi bấm nút, giả vờ bấm vào thẻ input ẩn
    btnUploadExcel.addEventListener('click', () => {
        excelFileInput.click();
    });

    // 2. Khi người dùng đã chọn file Excel xong
    excelFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return; // Nếu hủy chọn file thì không làm gì cả

        const reader = new FileReader();
        
        reader.onload = function(event) {
            // Đọc dữ liệu file
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            
            // Lấy Sheet đầu tiên trong file Excel
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            
            // Biến dữ liệu Excel thành mảng (danh sách)
            const excelRows = XLSX.utils.sheet_to_json(worksheet, {header: 1});

            // Lặp qua từng dòng (bỏ qua dòng 0 vì nó thường là tiêu đề cột)
            for (let i = 1; i < excelRows.length; i++) {
                const row = excelRows[i];
                
                // Nếu dòng đó trống thì bỏ qua
                if (!row || row.length === 0 || !row[0]) continue;

                // Quy định Cột: A=Câu hỏi, B=Đ.án A, C=Đ.án B, D=Đ.án C, E=Đ.án D, F=Đáp án đúng
                const questionText = row[0] || '';
                const optionA = row[1] || '';
                const optionB = row[2] || '';
                const optionC = row[3] || '';
                const optionD = row[4] || '';
                const correctAnswer = (row[5] || '').toString().toUpperCase().trim();

                // Sinh ra giao diện câu hỏi
                createNewQuestionFromExcel(questionText, optionA, optionB, optionC, optionD, correctAnswer);
            }

            // Gọi hàm đánh lại số thứ tự (hàm này mình đã viết ở phần trước)
            if (typeof updateQuestionNumbers === 'function') {
                updateQuestionNumbers();
            }
            
            // Xóa file cũ trong bộ nhớ để lần sau up lại file đó không bị lỗi
            excelFileInput.value = ''; 
            
            alert('Đã nhập câu hỏi từ Excel thành công!');
        };
        
        reader.readAsArrayBuffer(file);
    });
}

// 3. Hàm phụ trợ: Tạo khối HTML cho từng câu hỏi lấy từ Excel
function createNewQuestionFromExcel(qText, a, b, c, d, correctAns) {
    const questionsContainer = document.getElementById('questions-container');
    const newQuestion = document.createElement('div');
    newQuestion.classList.add('question-card');
    
    // Tích V (checked) vào ô đáp án đúng
    const checkA = correctAns === 'A' ? 'checked' : '';
    const checkB = correctAns === 'B' ? 'checked' : '';
    const checkC = correctAns === 'C' ? 'checked' : '';
    const checkD = correctAns === 'D' ? 'checked' : '';

    newQuestion.innerHTML = `
        <div class="question-card__header">
            <span class="question-badge"></span> 
            <button type="button" class="question-delete-btn">
                <span class="material-icons-round">delete</span>
            </button>
        </div>
        <div class="question-body">
            <div>
                <textarea class="question-textarea" placeholder="Enter your question here...">${qText}</textarea>
                <div class="answer-grid">
                    <div class="answer-option"><span class="answer-letter">A</span><input class="answer-input" value="${a}" placeholder="Option A" type="text"/><input class="answer-checkbox" type="checkbox" ${checkA}/></div>
                    <div class="answer-option"><span class="answer-letter">B</span><input class="answer-input" value="${b}" placeholder="Option B" type="text"/><input class="answer-checkbox" type="checkbox" ${checkB}/></div>
                    <div class="answer-option"><span class="answer-letter">C</span><input class="answer-input" value="${c}" placeholder="Option C" type="text"/><input class="answer-checkbox" type="checkbox" ${checkC}/></div>
                    <div class="answer-option"><span class="answer-letter">D</span><input class="answer-input" value="${d}" placeholder="Option D" type="text"/><input class="answer-checkbox" type="checkbox" ${checkD}/></div>
                </div>
            </div>
            <div class="image-drop">
                <span class="material-icons-round">add_photo_alternate</span>
                <span class="image-drop__label">Upload Image/SVG</span>
                <p class="image-drop__hint">Optional helper image</p>
            </div>
        </div>
    `;

    questionsContainer.appendChild(newQuestion);
}



// ==========================================
// TÍNH NĂNG PREVIEW (XEM TRƯỚC BÀI THI)
// ==========================================
const btnPreview = document.getElementById('btnPreview');
const previewModal = document.getElementById('previewModal');
const closePreview = document.getElementById('closePreview');
const previewBody = document.getElementById('previewBody');

if (btnPreview && previewModal) {
    // 1. Khi bấm nút Preview
    btnPreview.addEventListener('click', () => {
        // Thu thập thông tin chung
        // Lấy theo vị trí (vì form chưa có ID)
        const allInputs = document.querySelectorAll('.form-field__input');
        const examTitle = allInputs[0].value || 'Untitled Exam'; 
        const examDesc = document.querySelector('.form-field__textarea').value || 'Không có mô tả.';
        
        // Tạo tiêu đề bài thi cho Preview
        let htmlContent = `
            <h2 style="color: #1e293b; font-size: 1.5rem; margin-bottom: 8px;">${examTitle}</h2>
            <p style="color: #64748b; margin-bottom: 24px;">${examDesc}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0;">
        `;

        // Thu thập tất cả các câu hỏi hiện có trên giao diện
        const allQuestions = document.querySelectorAll('#questions-container .question-card');
        
        if (allQuestions.length === 0) {
            htmlContent += `<p style="margin-top: 20px; color: #d2232a;">Chưa có câu hỏi nào trong đề thi này.</p>`;
        } else {
            // Lặp qua từng câu hỏi để lấy dữ liệu gõ trong đó
            allQuestions.forEach((q, index) => {
                const qText = q.querySelector('.question-textarea').value || `Câu hỏi trống`;
                const answers = q.querySelectorAll('.answer-input');
                
                // Giao diện học sinh nhìn thấy (hiển thị dạng Radio button để chọn)
                htmlContent += `
                    <div class="student-question-card">
                        <div class="student-question-title">Câu ${index + 1}: ${qText}</div>
                        <div>
                            <label class="student-option"><input type="radio" name="preview_q${index}"> A. ${answers[0]?.value || ''}</label>
                            <label class="student-option"><input type="radio" name="preview_q${index}"> B. ${answers[1]?.value || ''}</label>
                            <label class="student-option"><input type="radio" name="preview_q${index}"> C. ${answers[2]?.value || ''}</label>
                            <label class="student-option"><input type="radio" name="preview_q${index}"> D. ${answers[3]?.value || ''}</label>
                        </div>
                    </div>
                `;
            });
        }

        // Đổ nội dung vừa tạo vào Modal và cho hiển thị lên
        previewBody.innerHTML = htmlContent;
        previewModal.style.display = 'block';
    });

    // 2. Tắt Modal khi bấm dấu X
    closePreview.addEventListener('click', () => {
        previewModal.style.display = 'none';
    });

    // 3. Tắt Modal khi bấm chuột ra vùng đen bên ngoài
    window.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
}