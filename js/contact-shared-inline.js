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
        try {
          const stored = localStorage.getItem('language');
          if (stored === 'de') return 'de';
        } catch (e) {}
        return window.location.pathname.includes('/de/') ? 'de' : 'en';
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
            const target = lang === 'de' ? '/de/contact.html' : '/contact.html';
            window.location.href = target;
          });
        });
      }

      const contactButtons = document.querySelectorAll('[data-contact-btn]');
      if (contactButtons.length) {
        contactButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const lang = getLang();
            const target = lang === 'de' ? '/de/contact.html' : '/contact.html';
            window.location.href = target;
          });
        });
      }
    })();
