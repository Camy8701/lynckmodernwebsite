(() => {
  const pageKey = document.body?.dataset.shellPage || "";

  const pagePaths = {
    about: {
      en: "/about.html",
      de: "/de/about.html",
    },
    contact: {
      en: "/contact.html",
      de: "/de/contact.html",
    },
    apply: {
      en: "/apply/",
      de: "/de/apply/",
    },
  };

  const getLang = () => {
    if (window.location.pathname.includes("/de/")) return "de";
    try {
      const stored = localStorage.getItem("language");
      if (stored === "de") return "de";
    } catch (error) {}
    return "en";
  };

  const closeDropdowns = () => {
    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
    });
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-pill");
    if (!button) return;

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains("open");
      closeDropdowns();
      dropdown.classList.toggle("open", willOpen);
      if (dropdown.classList.contains("lynck-mobile-menu")) {
        document.body.style.overflow = willOpen ? "hidden" : "";
      }
    });
  });

  document.addEventListener("click", closeDropdowns);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDropdowns();
  });

  document.querySelectorAll(".lynck-mobile-menu-panel a, .lynck-mobile-menu-panel button").forEach((node) => {
    node.addEventListener("click", () => {
      window.setTimeout(closeDropdowns, 0);
    });
  });

  document.querySelectorAll("[data-home-btn]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = getLang() === "de" ? "/de/index.html" : "/index.html";
    });
  });

  document.querySelectorAll("[data-lang-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetLang = button.getAttribute("data-lang-switch");
      if (!targetLang) return;

      try {
        localStorage.setItem("language", targetLang);
      } catch (error) {}

      const targetPath = pagePaths[pageKey]?.[targetLang];
      window.location.href = targetPath || (targetLang === "de" ? "/de/index.html" : "/index.html");
    });
  });

  const goToApply = (event) => {
    if (event) event.preventDefault();
    window.location.href = getLang() === "de" ? "/de/apply/" : "/apply/";
  };

  document.querySelectorAll("[data-apply-btn], [data-contact-btn], [data-strategy-call-btn], [data-build-growth-btn]").forEach((button) => {
    button.addEventListener("click", goToApply);
  });
})();
