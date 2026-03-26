import {
  applySharedCopy,
  createArrowIcon,
  renderMetrics,
} from "./case-studies-common.js";

const renderOverviewBadges = (badges = []) =>
  badges
    .map(
      (badge) => `
        <div class="sample-overview-badge">
          <span>${badge.eyebrow}</span>
          <strong>${badge.value}</strong>
        </div>
      `
    )
    .join("");

const renderCard = (lang, content, sample) => {
  const chips = sample.chips.map((chip) => `<span class="case-chip">${chip}</span>`).join("");
  const contactUrl = lang === "de" ? "/de/apply/" : "/apply/";

  return `
    <article class="case-card sample-card">
      <div class="case-card-media sample-card-media">
        <img loading="lazy" decoding="async" src="${sample.image}" alt="${sample.imageAlt}">
      </div>
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
  setText("[data-samples-kicker]", content.heroKicker);
  setText("[data-samples-title]", content.heroTitle);
  setText("[data-samples-title-accent]", content.heroTitleAccent);
  setText("[data-samples-intro]", content.heroIntro);
  setText("[data-samples-note-count]", String(content.samples.length).padStart(2, "0"));
  setText("[data-samples-note-title]", content.heroNoteTitle);
  setText("[data-samples-note-copy]", content.heroNoteCopy);
  setText("[data-samples-overview-label]", content.overviewLabel);
  setText("[data-samples-overview-copy]", content.overviewCopy);

  const badgesRoot = document.querySelector("[data-samples-overview-badges]");
  if (badgesRoot) badgesRoot.innerHTML = renderOverviewBadges(content.overviewBadges);

  const gridRoot = document.querySelector("[data-sample-grid]");
  if (gridRoot) {
    gridRoot.innerHTML = content.samples.map((sample) => renderCard(lang, content, sample)).join("");
  }

  applySharedCopy(content);
};
