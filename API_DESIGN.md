# HelloQuizz — Danh sách API cần có

Tài liệu tổng hợp **các API cần có** để triển khai đầy đủ các màn hình hiện có trong dự án (user + admin): `login`, `signup`, `dashboard`, `exam-list`, `exam-taking`, `exam-result`, `result-list`, `user-profile`, `admin-dashboard`, `admin-exam-manager`, `admin-user-manager`, `admin-statistics`, `admin-profile`.

## Quy ước chung

- **Base URL (mẫu)**: `https://api.helloquizz.com/v1`
- **Auth**: Hầu hết API (trừ đăng ký/đăng nhập) yêu cầu header:
  - `Authorization: Bearer <accessToken>`
- **Định dạng response lỗi (mẫu)**:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email không hợp lệ",
    "details": [{ "field": "email", "reason": "invalid_format" }]
  }
}
```

- **Phân trang (mẫu)**: dùng query `page`, `pageSize`, `sort`, `order`.

---

## 1) Nhóm API: Xác thực (Auth)


| API dùng để làm gì                                         | Method | URL mẫu                                       | Input mẫu                                                                                            | Output mẫu                                                                                                                                                                                                                           |
| ---------------------------------------------------------- | ------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Đăng ký tài khoản người dùng                               | POST   | `https://api.helloquizz.com/v1/auth/register` | **Body**: `{"fullName":"Nguyễn Văn A","email":"a@gmail.com","password":"123456","acceptTerms":true}` | `{"user":{"id":"usr_01","fullName":"Nguyễn Văn A","email":"a@gmail.com","role":"student","status":"active","createdAt":"2026-03-13T10:00:00Z"},"tokens":{"accessToken":"<jwt>","refreshToken":"<jwt>","expiresIn":3600}}`            |
| Đăng nhập (phân quyền admin/user để điều hướng đúng trang) | POST   | `https://api.helloquizz.com/v1/auth/login`    | **Body**: `{"email":"admin@helloquizz.com","password":"123456"}`                                     | `{"user":{"id":"usr_admin","fullName":"Admin Chính","email":"admin@helloquizz.com","role":"admin","status":"active","lastLoginAt":"2026-03-13T10:05:00Z"},"tokens":{"accessToken":"<jwt>","refreshToken":"<jwt>","expiresIn":3600}}` |
| Làm mới access token khi hết hạn                           | POST   | `https://api.helloquizz.com/v1/auth/refresh`  | **Body**: `{"refreshToken":"<jwt>"}`                                                                 | `{"accessToken":"<jwt>","refreshToken":"<jwt>","expiresIn":3600}`                                                                                                                                                                    |
| Đăng xuất (thu hồi refresh token / phiên)                  | POST   | `https://api.helloquizz.com/v1/auth/logout`   | **Body**: `{"refreshToken":"<jwt>"}`                                                                 | `{"ok":true}`                                                                                                                                                                                                                        |
| Lấy thông tin “tôi là ai” để hiển thị sidebar/avatar/role  | GET    | `https://api.helloquizz.com/v1/auth/me`       | **Header**: `Authorization: Bearer <accessToken>`                                                    | `{"id":"usr_01","fullName":"Nguyễn Văn A","email":"a@gmail.com","role":"student","status":"active","avatarUrl":null,"createdAt":"2026-03-13T10:00:00Z","lastLoginAt":"2026-03-13T10:05:00Z"}`                                        |


---

## 2) Nhóm API: Danh mục môn học (Subjects)


| API dùng để làm gì                                                    | Method | URL mẫu                                  | Input mẫu                       | Output mẫu                                                                                                             |
| --------------------------------------------------------------------- | ------ | ---------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Lấy danh sách môn học để đổ vào bộ lọc (exam-list/admin-exam-manager) | GET    | `https://api.helloquizz.com/v1/subjects` | **Query (tuỳ chọn)**: `?q=toan` | `{"items":[{"id":"sub_math","name":"Toán học"},{"id":"sub_phy","name":"Vật lý"},{"id":"sub_eng","name":"Tiếng Anh"}]}` |


---

## 3) Nhóm API: Đề thi (Exams) — phía người dùng


| API dùng để làm gì                                                                               | Method | URL mẫu                                                       | Input mẫu                                                                  | Output mẫu                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lấy danh sách đề thi (tìm kiếm/lọc theo môn, độ khó) để render trang `exam-list.html`            | GET    | `https://api.helloquizz.com/v1/exams`                         | **Query**: `?q=thpt&subjectId=sub_math&difficulty=hard&page=1&pageSize=12` | `{"items":[{"id":"ex_01","title":"Đề thi THPT Quốc gia 2025 — Toán","subject":{"id":"sub_math","name":"Toán học"},"description":"...","questionCount":50,"durationMinutes":90,"attemptCount":1284,"difficulty":"hard","status":"published","bannerColor":"red"}],"page":1,"pageSize":12,"total":2341}` |
| Lấy chi tiết đề thi (thông tin chung)                                                            | GET    | `https://api.helloquizz.com/v1/exams/ex_01`                   | **Path**: `ex_01`                                                          | `{"id":"ex_01","title":"Đề thi THPT Quốc gia 2025 — Toán","subject":{"id":"sub_math","name":"Toán học"},"description":"...","durationMinutes":90,"difficulty":"hard","status":"published","questionCount":50}`                                                                                         |
| Lấy danh sách câu hỏi để làm bài (có thể xáo trộn, che đáp án đúng) cho trang `exam-taking.html` | GET    | `https://api.helloquizz.com/v1/exams/ex_01/questions`         | **Query**: `?shuffle=true`                                                 | `{"items":[{"id":"q_001","order":1,"text":"Giá trị của sin(90°) là?","options":[{"id":"A","text":"0"},{"id":"B","text":"1"},{"id":"C","text":"-1"},{"id":"D","text":"0.5"}]}]}`                                                                                                                        |
| Tạo “lượt làm bài/attempt” khi người dùng bấm “Bắt đầu thi” (để quản lý timer, trạng thái)       | POST   | `https://api.helloquizz.com/v1/exams/ex_01/attempts`          | **Body**: `{"mode":"exam","shuffle":true}`                                 | `{"attempt":{"id":"att_01","examId":"ex_01","userId":"usr_01","status":"in_progress","startedAt":"2026-03-13T10:10:00Z","expiresAt":"2026-03-13T11:40:00Z"}}`                                                                                                                                          |
| Lưu đáp án từng câu (auto-save) trong lúc làm bài                                                | PUT    | `https://api.helloquizz.com/v1/attempts/att_01/answers/q_001` | **Body**: `{"selectedOptionId":"B","marked":false}`                        | `{"ok":true,"attemptId":"att_01","questionId":"q_001","savedAt":"2026-03-13T10:12:20Z"}`                                                                                                                                                                                                               |
| Lấy lại trạng thái attempt (để resume nếu reload trang)                                          | GET    | `https://api.helloquizz.com/v1/attempts/att_01`               | **Path**: `att_01`                                                         | `{"id":"att_01","examId":"ex_01","status":"in_progress","startedAt":"2026-03-13T10:10:00Z","remainingSeconds":2380,"answersSummary":{"answered":12,"marked":3,"total":50}}`                                                                                                                            |
| Nộp bài (kết thúc attempt, chấm điểm, sinh kết quả) — chuyển sang `exam-result.html`             | POST   | `https://api.helloquizz.com/v1/attempts/att_01/submit`        | **Body (tuỳ chọn)**: `{"clientSubmitAt":"2026-03-13T11:25:00Z"}`           | `{"result":{"id":"res_01","attemptId":"att_01","examId":"ex_01","score":8.5,"maxScore":10,"correctCount":42,"wrongCount":8,"durationSeconds":4354,"passed":true,"submittedAt":"2026-03-13T11:25:00Z"},"redirect":{"resultUrl":"/result/res_01"}}`                                                      |


---

## 4) Nhóm API: Kết quả & lịch sử làm bài (Results)


| API dùng để làm gì                                                        | Method | URL mẫu                                                          | Input mẫu                                          | Output mẫu                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy danh sách kết quả của tôi (phục vụ `result-list.html` + search)       | GET    | `https://api.helloquizz.com/v1/results`                          | **Query**: `?q=toan&page=1&pageSize=20`            | `{"items":[{"id":"res_01","exam":{"id":"ex_01","title":"Đề thi THPT Quốc gia 2025 — Toán","subject":"Toán học"},"score":8.5,"maxScore":10,"correctCount":42,"wrongCount":8,"durationSeconds":4354,"passed":true,"submittedAt":"2026-03-13T11:25:00Z"}],"page":1,"pageSize":20,"total":3}` |
| Lấy chi tiết 1 kết quả (thông tin header + thống kê)                      | GET    | `https://api.helloquizz.com/v1/results/res_01`                   | **Path**: `res_01`                                 | `{"id":"res_01","exam":{"id":"ex_01","title":"...","subject":"Toán học"},"score":8.5,"maxScore":10,"correctCount":42,"wrongCount":8,"durationSeconds":4354,"passed":true,"submittedAt":"2026-03-13T11:25:00Z"}`                                                                           |
| Lấy “review đáp án” theo dạng Q&A (đổ vào modal trong `result-list.html`) | GET    | `https://api.helloquizz.com/v1/results/res_01/review`            | **Query (tuỳ chọn)**: `?includeCorrectAnswer=true` | `{"items":[{"questionId":"q_001","question":"Giá trị của sin(90°) là?","options":["0","1","-1","0.5"],"userAnswerIndex":1,"correctAnswerIndex":1,"isCorrect":true}]}`                                                                                                                     |
| In/Export kết quả (PDF/HTML) cho nút in ở `exam-result.html`              | GET    | `https://api.helloquizz.com/v1/results/res_01/export?format=pdf` | **Query**: `format=pdf`                            | **Binary/PDF** (hoặc `{"url":"https://cdn.../res_01.pdf"}` tuỳ kiến trúc)                                                                                                                                                                                                                 |


---

## 5) Nhóm API: Dashboard người dùng (biểu đồ điểm & phân bổ)


| API dùng để làm gì                                                         | Method | URL mẫu                                                     | Input mẫu               | Output mẫu                                                                                                                                                           |
| -------------------------------------------------------------------------- | ------ | ----------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy dữ liệu biểu đồ tiến độ theo ngày/tuần (line chart ở `dashboard.html`) | GET    | `https://api.helloquizz.com/v1/me/stats/progress`           | **Query**: `?range=7d`  | `{"range":"7d","labels":["T2","T3","T4","T5","T6","T7","CN"],"avgScores":[6.5,7.0,6.8,8.0,7.5,8.5,9.0]}`                                                             |
| Lấy dữ liệu phân bổ điểm (doughnut chart ở `dashboard.html`)               | GET    | `https://api.helloquizz.com/v1/me/stats/score-distribution` | **Query**: `?range=30d` | `{"range":"30d","buckets":[{"label":"Xuất sắc (≥9)","count":8},{"label":"Tốt (7-8.9)","count":14},{"label":"TB (5-6.9)","count":7},{"label":"Yếu (<5)","count":3}]}` |


---

## 6) Nhóm API: Hồ sơ người dùng (User Profile)


| API dùng để làm gì                                        | Method | URL mẫu                                            | Input mẫu                                                                        | Output mẫu                                                                                                                                                                  |
| --------------------------------------------------------- | ------ | -------------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy hồ sơ cá nhân để hiển thị trang `user-profile.html`   | GET    | `https://api.helloquizz.com/v1/me/profile`         | —                                                                                | `{"id":"usr_01","fullName":"Nguyễn Văn A","email":"a@gmail.com","phone":null,"school":null,"avatarUrl":null,"preferences":{"language":"vi","timezone":"Asia/Ho_Chi_Minh"}}` |
| Cập nhật hồ sơ (nút “Lưu thay đổi” ở `user-profile.html`) | PATCH  | `https://api.helloquizz.com/v1/me/profile`         | **Body**: `{"fullName":"Nguyễn Văn A","phone":"0900000000","school":"THPT ABC"}` | `{"ok":true,"profile":{"id":"usr_01","fullName":"Nguyễn Văn A","email":"a@gmail.com","phone":"0900000000","school":"THPT ABC"}}`                                            |
| Đổi mật khẩu                                              | POST   | `https://api.helloquizz.com/v1/me/change-password` | **Body**: `{"currentPassword":"123456","newPassword":"654321"}`                  | `{"ok":true}`                                                                                                                                                               |


---

## 7) Nhóm API: Admin — Quản lý đề thi (Exam Manager)


| API dùng để làm gì                                                                           | Method | URL mẫu                                                                 | Input mẫu                                                                                                                                                                                                             | Output mẫu                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy danh sách đề thi để hiển thị bảng ở `admin-exam-manager.html` (search/filter/pagination) | GET    | `https://api.helloquizz.com/v1/admin/exams`                             | **Query**: `?q=toan&subjectId=sub_math&status=published&difficulty=hard&page=1&pageSize=10`                                                                                                                           | `{"items":[{"id":"ex_01","title":"...","subject":"Toán học","questionCount":50,"durationMinutes":90,"difficulty":"hard","status":"published","attemptCount":1284,"avgScore":7.2}],"page":1,"pageSize":10,"total":2341}` |
| Tạo đề thi mới (step 1 + step 2 trong modal)                                                 | POST   | `https://api.helloquizz.com/v1/admin/exams`                             | **Body**: `{"title":"Đề mới","subjectId":"sub_math","difficulty":"medium","durationMinutes":45,"status":"draft","description":"...","questions":[{"text":"Câu 1 ...","options":["A","B","C","D"],"correctIndex":2}]}` | `{"exam":{"id":"ex_new","title":"Đề mới","status":"draft","questionCount":1,"createdAt":"2026-03-13T10:00:00Z"}}`                                                                                                       |
| Cập nhật đề thi (chỉnh sửa thông tin/độ khó/trạng thái)                                      | PATCH  | `https://api.helloquizz.com/v1/admin/exams/ex_01`                       | **Body**: `{"title":"Đề thi THPT 2025 - Toán (Updated)","status":"published"}`                                                                                                                                        | `{"ok":true,"exam":{"id":"ex_01","title":"...","status":"published"}}`                                                                                                                                                  |
| Xoá đề thi                                                                                   | DELETE | `https://api.helloquizz.com/v1/admin/exams/ex_01`                       | —                                                                                                                                                                                                                     | `{"ok":true}`                                                                                                                                                                                                           |
| Lấy chi tiết đề thi kèm câu hỏi để “view/edit”                                               | GET    | `https://api.helloquizz.com/v1/admin/exams/ex_01?includeQuestions=true` | **Query**: `includeQuestions=true`                                                                                                                                                                                    | `{"id":"ex_01","title":"...","subjectId":"sub_math","difficulty":"hard","durationMinutes":90,"status":"published","questions":[{"id":"q_001","text":"...","options":["..."],"correctIndex":1}]}`                        |


---

## 8) Nhóm API: Admin — Quản lý người dùng (User Manager)


| API dùng để làm gì                                                                         | Method | URL mẫu                                                                                  | Input mẫu                                                                                                                 | Output mẫu                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy danh sách user để hiển thị bảng ở `admin-user-manager.html` (search/filter/pagination) | GET    | `https://api.helloquizz.com/v1/admin/users`                                              | **Query**: `?q=khoa&role=student&status=active&page=1&pageSize=10`                                                        | `{"items":[{"id":"usr_01","fullName":"Trần Minh Khoa","email":"khoa.tran@student.edu.vn","role":"student","status":"active","lastLoginAt":"2026-03-13T10:59:00Z","examTakenCount":48,"avgScore":9.4}],"page":1,"pageSize":10,"total":12842}` |
| Tạo user (nút “Thêm người dùng”)                                                           | POST   | `https://api.helloquizz.com/v1/admin/users`                                              | **Body**: `{"fullName":"Nguyễn Văn B","email":"b@student.edu.vn","password":"123456","role":"student","status":"active"}` | `{"user":{"id":"usr_new","fullName":"Nguyễn Văn B","email":"b@student.edu.vn","role":"student","status":"active","createdAt":"2026-03-13T10:00:00Z"}}`                                                                                       |
| Cập nhật user (đổi vai trò/trạng thái/thông tin)                                           | PATCH  | `https://api.helloquizz.com/v1/admin/users/usr_01`                                       | **Body**: `{"role":"admin","status":"active"}`                                                                            | `{"ok":true,"user":{"id":"usr_01","role":"admin","status":"active"}}`                                                                                                                                                                        |
| Khoá/Mở khoá user (phục vụ nút lock/lock_open)                                             | POST   | `https://api.helloquizz.com/v1/admin/users/usr_01/lock`                                  | **Body**: `{"locked":true,"reason":"Spam"}`                                                                               |                                                                                                                                                                                                                                              |
| `{"ok":true,"user":{"id":"usr_01","status":"locked","lockedAt":"2026-03-13T12:00:00Z"}}`   |        |                                                                                          |                                                                                                                           |                                                                                                                                                                                                                                              |
| Xoá user                                                                                   | DELETE | `https://api.helloquizz.com/v1/admin/users/usr_01`                                       | —                                                                                                                         | `{"ok":true}`                                                                                                                                                                                                                                |
| Xuất danh sách user CSV (nút “Xuất CSV”)                                                   | GET    | `https://api.helloquizz.com/v1/admin/users/export?format=csv&role=student&status=active` | **Query**: `format=csv&...`                                                                                               | **Binary/CSV** (hoặc `{"url":"https://cdn.../users.csv"}`)                                                                                                                                                                                   |


---

## 9) Nhóm API: Admin — Dashboard & Thống kê


| API dùng để làm gì                                                                         | Method | URL mẫu                                                          | Input mẫu               | Output mẫu                                                                                                                    |
| ------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Lấy KPI tổng quan (tổng đề thi, tổng user, lượt thi hôm nay, …) cho `admin-dashboard.html` | GET    | `https://api.helloquizz.com/v1/admin/stats/kpis`                 | **Query**: `?range=30d` | `{"range":"30d","kpis":{"totalUsers":12842,"activeUsers":8241,"totalExams":2341,"publishedExams":1820,"attemptsToday":1680}}` |
| Lấy lượt thi theo ngày trong tuần (bar chart “Lượt thi”)                                   | GET    | `https://api.helloquizz.com/v1/admin/stats/attempts-trend`       | **Query**: `?range=7d`  | `{"labels":["T2","T3","T4","T5","T6","T7","CN"],"attempts":[980,1120,890,1380,1420,1680,1284]}`                               |
| Lấy phân bổ lượt thi theo môn (doughnut chart)                                             | GET    | `https://api.helloquizz.com/v1/admin/stats/subject-distribution` | **Query**: `?range=30d` | `{"labels":["Toán học","Vật lý","Hóa học"],"attempts":[28,18,15]}`                                                            |
| Thống kê nâng cao (trend điểm TB, điểm max theo tháng) cho `admin-statistics.html`         | GET    | `https://api.helloquizz.com/v1/admin/stats/score-trend`          | **Query**: `?year=2026` | `{"labels":["T1","T2","T3"],"avg":[6.2,6.4,6.1],"max":[9.2,9.5,9.0]}`                                                         |
| Phân phối điểm (histogram)                                                                 | GET    | `https://api.helloquizz.com/v1/admin/stats/score-distribution`   | **Query**: `?range=30d` | `{"buckets":[{"label":"0-2","count":120},{"label":"2-4","count":280},{"label":"9-10","count":460}]}`                          |
| Điểm trung bình theo môn (bar ngang)                                                       | GET    | `https://api.helloquizz.com/v1/admin/stats/subject-avg-score`    | **Query**: `?range=30d` | `{"labels":["Toán","Lý","Hóa"],"avgScores":[7.2,6.8,6.5]}`                                                                    |
| “Giờ cao điểm” lượt thi theo khung giờ                                                     | GET    | `https://api.helloquizz.com/v1/admin/stats/peak-hours`           | **Query**: `?range=7d`  | `{"labels":["7h","9h","11h","13h","15h","17h","19h","21h"],"attempts":[120,380,280,420,680,920,1280,840]}`                    |


---

## 10) Nhóm API: Admin — Hồ sơ Admin


| API dùng để làm gì                               | Method | URL mẫu                                          | Input mẫu                                                                   | Output mẫu                                                                                                                                                                         |
| ------------------------------------------------ | ------ | ------------------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lấy hồ sơ admin để hiển thị `admin-profile.html` | GET    | `https://api.helloquizz.com/v1/admin/me/profile` | —                                                                           | `{"id":"usr_admin","fullName":"Admin Chính","email":"admin@helloquizz.com","role":"admin","avatarUrl":null,"permissions":["exams:read","exams:write","users:write","stats:read"]}` |
| Cập nhật hồ sơ admin                             | PATCH  | `https://api.helloquizz.com/v1/admin/me/profile` | **Body**: `{"fullName":"Admin Chính","avatarUrl":"https://.../avatar.png"}` | `{"ok":true,"profile":{"id":"usr_admin","fullName":"Admin Chính","avatarUrl":"https://.../avatar.png"}}`                                                                           |


---

