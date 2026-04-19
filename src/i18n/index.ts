import vi from "./vi.json";
import en from "./en.json";
import { ContentSchema } from "./types";

export type Lang = "vi"; //| "en";

const resources: Record<Lang, ContentSchema> = {
  vi: vi as ContentSchema,
  //en: en as ContentSchema,
};
export function getLang(): Lang {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang") as Lang | null;

  if (urlLang === "vi" || urlLang === "en") {
    localStorage.setItem("lang", urlLang);
    return urlLang;
  }

  return "vi";
}
export function setLang(lang: Lang) {
  localStorage.setItem("lang", lang);
  window.location.reload();
}

export function getContent(lang: Lang): ContentSchema {
  return resources[lang];
}
