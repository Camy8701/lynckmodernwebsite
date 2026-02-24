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

  try {
    var existing = safeParse(sessionStorage.getItem('lynck_attribution'));
    var merged = Object.assign({}, existing, payload);
    sessionStorage.setItem('lynck_attribution', JSON.stringify(merged));

    var cookieValue = encodeURIComponent(JSON.stringify(merged));
    if (cookieValue.length > 3800) {
      cookieValue = encodeURIComponent(JSON.stringify(payload));
    }
    document.cookie = 'lynck_attribution=' + cookieValue + '; Path=/; Max-Age=2592000; SameSite=Lax';
  } catch (err) {
    // Ignore storage failures.
  }

  var cleanQuery = url.searchParams.toString();
  var cleanUrl = url.pathname + (cleanQuery ? '?' + cleanQuery : '') + url.hash;

  try {
    window.history.replaceState(window.history.state, '', cleanUrl);
  } catch (err) {
    // Ignore history API failures.
  }
})();
