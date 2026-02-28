(function () {
  var doc = document;
  var win = window;
  var headerInner = doc.querySelector('.lynck-header-inner');
  if (!headerInner) {
    return;
  }

  var isGerman = /^de\b/i.test(doc.documentElement.lang || '');

  injectStyles();
  ensureMobileControls();
  removeMobileLanguageGroup();
  bindMobileToggles();

  function injectStyles() {
    if (doc.getElementById('lynck-mobile-nav-style')) {
      return;
    }

    var style = doc.createElement('style');
    style.id = 'lynck-mobile-nav-style';
    style.textContent = [
      '.lynck-mobile-menu,.lynck-mobile-about,.lynck-mobile-lang{display:none;}',
      '.lynck-mobile-menu-panel,.lynck-mobile-lang-menu{display:none;}',
      '.lynck-mobile-menu.is-open .lynck-mobile-menu-panel,.lynck-mobile-lang.is-open .lynck-mobile-lang-menu{display:block;}',
      '@media (max-width: 900px){',
      '  .lynck-header{padding:calc(env(safe-area-inset-top, 0px) + 0.45rem) 0.5rem 0.45rem !important;}',
      '  .lynck-header-inner{gap:0.5rem !important;padding:0.35rem 0.45rem !important;border-radius:26px !important;background:rgba(255,255,255,0.86) !important;border:1px solid rgba(255,255,255,0.7) !important;backdrop-filter:blur(18px) !important;-webkit-backdrop-filter:blur(18px) !important;box-shadow:0 14px 32px rgba(0,0,0,0.24), inset 0 0 0 1px rgba(255,255,255,0.45) !important;align-items:center !important;justify-content:flex-start !important;}',
      '  .lynck-header-bar{display:none !important;}',
      '  .lynck-home-logo{width:50px !important;height:50px !important;margin:0 !important;flex:0 0 auto !important;}',
      '  .lynck-partner-badge{width:50px !important;height:50px !important;margin:0 !important;border-radius:14px !important;flex:0 0 auto !important;}',
      '  .lynck-mobile-menu,.lynck-mobile-about,.lynck-mobile-lang{display:flex !important;align-items:center;flex:0 0 auto;}',
      '  .lynck-mobile-about{min-width:0;flex:1 1 auto;justify-content:center;text-decoration:none;color:rgba(15,23,42,0.88);font-size:0.96rem;font-weight:500;line-height:1;padding:0 0.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '  .lynck-mobile-menu-trigger,.lynck-mobile-lang-trigger{min-width:44px;min-height:44px;padding:0.55rem 0.7rem !important;justify-content:center;font-size:0.78rem;font-weight:600;}',
      '  .lynck-mobile-menu-trigger .nav-caret,.lynck-mobile-menu-text{display:none !important;}',
      '  .lynck-mobile-menu-icon{display:inline-flex;flex-direction:column;gap:3px;width:14px;}',
      '  .lynck-mobile-menu-icon span{display:block;width:14px;height:2px;border-radius:999px;background:rgba(15,23,42,0.75);}',
      '  .lynck-mobile-menu-panel,.lynck-mobile-lang-menu{position:fixed !important;left:50% !important;right:auto !important;transform:translateX(-50%) !important;top:calc(env(safe-area-inset-top, 0px) + 5rem) !important;z-index:10120 !important;border-radius:24px !important;padding:0.8rem !important;background:rgba(4,10,20,0.94) !important;border:1px solid rgba(255,255,255,0.08) !important;box-shadow:0 20px 44px rgba(0,0,0,0.45) !important;}',
      '  .lynck-mobile-menu-panel{width:min(calc(100vw - 1rem), 360px) !important;max-height:calc(100vh - 6rem) !important;overflow:auto !important;}',
      '  .lynck-mobile-lang-menu{width:min(calc(100vw - 1rem), 220px) !important;}',
      '  .lynck-mobile-menu-group{display:grid;gap:0.3rem;}',
      '  .lynck-mobile-menu-group + .lynck-mobile-menu-group{margin-top:0.8rem;}',
      '  .lynck-mobile-menu-label{display:block;font-size:0.7rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.5);padding:0 0.45rem 0.2rem;}',
      '  .lynck-mobile-menu-panel a,.lynck-mobile-menu-panel button[role="menuitem"],.lynck-mobile-lang-menu button[role="menuitem"]{width:100%;display:flex;align-items:center;gap:0.5rem;justify-content:flex-start;border:0;background:rgba(255,255,255,0.04);color:rgba(244,247,255,0.94);text-decoration:none;padding:0.8rem 0.9rem;border-radius:16px;font:inherit;font-size:0.94rem;line-height:1.35;cursor:pointer;text-align:left;}',
      '  .lynck-mobile-menu-panel a:hover,.lynck-mobile-menu-panel button[role="menuitem"]:hover,.lynck-mobile-lang-menu button[role="menuitem"]:hover{background:rgba(255,255,255,0.08);}',
      '  .lynck-mobile-social{display:grid;gap:0.3rem;}',
      '  .lynck-mobile-social a span{display:inline-block;}',
      '  .lynck-mobile-menu-cta{width:100%;margin-top:0.85rem;justify-content:center;}',
      '  .lynck-mobile-menu-cta .btn-core{justify-content:center;}',
      '}',
      '@media (max-width: 420px){',
      '  .lynck-mobile-about{font-size:0.9rem;}',
      '  .lynck-mobile-lang-trigger{padding:0.55rem 0.55rem !important;}',
      '  .lynck-home-logo,.lynck-partner-badge{width:46px !important;height:46px !important;}',
      '}',
      '@media (min-width: 901px){',
      '  .lynck-mobile-menu,.lynck-mobile-about,.lynck-mobile-lang{display:none !important;}',
      '}'
    ].join('');

    doc.head.appendChild(style);
  }

  function ensureMobileControls() {
    if (!headerInner.querySelector('.lynck-mobile-menu')) {
      headerInner.insertBefore(buildMobileMenu(), headerInner.querySelector('.lynck-header-bar'));
    }

    var existingAboutLink = headerInner.querySelector('.lynck-mobile-about');
    if (existingAboutLink) {
      existingAboutLink.href = '/about.html';
      existingAboutLink.textContent = isGerman ? 'Über uns' : 'About us';
    } else {
      var aboutLink = doc.createElement('a');
      aboutLink.className = 'lynck-mobile-about';
      aboutLink.href = '/about.html';
      aboutLink.textContent = isGerman ? 'Über uns' : 'About us';
      headerInner.insertBefore(aboutLink, headerInner.querySelector('.lynck-header-bar'));
    }

    if (!headerInner.querySelector('.lynck-mobile-lang')) {
      headerInner.insertBefore(buildLanguageMenu(), headerInner.querySelector('.lynck-header-bar'));
    }
  }

  function buildMobileMenu() {
    var wrap = doc.createElement('div');
    wrap.className = 'lynck-mobile-menu nav-dropdown right';
    wrap.innerHTML = [
      '<button class="nav-pill lynck-mobile-menu-trigger" type="button" aria-label="' + (isGerman ? 'Menü öffnen' : 'Open menu') + '" aria-expanded="false">',
      '  <span class="lynck-mobile-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span>',
      '  <span class="lynck-mobile-menu-text">' + (isGerman ? 'Menü' : 'Menu') + '</span>',
      '</button>',
      '<div class="nav-dropdown-menu lynck-mobile-menu-panel" role="menu">',
      '  <div class="lynck-mobile-menu-group">',
      '    <span class="lynck-mobile-menu-label">Services</span>',
      buildServiceLinks(),
      '  </div>',
      '  <div class="lynck-mobile-menu-group">',
      '    <span class="lynck-mobile-menu-label">Social</span>',
      '    <div class="lynck-mobile-social">' + buildSocialLinks() + '</div>',
      '  </div>',
      '  <button type="button" class="gradient-border-btn lynck-mobile-menu-cta"><span class="btn-core">' + getCtaLabel() + '</span></button>',
      '</div>'
    ].join('');

    var cta = wrap.querySelector('.lynck-mobile-menu-cta');
    cta.addEventListener('click', function () {
      closeAllMenus();
      var originalButton = doc.querySelector('.lynck-header-right [data-apply-btn]');
      if (originalButton) {
        originalButton.click();
      }
    });

    return wrap;
  }

  function buildLanguageMenu() {
    var wrap = doc.createElement('div');
    wrap.className = 'lynck-mobile-lang nav-dropdown right';
    wrap.innerHTML = [
      '<button class="nav-pill lynck-mobile-lang-trigger" type="button" aria-label="' + (isGerman ? 'Sprache ändern' : 'Change language') + '" aria-expanded="false">',
      (isGerman ? 'DE' : 'EN'),
      ' <span class="nav-caret" aria-hidden="true"></span>',
      '</button>',
      '<div class="nav-dropdown-menu lynck-mobile-lang-menu" role="menu">',
      '  <button type="button" role="menuitem" data-mobile-lang="en"><span aria-hidden="true">🇺🇸</span> English</button>',
      '  <button type="button" role="menuitem" data-mobile-lang="de"><span aria-hidden="true">🇩🇪</span> Deutsch</button>',
      '</div>'
    ].join('');
    return wrap;
  }

  function buildServiceLinks() {
    var base = isGerman ? '/de/services/service.html?service=' : '/services/service.html?service=';
    var services = [
      ['google-ads', 'Google Ads & Performance Marketing'],
      ['meta-ads', 'Meta Ads & Paid Social'],
      ['ai-content', 'AI Content & Creative Production'],
      ['ugc-influencer', 'UGC & Influencer Marketing'],
      ['web-systems', 'Conversion-Focused Web Systems'],
      ['growth-strategy', 'Growth Strategy & Brand Positioning'],
      ['leads-generation', isApplyPage() ? 'Leads Generation Systems' : 'Leads Generation'],
      ['youtube-growth-services', 'YouTube Growth Services'],
      ['seo-sevo', 'SEO / SEvO']
    ];

    return services.map(function (item) {
      return '<a href="' + base + item[0] + '" role="menuitem">' + item[1] + '</a>';
    }).join('');
  }

  function buildSocialLinks() {
    var links = Array.prototype.slice.call(doc.querySelectorAll('.nav-social a')).map(function (link) {
      var clone = link.cloneNode(true);
      var label = link.getAttribute('aria-label') || (clone.textContent || '').trim();
      if (!clone.querySelector('span')) {
        var span = doc.createElement('span');
        span.textContent = label;
        clone.appendChild(span);
      }
      return clone.outerHTML;
    });

    return links.join('');
  }

  function getCtaLabel() {
    if (isGerman) {
      return isApplyPage() ? 'Strategiegespräch anfragen' : 'Lass uns sprechen';
    }
    return isApplyPage() ? 'Apply for a Strategy Call' : "Let's connect";
  }

  function isApplyPage() {
    return /\/apply\/(?:index\.html)?$/.test(win.location.pathname);
  }

  function removeMobileLanguageGroup() {
    Array.prototype.forEach.call(doc.querySelectorAll('.lynck-mobile-menu-group'), function (group) {
      var label = group.querySelector('.lynck-mobile-menu-label');
      if (!label) {
        return;
      }
      var text = (label.textContent || '').trim().toLowerCase();
      if (text === 'language' || text === 'sprache') {
        group.remove();
      }
    });
  }

  function bindMobileToggles() {
    Array.prototype.forEach.call(doc.querySelectorAll('.lynck-mobile-menu-trigger'), function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var parent = trigger.closest('.lynck-mobile-menu');
        toggleMenu(parent, '.lynck-mobile-menu');
      });
    });

    Array.prototype.forEach.call(doc.querySelectorAll('.lynck-mobile-lang-trigger'), function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.preventDefault();
        var parent = trigger.closest('.lynck-mobile-lang');
        toggleMenu(parent, '.lynck-mobile-lang');
      });
    });

    Array.prototype.forEach.call(doc.querySelectorAll('[data-mobile-lang]'), function (button) {
      button.addEventListener('click', function () {
        switchLanguage(button.getAttribute('data-mobile-lang'));
      });
    });

    doc.addEventListener('click', function (event) {
      if (event.target.closest('.lynck-mobile-menu') || event.target.closest('.lynck-mobile-lang')) {
        return;
      }
      closeAllMenus();
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    });
  }

  function toggleMenu(container, selector) {
    if (!container) {
      return;
    }
    var open = container.classList.contains('is-open');
    closeAllMenus();
    if (!open) {
      container.classList.add('is-open');
      setExpanded(container, true);
    }
  }

  function closeAllMenus() {
    Array.prototype.forEach.call(doc.querySelectorAll('.lynck-mobile-menu.is-open, .lynck-mobile-lang.is-open'), function (node) {
      node.classList.remove('is-open');
      setExpanded(node, false);
    });
  }

  function setExpanded(container, value) {
    var trigger = container.querySelector('button');
    if (trigger) {
      trigger.setAttribute('aria-expanded', value ? 'true' : 'false');
    }
  }

  function switchLanguage(targetLang) {
    if (!targetLang) {
      return;
    }

    closeAllMenus();
    var location = win.location;
    var path = location.pathname;
    var query = location.search || '';
    var hash = location.hash || '';
    var next = path;

    if (targetLang === 'de') {
      if (path === '/' || path === '/index.html') {
        next = '/de/';
      } else if (path === '/contact.html') {
        next = '/de/contact.html';
      } else if (path === '/apply/' || path === '/apply/index.html') {
        next = '/de/apply/';
      } else if (path === '/services/service.html') {
        next = '/de/services/service.html';
      } else if (path === '/google-ads.html') {
        next = '/de/google-ads.html';
      }
    }

    if (targetLang === 'en') {
      if (path === '/de/' || path === '/de/index.html') {
        next = '/';
      } else if (path === '/de/contact.html') {
        next = '/contact.html';
      } else if (path === '/de/apply/' || path === '/de/apply/index.html') {
        next = '/apply/';
      } else if (path === '/de/services/service.html') {
        next = '/services/service.html';
      } else if (path === '/de/google-ads.html') {
        next = '/google-ads.html';
      }
    }

    win.location.href = next + query + hash;
  }
})();
