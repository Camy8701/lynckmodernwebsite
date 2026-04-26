import content from "./website-samples-content-en.js?v=20260419e";

const gridRoot = document.querySelector("[data-template-grid]");
const emptyRoot = document.querySelector("[data-template-empty]");
const countRoot = document.querySelector("[data-template-count]");
const searchInput = document.querySelector("[data-template-search]");
const sortSelect = document.querySelector("[data-sort]");
const categoryPillsRoot = document.querySelector("[data-category-pills]");
const heroSnapshotRoot = document.querySelector("[data-hero-snapshot]");
const snapshotTitle = document.querySelector("[data-snapshot-title]");
const snapshotDescription = document.querySelector("[data-snapshot-description]");
const snapshotTagPrimary = document.querySelector("[data-snapshot-tag-primary]");
const snapshotTagSecondary = document.querySelector("[data-snapshot-tag-secondary]");
const snapshotRotationRoot = document.querySelector("[data-snapshot-rotation]");
const snapshotMetricCards = Array.from(document.querySelectorAll("[data-snapshot-metric-card]")).map((card) => ({
  card,
  label: card.querySelector("[data-snapshot-metric-label]"),
  value: card.querySelector("[data-snapshot-metric-value]"),
  note: card.querySelector("[data-snapshot-metric-note]"),
}));
const snapshotChartTitle = document.querySelector("[data-snapshot-chart-title]");
const snapshotChartSubtitle = document.querySelector("[data-snapshot-chart-subtitle]");
const snapshotLegendPrimary = document.querySelector("[data-snapshot-legend-primary]");
const snapshotLegendSecondary = document.querySelector("[data-snapshot-legend-secondary]");
const snapshotChartWrap = document.querySelector("[data-snapshot-chart-wrap]");
const snapshotChartArea = document.querySelector("[data-snapshot-chart-area]");
const snapshotChartPrimary = document.querySelector("[data-snapshot-chart-primary]");
const snapshotChartCost = document.querySelector("[data-snapshot-chart-cost]");
const snapshotChartNode = document.querySelector("[data-snapshot-chart-node]");
const snapshotCallout = document.querySelector("[data-snapshot-callout]");
const snapshotCampaignCard = document.querySelector("[data-snapshot-campaign-card]");
const snapshotCampaignSort = document.querySelector("[data-snapshot-campaign-sort]");
const snapshotCampaignItems = Array.from(document.querySelectorAll("[data-snapshot-campaign-item]")).map((item) => ({
  name: item.querySelector("[data-snapshot-campaign-name]"),
  value: item.querySelector("[data-snapshot-campaign-value]"),
  bar: item.querySelector("[data-snapshot-campaign-bar]"),
}));
const snapshotHighlightKicker = document.querySelector("[data-snapshot-highlight-kicker]");
const snapshotHighlightTotal = document.querySelector("[data-snapshot-highlight-total]");
const snapshotHighlightNote = document.querySelector("[data-snapshot-highlight-note]");
const snapshotHighlightRows = Array.from(document.querySelectorAll("[data-snapshot-highlight-row]")).map((row) => ({
  row,
  label: row.querySelector("[data-snapshot-highlight-label]"),
  value: row.querySelector("[data-snapshot-highlight-value-row]"),
}));

const state = {
  search: "",
  category: "all",
  sort: "recommended",
};

const industryLabelMap = Object.fromEntries(content.filters.map((filter) => [filter.id, filter.label]));

const landingPageOnlySamples = [
  {
    category: "ecommerce",
    categoryLabel: "Fashion E-Commerce Website",
    title: "ModaIQ",
    subtitle: "AI personal style storefront",
    overview:
      "A cinematic fashion storefront concept with editorial product storytelling, adaptive-style messaging, high-contrast image cards, and premium contact moments designed for modern fashion commerce brands.",
    image:
      "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/393d30fa-de4a-4439-bae7-d2b7c00e196f_3840w.jpg",
    imageAlt: "Hero preview of the ModaIQ fashion storefront concept",
    chips: ["Fashion Storefront", "Editorial Commerce", "AI Styling"],
    bestFor:
      "Fashion brands, curated retail concepts, personal styling products, and premium storefronts that need a more editorial shopping experience",
    url: "/website-design/modaiq/",
    order: 16.5,
  },
];

const samples = [
  ...content.samples.map((sample, index) => ({
    ...sample,
    order: index,
    industry: sample.category,
    industryLabel: industryLabelMap[sample.category] || sample.category,
  })),
  ...landingPageOnlySamples.map((sample) => ({
    ...sample,
    industry: sample.category,
    industryLabel: industryLabelMap[sample.category] || sample.category,
  })),
];

const heroSnapshots = [
  {
    title: "Client campaign snapshot",
    description: "A 30-day window from an active account. Names anonymized.",
    tags: ["E-com Brand", "30-day window"],
    metrics: [
      { tone: "spend", label: "Cost", value: 10690, prefix: "EUR ", note: "Down 7.5% vs prev" },
      { tone: "revenue", label: "Conv. value", value: 50358, prefix: "EUR ", note: "Up 15.2% vs prev" },
      { tone: "accent", label: "ROAS", value: 10.67, decimals: 2, suffix: "X", note: "Trending upward" },
      { tone: "success", label: "Conversions", value: 1206, note: "Up 23.1% vs prev" },
    ],
    chart: {
      title: "Conversion value over time",
      subtitle: "Daily revenue from Google Ads campaigns",
      legendPrimary: "Conv. value",
      legendSecondary: "Cost",
      areaPath:
        "M0 176L24 170L48 180L72 174L96 178L120 166L144 171L168 152L192 160L216 164L240 136L264 124L288 112L312 58L336 22L360 60L384 76L408 72L432 92L456 102L480 114L504 82L528 92L552 114L576 126L600 128L624 88L640 70L640 220L0 220Z",
      primaryPath:
        "M0 176L24 170L48 180L72 174L96 178L120 166L144 171L168 152L192 160L216 164L240 136L264 124L288 112L312 58L336 22L360 60L384 76L408 72L432 92L456 102L480 114L504 82L528 92L552 114L576 126L600 128L624 88L640 70",
      costPath:
        "M0 190L24 186L48 194L72 192L96 194L120 186L144 188L168 180L192 184L216 188L240 170L264 162L288 156L312 132L336 108L360 140L384 150L408 146L432 158L456 164L480 170L504 154L528 158L552 170L576 176L600 178L624 160L640 146",
      node: { cx: 336, cy: 22, fill: "#0045ba" },
      callout: "10.67X ROAS",
    },
    campaigns: {
      sortLabel: "Sorted by ROAS",
      items: [
        { name: "Performance Max - Brand", value: "10.67X", width: 95 },
        { name: "Search - Generic", value: "9.15X", width: 82 },
        { name: "Shopping - All products", value: "6.71X", width: 65 },
        { name: "DemandGen - Lookalike", value: "4.95X", width: 48 },
      ],
    },
    highlight: {
      kicker: "Peak ROAS",
      total: { tone: "accent", value: 10.67, decimals: 2, suffix: "X" },
      note: "EUR 1 in -> EUR 10.67 back",
      rows: [
        { tone: "spend", label: "Spend", value: 10690, prefix: "EUR " },
        { tone: "revenue", label: "Revenue", value: 50358, prefix: "EUR " },
        { tone: "success", label: "Profit", value: 39668, prefix: "+EUR " },
      ],
    },
  },
  {
    title: "March e-commerce return window",
    description: "Single month from an active e-commerce account. Names anonymized.",
    tags: ["E-com Brand", "Mar 2026"],
    metrics: [
      { tone: "spend", label: "Spend", value: 11861, prefix: "EUR ", note: "Single-month spend" },
      { tone: "revenue", label: "Revenue", value: 79606, prefix: "EUR ", note: "Single-month revenue" },
      { tone: "accent", label: "ROAS", value: 6.7, decimals: 1, suffix: "X", note: "Sustained 5-7X" },
      { tone: "success", label: "Profit", value: 67745, prefix: "+EUR ", note: "After ad spend" },
    ],
    chart: {
      title: "Revenue over the month",
      subtitle: "Daily return from the March account window",
      legendPrimary: "Revenue",
      legendSecondary: "Spend",
      areaPath:
        "M0 186L24 182L48 176L72 170L96 162L120 152L144 158L168 148L192 142L216 132L240 120L264 114L288 98L312 90L336 78L360 72L384 64L408 58L432 46L456 34L480 48L504 56L528 68L552 74L576 82L600 70L624 58L640 52L640 220L0 220Z",
      primaryPath:
        "M0 186L24 182L48 176L72 170L96 162L120 152L144 158L168 148L192 142L216 132L240 120L264 114L288 98L312 90L336 78L360 72L384 64L408 58L432 46L456 34L480 48L504 56L528 68L552 74L576 82L600 70L624 58L640 52",
      costPath:
        "M0 196L24 194L48 190L72 186L96 182L120 180L144 182L168 176L192 174L216 170L240 166L264 164L288 156L312 150L336 142L360 138L384 132L408 128L432 118L456 102L480 116L504 122L528 130L552 138L576 146L600 140L624 132L640 124",
      node: { cx: 456, cy: 34, fill: "#0045ba" },
      callout: "6.70X ROAS",
    },
    campaigns: {
      sortLabel: "Sorted by ROAS",
      items: [
        { name: "Brand Search - Core", value: "6.70X", width: 96 },
        { name: "Performance Max - Scale", value: "6.14X", width: 88 },
        { name: "Shopping - Bestsellers", value: "5.82X", width: 81 },
        { name: "Remarketing - Cart", value: "5.11X", width: 72 },
      ],
    },
    highlight: {
      kicker: "Sustained ROAS",
      total: { tone: "accent", value: 6.7, decimals: 1, suffix: "X" },
      note: "EUR 1 in -> EUR 6.70 back",
      rows: [
        { tone: "spend", label: "Spend", value: 11861, prefix: "EUR " },
        { tone: "revenue", label: "Revenue", value: 79606, prefix: "EUR " },
        { tone: "success", label: "Profit", value: 67745, prefix: "+EUR " },
      ],
    },
  },
  {
    title: "April e-commerce breakout window",
    description: "Latest month from an active e-commerce account. Names anonymized.",
    tags: ["E-com Brand", "Apr 2026"],
    metrics: [
      { tone: "spend", label: "Spend", value: 6256, prefix: "EUR ", note: "Latest month spend" },
      { tone: "revenue", label: "Revenue", value: 66729, prefix: "EUR ", note: "Latest month revenue" },
      { tone: "accent", label: "ROAS", value: 10.67, decimals: 2, suffix: "X", note: "December to April: 9X+" },
      { tone: "success", label: "Profit", value: 60473, prefix: "+EUR ", note: "After ad spend" },
    ],
    chart: {
      title: "Revenue breakout over time",
      subtitle: "Compounding return from the latest account month",
      legendPrimary: "Revenue",
      legendSecondary: "Spend",
      areaPath:
        "M0 190L24 188L48 186L72 178L96 170L120 160L144 166L168 158L192 148L216 136L240 126L264 112L288 96L312 78L336 56L360 34L384 18L408 30L432 44L456 62L480 72L504 86L528 100L552 94L576 102L600 78L624 56L640 42L640 220L0 220Z",
      primaryPath:
        "M0 190L24 188L48 186L72 178L96 170L120 160L144 166L168 158L192 148L216 136L240 126L264 112L288 96L312 78L336 56L360 34L384 18L408 30L432 44L456 62L480 72L504 86L528 100L552 94L576 102L600 78L624 56L640 42",
      costPath:
        "M0 198L24 196L48 194L72 190L96 186L120 182L144 184L168 180L192 172L216 166L240 160L264 150L288 138L312 126L336 112L360 96L384 82L408 94L432 106L456 118L480 126L504 138L528 148L552 144L576 150L600 134L624 118L640 108",
      node: { cx: 384, cy: 18, fill: "#0045ba" },
      callout: "10.67X ROAS",
    },
    campaigns: {
      sortLabel: "Sorted by ROAS",
      items: [
        { name: "Performance Max - Brand", value: "10.67X", width: 97 },
        { name: "Search - Brand Terms", value: "9.44X", width: 89 },
        { name: "Shopping - Main feed", value: "8.21X", width: 80 },
        { name: "DemandGen - Lookalike", value: "6.08X", width: 62 },
      ],
    },
    highlight: {
      kicker: "Peak ROAS",
      total: { tone: "accent", value: 10.67, decimals: 2, suffix: "X" },
      note: "EUR 1 in -> EUR 10.67 back",
      rows: [
        { tone: "spend", label: "Spend", value: 6256, prefix: "EUR " },
        { tone: "revenue", label: "Revenue", value: 66729, prefix: "EUR " },
        { tone: "success", label: "Profit", value: 60473, prefix: "+EUR " },
      ],
    },
  },
];

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const createCard = (sample, index) => {
  const previewLabel = sample.categoryLabel
    .replace(/ website$/i, "")
    .replace(/ template$/i, "");
  const number = index + 1;

  return `
    <article class="wdl-template-card">
      <a
        class="wdl-template-card__media"
        href="${sample.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Preview ${escapeHtml(sample.title)}"
      >
        <img loading="lazy" decoding="async" src="${sample.image}" alt="${escapeHtml(sample.imageAlt)}">
      </a>
      <div class="wdl-template-card__meta">
        <div class="wdl-template-card__topline">
          <span class="wdl-template-card__category">${escapeHtml(sample.industryLabel)}</span>
          <span class="wdl-template-card__number" aria-label="Template number ${number}">${number}</span>
        </div>
        <div class="wdl-template-card__copy">
          <h4>${escapeHtml(sample.title)}</h4>
          <p>${escapeHtml(previewLabel)}</p>
        </div>
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

const getVisibleSamples = () => {
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
        ...(sample.chips || []),
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

  const visible = getVisibleSamples();

  countRoot.textContent = `${visible.length} template${visible.length === 1 ? "" : "s"}`;

  if (!visible.length) {
    gridRoot.innerHTML = "";
    emptyRoot.hidden = false;
    return;
  }

  emptyRoot.hidden = true;
  gridRoot.innerHTML = visible.map((sample, index) => createCard(sample, index)).join("");
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

const countupNodes = Array.from(document.querySelectorAll("[data-countup]"));
const chartRevealNodes = Array.from(document.querySelectorAll("[data-chart-animate]"));
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const activeCountupFrames = new WeakMap();

const formatCountValue = (value, decimals) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

const animateCountup = (node, options = {}) => {
  if (!node) return;

  const force = options.force || false;
  if (!force && node.dataset.counted === "true") return;

  const target = Number(node.dataset.countupValue || 0);
  const decimals = Number(node.dataset.countupDecimals || 0);
  const prefix = node.dataset.countupPrefix || "";
  const suffix = node.dataset.countupSuffix || "";
  const duration = Number(node.dataset.countupDuration || 1400);
  const startValue = Number(options.startValue || 0);
  const existingFrame = activeCountupFrames.get(node);

  if (existingFrame) {
    window.cancelAnimationFrame(existingFrame);
  }

  node.dataset.counted = "true";
  node.classList.remove("is-counted");

  const startTime = performance.now();
  const tick = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = startValue + (target - startValue) * eased;
    node.textContent = `${prefix}${formatCountValue(current, decimals)}${suffix}`;

    if (progress < 1) {
      activeCountupFrames.set(node, window.requestAnimationFrame(tick));
      return;
    }

    node.textContent = `${prefix}${formatCountValue(target, decimals)}${suffix}`;
    node.classList.add("is-counted");
    node.dataset.countupCurrent = String(target);
    activeCountupFrames.delete(node);
  };

  activeCountupFrames.set(node, window.requestAnimationFrame(tick));
};

const revealChartNode = (node) => {
  if (!node || node.classList.contains("is-visible")) return;
  node.classList.add("is-visible");
};

const toneClassMap = {
  spend: "wdl-value--spend",
  revenue: "wdl-value--revenue",
  accent: "wdl-value--accent",
  success: "wdl-value--success",
};

const metricCardToneClassMap = {
  spend: "wdl-metric-card--spend",
  revenue: "wdl-metric-card--revenue",
  accent: "wdl-metric-card--accent",
  success: "wdl-metric-card--success",
};

const highlightToneClassMap = {
  spend: "wdl-highlight-row--spend",
  revenue: "wdl-highlight-row--revenue",
  accent: "wdl-highlight-row--accent",
  success: "wdl-highlight-row--success",
};

const heroRotationDelay = reducedMotionQuery.matches ? 10000 : 6200;
let heroSnapshotIndex = 0;
let heroSnapshotTimer = null;
let heroSnapshotEnterTimer = null;
let heroSnapshotSwapTimer = null;

const setCountNode = (node, config, animate = false, primeOnly = false) => {
  if (!node || !config) return;

  const prefix = config.prefix || "";
  const suffix = config.suffix || "";
  const decimals = Number(config.decimals || 0);

  node.dataset.countupPrefix = prefix;
  node.dataset.countupSuffix = suffix;
  node.dataset.countupDecimals = String(decimals);
  node.dataset.countupValue = String(config.value);
  node.dataset.countupDuration = String(config.duration || 1350);

  if (!animate || reducedMotionQuery.matches) {
    node.textContent = `${prefix}${formatCountValue(config.value, decimals)}${suffix}`;
    node.dataset.countupCurrent = String(config.value);
    if (primeOnly) {
      delete node.dataset.counted;
      node.classList.remove("is-counted");
      return;
    }

    node.dataset.counted = "true";
    node.classList.add("is-counted");
    return;
  }

  animateCountup(node, { force: true, startValue: 0 });
};

const resetRevealNode = (node) => {
  if (!node) return;
  node.classList.remove("is-visible");
  void node.offsetWidth;
  node.classList.add("is-visible");
};

const setToneClass = (node, tone, classMap) => {
  if (!node) return;

  Object.values(classMap).forEach((className) => node.classList.remove(className));

  if (tone && classMap[tone]) {
    node.classList.add(classMap[tone]);
  }
};

const renderSnapshotRotationButtons = () => {
  if (!snapshotRotationRoot) return;

  snapshotRotationRoot.innerHTML = heroSnapshots
    .map(
      (snapshot, index) => `
        <button
          type="button"
          class="${index === heroSnapshotIndex ? "is-active" : ""}"
          data-snapshot-index="${index}"
          aria-label="Show ${escapeHtml(snapshot.tags.join(" "))} snapshot"
          aria-pressed="${index === heroSnapshotIndex}"
        ></button>
      `,
    )
    .join("");
};

const applyHeroSnapshot = (snapshot, { animate = false, primeOnly = false } = {}) => {
  if (!snapshot || !heroSnapshotRoot) return;

  if (snapshotTitle) snapshotTitle.textContent = snapshot.title;
  if (snapshotDescription) snapshotDescription.textContent = snapshot.description;
  if (snapshotTagPrimary) snapshotTagPrimary.textContent = snapshot.tags[0] || "";
  if (snapshotTagSecondary) snapshotTagSecondary.textContent = snapshot.tags[1] || "";

  snapshotMetricCards.forEach((metricNode, index) => {
    const metric = snapshot.metrics[index];
    if (!metric) return;

    setToneClass(metricNode.card, metric.tone, metricCardToneClassMap);
    if (metricNode.label) metricNode.label.textContent = metric.label;
    if (metricNode.note) metricNode.note.textContent = metric.note;
    setToneClass(metricNode.value, metric.tone, toneClassMap);
    setCountNode(metricNode.value, metric, animate, primeOnly);
  });

  if (snapshotChartTitle) snapshotChartTitle.textContent = snapshot.chart.title;
  if (snapshotChartSubtitle) snapshotChartSubtitle.textContent = snapshot.chart.subtitle;
  if (snapshotLegendPrimary) snapshotLegendPrimary.textContent = snapshot.chart.legendPrimary;
  if (snapshotLegendSecondary) snapshotLegendSecondary.textContent = snapshot.chart.legendSecondary;
  if (snapshotChartArea) snapshotChartArea.setAttribute("d", snapshot.chart.areaPath);
  if (snapshotChartPrimary) snapshotChartPrimary.setAttribute("d", snapshot.chart.primaryPath);
  if (snapshotChartCost) snapshotChartCost.setAttribute("d", snapshot.chart.costPath);
  if (snapshotChartNode) {
    snapshotChartNode.setAttribute("cx", String(snapshot.chart.node.cx));
    snapshotChartNode.setAttribute("cy", String(snapshot.chart.node.cy));
    snapshotChartNode.setAttribute("fill", snapshot.chart.node.fill || "#0045ba");
  }
  if (snapshotCallout) {
    snapshotCallout.textContent = snapshot.chart.callout;
    snapshotCallout.style.left = `${(snapshot.chart.node.cx / 640) * 100}%`;
    snapshotCallout.style.top = `${Math.max(16, (snapshot.chart.node.cy / 220) * 256 - 34)}px`;
  }

  if (snapshotCampaignSort) snapshotCampaignSort.textContent = snapshot.campaigns.sortLabel;
  snapshotCampaignItems.forEach((campaignNode, index) => {
    const campaign = snapshot.campaigns.items[index];
    if (!campaign) return;

    if (campaignNode.name) campaignNode.name.textContent = campaign.name;
    if (campaignNode.value) campaignNode.value.textContent = campaign.value;
    if (campaignNode.bar) campaignNode.bar.style.width = `${campaign.width}%`;
  });

  if (snapshotHighlightKicker) snapshotHighlightKicker.textContent = snapshot.highlight.kicker;
  if (snapshotHighlightNote) snapshotHighlightNote.textContent = snapshot.highlight.note;
  if (snapshotHighlightTotal) {
    setToneClass(snapshotHighlightTotal, snapshot.highlight.total.tone, toneClassMap);
    setCountNode(snapshotHighlightTotal, snapshot.highlight.total, animate, primeOnly);
  }

  snapshotHighlightRows.forEach((rowNode, index) => {
    const row = snapshot.highlight.rows[index];
    if (!row) return;

    setToneClass(rowNode.row, row.tone, highlightToneClassMap);
    if (rowNode.label) rowNode.label.textContent = row.label;
    setToneClass(rowNode.value, row.tone, toneClassMap);
    setCountNode(rowNode.value, row, animate, primeOnly);
  });

  renderSnapshotRotationButtons();

  if (animate) {
    resetRevealNode(snapshotChartWrap);
    resetRevealNode(snapshotCampaignCard);
  }
};

const finishHeroSnapshotEntry = () => {
  if (!heroSnapshotRoot) return;
  heroSnapshotRoot.classList.remove("is-entering");
};

const showHeroSnapshot = (nextIndex, { immediate = false } = {}) => {
  if (!heroSnapshotRoot || !heroSnapshots[nextIndex]) return;

  heroSnapshotIndex = nextIndex;
  window.clearTimeout(heroSnapshotSwapTimer);
  window.clearTimeout(heroSnapshotEnterTimer);

  if (immediate || reducedMotionQuery.matches) {
    heroSnapshotRoot.classList.remove("is-swapping", "is-entering");
    applyHeroSnapshot(heroSnapshots[heroSnapshotIndex], { animate: !immediate });
    return;
  }

  heroSnapshotRoot.classList.remove("is-entering");
  heroSnapshotRoot.classList.add("is-swapping");

  heroSnapshotSwapTimer = window.setTimeout(() => {
    applyHeroSnapshot(heroSnapshots[heroSnapshotIndex], { animate: true });
    heroSnapshotRoot.classList.remove("is-swapping");
    void heroSnapshotRoot.offsetWidth;
    heroSnapshotRoot.classList.add("is-entering");
    heroSnapshotEnterTimer = window.setTimeout(finishHeroSnapshotEntry, 680);
  }, 240);
};

const stopHeroSnapshotTimer = () => {
  if (!heroSnapshotTimer) return;
  window.clearInterval(heroSnapshotTimer);
  heroSnapshotTimer = null;
};

const startHeroSnapshotTimer = () => {
  if (!heroSnapshotRoot || heroSnapshots.length < 2 || reducedMotionQuery.matches) return;

  stopHeroSnapshotTimer();
  heroSnapshotTimer = window.setInterval(() => {
    if (document.hidden || heroSnapshotRoot.matches(":hover")) return;
    showHeroSnapshot((heroSnapshotIndex + 1) % heroSnapshots.length);
  }, heroRotationDelay);
};

snapshotRotationRoot?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-snapshot-index]");
  if (!button) return;

  const nextIndex = Number(button.getAttribute("data-snapshot-index"));
  if (Number.isNaN(nextIndex) || nextIndex === heroSnapshotIndex) return;

  showHeroSnapshot(nextIndex);
  startHeroSnapshotTimer();
});

heroSnapshotRoot?.addEventListener("pointerenter", stopHeroSnapshotTimer);
heroSnapshotRoot?.addEventListener("pointerleave", startHeroSnapshotTimer);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopHeroSnapshotTimer();
    return;
  }

  startHeroSnapshotTimer();
});

applyHeroSnapshot(heroSnapshots[0], { animate: false, primeOnly: true });
startHeroSnapshotTimer();

if ("IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCountup(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  countupNodes.forEach((node) => countObserver.observe(node));

  const chartObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealChartNode(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.24,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  chartRevealNodes.forEach((node) => chartObserver.observe(node));
} else {
  countupNodes.forEach(animateCountup);
  chartRevealNodes.forEach(revealChartNode);
}

render();
