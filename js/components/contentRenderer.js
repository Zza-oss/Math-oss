const SVG_NS = "http://www.w3.org/2000/svg";

// Membuat elemen SVG dengan atribut
function createSvgElement(tag, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tag);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, String(value));
  });

  return element;
}

function renderRoadNetwork(block) {
  const cities = block.data?.cities;
  const roads = block.data?.roads;

  // Validasi data utama
  if (
    !Array.isArray(cities) ||
    cities.length < 2 ||
    cities.length > 6 ||
    !Array.isArray(roads)
  ) {
    console.warn("Invalid road network data:", block);
    return null;
  }

  // Pastikan setiap kota memiliki ID unik dan label
  const cityIds = new Set();

  for (const city of cities) {
    if (
      !city ||
      typeof city.id !== "string" ||
      !city.id.trim() ||
      typeof city.label !== "string" ||
      !city.label.trim() ||
      cityIds.has(city.id)
    ) {
      console.warn("Invalid city data:", city);
      return null;
    }

    cityIds.add(city.id);
  }

  const width = 640;
  const height = 190;
  const centerY = 100;
  const radius = 25;

  const positions = new Map();

  const spacing = width / (cities.length + 1);

  // Menentukan posisi setiap kota
  cities.forEach((city, index) => {
    positions.set(city.id, {
      x: spacing * (index + 1),
      y: centerY,
      label: city.label,
    });
  });

  // Membuat SVG
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": block.alt || "Diagram jaringan jalan",
    class: "content-diagram__svg",
  });

  const title = createSvgElement("title");
  title.textContent = block.alt || "Diagram jaringan jalan";

  svg.appendChild(title);

  // Menggambar jalan
  roads.forEach((road) => {
    const from = positions.get(road?.from);
    const to = positions.get(road?.to);
    const count = road?.count;

    if (
      !from ||
      !to ||
      from.x === to.x ||
      !Number.isInteger(count) ||
      count < 1 ||
      count > 12
    ) {
      console.warn("Invalid road data:", road);
      return;
    }

    // Pastikan arah gambar dari kiri ke kanan
    const left = from.x < to.x ? from : to;
    const right = from.x < to.x ? to : from;

    const startX = left.x + radius;
    const endX = right.x - radius;

    // Menggambar beberapa garis paralel
    for (let i = 0; i < count; i++) {
      const offset = (i - (count - 1) / 2) * 7;

      const line = createSvgElement("line", {
        x1: startX,
        y1: centerY + offset,
        x2: endX,
        y2: centerY + offset,
        stroke: "var(--accent)",
        "stroke-width": 2.5,
        "stroke-linecap": "round",
      });

      svg.appendChild(line);
    }

    // Label jumlah jalan
    const roadLabel = createSvgElement("text", {
      x: (left.x + right.x) / 2,
      y: 43,
      "text-anchor": "middle",
      fill: "var(--accent)",
      "font-size": 14,
      "font-weight": 700,
    });

    roadLabel.textContent = `${count} jalan`;

    svg.appendChild(roadLabel);
  });

  // Menggambar kota
  cities.forEach((city) => {
    const position = positions.get(city.id);

    const circle = createSvgElement("circle", {
      cx: position.x,
      cy: position.y,
      r: radius,
      fill: "var(--bg-secondary)",
      stroke: "var(--accent)",
      "stroke-width": 2.5,
    });

    const cityCode = createSvgElement("text", {
      x: position.x,
      y: position.y + 5,
      "text-anchor": "middle",
      fill: "var(--text-primary)",
      "font-size": 16,
      "font-weight": 700,
    });

    cityCode.textContent = city.id;

    const cityLabel = createSvgElement("text", {
      x: position.x,
      y: position.y + 48,
      "text-anchor": "middle",
      fill: "var(--text-secondary)",
      "font-size": 12,
    });

    cityLabel.textContent = city.label;

    svg.append(circle, cityCode, cityLabel);
  });

  // Figure pembungkus
  const figure = document.createElement("figure");

  figure.className = "content-diagram";
  figure.appendChild(svg);

  if (block.caption) {
    const caption = document.createElement("figcaption");

    caption.textContent = block.caption;

    figure.appendChild(caption);
  }

  return figure;
}

function renderBlock(block) {
  if (!block || typeof block !== "object") {
    return null;
  }

  let element;

  switch (block.type) {
    // 1. Heading
    case "heading": {
      const level = Number(block.level);
      const validLevel =
        Number.isInteger(level) && level >= 2 && level <= 6 ? level : 3;

      element = document.createElement(`h${validLevel}`);
      element.className = "content-heading";
      element.textContent = block.content ?? "";
      break;
    }

    // 2. Paragraph
    case "paragraph": {
      element = document.createElement("p");
      element.className = "content-paragraph";
      element.textContent = block.content ?? "";
      break;
    }

    // 3. List
    case "list": {
      element = document.createElement(block.ordered ? "ol" : "ul");

      element.className = "content-list";

      if (Array.isArray(block.items)) {
        block.items.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = String(item);
          element.appendChild(li);
        });
      }

      break;
    }

    // 4. Image dan Diagram

    case "image": {
      if (
        typeof block.src !== "string" ||
        !block.src.trim() ||
        /^\s*(javascript|data|vbscript):/i.test(block.src)
      ) {
        return null;
      }

      element = document.createElement("figure");
      element.className = "content-image";

      const img = document.createElement("img");

      img.src = block.src;
      img.alt = block.alt ?? "";
      img.loading = "lazy";

      element.appendChild(img);

      if (block.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = block.caption;
        element.appendChild(caption);
      }

      break;
    }

    case "diagram": {
      if (block.diagram === "road-network") {
        element = renderRoadNetwork(block);
      } else {
        console.warn(`Unknown diagram type: ${block.diagram}`);
        return null;
      }

      if (!element) return null;

      break;
    }

    // 5. Formula
    case "formula": {
      element = document.createElement("div");
      element.className = "content-formula";

      element.textContent = `\\[${block.content ?? ""}\\]`;

      break;
    }

    // 6. Table
    case "table": {
      element = document.createElement("div");
      element.className = "content-table-wrapper";

      const table = document.createElement("table");
      table.className = "content-table";

      if (Array.isArray(block.headers)) {
        const thead = document.createElement("thead");
        const row = document.createElement("tr");

        block.headers.forEach((header) => {
          const th = document.createElement("th");
          th.textContent = String(header);
          row.appendChild(th);
        });

        thead.appendChild(row);
        table.appendChild(thead);
      }

      if (Array.isArray(block.rows)) {
        const tbody = document.createElement("tbody");

        block.rows.forEach((rowData) => {
          const row = document.createElement("tr");

          if (Array.isArray(rowData)) {
            rowData.forEach((value) => {
              const td = document.createElement("td");
              td.textContent = String(value);
              row.appendChild(td);
            });
          }

          tbody.appendChild(row);
        });

        table.appendChild(tbody);
      }

      element.appendChild(table);
      break;
    }

    default:
      console.warn(`Unknown content block type: ${block.type}`);
      return null;
  }

  return element;
}

export function renderContentLayout(blocks = [], layout = "stack") {
  if (!Array.isArray(blocks)) {
    return document.createDocumentFragment();
  }

  // Layout standar tetap menggunakan renderer lama
  if (layout !== "two-column") {
    return renderBlocks(blocks);
  }

  const wrapper = document.createElement("div");
  wrapper.className = "content-layout content-layout--two-column";

  const textColumn = document.createElement("div");
  textColumn.className = "content-layout__text";

  const visualColumn = document.createElement("div");
  visualColumn.className = "content-layout__visual";

  blocks.forEach((block) => {
    const element = renderBlock(block);

    if (!element) return;

    const isVisual = ["image", "diagram"].includes(block.type);

    if (isVisual) {
      visualColumn.appendChild(element);
    } else {
      textColumn.appendChild(element);
    }
  });

  // Jangan gunakan grid jika salah satu kolom kosong
  if (!textColumn.childElementCount || !visualColumn.childElementCount) {
    return renderBlocks(blocks);
  }

  wrapper.append(textColumn, visualColumn);

  return wrapper;
}

export function renderBlocks(blocks = []) {
  const fragment = document.createDocumentFragment();

  if (!Array.isArray(blocks)) {
    return fragment;
  }

  blocks.forEach((block) => {
    const element = renderBlock(block);

    if (element) {
      fragment.appendChild(element);
    }
  });

  return fragment;
}

export function typesetMath(container) {
  if (!container) {
    return Promise.resolve();
  }

  const mathJax = globalThis.MathJax;

  if (mathJax && typeof mathJax.typesetPromise === "function") {
    return mathJax.typesetPromise([container]).catch((error) => {
      console.error("MathJax rendering error:", error);
    });
  }

  return Promise.resolve();
}
