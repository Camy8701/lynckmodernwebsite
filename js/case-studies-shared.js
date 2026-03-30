import { applyMeta, bindSharedNavigation, getLang } from "./case-studies-common.js?v=20260330";

const lang = getLang();
const isDetailPage = window.location.pathname.endsWith("/case.html");

const contentModule = lang === "de"
  ? import("./case-studies-content-de.js?v=20260330")
  : import("./case-studies-content-en.js?v=20260330");

const runtimeModule = isDetailPage
  ? import("./case-studies-detail.js?v=20260330")
  : import("./case-studies-hub.js?v=20260330");

Promise.all([contentModule, runtimeModule])
  .then(([contentImport, runtimeImport]) => {
    const content = contentImport.default;
    applyMeta(content);
    bindSharedNavigation(lang, content);

    if (isDetailPage) {
      runtimeImport.initCaseStudiesDetail({ lang, content });
      return;
    }

    runtimeImport.initCaseStudiesHub({ lang, content });
  })
  .catch((error) => {
    console.error("Failed to initialize case studies", error);
  });
