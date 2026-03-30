import {
  applySharedCopy,
  createArrowIcon,
  renderMetrics,
} from "./case-studies-common.js?v=20260330";

const renderFilters = (filters = [], activeFilter) =>
  filters
    .map(
      (filter) => `
        <button
          type="button"
          class="sample-filter-card${filter.id === activeFilter ? " is-active" : ""}"
          data-sample-filter="${filter.id}"
          aria-pressed="${String(filter.id === activeFilter)}"
        >
          <span>${filter.label}</span>
        </button>
      `
    )
    .join("");

const renderCard = (lang, content, sample) => {
  const chips = sample.chips.map((chip) => `<span class="case-chip">${chip}</span>`).join("");
  const contactUrl = lang === "de" ? "/de/apply/" : "/apply/";

  return `
    <article class="case-card sample-card">
      <a
        class="case-card-media sample-card-media sample-card-media-link"
        href="${sample.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${content.visitLabel}: ${sample.title}"
      >
        <img loading="lazy" decoding="async" src="${sample.image}" alt="${sample.imageAlt}">
      </a>
      <div class="case-card-body sample-card-body">
        <div class="case-card-meta">
          <span class="case-card-category">${sample.categoryLabel}</span>
        </div>
        <div>
          <h2 class="case-card-title">${sample.title}</h2>
          <p class="case-card-subtitle">${sample.subtitle}</p>
        </div>
        <p class="case-card-copy">${sample.overview}</p>
        ${renderMetrics(sample.cardMetrics)}
        <div class="case-chip-row">${chips}</div>
        <div class="case-card-footer sample-card-focus">
          <div>
            <strong>${content.cardFocusLabel}</strong>
            <p>${sample.bestFor}</p>
          </div>
        </div>
        <div class="sample-card-actions">
          <a class="sample-card-btn sample-card-btn--primary" href="${sample.url}" target="_blank" rel="noopener noreferrer">
            ${content.visitLabel} ${createArrowIcon()}
          </a>
          <a class="sample-card-btn sample-card-btn--secondary" href="${contactUrl}">
            ${content.contactLabel}
          </a>
        </div>
      </div>
    </article>
  `;
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
};

export const initWebsiteSamplesHub = ({ lang, content }) => {
  setText("[data-samples-title]", content.heroTitle);
  setText("[data-samples-title-accent]", content.heroTitleAccent);
  setText("[data-samples-intro]", content.heroIntro);

  const gridRoot = document.querySelector("[data-sample-grid]");
  const filtersRoot = document.querySelector("[data-samples-filters]");
  if (!gridRoot || !filtersRoot) return;

  let activeFilter = "all";

  const updateGrid = () => {
    const samples =
      activeFilter === "all"
        ? content.samples
        : content.samples.filter((sample) => sample.category === activeFilter);

    if (!samples.length) {
      gridRoot.innerHTML = `
        <div class="case-empty">
          <strong>${content.emptyStateTitle}</strong>
          <p>${content.emptyStateCopy}</p>
        </div>
      `;
      return;
    }

    gridRoot.innerHTML = samples.map((sample) => renderCard(lang, content, sample)).join("");
  };

  const updateFilters = () => {
    filtersRoot.innerHTML = renderFilters(content.filters, activeFilter);
    filtersRoot.querySelectorAll("[data-sample-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.getAttribute("data-sample-filter") || "all";
        updateFilters();
        updateGrid();
      });
    });
  };

  updateFilters();
  updateGrid();

  applySharedCopy(content);
};
