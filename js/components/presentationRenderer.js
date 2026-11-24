import { renderContentLayout, typesetMath } from "./contentRenderer.js";

import { renderSlideTemplate } from "./slideTemplates.js";

// Mengumpulkan seluruh slide dari assessment

function collectSlides(assessment) {
  const slides = [];

  if (!Array.isArray(assessment?.sections)) {
    return slides;
  }

  assessment.sections.forEach((section) => {
    const questions = Array.isArray(section.questions) ? section.questions : [];

    questions.forEach((question) => {
      const questionSlides = Array.isArray(question.slides)
        ? question.slides
        : [];

      // Hitung jumlah slide pembahasan dalam satu soal
      const explanationTotal = questionSlides.filter(
        (slide) => slide?.type === "explanation",
      ).length;

      let explanationStepNumber = 0;

      const contextBlocks =
        question.usesSharedContent === true ? section.sharedContent || [] : [];

      questionSlides.forEach((slide) => {
        const isExplanation = slide.type === "explanation";

        if (isExplanation) {
          explanationStepNumber++;
        }

        slides.push({
          ...slide,

          questionId: question.id,
          questionNumber: question.number,
          sectionId: section.id,

          // Penomoran pembahasan
          explanationStepNumber: isExplanation ? explanationStepNumber : null,

          explanationStepTotal: isExplanation ? explanationTotal : 0,

          // Informasi pendukung
          contextBlocks,
          contextTitle: section.title || "Informasi Pendukung",

          contextLabel: section.sharedContentLabel || "",

          contextLayout: section.sharedContentLayout || "stack",
        });
      });
    });
  });

  return slides;
}

// Membuat satu elemen slide

function createSlide(slide, index) {
  const article = document.createElement("article");

  article.className = "presentation-slide";

  article.dataset.slideId = slide.id || `slide-${index + 1}`;

  article.dataset.slideIndex = index;

  // Metadata untuk sistem navigasi soal
  article.dataset.questionId = slide.questionId ?? "";
  article.dataset.questionNumber = slide.questionNumber ?? "";
  article.dataset.sectionId = slide.sectionId ?? "";
  article.dataset.slideType = slide.type ?? "";

  article.hidden = index !== 0;

  article.setAttribute("aria-hidden", String(index !== 0));

  // HEADER
  const header = document.createElement("header");

  header.className = "presentation-slide__header";

  const title = document.createElement("h2");

  title.className = "presentation-slide__title";

  title.textContent = slide.title || `Slide ${index + 1}`;

  header.appendChild(title);

  // STEP NUMBERING
  if (slide.type === "explanation") {
    const stepIndicator = document.createElement("p");

    stepIndicator.className = "presentation-slide__step";

    stepIndicator.textContent = `LANGKAH PEMBAHASAN ${slide.explanationStepNumber} / ${slide.explanationStepTotal}`;

    stepIndicator.setAttribute(
      "aria-label",
      `Langkah pembahasan ${slide.explanationStepNumber} dari ${slide.explanationStepTotal}`,
    );

    header.appendChild(stepIndicator);
  }

  // MAIN CONTENT
  const content = document.createElement("div");

  content.className = "presentation-slide__content";

  // SHARED CONTEXT
  if (Array.isArray(slide.contextBlocks) && slide.contextBlocks.length > 0) {
    const context = document.createElement("aside");

    context.className = "presentation-context";

    if (slide.contextLabel) {
      const label = document.createElement("p");

      label.className = "presentation-context__label";

      label.textContent = slide.contextLabel;

      context.appendChild(label);
    }

    const contextTitle = document.createElement("h3");

    contextTitle.className = "presentation-context__title";

    contextTitle.textContent = slide.contextTitle || "Informasi Pendukung";

    context.appendChild(contextTitle);

    const contextContent = document.createElement("div");

    contextContent.className = "presentation-context__content";

    contextContent.appendChild(
      renderContentLayout(slide.contextBlocks, slide.contextLayout),
    );

    context.appendChild(contextContent);

    content.appendChild(context);
  }

  // SLIDE TEMPLATE
  const template = renderSlideTemplate(slide);

  content.appendChild(template);

  article.append(header, content);

  return article;
}

// Renderer utama
export async function renderPresentation(assessment, container) {
  if (!container) {
    throw new Error("Presentation container tidak ditemukan.");
  }

  container.replaceChildren();

  const slidesData = collectSlides(assessment);

  const fragment = document.createDocumentFragment();

  const slideElements = slidesData.map((slide, index) => {
    const element = createSlide(slide, index);

    fragment.appendChild(element);

    return element;
  });

  container.appendChild(fragment);

  // Render rumus pada slide pertama
  if (slideElements.length > 0) {
    await typesetMath(slideElements[0]);
  }

  console.log(`Presentation berhasil memuat ${slideElements.length} slide.`);
  console.table(
    slidesData.map((slide) => ({
      id: slide.id,
      title: slide.title,
      type: slide.type,
      template: slide.template,
      blocks: slide.blocks?.length,
    })),
  );
  return slideElements;
}
