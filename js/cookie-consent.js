(function () {
  var STORAGE_KEY = 'lynck_cookie_consent_v1';
  var COOKIE_NAME = 'lynck_cookie_consent';
  var CONFIG = readConfig();
  var COPY = getCopy(CONFIG.locale);
  var currentConsent = readStoredConsent();
  var ui = null;

  ensureGtagStub();
  publishApi();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    ui = renderUi();
    bindUi();
    if (currentConsent) {
      writeConsent(currentConsent);
    }
    applyConsentState(currentConsent, { emit: false });
    updateUi();
  }

  function readConfig() {
    var path = window.location.pathname || '';
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    var locale = 'en';

    if (path.indexOf('/de/') === 0 || path.indexOf('/website-design/de/') === 0 || lang.indexOf('de') === 0) {
      locale = 'de';
    } else if (path.indexOf('/website-design/be/') === 0 || lang.indexOf('fr') === 0) {
      locale = 'fr';
    }

    return {
      locale: locale
    };
  }

  function getCopy(locale) {
    if (locale === 'de') {
      return {
        manage: 'Cookie-Einstellungen',
        title: 'Datenschutz zuerst, Tracking nur mit deiner Freigabe.',
        body: 'Analyse und Marketing bleiben aus, bis du zustimmst.',
        accept: 'Alle akzeptieren',
        reject: 'Nur notwendige',
        customize: 'Auswahl anpassen',
        policy: 'Cookie-Richtlinie',
        modalTitle: 'Cookie-Praeferenzen',
        modalBody: 'Fuer Besucher aus der EU, dem Vereinigten Koenigreich und der Schweiz bleiben nicht notwendige Technologien standardmaessig deaktiviert, bis du sie aktiv freigibst.',
        necessaryTitle: 'Notwendig',
        necessaryBody: 'Erforderlich fuer Spracheinstellungen, Sicherheitslogik und das Speichern deiner Einwilligung.',
        analyticsTitle: 'Analyse',
        analyticsBody: 'Erlaubt Analyse-Tags, die ueber den Google Tag Manager verwaltet werden, damit wir verstehen, welche Seiten besucht werden.',
        marketingTitle: 'Marketing',
        marketingBody: 'Erlaubt Attributionsdaten aus Kampagnenlinks und Werbemessung ueber den Google Tag Manager.',
        save: 'Auswahl speichern',
        cancel: 'Abbrechen',
        alwaysOn: 'Immer aktiv',
        footer: 'Du kannst deine Auswahl jederzeit aendern.',
        manageInline: 'Cookie-Auswahl aendern'
      };
    }

    if (locale === 'fr') {
      return {
        manage: 'Parametres cookies',
        title: 'Confidentialite d abord, tracking seulement avec votre accord.',
        body: 'Analytics et marketing restent bloques jusqu a votre consentement.',
        accept: 'Tout accepter',
        reject: 'Necessaires seulement',
        customize: 'Personnaliser',
        policy: 'Politique cookies',
        modalTitle: 'Preferences cookies',
        modalBody: 'Pour les visiteurs de l UE, du Royaume-Uni et de la Suisse, les technologies non essentielles restent desactivees jusqu a votre accord explicite.',
        necessaryTitle: 'Necessaires',
        necessaryBody: 'Requis pour les preferences de langue, la securite et la memorisation de votre consentement.',
        analyticsTitle: 'Analytics',
        analyticsBody: 'Autorise les tags analytics geres via Google Tag Manager afin de comprendre quelles pages sont utilisees.',
        marketingTitle: 'Marketing',
        marketingBody: 'Autorise les donnees d attribution des liens de campagne et la mesure publicitaire via Google Tag Manager.',
        save: 'Enregistrer',
        cancel: 'Annuler',
        alwaysOn: 'Toujours actif',
        footer: 'Vous pouvez modifier votre choix a tout moment.',
        manageInline: 'Modifier mes choix cookies'
      };
    }

    return {
      manage: 'Cookie Settings',
      title: 'Privacy first, tracking only after you say yes.',
      body: 'Analytics and marketing stay off until you opt in.',
      accept: 'Accept all',
      reject: 'Necessary only',
      customize: 'Customize',
      policy: 'Cookie Policy',
      modalTitle: 'Cookie Preferences',
      modalBody: 'For visitors in the EU, United Kingdom and Switzerland, non-essential technologies remain disabled until you actively allow them.',
      necessaryTitle: 'Necessary',
      necessaryBody: 'Required for language preference, security logic and storing your consent choice.',
      analyticsTitle: 'Analytics',
      analyticsBody: 'Allows analytics tags managed through Google Tag Manager so we can understand which pages are being used.',
      marketingTitle: 'Marketing',
      marketingBody: 'Allows campaign attribution data from marketing links and ad measurement through Google Tag Manager.',
      save: 'Save preferences',
      cancel: 'Cancel',
      alwaysOn: 'Always on',
      footer: 'You can change your choice at any time.',
      manageInline: 'Update cookie choices'
    };
  }

  function ensureGtagStub() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

  function readStoredConsent() {
    var stored = null;
    var cookie = readConsentCookie();

    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = normalizeConsent(JSON.parse(raw));
    } catch (err) {
      stored = null;
    }

    if (stored && cookie) {
      return getConsentTimestamp(cookie) > getConsentTimestamp(stored) ? cookie : stored;
    }

    return stored || cookie || null;
  }

  function normalizeConsent(value) {
    value = value && typeof value === 'object' ? value : {};
    return {
      necessary: true,
      analytics: Boolean(value.analytics),
      marketing: Boolean(value.marketing),
      ts: value.ts || null,
      version: 1
    };
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (err) {
      // Ignore storage failures.
    }

    writeConsentCookie(value);
  }

  function readConsentCookie() {
    var prefix = COOKIE_NAME + '=';
    var cookies = document.cookie ? document.cookie.split(';') : [];

    for (var i = 0; i < cookies.length; i += 1) {
      var entry = cookies[i].trim();
      if (entry.indexOf(prefix) !== 0) continue;

      try {
        return normalizeConsent(JSON.parse(decodeURIComponent(entry.slice(prefix.length))));
      } catch (err) {
        return null;
      }
    }

    return null;
  }

  function writeConsentCookie(value) {
    try {
      document.cookie = COOKIE_NAME + '=' + encodeURIComponent(JSON.stringify(value)) + '; Path=/; Max-Age=15552000; SameSite=Lax';
    } catch (err) {
      // Ignore cookie write failures.
    }
  }

  function getConsentTimestamp(value) {
    if (!value || !value.ts) return 0;
    var time = Date.parse(value.ts);
    return Number.isFinite(time) ? time : 0;
  }

  function publishApi() {
    window.LynckConsent = {
      getConsent: function () {
        return currentConsent ? Object.assign({}, currentConsent) : null;
      },
      hasConsent: function (category) {
        if (category === 'necessary') return true;
        return Boolean(currentConsent && currentConsent[category]);
      },
      openPreferences: openPreferences,
      acceptAll: function () {
        saveConsent({ analytics: true, marketing: true });
      },
      rejectNonEssential: function () {
        saveConsent({ analytics: false, marketing: false });
      }
    };
  }

  function saveConsent(partial) {
    var next = normalizeConsent({
      analytics: Boolean(partial.analytics),
      marketing: Boolean(partial.marketing),
      ts: new Date().toISOString()
    });

    writeConsent(next);
    applyConsentState(next, { emit: true });
    updateUi();
  }

  function applyConsentState(next, options) {
    currentConsent = next;

    if (!next) {
      if (options && options.emit) {
        emitConsentChange();
      }

      return;
    }

    var analyticsGranted = Boolean(next && next.analytics);
    var marketingGranted = Boolean(next && next.marketing);

    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      ad_storage: marketingGranted ? 'granted' : 'denied',
      ad_user_data: marketingGranted ? 'granted' : 'denied',
      ad_personalization: marketingGranted ? 'granted' : 'denied'
    });

    if (!analyticsGranted) {
      clearAnalyticsCookies();
    }

    if (marketingGranted) {
      commitAttributionIfAvailable();
    } else {
      clearAttributionIfAvailable();
      clearMarketingCookies();
    }

    if (options && options.emit) {
      emitConsentChange();
    }
  }

  function clearAnalyticsCookies() {
    eachCookie(function (name) {
      if (/^(_ga|_gid|_gat|_ga_|_clck|_clsk)/.test(name)) {
        expireCookie(name);
      }
    });
  }

  function clearMarketingCookies() {
    eachCookie(function (name) {
      if (/^(_gcl_au|_fbp|_fbc)/.test(name)) {
        expireCookie(name);
      }
    });
  }

  function eachCookie(visitor) {
    var cookies = document.cookie ? document.cookie.split(';') : [];
    cookies.forEach(function (entry) {
      var name = entry.split('=')[0].trim();
      if (name) visitor(name);
    });
  }

  function expireCookie(name) {
    var hostname = window.location.hostname;
    var domains = [''];

    if (hostname.indexOf('.') > -1) {
      domains.push(hostname);
      domains.push('.' + hostname);

      var parts = hostname.split('.');
      if (parts.length > 2) {
        domains.push('.' + parts.slice(-2).join('.'));
      }
    }

    domains.forEach(function (domain) {
      document.cookie = name + '=; Path=/; Max-Age=0; SameSite=Lax' + (domain ? '; Domain=' + domain : '');
    });
  }

  function commitAttributionIfAvailable() {
    if (window.LynckAttribution && typeof window.LynckAttribution.commitPending === 'function') {
      window.LynckAttribution.commitPending();
    }
  }

  function clearAttributionIfAvailable() {
    if (window.LynckAttribution && typeof window.LynckAttribution.clear === 'function') {
      window.LynckAttribution.clear();
    }
  }

  function emitConsentChange() {
    try {
      window.dispatchEvent(new CustomEvent('lynck:consent-updated', { detail: window.LynckConsent.getConsent() }));
    } catch (err) {
      // Ignore event dispatch failures.
    }
  }

  function renderUi() {
    var policyPath = CONFIG.locale === 'de' ? '/de/cookie-policy.html' : '/cookie-policy.html';
    var wrapper = document.createElement('div');
    wrapper.className = 'lynck-consent-root';
    wrapper.innerHTML = [
      '<style>',
      '.lynck-consent-root{position:fixed;inset:auto 1rem 1rem 1rem;z-index:9999;pointer-events:none;font-family:"Manrope",sans-serif;}',
      '.lynck-consent-banner,.lynck-consent-modal{pointer-events:auto;}',
      '.lynck-consent-banner{max-width:30rem;margin-left:auto;display:grid;gap:1rem;padding:1.15rem;border:1px solid rgba(14,28,58,.16);border-radius:1.25rem;background:rgba(248,244,236,.96);color:#102145;box-shadow:0 24px 70px rgba(8,18,37,.22);backdrop-filter:blur(18px);}',
      '.lynck-consent-banner[hidden],.lynck-consent-backdrop[hidden],.lynck-consent-modal[hidden]{display:none!important;}',
      '.lynck-consent-eyebrow{display:inline-flex;align-items:center;gap:.45rem;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:#194dc1;font-weight:800;}',
      '.lynck-consent-dot{width:.55rem;height:.55rem;border-radius:999px;background:#194dc1;box-shadow:0 0 0 .25rem rgba(25,77,193,.12);}',
      '.lynck-consent-banner h2,.lynck-consent-modal h2{margin:0;font-family:"Space Grotesk",sans-serif;font-size:1.18rem;line-height:1.15;letter-spacing:-.02em;color:#102145;}',
      '.lynck-consent-banner p,.lynck-consent-modal p,.lynck-consent-card-copy p{margin:0;color:#465a86;font-size:.95rem;line-height:1.6;}',
      '.lynck-consent-actions{display:flex;flex-wrap:wrap;gap:.55rem;}',
      '.lynck-consent-btn{appearance:none;border:1px solid rgba(16,33,69,.12);border-radius:999px;padding:.72rem 1rem;background:#fff;color:#102145;font:inherit;font-weight:700;cursor:pointer;transition:transform .16s ease,box-shadow .16s ease,background .16s ease;}',
      '.lynck-consent-btn:hover{transform:translateY(-1px);box-shadow:0 12px 22px rgba(15,29,61,.12);}',
      '.lynck-consent-btn-primary{background:linear-gradient(135deg,#184abc,#2e6df3);color:#fff;border-color:rgba(24,74,188,.45);}',
      '.lynck-consent-btn-ghost{background:rgba(255,255,255,.7);}',
      '.lynck-consent-meta{display:flex;align-items:center;justify-content:space-between;gap:.75rem;flex-wrap:wrap;}',
      '.lynck-consent-link{color:#194dc1;text-decoration:none;font-weight:700;}',
      '.lynck-consent-backdrop{position:fixed;inset:0;background:rgba(6,10,20,.44);backdrop-filter:blur(6px);z-index:10000;}',
      '.lynck-consent-modal{position:fixed;left:50%;top:50%;width:min(42rem,calc(100vw - 2rem));max-height:min(88vh,48rem);overflow:auto;transform:translate(-50%,-50%);padding:1.3rem;border-radius:1.35rem;border:1px solid rgba(255,255,255,.12);background:#f7f2e9;color:#102145;box-shadow:0 34px 90px rgba(6,10,20,.34);z-index:10001;}',
      '.lynck-consent-grid{display:grid;gap:.8rem;margin-top:1rem;}',
      '.lynck-consent-card{display:grid;grid-template-columns:auto 1fr auto;gap:.9rem;align-items:start;padding:.95rem;border-radius:1rem;background:rgba(255,255,255,.8);border:1px solid rgba(16,33,69,.08);}',
      '.lynck-consent-switch{position:relative;width:3.05rem;height:1.7rem;display:inline-flex;align-items:center;border-radius:999px;background:#cfd8ec;transition:background .18s ease;cursor:pointer;}',
      '.lynck-consent-switch input{position:absolute;opacity:0;pointer-events:none;}',
      '.lynck-consent-switch span{position:absolute;left:.15rem;width:1.38rem;height:1.38rem;border-radius:999px;background:#fff;box-shadow:0 4px 12px rgba(16,33,69,.2);transition:left .18s ease;}',
      '.lynck-consent-switch input:checked + span{left:1.52rem;}',
      '.lynck-consent-switch.is-on{background:#194dc1;}',
      '.lynck-consent-pill{display:inline-flex;align-items:center;padding:.28rem .55rem;border-radius:999px;background:rgba(25,77,193,.12);color:#194dc1;font-size:.76rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;}',
      '.lynck-consent-modal-footer{display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;margin-top:1rem;}',
      '.lynck-consent-inline-link{border:none;background:transparent;padding:0;color:#194dc1;font:inherit;font-weight:700;text-decoration:underline;cursor:pointer;}',
      '@media (max-width:640px){.lynck-consent-root{inset:auto .75rem 5.65rem .75rem}.lynck-consent-banner{gap:.52rem;padding:.72rem;border-radius:1rem;max-height:34vh;overflow:auto;box-shadow:0 16px 42px rgba(8,18,37,.2);}.lynck-consent-banner h2{font-size:.96rem;line-height:1.12;}.lynck-consent-banner p{font-size:.78rem;line-height:1.35;}.lynck-consent-eyebrow{display:none}.lynck-consent-actions{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.35rem}.lynck-consent-btn{width:100%;justify-content:center;padding:.5rem .45rem;font-size:.74rem;line-height:1.2;}.lynck-consent-meta{font-size:.72rem;gap:.35rem}.lynck-consent-inline-link{font-size:.72rem}.lynck-consent-card{grid-template-columns:1fr;}.lynck-consent-modal{padding:1rem;}}',
      '</style>',
      '<section class="lynck-consent-banner" role="dialog" aria-live="polite" aria-label="' + escapeHtml(COPY.modalTitle) + '">',
      '  <span class="lynck-consent-eyebrow"><span class="lynck-consent-dot" aria-hidden="true"></span>' + escapeHtml(COPY.manage) + '</span>',
      '  <h2>' + escapeHtml(COPY.title) + '</h2>',
      '  <p>' + escapeHtml(COPY.body) + '</p>',
      '  <div class="lynck-consent-actions">',
      '    <button type="button" class="lynck-consent-btn lynck-consent-btn-primary" data-consent-accept>' + escapeHtml(COPY.accept) + '</button>',
      '    <button type="button" class="lynck-consent-btn lynck-consent-btn-ghost" data-consent-reject>' + escapeHtml(COPY.reject) + '</button>',
      '    <button type="button" class="lynck-consent-btn lynck-consent-btn-ghost" data-consent-manage>' + escapeHtml(COPY.customize) + '</button>',
      '  </div>',
      '  <div class="lynck-consent-meta">',
      '    <a class="lynck-consent-link" href="' + policyPath + '">' + escapeHtml(COPY.policy) + '</a>',
      '    <button type="button" class="lynck-consent-inline-link" data-consent-manage-inline>' + escapeHtml(COPY.manageInline) + '</button>',
      '  </div>',
      '</section>',
      '<div class="lynck-consent-backdrop" hidden></div>',
      '<section class="lynck-consent-modal" role="dialog" aria-modal="true" aria-label="' + escapeHtml(COPY.modalTitle) + '" hidden>',
      '  <h2>' + escapeHtml(COPY.modalTitle) + '</h2>',
      '  <p style="margin-top:.6rem;">' + escapeHtml(COPY.modalBody) + '</p>',
      '  <div class="lynck-consent-grid">',
      '    <div class="lynck-consent-card">',
      '      <div class="lynck-consent-pill">' + escapeHtml(COPY.alwaysOn) + '</div>',
      '      <div class="lynck-consent-card-copy"><strong>' + escapeHtml(COPY.necessaryTitle) + '</strong><p>' + escapeHtml(COPY.necessaryBody) + '</p></div>',
      '      <label class="lynck-consent-switch is-on" aria-label="' + escapeHtml(COPY.necessaryTitle) + '"><input type="checkbox" checked disabled><span></span></label>',
      '    </div>',
      '    <div class="lynck-consent-card">',
      '      <div class="lynck-consent-pill">GTM</div>',
      '      <div class="lynck-consent-card-copy"><strong>' + escapeHtml(COPY.analyticsTitle) + '</strong><p>' + escapeHtml(COPY.analyticsBody) + '</p></div>',
      '      <label class="lynck-consent-switch" data-switch-shell><input type="checkbox" data-consent-analytics><span></span></label>',
      '    </div>',
      '    <div class="lynck-consent-card">',
      '      <div class="lynck-consent-pill">ADS</div>',
      '      <div class="lynck-consent-card-copy"><strong>' + escapeHtml(COPY.marketingTitle) + '</strong><p>' + escapeHtml(COPY.marketingBody) + '</p></div>',
      '      <label class="lynck-consent-switch" data-switch-shell><input type="checkbox" data-consent-marketing><span></span></label>',
      '    </div>',
      '  </div>',
      '  <div class="lynck-consent-modal-footer">',
      '    <p>' + escapeHtml(COPY.footer) + '</p>',
      '    <div class="lynck-consent-actions">',
      '      <button type="button" class="lynck-consent-btn lynck-consent-btn-ghost" data-consent-cancel>' + escapeHtml(COPY.cancel) + '</button>',
      '      <button type="button" class="lynck-consent-btn lynck-consent-btn-primary" data-consent-save>' + escapeHtml(COPY.save) + '</button>',
      '    </div>',
      '  </div>',
      '</section>'
    ].join('');

    document.body.appendChild(wrapper);
    return {
      root: wrapper,
      banner: wrapper.querySelector('.lynck-consent-banner'),
      backdrop: wrapper.querySelector('.lynck-consent-backdrop'),
      modal: wrapper.querySelector('.lynck-consent-modal'),
      analytics: wrapper.querySelector('[data-consent-analytics]'),
      marketing: wrapper.querySelector('[data-consent-marketing]')
    };
  }

  function bindUi() {
    ui.root.querySelector('[data-consent-accept]').addEventListener('click', function () {
      saveConsent({ analytics: true, marketing: true });
      closePreferences();
    });

    ui.root.querySelector('[data-consent-reject]').addEventListener('click', function () {
      saveConsent({ analytics: false, marketing: false });
      closePreferences();
    });

    ui.root.querySelectorAll('[data-consent-manage],[data-consent-manage-inline]').forEach(function (button) {
      button.addEventListener('click', openPreferences);
    });

    ui.root.querySelector('[data-consent-cancel]').addEventListener('click', function () {
      updateUi();
      closePreferences();
    });

    ui.root.querySelector('[data-consent-save]').addEventListener('click', function () {
      saveConsent({
        analytics: Boolean(ui.analytics.checked),
        marketing: Boolean(ui.marketing.checked)
      });
      closePreferences();
    });

    ui.backdrop.addEventListener('click', closePreferences);

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-open-cookie-settings]');
      if (!trigger) return;
      event.preventDefault();
      openPreferences();
    });

    [ui.analytics, ui.marketing].forEach(function (input) {
      input.addEventListener('change', syncToggleUi);
    });
  }

  function syncToggleUi() {
    ui.root.querySelectorAll('[data-switch-shell]').forEach(function (shell) {
      var input = shell.querySelector('input');
      shell.classList.toggle('is-on', Boolean(input && input.checked));
    });
  }

  function updateUi() {
    var hasChoice = Boolean(currentConsent);
    var analytics = Boolean(currentConsent && currentConsent.analytics);
    var marketing = Boolean(currentConsent && currentConsent.marketing);

    ui.analytics.checked = analytics;
    ui.marketing.checked = marketing;
    syncToggleUi();

    ui.banner.hidden = hasChoice;
  }

  function openPreferences() {
    ui.backdrop.hidden = false;
    ui.modal.hidden = false;
    syncToggleUi();
  }

  function closePreferences() {
    ui.backdrop.hidden = true;
    ui.modal.hidden = true;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
