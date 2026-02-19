(() => {
  const CTA_LABELS = {
    en: "Let's explore",
    de: 'Jetzt entdecken'
  };

  const state = {
    sentReady: false,
    rafId: 0,
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0
  };

  const stage = document.querySelector('[data-hero-stage]');
  const title = document.querySelector('[data-hero-title]');
  const cta = document.querySelector('[data-hero-cta]');
  const parallax = Array.from(document.querySelectorAll('[data-parallax]'));

  if (!stage || !title) {
    return;
  }

  const getLanguage = () => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('lang');
    if (fromQuery === 'de' || fromQuery === 'en') return fromQuery;

    try {
      const fromStorage = localStorage.getItem('language');
      if (fromStorage === 'de' || fromStorage === 'en') return fromStorage;
    } catch (err) {
      // Ignore storage access errors.
    }

    return 'en';
  };

  const setCtaLabel = () => {
    if (!cta) return;
    const lang = getLanguage();
    cta.textContent = CTA_LABELS[lang] || CTA_LABELS.en;
  };

  const postReady = () => {
    if (state.sentReady) return;
    state.sentReady = true;

    if (window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ type: 'hero-ready' }, window.location.origin);
      } catch (err) {
        window.parent.postMessage({ type: 'hero-ready' }, '*');
      }
    }
  };

  const preloadImage = (src) => new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });

  const waitForReadyAssets = async () => {
    const preloadSources = [
      '/assets/hero-bg-glass-sphere.webp',
      '/assets/cyberpunk-portrait-with-red-laser-beam-4k.webp',
      '/assets/3d-office-building-with-google-map-pin-4k.webp',
      '/assets/glowing-crystal-thoughts-emerge-from-glass-head-4k.webp'
    ];

    const tasks = preloadSources.map(preloadImage);

    if (document.fonts && document.fonts.load) {
      tasks.push(document.fonts.load('700 96px "HeroInter"').catch(() => {}));
      tasks.push(document.fonts.ready.catch(() => {}));
    }

    await Promise.all(tasks);

    // Ensure the title has painted before signaling parent.
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => requestAnimationFrame(resolve));

    stage.classList.add('is-ready');
    postReady();
  };

  const onMove = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    state.targetX = Math.max(-1, Math.min(1, x));
    state.targetY = Math.max(-1, Math.min(1, y));
  };

  const animate = () => {
    state.mouseX += (state.targetX - state.mouseX) * 0.08;
    state.mouseY += (state.targetY - state.mouseY) * 0.08;

    parallax.forEach((node) => {
      const depth = Number(node.getAttribute('data-depth') || '1');
      const tx = (-state.mouseX * 20 * depth).toFixed(2);
      const ty = (-state.mouseY * 16 * depth).toFixed(2);
      const rz = (state.mouseX * 2.5 * depth).toFixed(2);
      node.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rz}deg)`;
    });

    state.rafId = requestAnimationFrame(animate);
  };

  setCtaLabel();

  stage.addEventListener('mousemove', (event) => {
    onMove(event.clientX, event.clientY);
  }, { passive: true });

  stage.addEventListener('touchmove', (event) => {
    const touch = event.touches && event.touches[0];
    if (!touch) return;
    onMove(touch.clientX, touch.clientY);
  }, { passive: true });

  stage.addEventListener('mouseleave', () => {
    state.targetX = 0;
    state.targetY = 0;
  }, { passive: true });

  state.rafId = requestAnimationFrame(animate);
  waitForReadyAssets();

  // Fail-safe to avoid fallback getting stuck forever on rare mobile failures.
  window.setTimeout(postReady, 2400);

  window.addEventListener('beforeunload', () => {
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
    }
  });
})();
