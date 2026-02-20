    (() => {
      const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
      if (dropdowns.length) {
        dropdowns.forEach((dropdown) => {
          const button = dropdown.querySelector('.nav-pill');
          if (!button) return;
          button.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdowns.forEach((d) => { if (d !== dropdown) d.classList.remove('open'); });
            dropdown.classList.toggle('open');
          });
        });
        document.addEventListener('click', () => {
          dropdowns.forEach((d) => d.classList.remove('open'));
        });
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            dropdowns.forEach((d) => d.classList.remove('open'));
          }
        });
      }

      const getLang = () => {
        if (window.location.pathname.includes('/de/')) return 'de';
        try {
          const stored = localStorage.getItem('language');
          if (stored === 'de') return 'de';
        } catch (e) {}
        return 'en';
      };

      const homeBtn = document.querySelector('[data-home-btn]');
      if (homeBtn) {
        homeBtn.addEventListener('click', () => {
          const lang = getLang();
          const target = lang === 'de' ? '/de/index.html' : '/index.html';
          window.location.href = target;
        });
      }

      const langButtons = document.querySelectorAll('[data-lang-switch]');
      if (langButtons.length) {
        langButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang-switch');
            if (!lang) return;
            try {
              localStorage.setItem('language', lang);
            } catch (e) {}
            const dropdown = btn.closest('.nav-dropdown');
            if (dropdown) {
              dropdown.classList.remove('open');
            }
            const target = lang === 'de' ? '/de/apply/' : '/apply/';
            window.location.href = target;
          });
        });
      }

      const contactButtons = document.querySelectorAll('[data-contact-btn]');
      if (contactButtons.length) {
        contactButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const lang = getLang();
            const target = lang === 'de' ? '/de/apply/' : '/apply/';
            window.location.href = target;
          });
        });
      }

      const applyButtons = document.querySelectorAll('[data-apply-btn]');
      if (applyButtons.length) {
        applyButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const lang = getLang();
            const target = lang === 'de' ? '/de/apply/' : '/apply/';
            window.location.href = target;
          });
        });
      }

      const strategyApplyButtons = document.querySelectorAll('[data-strategy-call-btn], [data-build-growth-btn]');
      if (strategyApplyButtons.length) {
        strategyApplyButtons.forEach((btn) => {
          btn.addEventListener('click', (event) => {
            event.preventDefault();
            const lang = getLang();
            const target = lang === 'de' ? '/de/apply/' : '/apply/';
            window.location.href = target;
          });
        });
      }
    })();
