(() => {
  "use strict";

  const closeDropdowns = () => {
    document.querySelectorAll(".nav-dropdown.is-open").forEach((dropdown) => {
      dropdown.classList.remove("is-open");
    });
    const mobilePanel = document.querySelector(".lynck-mobile-menu-panel");
    const mobileToggle = document.querySelector(".lynck-mobile-menu-trigger");
    if (mobilePanel) mobilePanel.classList.remove("is-open");
    if (mobileToggle) mobileToggle.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const initDropdowns = () => {
    document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
      const trigger = dropdown.querySelector(".nav-pill");
      const menu = dropdown.querySelector(".nav-dropdown-menu");
      if (!trigger || !menu || trigger.tagName !== "BUTTON" || trigger.classList.contains("lynck-mobile-menu-trigger")) return;

      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !dropdown.classList.contains("is-open");
        closeDropdowns();
        dropdown.classList.toggle("is-open", willOpen);
      });
    });

    document.addEventListener("click", closeDropdowns);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeDropdowns();
    });
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector(".lynck-mobile-menu-trigger");
    const panel = document.querySelector(".lynck-mobile-menu-panel");
    const dropdown = document.querySelector(".lynck-mobile-menu");
    if (!toggle || !panel || !dropdown) return;

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !panel.classList.contains("is-open");
      closeDropdowns();
      panel.classList.toggle("is-open", willOpen);
      dropdown.classList.toggle("is-open", willOpen);
      toggle.classList.toggle("is-open", willOpen);
      document.body.style.overflow = willOpen ? "hidden" : "";
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        panel.classList.remove("is-open");
        dropdown.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initDropdowns();
      initMobileMenu();
    });
  } else {
    initDropdowns();
    initMobileMenu();
  }
})();
