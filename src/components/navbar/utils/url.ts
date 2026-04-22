export function getLangFromURL(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") ?? "vi";
}

export function setLangInURL(code: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", code);
  window.history.pushState({}, "", url.toString());
}
