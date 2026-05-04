(function () {
  var ATTR_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'utm_source_platform',
    'utm_creative_format',
    'utm_marketing_tactic',
    'fbclid',
    'gclid',
    'dclid',
    'msclkid',
    'ttclid',
    'twclid',
    '_hsenc',
    '_hsmi',
    'mc_cid',
    'mc_eid'
  ];

  function safeParse(json) {
    try {
      return JSON.parse(json);
    } catch (err) {
      return {};
    }
  }

  function getPendingPayload() {
    if (window.__lynckAttributionPending && typeof window.__lynckAttributionPending === 'object') {
      return window.__lynckAttributionPending;
    }

    return null;
  }

  function persistPayload(payload) {
    if (!payload) return false;

    try {
      var existing = safeParse(sessionStorage.getItem('lynck_attribution'));
      var merged = Object.assign({}, existing, payload);
      sessionStorage.setItem('lynck_attribution', JSON.stringify(merged));

      var cookieValue = encodeURIComponent(JSON.stringify(merged));
      if (cookieValue.length > 3800) {
        cookieValue = encodeURIComponent(JSON.stringify(payload));
      }

      document.cookie = 'lynck_attribution=' + cookieValue + '; Path=/; Max-Age=2592000; SameSite=Lax';
      window.__lynckAttributionPending = null;
      return true;
    } catch (err) {
      return false;
    }
  }

  function clearPersistedAttribution() {
    try {
      sessionStorage.removeItem('lynck_attribution');
    } catch (err) {
      // Ignore storage failures.
    }

    document.cookie = 'lynck_attribution=; Path=/; Max-Age=0; SameSite=Lax';
  }

  function commitPendingIfAllowed() {
    if (!window.LynckConsent || typeof window.LynckConsent.hasConsent !== 'function') {
      return false;
    }

    if (!window.LynckConsent.hasConsent('marketing')) {
      return false;
    }

    return persistPayload(getPendingPayload());
  }

  window.LynckAttribution = window.LynckAttribution || {
    commitPending: commitPendingIfAllowed,
    clear: clearPersistedAttribution,
    getPending: getPendingPayload
  };

  window.addEventListener('lynck:consent-updated', function () {
    if (window.LynckConsent && window.LynckConsent.hasConsent('marketing')) {
      commitPendingIfAllowed();
      return;
    }

    clearPersistedAttribution();
  });

  var WHATSAPP_NUMBER = '491771878363';

  function normalizeWhatsAppHref(href) {
    if (!href || href.indexOf('whatsapp') === -1 && href.indexOf('wa.me') === -1) {
      return href;
    }

    try {
      var parsed = new URL(href, window.location.href);
      var host = parsed.hostname.toLowerCase();
      var digits = '';

      if (host === 'api.whatsapp.com' && parsed.pathname.indexOf('/send') === 0) {
        digits = (parsed.searchParams.get('phone') || '').replace(/\D/g, '');
        if (digits === WHATSAPP_NUMBER) {
          parsed.searchParams.set('phone', WHATSAPP_NUMBER);
          return parsed.toString();
        }
      }

      if (host === 'wa.me') {
        digits = parsed.pathname.replace(/\D/g, '');
        if (digits === WHATSAPP_NUMBER) {
          parsed.pathname = '/' + WHATSAPP_NUMBER;
          return parsed.toString();
        }
      }
    } catch (err) {
      // Ignore malformed URLs from third-party widgets.
    }

    return href;
  }

  function normalizeWhatsAppLink(link) {
    if (!link || !link.getAttribute) return false;

    var href = link.getAttribute('href');
    var normalized = normalizeWhatsAppHref(href);
    if (normalized !== href) {
      link.setAttribute('href', normalized);
      return true;
    }

    return false;
  }

  function normalizeWhatsAppLinks(root) {
    if (!root || !root.querySelectorAll) return;

    if (root.tagName === 'A') {
      normalizeWhatsAppLink(root);
    }

    root.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]').forEach(normalizeWhatsAppLink);
  }

  function findClosestLink(target) {
    while (target && target !== document) {
      if (target.tagName === 'A') return target;
      target = target.parentNode;
    }

    return null;
  }

  function installWhatsAppLinkFix() {
    normalizeWhatsAppLinks(document);

    document.addEventListener('click', function (event) {
      normalizeWhatsAppLink(findClosestLink(event.target));
    }, true);

    if (!window.MutationObserver || !document.body) return;

    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(normalizeWhatsAppLinks);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installWhatsAppLinkFix, { once: true });
  } else {
    installWhatsAppLinkFix();
  }

  var url;
  try {
    url = new URL(window.location.href);
  } catch (err) {
    return;
  }

  var captured = {};
  var hasAttribution = false;

  ATTR_KEYS.forEach(function (key) {
    if (!url.searchParams.has(key)) return;
    captured[key] = url.searchParams.get(key);
    url.searchParams.delete(key);
    hasAttribution = true;
  });

  if (!hasAttribution) return;

  var payload = {
    ts: new Date().toISOString(),
    path: window.location.pathname
  };

  Object.keys(captured).forEach(function (key) {
    payload[key] = captured[key];
  });
  window.__lynckAttributionPending = payload;
  commitPendingIfAllowed();

  var cleanQuery = url.searchParams.toString();
  var cleanUrl = url.pathname + (cleanQuery ? '?' + cleanQuery : '') + url.hash;

  try {
    window.history.replaceState(window.history.state, '', cleanUrl);
  } catch (err) {
    // Ignore history API failures.
  }
})();
