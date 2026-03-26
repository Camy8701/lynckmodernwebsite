import { applyMeta, getLang } from "./case-studies-common.js";
import { initWebsiteSamplesHub } from "./website-samples-hub.js";

const lang = getLang();

const contentModule = lang === "de"
  ? import("./website-samples-content-de.js")
  : import("./website-samples-content-en.js");

contentModule
  .then(({ default: content }) => {
    applyMeta(content);
    initWebsiteSamplesHub({ lang, content });
  })
  .catch((error) => {
    console.error("Failed to initialize website samples", error);
  });
