import { applyMeta, getLang } from "./case-studies-common.js?v=20260330";
import { initWebsiteSamplesHub } from "./website-samples-hub.js?v=20260330";

const lang = getLang();

const contentModule = lang === "de"
  ? import("./website-samples-content-de.js?v=20260330")
  : import("./website-samples-content-en.js?v=20260330");

contentModule
  .then(({ default: content }) => {
    applyMeta(content);
    initWebsiteSamplesHub({ lang, content });
  })
  .catch((error) => {
    console.error("Failed to initialize website samples", error);
  });
