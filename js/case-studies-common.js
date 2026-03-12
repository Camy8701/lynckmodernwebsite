export const getLang = () => (window.location.pathname.includes("/de/") ? "de" : "en");

export const getHubUrl = (lang) => (lang === "de" ? "/de/case-studies/" : "/case-studies/");

export const getCaseUrl = (lang, slug) =>
  `${lang === "de" ? "/de" : ""}/case-studies/case.html?study=${encodeURIComponent(slug)}`;

export const getStudyBySlug = (content, slug) =>
  content.studies.find((study) => study.slug === slug) || content.studies[0];

export const createArrowIcon = () =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>';

export const createBackIcon = () =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/><path d="M9 12h11"/></svg>';

export const renderExternalLink = (text, url, className = "") => {
  if (!url) return text;
  const classAttr = className ? ` class="${className}"` : "";
  return `<a${classAttr} href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
};

export const renderMetrics = (metrics, className = "case-card-metrics") => {
  if (!Array.isArray(metrics) || !metrics.length) return "";
  return `
    <div class="${className}">
      ${metrics
        .map(
          (metric) => `
            <div class="${className}__item">
              <strong>${metric.value}</strong>
              <span>${metric.label}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
};

export const bindSharedNavigation = (lang, content) => {
  const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-pill");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdowns.forEach((node) => {
        if (node !== dropdown) node.classList.remove("open");
      });
      dropdown.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
    }
  });

  document.querySelectorAll("[data-home-btn]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = lang === "de" ? "/de/index.html" : "/index.html";
    });
  });

  document.querySelectorAll("[data-apply-btn], [data-contact-btn]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = lang === "de" ? "/de/apply/" : "/apply/";
    });
  });

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetLang = button.getAttribute("data-lang-switch");
      if (!targetLang) return;

      try {
        localStorage.setItem("language", targetLang);
      } catch (error) {}

      const dropdown = button.closest(".nav-dropdown");
      if (dropdown) dropdown.classList.remove("open");

      const isDetailPage = window.location.pathname.endsWith("/case.html");
      if (!isDetailPage) {
        window.location.href = getHubUrl(targetLang);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const slug = params.get("study") || content.studies[0].slug;
      window.location.href = getCaseUrl(targetLang, slug);
    });
  });
};

export const applyMeta = (content) => {
  document.title = content.pageTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", content.pageDescription);
};

export const applySharedCopy = (content) => {
  const ctaTitle = document.querySelector("[data-case-cta-title]");
  const ctaCopy = document.querySelector("[data-case-cta-copy]");
  const ctaPrimary = document.querySelector("[data-case-cta-primary]");
  const ctaSecondary = document.querySelector("[data-case-cta-secondary]");
  const relatedHeading = document.querySelector("[data-related-heading]");

  if (ctaTitle) ctaTitle.textContent = content.ctaTitle;
  if (ctaCopy) ctaCopy.textContent = content.ctaCopy;
  if (ctaPrimary) ctaPrimary.textContent = content.ctaPrimary;
  if (ctaSecondary) ctaSecondary.textContent = content.ctaSecondary;
  if (relatedHeading) relatedHeading.textContent = content.relatedHeading;
};
