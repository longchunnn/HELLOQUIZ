(() => {
  "use strict";
  const EXAM = {
    title: "Advanced Mathematics: Final Examination 2024",
    durationSeconds: 45 * 60,
    questions: buildSampleQuestions(30),
  };
  function buildSampleQuestions(n) {
    const base = {
      text: "A particle moves along a straight line with a velocity given by v(t) = 3t - 6t meters per second. What is the total distance traveled by the particle from t = 0 to t = 3 seconds?",
      options: [
        { key: "A", text: "4 meters" },
        { key: "B", text: "8 meters" },
        { key: "C", text: "12 meters" },
        { key: "D", text: "16 meters" },
      ],
    };
    return Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      tag: `Question ${String(i + 1).padStart(2, "0")}`,
      text:
        i === 0
          ? base.text
          : `${base.text} (Sample Q${String(i + 1).padStart(2, "0")})`,
      options: base.options,
    }));
  }
  const STORAGE_KEY = "helloquizz_exam_state_v2";

  const state = {
    startedAt: null,
    duration: EXAM.durationSeconds,
    currentIndex: 0,

    answers: {},
    marked: {}, 
    visited: {},

    submitted: false,
    submitReason: null,
  };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const el = {
    examTitle: $("#examTitle"),
    timerValue: $("#timerValue"),

    navGrid: $("#questionNavGrid"),
    answeredCount: $("#answeredCount"),
    markedCount: $("#markedCount"),
    notVisitedCount: $("#notVisitedCount"),

    questionTag: $("#questionTag"),
    questionText: $("#questionText"),
    optionsList: $("#optionsList"),

    prevBtn: $("#prevBtn"),
    nextBtn: $("#nextBtn"),
    clearBtn: $("#clearBtn"),
    submitBtn: $("#submitBtn"),

    markBtn: $("#markBtn"),
    markIcon: $("#markIcon"),

    toggleThemeBtn: $("#toggleThemeBtn"),

    modal: $("#examModal"),
    modalBackdrop: $("#modalBackdrop"),
    modalCloseBtn: $("#modalCloseBtn"),
    modalOkBtn: $("#modalOkBtn"),
    modalTitle: $("#modalTitle"),
    modalMessage: $("#modalMessage"),
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);

      Object.assign(state, {
        startedAt: saved.startedAt ?? state.startedAt,
        duration: saved.duration ?? state.duration,
        currentIndex: saved.currentIndex ?? state.currentIndex,
        answers: saved.answers ?? state.answers,
        marked: saved.marked ?? state.marked,
        visited: saved.visited ?? state.visited,
        submitted: saved.submitted ?? state.submitted,
        submitReason: saved.submitReason ?? state.submitReason,
      });
    } catch {
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
    }
  }
  let timerHandle = null;

  function pad2(n) {
    return String(Math.max(0, n | 0)).padStart(2, "0");
  }

  function formatMMSS(totalSeconds) {
    const s = Math.max(0, totalSeconds | 0);
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${pad2(mm)}:${pad2(ss)}`;
  }

  function startTimerIfNeeded() {
    if (state.startedAt) return;
    state.startedAt = Date.now();
    saveState();
  }

  function getRemainingSeconds() {
    if (!state.startedAt) return state.duration;
    const elapsed = Math.floor((Date.now() - state.startedAt) / 1000);
    return state.duration - elapsed;
  }

  function updateTimerUI() {
    const remain = getRemainingSeconds();
    el.timerValue.textContent = formatMMSS(remain);

    if (!state.submitted && remain <= 0) {
      submitExam("timeout");
    }
  }

  function startTimerLoop() {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(updateTimerUI, 250);
  }

  function openModal(title, message) {
    el.modalTitle.textContent = title;
    el.modalMessage.textContent = message;
    el.modal.classList.add("exam-modal--open");
    el.modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    el.modal.classList.remove("exam-modal--open");
    el.modal.setAttribute("aria-hidden", "true");
  }

  function renderNavigator() {
    el.navGrid.innerHTML = "";

    EXAM.questions.forEach((q, index) => {
      const btn = document.createElement("button");
      btn.className = "nav-btn";
      btn.type = "button";
      btn.textContent = String(index + 1).padStart(2, "0");

      btn.addEventListener("click", () => {
        if (state.submitted) return;
        startTimerIfNeeded();
        renderQuestion(index);
      });

      el.navGrid.appendChild(btn);
    });

    updateNavigatorUI();
  }

  function updateNavigatorUI() {
    const buttons = $$(".nav-btn", el.navGrid);

    EXAM.questions.forEach((q, idx) => {
      const btn = buttons[idx];
      if (!btn) return;

      btn.classList.remove(
        "nav-btn--active",
        "nav-btn--answered",
        "nav-btn--marked",
      );

      if (idx === state.currentIndex) btn.classList.add("nav-btn--active");
      if (state.answers[q.id]) btn.classList.add("nav-btn--answered");
      if (state.marked[q.id]) btn.classList.add("nav-btn--marked");
    });

    updateLegendCounts();
  }

  function updateLegendCounts() {
    const answered = EXAM.questions.filter((q) => !!state.answers[q.id]).length;
    const marked = EXAM.questions.filter((q) => !!state.marked[q.id]).length;
    const notVisited = EXAM.questions.filter(
      (q) => !state.visited[q.id],
    ).length;

    el.answeredCount.textContent = String(answered);
    el.markedCount.textContent = String(marked);
    el.notVisitedCount.textContent = String(notVisited);
  }

  function renderQuestion(index) {
    const q = EXAM.questions[index];
    if (!q) return;

    state.currentIndex = index;
    state.visited[q.id] = true;
    saveState();

    el.questionTag.textContent = q.tag;
    el.questionText.textContent = q.text;

    renderOptions(q);
    updateMarkButtonUI(q);
    updateNavigatorUI();
    updateNavButtonsDisabled();
  }

  function renderOptions(q) {
    const selected = state.answers[q.id] || null;
    el.optionsList.innerHTML = "";

    q.options.forEach((opt) => {
      const label = document.createElement("label");
      label.className = "option-item";
      if (selected === opt.key) label.classList.add("option-item--selected");

      label.innerHTML = `
        <input type="radio" name="quiz-option" value="${opt.key}" ${selected === opt.key ? "checked" : ""}/>
        <div class="option-letter">${opt.key}</div>
        <span class="option-label"></span>
        <span class="material-icons option-check">check_circle</span>
      `;
      label.querySelector(".option-label").textContent = opt.text;

      label.addEventListener("click", () => {
        if (state.submitted) return;
        startTimerIfNeeded();

        state.answers[q.id] = opt.key;
        saveState();

        $$(".option-item", el.optionsList).forEach((x) =>
          x.classList.remove("option-item--selected"),
        );
        label.classList.add("option-item--selected");

        updateNavigatorUI();
      });

      el.optionsList.appendChild(label);
    });
  }

  function updateNavButtonsDisabled() {
    el.prevBtn.disabled = state.currentIndex === 0 || state.submitted;
    el.nextBtn.disabled =
      state.currentIndex === EXAM.questions.length - 1 || state.submitted;
    el.clearBtn.disabled = state.submitted;
    el.submitBtn.disabled = state.submitted;
    el.markBtn.disabled = state.submitted;
  }

  function updateMarkButtonUI(q) {
    const isMarked = !!state.marked[q.id];
    el.markIcon.textContent = isMarked ? "bookmark" : "bookmark_border";
    el.markBtn.style.color = isMarked ? "#f59e0b" : "";
  }

  function toggleMarkCurrent() {
    if (state.submitted) return;
    startTimerIfNeeded();

    const q = EXAM.questions[state.currentIndex];
    state.marked[q.id] = !state.marked[q.id];
    saveState();

    updateMarkButtonUI(q);
    updateNavigatorUI();
  }

  function clearCurrentAnswer() {
    if (state.submitted) return;
    startTimerIfNeeded();

    const q = EXAM.questions[state.currentIndex];
    delete state.answers[q.id];
    saveState();

    renderQuestion(state.currentIndex);
  }

  function lockUIAfterSubmit() {
    state.submitted = true;
    saveState();
    updateNavButtonsDisabled();
    $$(".nav-btn", el.navGrid).forEach((btn) => {
      btn.disabled = true;
      btn.style.opacity = "0.65";
      btn.style.cursor = "not-allowed";
    });

    el.optionsList.style.pointerEvents = "none";
    el.optionsList.style.opacity = "0.85";
  }

  function submitExam(reason) {
    if (state.submitted) return;

    state.submitReason = reason;
    state.submitted = true;
    saveState();

    const payload = {
      examTitle: EXAM.title,
      startedAt: state.startedAt,
      submittedAt: Date.now(),
      durationSeconds: state.duration,
      timeRemainingSeconds: Math.max(0, getRemainingSeconds()),
      reason,
      answers: state.answers,
      marked: state.marked,
    };

    lockUIAfterSubmit();

    if (reason === "timeout") {
      openModal("Hết giờ", "Đã hết thời gian. Hệ thống đã tự động nộp bài.");
    } else {
      openModal("Nộp bài", "Bạn đã nộp bài thành công.");
    }

    console.log("SUBMIT PAYLOAD:", payload);
  }

  function bindEvents() {
    el.prevBtn.addEventListener("click", () => {
      if (state.submitted) return;
      startTimerIfNeeded();
      renderQuestion(Math.max(0, state.currentIndex - 1));
    });

    el.nextBtn.addEventListener("click", () => {
      if (state.submitted) return;
      startTimerIfNeeded();
      renderQuestion(
        Math.min(EXAM.questions.length - 1, state.currentIndex + 1),
      );
    });

    el.clearBtn.addEventListener("click", clearCurrentAnswer);
    el.markBtn.addEventListener("click", toggleMarkCurrent);

    el.submitBtn.addEventListener("click", () => {
      if (state.submitted) return;
      startTimerIfNeeded();
      submitExam("user");
    });

    el.modalBackdrop.addEventListener("click", closeModal);
    el.modalCloseBtn.addEventListener("click", closeModal);
    el.modalOkBtn.addEventListener("click", closeModal);

    el.toggleThemeBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const isDark = html.classList.contains("dark");
      html.classList.toggle("dark", !isDark);
      html.classList.toggle("light", isDark);
    });
  }

  function init() {
    el.examTitle.textContent = EXAM.title;
    loadState();
    renderNavigator();
    bindEvents();
    const safeIndex = Math.min(
      Math.max(0, state.currentIndex),
      EXAM.questions.length - 1,
    );
    renderQuestion(safeIndex);
    updateTimerUI();
    startTimerLoop();
    if (state.submitted) {
      lockUIAfterSubmit();
      if (state.submitReason === "timeout") {
        openModal(
          "Thông báo",
          "Bài thi đã được tự động nộp trước đó do hết giờ.",
        );
      } else {
        openModal("Thông báo", "Bài thi đã được nộp trước đó.");
      }
    }
  }
  document.addEventListener("DOMContentLoaded", init);
})();
