'use strict';
(() => {
  const supported = new Set(['ko', 'en', 'es', 'pt']);
  const storageKey = 'studio-hevv-language';
  const normalize = value => String(value || '').toLowerCase().split(/[-_]/)[0];
  let saved;
  try { saved = localStorage.getItem(storageKey); } catch (_) { /* Browser storage is optional. */ }
  const preferences = Array.isArray(navigator.languages) && navigator.languages.length ? navigator.languages : [navigator.language];
  const savedLanguage = normalize(saved);
  const pageLanguage = normalize(document.documentElement.getAttribute('data-page-language'));
  const fixedLanguage = supported.has(pageLanguage);
  const languageRoutes = { ko: '/', en: '/en/', es: '/es/', pt: '/pt-br/' };
  let language = fixedLanguage ? pageLanguage : supported.has(savedLanguage) ? savedLanguage : preferences.map(normalize).find(value => supported.has(value)) || 'ko';
  const updateDocumentLanguage = () => { document.documentElement.lang = language === 'pt' ? 'pt-BR' : language; };
  updateDocumentLanguage();
  const originals = new WeakMap();
  const attributes = ['aria-label', 'placeholder', 'alt', 'title', 'content'];
  const translatedLanguages = [...supported].filter(value => value !== 'ko');
  const selector = translatedLanguages.flatMap(code => [`[data-${code}]`, ...attributes.map(attribute => `[data-${code}-${attribute}]`)]).join(',');
  function translate() {
    if (fixedLanguage) {
      document.querySelectorAll('[data-language-select]').forEach(select => { select.value = language; });
      return;
    }
    document.querySelectorAll(selector).forEach(element => {
      if (!originals.has(element)) {
        originals.set(element, {
          text: element.textContent,
          attributes: Object.fromEntries(attributes.map(attribute => [attribute, element.getAttribute(attribute)]))
        });
      }
      const original = originals.get(element);
      if (translatedLanguages.some(code => element.hasAttribute(`data-${code}`))) {
        element.textContent = language === 'ko' ? original.text : element.getAttribute(`data-${language}`) ?? original.text;
      }
      attributes.forEach(attribute => {
        if (!translatedLanguages.some(code => element.hasAttribute(`data-${code}-${attribute}`))) return;
        const value = language === 'ko' ? original.attributes[attribute] : element.getAttribute(`data-${language}-${attribute}`) ?? original.attributes[attribute];
        if (value === null) element.removeAttribute(attribute);
        else element.setAttribute(attribute, value);
      });
    });
    document.querySelectorAll('[data-language-select]').forEach(select => { select.value = language; });
  }
  function setLanguage(next) {
    next = normalize(next);
    if (!supported.has(next)) return;
    const changed = language !== next;
    if (fixedLanguage) {
      try { localStorage.setItem(storageKey, next); } catch (_) { /* Navigation does not require storage. */ }
      if (changed) window.location.assign(languageRoutes[next]);
      return;
    }
    language = next;
    updateDocumentLanguage();
    try { localStorage.setItem(storageKey, language); } catch (_) { /* Selection still works without persistence. */ }
    translate();
    if (changed) window.dispatchEvent(new CustomEvent('site:languagechange', { detail: { language } }));
  }
  window.SiteLocale = Object.freeze({ get language() { return language; }, setLanguage });
  function initialize() {
    if (fixedLanguage) {
      try { localStorage.setItem(storageKey, language); } catch (_) { /* Explicit page language still works without storage. */ }
    }
    translate();
    document.querySelectorAll('[data-language-select]').forEach(select => {
      select.addEventListener('change', event => setLanguage(event.target.value));
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
