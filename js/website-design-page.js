import content from "./website-samples-content-en.js?v=20260419e";

const gridRoot = document.querySelector("[data-template-grid]");
const emptyRoot = document.querySelector("[data-template-empty]");
const countRoot = document.querySelector("[data-template-count]");
const searchInput = document.querySelector("[data-template-search]");
const sortSelect = document.querySelector("[data-sort]");
const categoryPillsRoot = document.querySelector("[data-category-pills]");

const state = {
  search: "",
  category: "all",
  sort: "recommended",
};

const industryLabelMap = Object.fromEntries(content.filters.map((filter) => [filter.id, filter.label]));

const samples = content.samples.map((sample, index) => ({
  ...sample,
  order: index,
  industry: sample.category,
  industryLabel: industryLabelMap[sample.category] || sample.category,
}));

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const createCard = (sample) => {
  const applyUrl = `/apply/?sample=${encodeURIComponent(sample.title)}`;
  const previewLabel = sample.categoryLabel
    .replace(/ website$/i, "")
    .replace(/ template$/i, "");

  return `
    <article class="wdl-card">
      <div class="wdl-card-media">
        <a
          class="wdl-card-media-link"
          href="${sample.url}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Preview ${escapeHtml(sample.title)}"
        >
          <img loading="lazy" decoding="async" src="${sample.image}" alt="${escapeHtml(sample.imageAlt)}">
        </a>
        <span class="wdl-card-overlay">
          <span class="wdl-card-actions">
            <a class="wdl-card-action wdl-card-action--dark" href="${applyUrl}">Use this</a>
            <a class="wdl-card-action" href="${sample.url}" target="_blank" rel="noopener noreferrer">View</a>
          </span>
        </span>
      </div>
      <div class="wdl-card-body">
        <div class="wdl-card-caption">
          <h3>${escapeHtml(sample.title)}</h3>
          <p>${escapeHtml(previewLabel)}</p>
        </div>
        <a class="wdl-card-chip" href="${applyUrl}">LYNCK Ready</a>
      </div>
    </article>
  `;
};

const renderCategoryPills = () => {
  if (!categoryPillsRoot) return;

  categoryPillsRoot.innerHTML = content.filters
    .map((filter) => {
      const isActive = filter.id === state.category;
      return `
        <button
          type="button"
          class="wdl-filter-pill${isActive ? " is-active" : ""}"
          data-category-filter="${escapeHtml(filter.id)}"
          aria-pressed="${isActive}"
          role="tab"
        >
          ${escapeHtml(filter.label)}
        </button>
      `;
    })
    .join("");
};

const filterSamples = () => {
  const searchTerm = state.search.trim().toLowerCase();

  return samples
    .filter((sample) => {
      if (state.category !== "all" && sample.category !== state.category) return false;

      if (!searchTerm) return true;

      const haystack = [
        sample.title,
        sample.subtitle,
        sample.categoryLabel,
        sample.overview,
        sample.bestFor,
        sample.industryLabel,
        ...sample.chips,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm);
    })
    .sort((left, right) => {
      if (state.sort === "name") return left.title.localeCompare(right.title);
      if (state.sort === "industry") {
        return left.industryLabel.localeCompare(right.industryLabel) || left.order - right.order;
      }
      return left.order - right.order;
    });
};

const render = () => {
  if (!gridRoot || !emptyRoot || !countRoot) return;

  renderCategoryPills();

  const visible = filterSamples();

  countRoot.textContent = `${visible.length} template${visible.length === 1 ? "" : "s"}`;

  if (!visible.length) {
    gridRoot.innerHTML = "";
    emptyRoot.hidden = false;
    return;
  }

  emptyRoot.hidden = true;
  gridRoot.innerHTML = visible.map(createCard).join("");
};

searchInput?.addEventListener("input", (event) => {
  state.search = event.currentTarget.value || "";
  render();
});

sortSelect?.addEventListener("change", (event) => {
  state.sort = event.currentTarget.value || "recommended";
  render();
});

categoryPillsRoot?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category-filter]");
  if (!button) return;

  state.category = button.getAttribute("data-category-filter") || "all";
  render();
});

document.addEventListener("click", (event) => {
  const startButton = event.target.closest("[data-start-btn]");
  if (startButton) {
    event.preventDefault();
    window.location.href = "/apply/";
  }
});

const widgetRoot = document.querySelector("[data-contact-widget]");
const widgetToggle = document.querySelector("[data-widget-toggle]");
const widgetPanel = document.getElementById("wdl-contact-panel");
const hoursToggle = document.querySelector("[data-hours-toggle]");
const hoursPanel = document.querySelector("[data-hours-panel]");

const setWidgetOpen = (open) => {
  if (!widgetRoot || !widgetToggle || !widgetPanel) return;
  widgetRoot.classList.toggle("is-open", open);
  widgetToggle.setAttribute("aria-expanded", String(open));
  widgetPanel.setAttribute("aria-hidden", String(!open));
  if (!open) setHoursOpen(false);
};

const setHoursOpen = (open) => {
  if (!hoursToggle || !hoursPanel) return;
  hoursToggle.setAttribute("aria-expanded", String(open));
  hoursPanel.hidden = !open;
};

widgetToggle?.addEventListener("click", () => {
  const isOpen = widgetRoot?.classList.contains("is-open");
  setWidgetOpen(!isOpen);
});

hoursToggle?.addEventListener("click", () => {
  const isOpen = hoursToggle.getAttribute("aria-expanded") === "true";
  setHoursOpen(!isOpen);
});

document.addEventListener("click", (event) => {
  if (!widgetRoot || widgetRoot.contains(event.target)) return;
  setHoursOpen(false);
  setWidgetOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setHoursOpen(false);
  setWidgetOpen(false);
});

render();
