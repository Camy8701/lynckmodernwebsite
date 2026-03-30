import {
  applySharedCopy,
  createArrowIcon,
  getCaseUrl,
  renderMetrics,
} from "./case-studies-common.js?v=20260330";

const renderCard = (lang, content, study) => {
  const chips = study.chips.map((chip) => `<span class="case-chip">${chip}</span>`).join("");
  const cardMediaClass = `case-card-media${study.imageMode === "contain" ? " is-framed" : ""}`;

  return `
    <a class="case-card" href="${getCaseUrl(lang, study.slug)}" data-category="${study.category}">
      <div class="${cardMediaClass}">
        <img loading="lazy" decoding="async" src="${study.image}" alt="${study.imageAlt}">
      </div>
      <div class="case-card-body">
        <div class="case-card-meta">
          <span class="case-card-category">${study.categoryLabel}</span>
        </div>
        <div>
          <h2 class="case-card-title">${study.title}</h2>
          <p class="case-card-subtitle">${study.subtitle}</p>
        </div>
        <p class="case-card-copy">${study.overview}</p>
        ${renderMetrics(study.cardMetrics)}
        <div class="case-chip-row">${chips}</div>
        <div class="case-card-footer">
          <div>
            <strong>${content.cardFocusLabel}</strong>
            <p>${study.cardFocus || study.snapshot[study.snapshot.length - 1].value}</p>
          </div>
          <span class="case-card-link">${content.cardCta} ${createArrowIcon()}</span>
        </div>
      </div>
    </a>
  `;
};

export const initCaseStudiesHub = ({ lang, content }) => {
  const filtersRoot = document.querySelector("[data-case-filters]");
  const gridRoot = document.querySelector("[data-case-grid]");
  if (!filtersRoot || !gridRoot) return;

  let activeFilter = "all";

  const updateGrid = () => {
    const studies =
      activeFilter === "all"
        ? content.studies
        : content.studies.filter((study) => study.category === activeFilter);

    if (!studies.length) {
      gridRoot.innerHTML = `
        <div class="case-empty">
          <strong>${content.emptyStateTitle}</strong>
          <p>${content.emptyStateCopy}</p>
        </div>
      `;
      return;
    }

    gridRoot.innerHTML = studies.map((study) => renderCard(lang, content, study)).join("");
  };

  filtersRoot.innerHTML = content.filters
    .map(
      (filter) => `
        <button type="button" class="case-filter${filter.id === activeFilter ? " is-active" : ""}" data-filter-button="${filter.id}" aria-pressed="${filter.id === activeFilter}">
          ${filter.label}
        </button>
      `
    )
    .join("");

  filtersRoot.querySelectorAll("[data-filter-button]").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.getAttribute("data-filter-button") || "all";
      filtersRoot.querySelectorAll("[data-filter-button]").forEach((node) => {
        const selected = node === button;
        node.classList.toggle("is-active", selected);
        node.setAttribute("aria-pressed", String(selected));
      });
      updateGrid();
    });
  });

  updateGrid();
  applySharedCopy(content);
};
