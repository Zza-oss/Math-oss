import { renderContentLayout } from "./contentRenderer.js";

const DEFAULT_TEMPLATES = {
  question: "question",
  explanation: "explanation",
};

const VALID_TEMPLATES = [
  "standard",
  "question",
  "explanation",
  "image-focus",
  "formula",
  "comparison",
];

function resolveTemplate(slide) {
  const selectedTemplate =
    slide.template || DEFAULT_TEMPLATES[slide.type] || "standard";

  return VALID_TEMPLATES.includes(selectedTemplate)
    ? selectedTemplate
    : "standard";
}

export function renderSlideTemplate(slide) {
  const template = resolveTemplate(slide);

  const wrapper = document.createElement("section");

  wrapper.className = `slide-template slide-template--${template}`;

  wrapper.dataset.template = template;

  const content = document.createElement("div");

  content.className = "slide-template__content";

  // Pastikan hanya array blocks yang dikirim
  const blocks = Array.isArray(slide.blocks) ? slide.blocks : [];

  const validBlockTypes = [
    "heading",
    "paragraph",
    "list",
    "image",
    "diagram",
    "formula",
    "table",
  ];

  const invalidBlocks = blocks.filter(
    (block) => !validBlockTypes.includes(block.type),
  );

  if (invalidBlocks.length > 0) {
    console.error(`Invalid blocks in slide: ${slide.id}`, invalidBlocks);
  }

  // Render seluruh konten berdasarkan layout slide
  content.appendChild(renderContentLayout(blocks, slide.layout || "stack"));

  wrapper.appendChild(content);

  return wrapper;
}
