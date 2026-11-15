const stepContent = document.querySelector(".step-content");
const stepTitle = document.querySelector(".step-title");
const stepDescription = document.querySelector(".step-description");
const currentStep = document.querySelector(".current-step");
const totalSteps = document.querySelector(".total-steps");
const prevButton = document.querySelector(".prev-step");
const nextButton = document.querySelector(".next-step");
const progressFill = document.querySelector(".step-progress-fill");
const questionGrid = document.querySelector(".question-grid");
const questionNumber = document.querySelector(".question-number");
const questionTitle = document.querySelector(".question-title");
const problemDescription = document.querySelector(".problem-description");
const questionDetail = document.querySelector(".question-detail");
const answerDescription = document.querySelector(".answer-description");

const questions = [
  {
    title: "Kode Kupon Berhadiah",
    summary: "Menentukan kode kupon pada urutan ke-40",
    problem:
      "Sebuah swalayan membagikan kupon berhadiah. Kode kupon berupa bilangan 5 angka yang disusun dari angka-angka ini: 23358. Semua kupon diurutkan dari kode yang paling kecil. Berapa kode kupon pada urutan ke-40?",
    answer: "Kode kupon pada urutan ke-40 adalah 53238.",
    steps: [
      {
        title: "Menghitung Kelompok Awal",
        description:
          "Kode yang diawali angka 2 berjumlah 12, sedangkan yang diawali 3 berjumlah 24. Totalnya 36 kode. Jadi, urutan ke-40 pasti diawali angka 5.",
      },
      {
        title: "Menentukan Angka Kedua",
        description:
          "Dari kelompok yang diawali 5, kode yang diawali 52 berjumlah 3, yaitu urutan ke-37 sampai ke-39. Maka urutan ke-40 diawali 53.",
      },
      {
        title: "Menentukan Kode Terakhir",
        description:
          "Sisa angka adalah 2, 3, dan 8. Susun dari yang terkecil untuk mendapatkan kode pertama dalam kelompok 53, yaitu 53238.",
      },
    ],
  },
]

let selectedQuestionIndex = 0;
let currentIndex = 0;

function tampilkanDaftarSoal() {
  questionGrid.innerHTML = "";

  questions.forEach((question, index) => {
    questionGrid.innerHTML += `
      <article class="question-card">
        <span>QUESTION ${index + 1}</span>
        <h3>${question.title}</h3>
        <p>${question.summary}</p>
        <button class="open-question" type="button" data-index="${index}">
          Lihat Pembahasan
        </button>
      </article>
    `;
  });
}

function tampilkanSoal() {
  const question = questions[selectedQuestionIndex];

  const formattedQuestionNumber = String(selectedQuestionIndex + 1).padStart(2, "0");
  questionNumber.textContent = `QUESTION ${formattedQuestionNumber}`;
  questionTitle.textContent = question.title;
  problemDescription.textContent = question.problem;
  answerDescription.textContent = question.answer;
}

function tampilkanLangkah() {
  const steps = questions[selectedQuestionIndex].steps;
  const step = steps[currentIndex];

  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  currentStep.textContent = currentIndex + 1;
  totalSteps.textContent = steps.length;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === steps.length - 1;
  progressFill.style.width = `${((currentIndex + 1) / steps.length) * 100}%`;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  stepContent.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    {
      duration: 280,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  );
}

nextButton.addEventListener("click", () => {
  const steps = questions[selectedQuestionIndex].steps;

  if (currentIndex < steps.length - 1) {
    currentIndex++;
    tampilkanLangkah();
  }
});

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    tampilkanLangkah();
  }
});

questionGrid.addEventListener("click", (event) => {
  const selectedCard = event.target.closest(".open-question");

  if (!selectedCard) return;

  selectedQuestionIndex = Number(selectedCard.dataset.index);
  currentIndex = 0;

  tampilkanSoal();
  tampilkanLangkah();
  questionDetail.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

tampilkanDaftarSoal();
tampilkanSoal();
tampilkanLangkah();


// ================================
// THEME SWITCH
// ================================

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle-icon");
const themeLabel = document.querySelector(".theme-toggle-label");

// Ambil tema yang pernah dipilih
let savedTheme = "dark";

try {
  const storedTheme = localStorage.getItem("mathspace-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    savedTheme = storedTheme;
  }
} catch (error) {
  console.warn("Theme preference could not be loaded.");
}

// Terapkan tema
function applyTheme(theme) {
  document.body.dataset.theme = theme;

  const isLight = theme === "light";

  themeIcon.textContent = isLight ? "☾" : "☀";
  themeLabel.textContent = isLight ? "Dark mode" : "Light mode";

  themeToggle.setAttribute("aria-pressed", String(isLight));
}

// Terapkan tema awal
applyTheme(savedTheme);

// Ketika tombol diklik
themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.dataset.theme;

  const nextTheme = currentTheme === "dark"
    ? "light"
    : "dark";

  applyTheme(nextTheme);

  // Simpan pilihan pengguna
  try {
    localStorage.setItem("mathspace-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.");
  }
});
