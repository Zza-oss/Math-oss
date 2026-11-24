import { assessment02 } from "./data/assessment-02.js";
import { renderPresentation } from "./components/presentationRenderer.js";
import { initPresentationNavigation } from "./components/presentationNavigation.js";

const questionGrid = document.querySelector(".question-grid");
const libraryPage = document.querySelector("#library-page");
const presentationPage = document.querySelector("#presentation-section");
const presentationPreview = document.querySelector("#presentation-preview");
const presentationNavElement = document.querySelector(".presentation-navigation");
const presentationTitle = document.querySelector("#presentation-question-title");
const presentationNumber = document.querySelector("#presentation-question-number");
const closePresentationButton = document.querySelector("#close-presentation");
const questionPanel = document.querySelector("#question-list-panel");
const questionButton = document.querySelector("#question-list-toggle");

const navigationControls = {
  previousButton: document.querySelector("#previous-slide"),
  nextButton: document.querySelector("#next-slide"),
  counter: document.querySelector("#slide-counter"),
  progressFill: document.querySelector("#presentation-progress-fill"),
  questionButton,
  questionPanel,
  questionList: document.querySelector("#question-list"),
  shouldHandleKeyboard: () => !presentationPage.hidden,
  onChange: updateQuestionHash,
};

const questionEntries = assessment02.sections.flatMap((section) =>
  (section.questions || []).map((question) => ({ question })),
);
const questionIndexes = new Map(
  questionEntries.map(({ question }, index) => [question.id, index]),
);

let presentationNavigation = null;
let presentationInitialization = null;
let routeRequest = 0;

function getQuestionTitle(question, index) {
  return question.slides?.[0]?.title || question.title || `Soal ${index + 1}`;
}

function createQuestionCard({ question }, index) {
  const firstSlide = question.slides?.[0] || {};
  const firstParagraph = firstSlide.blocks?.find(
    (block) => block.type === "paragraph",
  )?.content;
  const summary =
    question.summary ||
    firstParagraph ||
    "Lihat pembahasan lengkap soal ini.";
  const card = document.createElement("article");
  card.className = "question-card";
  card.tabIndex = 0;
  card.dataset.number = String(index + 1).padStart(2, "0");

  const label = document.createElement("span");
  label.textContent = `SOAL ${String(index + 1).padStart(2, "0")}`;

  const heading = document.createElement("h3");
  heading.textContent = getQuestionTitle(question, index);

  const description = document.createElement("p");
  description.textContent =
    summary.length > 130 ? `${summary.slice(0, 127).trimEnd()}...` : summary;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "open-question";
  button.dataset.questionId = question.id;
  button.textContent = "Lihat pembahasan";
  button.setAttribute("aria-label", `Lihat pembahasan ${heading.textContent}`);

  card.append(label, heading, description, button);
  return card;
}

function renderQuestionCards() {
  if (!questionGrid) {
    throw new Error("Elemen .question-grid tidak ditemukan.");
  }
  questionGrid.replaceChildren(
    ...questionEntries.map((entry, index) => createQuestionCard(entry, index)),
  );
}

function setHash(hash) {
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  }
}

function updateQuestionHash(_index, slide) {
  const questionId = slide?.dataset.questionId;
  if (questionId && questionId !== getQuestionIdFromHash()) {
    setHash(`#question/${questionId}`);
  }
}

function getQuestionIdFromHash() {
  const match = window.location.hash.match(/^#question\/([^/]+)$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function syncNavigationSpace() {
  if (!presentationNavElement || !presentationPreview || presentationPage.hidden) {
    presentationPage.style.paddingBottom = "";
    return;
  }
  const height = presentationNavElement.getBoundingClientRect().height;
  presentationPage.style.paddingBottom = height
    ? `${Math.ceil(height + 24)}px`
    : "";
}

if (presentationNavElement && presentationPage) {
  if ("ResizeObserver" in window) {
    const navigationObserver = new ResizeObserver(syncNavigationSpace);
    navigationObserver.observe(presentationNavElement);
  }
  window.addEventListener("resize", syncNavigationSpace, { passive: true });
}

async function initializePresentation() {
  if (presentationInitialization) return presentationInitialization;
  if (!presentationPage || !presentationPreview || !presentationNavElement) {
    throw new Error("Elemen presentasi tidak ditemukan di index.html.");
  }
  presentationInitialization = (async () => {
    if (!window.MathJax?.startup?.promise) {
      throw new Error("MathJax 4 tidak tersedia untuk merender rumus.");
    }
    await window.MathJax.startup.promise;
    if (typeof window.MathJax.typesetPromise !== "function") {
      throw new Error("MathJax 4 gagal menyiapkan typesetting.");
    }
    const slides = await renderPresentation(assessment02, presentationPreview);
    if (!slides.length) {
      throw new Error("Tidak ada pembahasan yang berhasil dirender.");
    }
    presentationNavigation = initPresentationNavigation(
      slides,
      navigationControls,
    );
  })();

  try {
    await presentationInitialization;
  } catch (error) {
    presentationInitialization = null;
    throw error;
  }
}

function updatePresentationHeading(questionId) {
  const index = questionIndexes.get(questionId);
  if (index === undefined) return;
  const question = questionEntries[index]?.question;
  presentationNumber.textContent = `SOAL ${String(index + 1).padStart(2, "0")}`;
  presentationTitle.textContent = question
    ? getQuestionTitle(question, index)
    : assessment02.topic || "Pembahasan Matematika";
}

async function showQuestion(questionId) {
  const questionIndex = questionIndexes.get(questionId);
  if (questionIndex === undefined) {
    setHash("#questions");
    return;
  }

  const currentRequest = ++routeRequest;
  libraryPage.hidden = true;
  presentationPage.hidden = false;
  presentationNavElement.hidden = false;
  document.body.classList.add("is-presenting");
  updatePresentationHeading(questionId);

  try {
    await initializePresentation();
    if (currentRequest !== routeRequest) return;
    const target = presentationNavigation.getQuestions().find(
      (question) => question.id === questionId,
    );
    if (!target) {
      throw new Error(`Pembahasan ${questionId} tidak ditemukan.`);
    }
    presentationNavigation.closeQuestionPanel();
    if (presentationNavigation.getCurrentIndex() !== target.slideIndex) {
      presentationNavigation.goTo(target.slideIndex);
    }
    syncNavigationSpace();
    window.scrollTo({ top: 0, behavior: "auto" });
  } catch (error) {
    console.error("Gagal membuka pembahasan:", error);
    libraryPage.hidden = false;
    presentationPage.hidden = true;
    presentationNavElement.hidden = true;
    document.body.classList.remove("is-presenting");
  }
}

function showLibrary() {
  routeRequest += 1;
  presentationPage.hidden = true;
  presentationNavElement.hidden = true;
  libraryPage.hidden = false;
  document.body.classList.remove("is-presenting");
  if (presentationNavigation) {
    presentationNavigation.closeQuestionPanel();
  }
  questionPanel.hidden = true;
  questionButton.setAttribute("aria-expanded", "false");
  presentationPage.style.paddingBottom = "";

  const sectionId = window.location.hash.slice(1);
  if (sectionId && sectionId !== "questions") {
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    });
  } else if (sectionId === "questions") {
    requestAnimationFrame(() => {
      document.querySelector("#questions")?.scrollIntoView({ block: "start" });
    });
  }
}

function routeFromHash() {
  const questionId = getQuestionIdFromHash();
  if (questionId) {
    void showQuestion(questionId);
    return;
  }
  showLibrary();
}

questionGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest(".open-question");
  if (!button || !questionGrid.contains(button)) return;
  setHash(`#question/${encodeURIComponent(button.dataset.questionId)}`);
});

closePresentationButton.addEventListener("click", () => setHash("#questions"));
window.addEventListener("hashchange", routeFromHash);

renderQuestionCards();
routeFromHash();

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle-icon");
const themeLabel = document.querySelector(".theme-toggle-label");

let savedTheme = "dark";
try {
  const storedTheme = localStorage.getItem("mathspace-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    savedTheme = storedTheme;
  }
} catch (error) {
  console.warn("Preferensi tema tidak dapat dibaca dari penyimpanan lokal.", error);
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  const isLight = theme === "light";
  themeIcon.textContent = isLight ? "☾" : "☀";
  themeLabel.textContent = isLight ? "Mode gelap" : "Mode terang";
  themeToggle.setAttribute("aria-pressed", String(isLight));
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("mathspace-theme", nextTheme);
  } catch (error) {
    console.warn("Preferensi tema tidak dapat disimpan.", error);
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#nav-menu");

function closeMenu() {
  navMenu.classList.remove("active");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  navMenu.classList.toggle("active", isOpen);
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
