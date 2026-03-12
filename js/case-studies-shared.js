import { applyMeta, bindSharedNavigation, getLang } from "./case-studies-common.js";

const lang = getLang();
const isDetailPage = window.location.pathname.endsWith("/case.html");

const contentModule = lang === "de"
  ? import("./case-studies-content-de.js")
  : import("./case-studies-content-en.js");

const runtimeModule = isDetailPage
  ? import("./case-studies-detail.js")
  : import("./case-studies-hub.js");

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
