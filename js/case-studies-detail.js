import {
  applySharedCopy,
  createArrowIcon,
  createBackIcon,
  getCaseUrl,
  getHubUrl,
  getStudyBySlug,
  renderExternalLink,
  renderMetrics,
} from "./case-studies-common.js?v=20260330";

let mediaLightboxState;

const SCRAMBLE_CHARS = "0123456789+%€.,";

const scrambleMetricValue = (node, finalValue, duration = 1100) => {
  const container = node.closest(".case-hero-metrics__item");
  if (container) {
    container.classList.add("is-scrambling");
    container.classList.remove("is-settled");
  }

  const start = performance.now();
  const characters = finalValue.split("");
  const frame = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const revealCount = Math.floor(progress * characters.length);
    node.textContent = characters
      .map((char, index) => {
        if (char === " ") return char;
        if (index < revealCount) return char;
        if (!SCRAMBLE_CHARS.includes(char)) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join("");

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    node.textContent = finalValue;
    if (container) {
      container.classList.remove("is-scrambling");
      container.classList.add("is-settled");
    }
  };

  requestAnimationFrame(frame);
};

const initHeroMetricScramble = (root) => {
  const values = Array.from(root.querySelectorAll(".case-hero-metrics__item strong"));
  if (!values.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    values.forEach((node) => {
      const finalValue = node.textContent.trim();
      node.textContent = finalValue;
      node.closest(".case-hero-metrics__item")?.classList.add("is-settled");
    });
    return;
  }

  const metricsGroup = root.querySelector(".case-hero-metrics");
  if (!metricsGroup) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      values.forEach((node, index) => {
        const finalValue = node.textContent.trim();
        window.setTimeout(() => {
          scrambleMetricValue(node, finalValue);
        }, index * 160);
      });
    },
    { threshold: 0.45 }
  );

  observer.observe(metricsGroup);
};

const ensureMediaLightbox = () => {
  if (mediaLightboxState) return mediaLightboxState;

  const lightbox = document.createElement("div");
  lightbox.className = "case-lightbox";
  lightbox.setAttribute("hidden", "");
  lightbox.innerHTML = `
    <div class="case-lightbox-backdrop" data-lightbox-close></div>
    <div class="case-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Expanded image">
      <button type="button" class="case-lightbox-close" data-lightbox-close aria-label="Close image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 6 6 18"/>
          <path d="m6 6 12 12"/>
        </svg>
      </button>
      <div class="case-lightbox-surface">
        <img class="case-lightbox-image" alt="">
      </div>
      <p class="case-lightbox-caption"></p>
    </div>
  `;

  document.body.appendChild(lightbox);

  const image = lightbox.querySelector(".case-lightbox-image");
  const caption = lightbox.querySelector(".case-lightbox-caption");

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("case-lightbox-open");
    window.setTimeout(() => {
      lightbox.setAttribute("hidden", "");
      if (image) image.setAttribute("src", "");
    }, 180);
  };

  lightbox.querySelectorAll("[data-lightbox-close]").forEach((node) => {
    node.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      close();
    }
  });

  const open = (src, alt) => {
    if (!image || !caption) return;
    image.setAttribute("src", src);
    image.setAttribute("alt", alt || "");
    caption.textContent = alt || "";
    lightbox.removeAttribute("hidden");
    document.body.classList.add("case-lightbox-open");
    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
    });
  };

  mediaLightboxState = { lightbox, open, close };
  return mediaLightboxState;
};

const initExpandableMedia = (root) => {
  const triggers = Array.from(root.querySelectorAll("[data-expand-image]"));
  if (!triggers.length) return;

  const lightbox = ensureMediaLightbox();
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const src = trigger.getAttribute("data-expand-image");
      const alt = trigger.getAttribute("data-expand-alt") || "";
      if (!src) return;
      lightbox.open(src, alt);
    });
  });
};

const initRelatedCarousel = (viewport, grid, controls, prevButton, nextButton) => {
  if (!viewport || !grid || !controls || !prevButton || !nextButton) return;

  const applyStaticLayout = () => {
    const cardCount = grid.querySelectorAll(".case-mini-card").length;
    viewport.style.display = "flex";
    viewport.style.justifyContent = "center";
    viewport.style.overflowX = "visible";

    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${cardCount}, minmax(19rem, 23rem))`;
    grid.style.gridAutoFlow = "row";
    grid.style.gridAutoColumns = "unset";
    grid.style.width = "fit-content";
    grid.style.minWidth = "0";
    grid.style.margin = "0 auto";
    grid.style.justifyContent = "center";
  };

  const clearStaticLayout = () => {
    viewport.style.display = "";
    viewport.style.justifyContent = "";
    viewport.style.overflowX = "";

    grid.style.display = "";
    grid.style.gridTemplateColumns = "";
    grid.style.gridAutoFlow = "";
    grid.style.gridAutoColumns = "";
    grid.style.width = "";
    grid.style.minWidth = "";
    grid.style.margin = "";
    grid.style.justifyContent = "";
  };

  const getScrollStep = () => {
    const firstCard = grid.querySelector(".case-mini-card");
    if (!firstCard) return viewport.clientWidth * 0.9;
    const styles = window.getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const scrollable = maxScroll > 8;
    controls.classList.toggle("is-hidden", !scrollable);
    viewport.classList.toggle("is-static", !scrollable);

    if (!scrollable) {
      applyStaticLayout();
      viewport.scrollLeft = 0;
      prevButton.disabled = true;
      nextButton.disabled = true;
      return;
    }

    clearStaticLayout();
    prevButton.disabled = viewport.scrollLeft <= 8;
    nextButton.disabled = viewport.scrollLeft >= maxScroll - 8;
  };

  prevButton.addEventListener("click", () => {
    viewport.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    viewport.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  });

  viewport.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(updateButtons);
    resizeObserver.observe(viewport);
    resizeObserver.observe(grid);
  }

  updateButtons();
};

export const initCaseStudiesDetail = ({ lang, content }) => {
  const detailRoot = document.querySelector("[data-case-detail]");
  const relatedRoot = document.querySelector("[data-related-grid]");
  const relatedCopy = document.querySelector("[data-related-copy]");
  const relatedViewport = document.querySelector("[data-related-viewport]");
  const relatedControls = document.querySelector("[data-related-controls]");
  const relatedPrev = document.querySelector("[data-related-prev]");
  const relatedNext = document.querySelector("[data-related-next]");
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("study") || content.studies[0].slug;
  const study = getStudyBySlug(content, slug);

  document.title = `${study.title} | ${content.detailSuffix}`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", study.overview);

  if (study.image) {
    document.body.style.setProperty("--case-hero-bg", `url('${study.image}')`);
  }

  const stats = study.snapshot
    .map(
      (item) => `
        <div class="case-stat">
          <span class="case-stat-label">${item.label}</span>
          <span class="case-stat-value">${renderExternalLink(item.value, item.url, "case-stat-link")}</span>
        </div>
      `
    )
    .join("");

  const renderSectionCard = (section) => {
    const body = Array.isArray(section.body)
      ? section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")
      : "";
    const bullets = Array.isArray(section.bullets)
      ? `<ul class="case-bullet-list">${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
      : "";

    return `
      <section class="case-section-card">
        <span class="case-section-kicker">${section.kicker}</span>
        <h2 class="case-section-title">${section.title}</h2>
        <div class="case-section-body">
          ${body}
          ${bullets}
        </div>
      </section>
    `;
  };

  const stackedMedia = study.stackedMedia
    ? `
      <section class="case-section-card case-inline-media${study.stackedMedia.mode === "contain" ? " is-framed" : ""}">
        <button
          type="button"
          class="case-inline-media-frame case-image-trigger"
          data-expand-image="${study.stackedMedia.src}"
          data-expand-alt="${study.stackedMedia.alt}"
          aria-label="${content.expandImageLabel}"
        >
          <img loading="eager" decoding="async" src="${study.stackedMedia.src}" alt="${study.stackedMedia.alt}">
        </button>
      </section>
    `
    : "";

  const sections = study.sections
    .map((section, index) => `${renderSectionCard(section)}${study.stackedMedia && index === 0 ? stackedMedia : ""}`)
    .join("");

  const snapshotList = study.snapshot
    .map(
      (item) => `
        <li>
          <strong>${item.label}</strong>
          <span>${renderExternalLink(item.value, item.url, "case-side-link")}</span>
        </li>
      `
    )
    .join("");

  const deliverables = study.deliverables.map((item) => `<li>${item}</li>`).join("");
  const quoteSource = study.quoteSource || content.quoteSource;
  const sidebarNote = study.sidebarNote || content.sidebarNote;
  const useGalleryStackHero =
    study.detailMediaLayout === "gallery-stack" &&
    Array.isArray(study.gallery) &&
    study.gallery.length > 0;

  const heroMetrics = renderMetrics(study.heroMetrics, "case-hero-metrics");
  const heroMedia = useGalleryStackHero
    ? `
      <div class="case-hero-gallery">
        ${study.gallery
          .map(
            (image) => `
              <button
                type="button"
                class="case-gallery-item case-hero-gallery-item${image.mode === "contain" ? " is-framed" : ""} case-image-trigger"
                data-expand-image="${image.src}"
                data-expand-alt="${image.alt}"
                aria-label="${content.expandImageLabel}"
              >
                <img loading="lazy" decoding="async" src="${image.src}" alt="${image.alt}">
              </button>
            `
          )
          .join("")}
      </div>
    `
    : `
      <div class="case-detail-media${study.imageMode === "contain" ? " is-framed" : ""}${study.detailImageFrame === "portrait" ? " is-portrait-frame" : ""}">
        <img loading="eager" decoding="async" src="${study.image}" alt="${study.imageAlt}">
      </div>
    `;

  const galleryImages = useGalleryStackHero
    ? [{ src: study.image, alt: study.imageAlt, mode: "contain", feature: true }]
    : study.gallery;

  const gallery = Array.isArray(galleryImages) && galleryImages.length
    ? `
      <section class="case-gallery${useGalleryStackHero ? " case-gallery--feature" : ""}${study.galleryLayout === "landscape" ? " case-gallery--landscape" : ""}">
        ${galleryImages
          .map(
            (image) => `
              <button
                type="button"
                class="case-gallery-item${image.mode === "contain" ? " is-framed" : ""}${image.feature ? " case-gallery-item--feature" : ""} case-image-trigger"
                data-expand-image="${image.src}"
                data-expand-alt="${image.alt}"
                aria-label="${content.expandImageLabel}"
              >
                <img loading="lazy" decoding="async" src="${image.src}" alt="${image.alt}">
              </button>
            `
          )
          .join("")}
      </section>
    `
    : "";

  detailRoot.innerHTML = `
    <a class="case-back-link" href="${getHubUrl(lang)}">${createBackIcon()} ${content.backLabel}</a>
    <div class="case-detail-hero${useGalleryStackHero ? " has-gallery-stack" : ""}">
      <div class="case-detail-panel">
        <span class="case-section-kicker">${study.categoryLabel}</span>
        <div>
          <h1 class="case-detail-title">${renderExternalLink(study.title, study.externalUrl, "case-title-link")}</h1>
          <p class="case-detail-subtitle">${study.subtitle}</p>
        </div>
        <p class="case-detail-summary">${study.overview}</p>
        ${heroMetrics}
        <div class="case-stats">${stats}</div>
      </div>
      ${heroMedia}
    </div>
    ${gallery}
    <div class="case-story-grid">
      <div class="case-story-stack">
        ${sections}
        <section class="case-section-card">
          <span class="case-section-kicker">${lang === "de" ? "Leistungsumfang" : "Deliverables"}</span>
          <h2 class="case-section-title">${lang === "de" ? "Was in dieser Struktur enthalten ist" : "What is built into this structure"}</h2>
          <div class="case-section-body">
            <ul class="case-bullet-list">${deliverables}</ul>
          </div>
        </section>
        <div class="case-quote">
          <p>${study.quote}</p>
          <strong>${quoteSource}</strong>
        </div>
      </div>
      <aside class="case-side-panel">
        <h2 class="case-side-title">${content.sidebarTitle}</h2>
        <ul class="case-side-list">${snapshotList}</ul>
        <div class="case-side-note">
          <p>${sidebarNote}</p>
        </div>
      </aside>
    </div>
  `;

  initHeroMetricScramble(detailRoot);
  initExpandableMedia(detailRoot);
  applySharedCopy(content);

  if (relatedCopy) relatedCopy.textContent = content.relatedCopy;
  if (!relatedRoot) return;

  const relatedStudies = content.studies.filter((item) => item.slug !== study.slug);
  relatedRoot.innerHTML = relatedStudies
    .map(
      (item) => `
        <a class="case-mini-card" href="${getCaseUrl(lang, item.slug)}">
          <div class="case-card-media">
            <img loading="lazy" decoding="async" src="${item.image}" alt="${item.imageAlt}">
          </div>
          <div class="case-card-body">
            <span class="case-card-category">${item.categoryLabel}</span>
            <h3 class="case-card-title">${item.title}</h3>
            <p class="case-card-copy">${item.overview}</p>
            <span class="case-card-link">${content.cardCta} ${createArrowIcon()}</span>
          </div>
        </a>
      `
    )
    .join("");

  initRelatedCarousel(relatedViewport, relatedRoot, relatedControls, relatedPrev, relatedNext);
};
