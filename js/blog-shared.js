/* ── Blog Hub ── */

(() => {
  "use strict";

  const BLOG_CONTENT = {
    en: {
      pageTitle: "Blog | LYNCK Studio",
      pageDescription: "Practical breakdowns on ads, creative systems, conversion logic, and growth architecture — from the team behind LYNCK Studio.",
      kicker: "Insights & Frameworks",
      title: "Blog",
      intro: "Practical thinking on ads, creative systems, conversion architecture, and the moving parts behind scalable growth.",
      noteCount: "01",
      noteStrong: "Not thought-leadership fluff.",
      noteSoft: "Each article breaks down a real problem with a real framework you can use today.",
      searchPlaceholder: "Search articles...",
      filters: [
        { id: "all", label: "All" },
        { id: "ads", label: "Ads & Performance" },
        { id: "strategy", label: "Strategy" },
        { id: "web", label: "Web & Conversion" },
        { id: "creative", label: "Creative" }
      ],
      emptyTitle: "No articles match your search",
      emptyCopy: "Try a different keyword or switch to another category.",
      cardCta: "Read article",
      readTime: "min read",
      ctaTitle: "Want frameworks like these applied to your brand?",
      ctaCopy: "We build the strategy, creative direction, tracking logic, and conversion architecture together — so growth is structure, not guesswork.",
      ctaPrimary: "Start your project",
      ctaSecondary: "Explore services",
      articles: [
        {
          slug: "professional-website-2026",
          category: "web",
          categoryLabel: "Web & Conversion",
          title: "Why Your Business Still Needs a Professional Website in 2026",
          excerpt: "Social media gets attention. A professional website turns it into infrastructure: better lead quality, stronger SEO, clearer conversion paths, and a system you actually own.",
          image: "/assets/blog-websites-2026-hero.jpeg",
          imageAlt: "Close-up of metallic web design lettering on a dark blue surface",
          chips: ["Web Systems", "Lead Generation", "SEO", "Conversion"],
          date: "2026-03-11",
          readMinutes: 7,
          url: "/blog-why-your-business-still-needs-a-professional-website-in-2026.html",
          featured: true
        },
        {
          slug: "dj-technik-youtube-growth",
          category: "ads",
          categoryLabel: "Ads & Performance",
          title: "How to Grow Your YouTube Channel With Targeted Google Ads",
          excerpt: "See how a DJ equipment store used Google Ads to grow its channel from about 1,000 to roughly 9,000 subscribers in 90 days and turn YouTube into a larger audience and demand channel.",
          image: "/assets/blog-dj-showroom.webp",
          imageAlt: "DJ-Technik.de showroom with illuminated DJ gear displays",
          chips: ["YouTube Growth", "Google Ads", "Ecommerce", "Case Study"],
          date: "2026-03-10",
          readMinutes: 7,
          url: "/blog-how-dj-technik-used-google-ads-to-grow-youtube.html",
          featured: true
        },
        {
          slug: "real-reason-ads-dont-convert",
          category: "ads",
          categoryLabel: "Ads & Performance",
          title: "The Real Reason Your Ads Don't Convert",
          excerpt: "Most ad campaigns fail not because of targeting or budget — but because the message-to-landing-page chain is broken. Here's the exact diagnostic framework we use to find the leak.",
          image: "/assets/blog-ads-dont-convert-hero.webp",
          imageAlt: "Google search growth illustration with a laptop and upward arrows",
          chips: ["Google Ads", "Meta Ads", "Conversion", "Messaging"],
          date: "2026-02-18",
          readMinutes: 8,
          url: "/blog-real-reason-your-ads-dont-convert.html",
          featured: true
        }
      ]
    },
    de: {
      pageTitle: "Blog | LYNCK Studio",
      pageDescription: "Praxisnahe Analysen zu Ads, Kreativsystemen, Conversion-Logik und Wachstumsarchitektur — vom Team hinter LYNCK Studio.",
      kicker: "Einblicke & Methoden",
      title: "Blog",
      intro: "Praxisnahe Analysen zu Anzeigen, Kreativsystemen, Conversion-Architektur und den Hebeln hinter skalierbarem Wachstum.",
      noteCount: "01",
      noteStrong: "Kein leeres Marketing-Gerede.",
      noteSoft: "Jeder Artikel nimmt ein echtes Problem auseinander und zeigt einen Ansatz, den du direkt anwenden kannst.",
      searchPlaceholder: "Artikel durchsuchen...",
      filters: [
        { id: "all", label: "Alle" },
        { id: "ads", label: "Anzeigen & Performance" },
        { id: "strategy", label: "Strategie" },
        { id: "web", label: "Web & Conversion" },
        { id: "creative", label: "Kreativ" }
      ],
      emptyTitle: "Keine Artikel gefunden",
      emptyCopy: "Versuche ein anderes Stichwort oder wechsle die Kategorie.",
      cardCta: "Artikel lesen",
      readTime: "Min. Lesezeit",
      ctaTitle: "Diesen Ansatz auf deine Marke anwenden?",
      ctaCopy: "Wir entwickeln Strategie, kreative Ausrichtung, Tracking-Logik und Conversion-Architektur gemeinsam — damit Wachstum Struktur ist, kein Zufall.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Leistungen entdecken",
      articles: [
        {
          slug: "dj-technik-youtube-growth",
          category: "ads",
          categoryLabel: "Anzeigen & Performance",
          title: "Wie DJ-Technik.de mit Google Ads seinen YouTube-Kanal ausgebaut hat",
          excerpt: "So hat ein DJ-Equipment-Shop seinen YouTube-Kanal mit Google Ads in rund 90 Tagen von etwa 1.000 auf rund 9.000 Abonnenten ausgebaut und YouTube zu einem stärkeren Nachfragekanal gemacht.",
          image: "/assets/blog-dj-showroom.webp",
          imageAlt: "Showroom von DJ-Technik.de mit beleuchtetem DJ Equipment",
          chips: ["YouTube-Wachstum", "Google Ads", "E-Commerce", "Fallstudie"],
          date: "2026-03-10",
          readMinutes: 7,
          url: "/de/blog-wie-dj-technik-mit-google-ads-seinen-youtube-kanal-ausgebaut-hat.html",
          featured: true
        },
        {
          slug: "real-reason-ads-dont-convert",
          category: "ads",
          categoryLabel: "Anzeigen & Performance",
          title: "Der wahre Grund, warum deine Ads nicht konvertieren",
          excerpt: "Die meisten Kampagnen scheitern nicht an der Zielgruppenansprache oder am Budget — sondern daran, dass die Kette von Botschaft zu Landingpage gebrochen ist. Hier ist das Diagnosemodell, mit dem wir das Leck finden.",
          image: "/assets/blog-ads-dont-convert-hero.webp",
          imageAlt: "Illustration von Google Suchwachstum mit Laptop und aufsteigenden Pfeilen",
          chips: ["Google Ads", "Meta Ads", "Conversion", "Botschaft"],
          date: "2026-02-18",
          readMinutes: 8,
          url: "/de/blog-real-reason-your-ads-dont-convert.html",
          featured: true
        }
      ]
    }
  };

  const getLang = () => window.location.pathname.startsWith("/de") ? "de" : "en";

  const createArrowIcon = () =>
    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 7 10 10"/><path d="M7 17h10V7"/></svg>`;

  const formatDate = (dateStr, lang) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const renderCard = (article, content, lang, isFeatured) => {
    const chips = (article.chips || [])
      .map(c => `<span class="blog-chip">${c}</span>`)
      .join("");

    const featuredClass = isFeatured ? " is-featured" : "";

    return `
      <a href="${article.url}" class="blog-card${featuredClass}">
        <div class="blog-card-media">
          <img src="${article.image}" alt="${article.imageAlt}" loading="lazy" decoding="async">
        </div>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-category">${article.categoryLabel}</span>
            <span class="blog-card-date">${formatDate(article.date, lang)}</span>
          </div>
          <h2 class="blog-card-title">${article.title}</h2>
          <p class="blog-card-excerpt">${article.excerpt}</p>
          ${chips ? `<div class="blog-card-chips">${chips}</div>` : ""}
          <div class="blog-card-footer">
            <span class="blog-read-time">${article.readMinutes} ${content.readTime}</span>
            <span class="blog-card-cta">${content.cardCta} ${createArrowIcon()}</span>
          </div>
        </div>
      </a>
    `;
  };

  const init = () => {
    const lang = getLang();
    const content = BLOG_CONTENT[lang] || BLOG_CONTENT.en;

    /* ── Set page meta ── */
    document.title = content.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", content.pageDescription);

    /* ── Populate hero ── */
    const setTxt = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = val;
    };
    const setHtml = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = val;
    };

    setTxt("[data-blog-kicker]", content.kicker);
    setTxt("[data-blog-title]", content.title);
    setTxt("[data-blog-intro]", content.intro);
    setTxt("[data-blog-note-count]", content.noteCount);
    setHtml("[data-blog-note-strong]", `<strong>${content.noteStrong}</strong>`);
    setTxt("[data-blog-note-soft]", content.noteSoft);

    /* ── CTA ── */
    setTxt("[data-blog-cta-title]", content.ctaTitle);
    setTxt("[data-blog-cta-copy]", content.ctaCopy);
    setTxt("[data-blog-cta-primary]", content.ctaPrimary);
    setTxt("[data-blog-cta-secondary]", content.ctaSecondary);

    /* ── Search ── */
    const searchInput = document.querySelector("[data-blog-search]");
    const clearBtn = document.querySelector("[data-blog-search-clear]");
    const resultCount = document.querySelector("[data-blog-result-count]");

    if (searchInput) {
      searchInput.setAttribute("placeholder", content.searchPlaceholder);
    }

    /* ── Filters ── */
    const filtersWrap = document.querySelector("[data-blog-filters]");
    if (filtersWrap) {
      filtersWrap.innerHTML = content.filters
        .map((f, i) => `<button type="button" class="blog-filter${i === 0 ? " is-active" : ""}" data-filter="${f.id}">${f.label}</button>`)
        .join("");
    }

    /* ── Grid ── */
    const grid = document.querySelector("[data-blog-grid]");
    if (!grid) return;

    let activeFilter = "all";
    let searchTerm = "";

    const updateGrid = () => {
      let articles = content.articles;

      if (activeFilter !== "all") {
        articles = articles.filter(a => a.category === activeFilter);
      }

      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        articles = articles.filter(a =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          (a.chips || []).some(c => c.toLowerCase().includes(q)) ||
          a.categoryLabel.toLowerCase().includes(q)
        );
      }

      if (resultCount) {
        if (searchTerm || activeFilter !== "all") {
          resultCount.textContent = `${articles.length} Artikel`;
          resultCount.style.display = "";
        } else {
          resultCount.style.display = "none";
        }
      }

      if (articles.length === 0) {
        grid.innerHTML = `
          <div class="blog-empty">
            <h3>${content.emptyTitle}</h3>
            <p>${content.emptyCopy}</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = articles
        .map((a, i) => renderCard(a, content, lang, i === 0 && a.featured && !searchTerm && activeFilter === "all"))
        .join("");
    };

    /* ── Filter clicks ── */
    if (filtersWrap) {
      filtersWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".blog-filter");
        if (!btn) return;
        filtersWrap.querySelectorAll(".blog-filter").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        activeFilter = btn.dataset.filter;
        updateGrid();
      });
    }

    /* ── Search input ── */
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchTerm = searchInput.value.trim();
        if (clearBtn) {
          clearBtn.classList.toggle("is-visible", searchTerm.length > 0);
        }
        updateGrid();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchTerm = "";
        clearBtn.classList.remove("is-visible");
        searchInput.focus();
        updateGrid();
      });
    }

    /* ── Initial render ── */
    updateGrid();

    /* ── Shared navigation ── */
    bindNavigation(lang);
  };

  const bindNavigation = (lang) => {
    /* dropdowns */
    document.querySelectorAll(".nav-dropdown").forEach(dd => {
      const trigger = dd.querySelector("button");
      const menu = dd.querySelector(".nav-dropdown-menu");
      if (!trigger || !menu) return;

      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = dd.classList.toggle("is-open");
        document.querySelectorAll(".nav-dropdown.is-open").forEach(d => {
          if (d !== dd) d.classList.remove("is-open");
        });
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".nav-dropdown.is-open").forEach(d => d.classList.remove("is-open"));
    });

    /* home button */
    document.querySelectorAll("[data-home-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.href = lang === "de" ? "/de/index.html" : "/index.html";
      });
    });

    /* apply / contact button */
    document.querySelectorAll("[data-apply-btn]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.href = lang === "de" ? "/de/apply/" : "/apply/";
      });
    });

    /* language switcher */
    document.querySelectorAll("[data-lang-switch]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.langSwitch;
        localStorage.setItem("lynck-lang", target);
        if (target === "de") {
          window.location.href = "/de/blog/";
        } else {
          window.location.href = "/blog/";
        }
      });
    });

    /* mobile menu */
    const mobileToggle = document.querySelector(".lynck-mobile-menu-trigger");
    const mobilePanel = document.querySelector(".lynck-mobile-menu-panel");
    if (mobileToggle && mobilePanel) {
      mobileToggle.addEventListener("click", () => {
        const open = mobilePanel.classList.toggle("is-open");
        mobileToggle.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
