
import { typesetMath } from "./contentRenderer.js";

export function initPresentationNavigation(slides, controls) {

    const {
        previousButton,
        nextButton,
        counter,
        progressFill,

        // New question navigation controls
        questionButton,
        questionPanel,
        questionList,
        onChange,
        shouldHandleKeyboard
    } = controls;

    // ================================
    // VALIDATION
    // ================================

    if (!Array.isArray(slides)) {
        throw new TypeError("Slides harus berupa array.");
    }

    if (!previousButton || !nextButton || !counter) {
        throw new Error("Elemen navigasi tidak lengkap.");
    }

    let currentIndex = 0;

    const totalSlides = slides.length;

    // ================================
    // COLLECT QUESTIONS
    // ================================

    function collectQuestions() {

        const questionMap = new Map();

        slides.forEach((slide, index) => {

            const questionId = slide.dataset.questionId;

            if (!questionId) return;

            if (!questionMap.has(questionId)) {

                const number =
                    slide.dataset.questionNumber ||
                    String(questionMap.size + 1);

                questionMap.set(questionId, {
                    id: questionId,
                    number,
                    title: `Soal ${number}`,
                    slideIndex: index
                });
            }

            const question = questionMap.get(questionId);

            // Utamakan slide pernyataan soal sebagai tujuan navigasi
            if (slide.dataset.slideType === "question") {

                question.slideIndex = index;

                const title = slide.querySelector(
                    ".presentation-slide__title"
                );

                if (title) {
                    question.title = title.textContent;
                }
            }
        });

        return [...questionMap.values()];
    }

    const questions = collectQuestions();
    const questionIndexes = new Map(
        questions.map((question, index) => [question.id, index])
    );

    // ================================
    // RENDER QUESTION LIST
    // ================================

    function renderQuestionList() {

        if (!questionList) return;

        questionList.replaceChildren();

        questions.forEach(question => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "question-list__item";

            button.dataset.questionId = question.id;
            button.dataset.slideIndex = question.slideIndex;

            button.textContent = question.title;

            button.setAttribute(
                "aria-label",
                `Buka ${question.title}`
            );

            questionList.appendChild(button);
        });

        // Nonaktifkan tombol jika belum ada soal
        if (questionButton) {
            questionButton.disabled = questions.length === 0;
        }
    }

    renderQuestionList();

    // ================================
    // QUESTION PANEL
    // ================================

    function closeQuestionPanel() {

        if (!questionButton || !questionPanel) return;

        questionPanel.hidden = true;

        questionButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    function toggleQuestionPanel() {

        if (!questionButton || !questionPanel) return;

        const isOpen =
            questionButton.getAttribute("aria-expanded") === "true";

        questionPanel.hidden = isOpen;

        questionButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );
    }

    function updateQuestionHighlight() {

        if (!questionList || totalSlides === 0) return;

        const activeQuestionId =
            slides[currentIndex].dataset.questionId;

        questionList
            .querySelectorAll(".question-list__item")
            .forEach(button => {

                const isActive =
                    button.dataset.questionId === activeQuestionId;

                button.classList.toggle("is-current", isActive);

                if (isActive) {
                    button.setAttribute("aria-current", "page");
                } else {
                    button.removeAttribute("aria-current");
                }
            });
    }

    // ================================
    // SHOW SLIDE
    // ================================

    function showSlide(index, notify = true) {

        if (totalSlides === 0) {

            counter.textContent = "Soal 0 / 0";

            previousButton.disabled = true;
            nextButton.disabled = true;

            return;
        }

        if (!Number.isFinite(index)) return;

        currentIndex = Math.max(
            0,
            Math.min(Math.trunc(index), totalSlides - 1)
        );

        slides.forEach((slide, i) => {

            const isActive = i === currentIndex;

            slide.hidden = !isActive;

            slide.setAttribute(
                "aria-hidden",
                String(!isActive)
            );
        });

        const activeSlide = slides[currentIndex];
        const activeQuestionIndex =
            questionIndexes.get(activeSlide.dataset.questionId) ?? currentIndex;
        const displayedQuestionNumber = String(activeQuestionIndex + 1);
        counter.textContent = `Soal ${displayedQuestionNumber} / ${questions.length}`;

        // Navigation buttons
        previousButton.disabled = currentIndex === 0;

        nextButton.disabled =
            currentIndex === totalSlides - 1;

        // Progress bar
        if (progressFill) {

            const progress =
                questions.length
                    ? ((activeQuestionIndex + 1) / questions.length) * 100
                    : 0;

            progressFill.style.width = `${progress}%`;

            progressFill.parentElement?.setAttribute(
                "aria-valuenow",
                String(Math.round(progress))
            );
        }

        // Active question highlight
        updateQuestionHighlight();

        // Render math on active slide
        void typesetMath(activeSlide);
        if (notify && typeof onChange === "function") {
            onChange(currentIndex, activeSlide);
        }
    }

    // ================================
    // NAVIGATION ACTIONS
    // ================================

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    function goTo(index) {
        showSlide(index);
    }

    // ================================
    // QUESTION LIST CLICK
    // ================================

    function handleQuestionListClick(event) {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const button = target.closest(
            ".question-list__item"
        );

        if (!button || !questionList.contains(button)) return;

        const targetIndex = Number(button.dataset.slideIndex);

        if (
            !Number.isInteger(targetIndex) ||
            targetIndex < 0 ||
            targetIndex >= totalSlides
        ) {
            console.warn("Invalid question navigation index.");
            return;
        }

        goTo(targetIndex);

        closeQuestionPanel();
    }

    // ================================
    // KEYBOARD NAVIGATION
    // ================================

    function handleKeyboard(event) {
        if (
            typeof shouldHandleKeyboard === "function" &&
            !shouldHandleKeyboard()
        ) {
            return;
        }

        const target = event.target;

        if (
            target?.closest?.(
                "input, textarea, select, [contenteditable='true']"
            )
        ) {
            return;
        }

        // Escape closes question panel
        if (event.key === "Escape") {

            const isOpen =
                questionButton?.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeQuestionPanel();
                questionButton.focus();
            }

            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            nextSlide();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            previousSlide();
        }
    }

    // ================================
    // EVENT LISTENERS
    // ================================

    previousButton.addEventListener(
        "click",
        previousSlide
    );

    nextButton.addEventListener(
        "click",
        nextSlide
    );

    questionButton?.addEventListener(
        "click",
        toggleQuestionPanel
    );

    questionList?.addEventListener(
        "click",
        handleQuestionListClick
    );

    document.addEventListener(
        "keydown",
        handleKeyboard
    );

    // Initial state
    showSlide(0, false);

    // ================================
    // PUBLIC API
    // ================================

    return {

        nextSlide,
        previousSlide,
        goTo,

        getCurrentIndex() {
            return currentIndex;
        },

        getTotalSlides() {
            return totalSlides;
        },

        getQuestions() {
            return questions.map(question => ({
                ...question
            }));
        },

        closeQuestionPanel,

        destroy() {

            previousButton.removeEventListener(
                "click",
                previousSlide
            );

            nextButton.removeEventListener(
                "click",
                nextSlide
            );

            questionButton?.removeEventListener(
                "click",
                toggleQuestionPanel
            );

            questionList?.removeEventListener(
                "click",
                handleQuestionListClick
            );

            document.removeEventListener(
                "keydown",
                handleKeyboard
            );
        }
    };
}
