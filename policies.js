'use strict';
(() => {
  const products = [
    { id: 'selah', name: '셀라', en: 'Selah', es: 'Selah', pt: 'Selah', description: '예배 말씀 노트', descriptionEn: 'Sermon and worship notes', descriptionEs: 'Notas de sermones y culto', descriptionPt: 'Anotações de sermões e cultos', terms: '/selah/terms/', privacy: '/selah/privacy/', support: '/selah/support/', documentLanguages: ['ko', 'en', 'es', 'pt'] },
    { id: 'receipt-cam', name: 'Receipt Camera', en: 'Receipt Camera', es: 'Receipt Camera', pt: 'Receipt Camera', aliases: '영수증 카메라', description: '영수증으로 남기는 순간', descriptionEn: 'Moments on a printed receipt', descriptionEs: 'Momentos en un recibo impreso', descriptionPt: 'Momentos em um recibo impresso', terms: '/receipt-cam/terms/', privacy: '/receipt-cam/privacy/', support: '/receipt-cam/support/', documentLanguages: ['ko', 'en', 'ja', 'zh-Hans', 'zh-Hant', 'pt-PT', 'es'], languagePicker: true },
    { id: 'biblical-dict', name: '성경 원어 사전', en: 'Biblical Dictionary', es: 'Diccionario bíblico', pt: 'Dicionário bíblico', description: '히브리어·헬라어 원어 사전', descriptionEn: 'Hebrew and Greek Bible dictionary', descriptionEs: 'Diccionario bíblico de hebreo y griego', descriptionPt: 'Dicionário bíblico de hebraico e grego', privacy: '/biblical-dict/privacy/', support: '/biblical-dict/support/' },
    { id: 'space-goldrush', name: '우주 황금 모으기', en: 'Space Goldrush', es: 'Space Goldrush', pt: 'Space Goldrush', description: '토스 미니앱', descriptionEn: 'A mini app in Toss', descriptionEs: 'Una mini app en Toss', descriptionPt: 'Um miniapp no Toss', terms: '/space-goldrush/terms/' },
    { id: 'insta-dm', name: '인스타 DM 분석하기', en: 'Instagram DM Analysis', es: 'Análisis de mensajes de Instagram', pt: 'Análise de mensagens do Instagram', description: '토스 미니앱', descriptionEn: 'A mini app in Toss', descriptionEs: 'Una mini app en Toss', descriptionPt: 'Um miniapp no Toss', terms: '/insta-dm/terms/' },
    { id: 'gender-reveal', name: '온라인 젠더 리빌', en: 'Online Gender Reveal', es: 'Revelación de sexo en línea', pt: 'Chá revelação online', description: '토스 미니앱', descriptionEn: 'A mini app in Toss', descriptionEs: 'Una mini app en Toss', descriptionPt: 'Um miniapp no Toss', privacy: '/gender-reveal/privacy/' },
    { id: 'samhaengsi', name: '삼행시 백일장', en: 'Samhaengsi', es: 'Samhaengsi', pt: 'Samhaengsi', description: '삼행시 미니앱', descriptionEn: 'An acrostic poem mini app', descriptionEs: 'Una mini app de poemas acrósticos', descriptionPt: 'Um miniapp de poemas acrósticos', terms: '/samhaengsi/terms/', privacy: '/samhaengsi/privacy/' },
    { id: 'babchingu', name: '밥친구', en: 'Babchingu / Slow Bite', es: 'Babchingu / Slow Bite', pt: 'Babchingu / Slow Bite', description: '서비스 문서', descriptionEn: 'Product documentation', descriptionEs: 'Documentación del producto', descriptionPt: 'Documentação do produto', terms: '/babchingu/terms/', privacy: '/babchingu/privacy/', support: '/babchingu/support/', documentLanguages: ['ko', 'en', 'ja', 'zh-Hans', 'zh-Hant'], languagesByType: { support: ['ko', 'en'] }, languagePicker: true },
    { id: 'til-it-melts', name: 'til it melts', en: 'til it melts', es: 'til it melts', pt: 'til it melts', aliases: 'Focussy', description: '서비스 문서', descriptionEn: 'Product documentation', descriptionEs: 'Documentación del producto', descriptionPt: 'Documentação do produto', privacy: '/til-it-melts/privacy/', support: '/til-it-melts/support/', documentLanguages: ['ko', 'en'], languageQuery: true }
  ];
  const translations = {
    ko: { terms: '이용약관', privacy: '개인정보 처리방침', support: '도움말', title: '약관 및 정책', loading: '문서를 불러오고 있습니다.', loadError: '문서를 불러오지 못했습니다. 아래 링크에서 원문을 확인해 주세요.', original: '원문 보기', missing: '별도 문서 없음', policyContact: '정책에 관한 문의', supportContact: '서비스에 관한 문의', available: '제공 언어', selectOriginal: '원문에서 한국어를 선택하세요.', selectTermsPrivacy: '약관·개인정보: 원문에서 한국어를 선택하세요.', languages: { ko: '한국어', en: '영어', es: '스페인어', pt: '포르투갈어(브라질)', 'pt-PT': '포르투갈어(포르투갈)', ja: '일본어', 'zh-Hans': '중국어 간체', 'zh-Hant': '중국어 번체' } },
    en: { terms: 'Terms of service', privacy: 'Privacy policy', support: 'Support', title: 'Terms & policies', loading: 'Loading document…', loadError: 'The document could not be loaded. You can read the original using the link below.', original: 'View original', missing: 'No separate document available', policyContact: 'Policy questions', supportContact: 'Product support', available: 'Available in', selectOriginal: 'Select English on the original page.', selectTermsPrivacy: 'Terms & privacy: select English on the original page.', languages: { ko: 'Korean', en: 'English', es: 'Spanish', pt: 'Portuguese (Brazil)', 'pt-PT': 'Portuguese (Portugal)', ja: 'Japanese', 'zh-Hans': 'Simplified Chinese', 'zh-Hant': 'Traditional Chinese' } },
    es: { terms: 'Términos de servicio', privacy: 'Política de privacidad', support: 'Ayuda', title: 'Términos y políticas', loading: 'Cargando el documento…', loadError: 'No se pudo cargar el documento. Puedes consultar el original en el siguiente enlace.', original: 'Ver original', missing: 'No hay un documento independiente', policyContact: 'Consultas sobre las políticas', supportContact: 'Ayuda con el producto', available: 'Disponible en', selectOriginal: 'Selecciona Español en la página original.', selectTermsPrivacy: 'Términos y privacidad: selecciona Español en la página original.', languages: { ko: 'coreano', en: 'inglés', es: 'español', pt: 'portugués de Brasil', 'pt-PT': 'portugués de Portugal', ja: 'japonés', 'zh-Hans': 'chino simplificado', 'zh-Hant': 'chino tradicional' } },
    pt: { terms: 'Termos de serviço', privacy: 'Política de privacidade', support: 'Suporte', title: 'Termos e políticas', loading: 'Carregando o documento…', loadError: 'Não foi possível carregar o documento. Você pode consultar o original no link abaixo.', original: 'Ver original', missing: 'Não há um documento separado', policyContact: 'Dúvidas sobre as políticas', supportContact: 'Suporte do produto', available: 'Disponível em', selectOriginal: 'Selecione Português (PT) na página original.', selectTermsPrivacy: 'Termos e privacidade: selecione Português na página original.', languages: { ko: 'coreano', en: 'inglês', es: 'espanhol', pt: 'português do Brasil', 'pt-PT': 'português de Portugal', ja: 'japonês', 'zh-Hans': 'chinês simplificado', 'zh-Hant': 'chinês tradicional' } }
  };
  const keys = ['terms', 'privacy', 'support'];
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const type = params.get('type');
  const isReader = product === 'selah' && keys.includes(type);
  const rows = document.getElementById('policy-rows');
  const search = document.getElementById('product-search');
  let requestId = 0;
  let activeController;
  const normalizeLanguage = value => String(value || '').toLowerCase().split('-')[0];
  const language = () => { const current = normalizeLanguage(window.SiteLocale?.language); return Object.hasOwn(translations, current) ? current : 'ko'; };
  const words = () => translations[language()];
  const nameFor = item => language() === 'ko' ? item.name : item[language()];
  const documentLanguages = (item, key) => item.languagesByType?.[key] || item.documentLanguages || ['ko'];
  const supportsLanguage = (item, key, lang) => documentLanguages(item, key).some(value => normalizeLanguage(value) === lang);

  function documentHref(item, key, lang = language()) {
    if (item.id === 'selah') return `policies.html?product=selah&type=${key}`;
    if (item.languageQuery) return `${item[key]}?lang=${supportsLanguage(item, key, lang) ? lang : 'en'}`;
    return item[key];
  }
  function renderRows(query = search.value) {
    const lang = language(); const t = words();
    const filtered = products.filter(item => `${item.name} ${item.en} ${item.es} ${item.pt} ${item.aliases || ''}`.toLowerCase().includes(query.trim().toLowerCase()));
    rows.replaceChildren();
    filtered.forEach(item => {
      const row = document.createElement('div'); row.className = 'policy-row'; row.setAttribute('role', 'row');
      const nameCell = document.createElement('div'); nameCell.className = 'product-cell'; nameCell.setAttribute('role', 'cell');
      const name = document.createElement('strong'); name.textContent = nameFor(item);
      const desc = document.createElement('small'); desc.textContent = lang === 'ko' ? item.description : item[{ en: 'descriptionEn', es: 'descriptionEs', pt: 'descriptionPt' }[lang]];
      nameCell.append(name, desc);
      if (item.languagePicker && supportsLanguage(item, 'terms', lang)) {
        const note = document.createElement('small'); note.className = 'language-note'; note.textContent = item.id === 'babchingu' ? t.selectTermsPrivacy : t.selectOriginal; nameCell.append(note);
      }
      row.append(nameCell);
      keys.forEach(key => {
        const cell = document.createElement('div'); cell.className = 'document-cell'; cell.setAttribute('role', 'cell');
        if (item[key]) {
          const link = document.createElement('a'); link.href = documentHref(item, key); link.textContent = t[key]; link.setAttribute('aria-label', `${nameFor(item)}: ${t[key]}`); cell.append(link);
          if (!supportsLanguage(item, key, lang)) {
            const available = documentLanguages(item, key);
            const note = document.createElement('small'); note.className = 'language-note'; note.textContent = `${t.available}: ${available.map(value => t.languages[value]).join(', ')}`; cell.append(note);
            if (item.languageQuery || available.length === 1) link.setAttribute('hreflang', item.languageQuery ? 'en' : available[0]);
          }
        } else {
          const absent = document.createElement('span'); absent.className = 'unavailable'; absent.textContent = '—'; absent.setAttribute('aria-label', `${t[key]}: ${t.missing}`); cell.append(absent);
        }
        row.append(cell);
      });
      rows.append(row);
    });
    document.getElementById('result-count').textContent = lang === 'ko' ? `${filtered.length}개 서비스` : `${filtered.length} ${lang === 'es' ? (filtered.length === 1 ? 'producto' : 'productos') : lang === 'pt' ? (filtered.length === 1 ? 'produto' : 'produtos') : (filtered.length === 1 ? 'product' : 'products')}`;
    document.getElementById('no-results').hidden = filtered.length !== 0;
    if (!isReader) document.title = `${t.title} | Studio HEVV`;
  }

  async function loadDocument(key) {
    const lang = language(); const t = translations[lang]; const currentRequest = ++requestId;
    activeController?.abort(); activeController = new AbortController();
    const url = lang === 'ko' ? `/selah/${key}/?lang=ko` : `/selah/${lang === 'pt' ? 'pt-br' : lang}/${key}/`;
    const item = products[0];
    const target = document.getElementById('document-content');
    const nav = document.getElementById('document-nav');
    const toc = document.getElementById('toc');
    document.getElementById('directory').hidden = true;
    document.getElementById('reader').hidden = false;
    document.title = `${t[key]} · ${nameFor(item)} | Studio HEVV`;
    document.getElementById('reader-title').textContent = t[key];
    document.getElementById('reader-language').textContent = { ko: '셀라 · 한국어', en: 'Selah · English', es: 'Selah · Español', pt: 'Selah · Português (Brasil)' }[lang];
    document.getElementById('source-link').href = url;
    document.getElementById('source-link').textContent = t.original;
    document.getElementById('contact-label').textContent = key === 'support' ? t.supportContact : t.policyContact;
    const contact = document.querySelector('.document-end a');
    const email = key === 'support' ? 'feedback@studio-hevv.com' : 'privacy@studio-hevv.com';
    contact.href = `mailto:${email}`; contact.textContent = email;
    nav.replaceChildren(); toc.replaceChildren();
    document.getElementById('toc-wrap').hidden = true;
    target.setAttribute('aria-busy', 'true'); target.lang = lang === 'pt' ? 'pt-BR' : lang;
    const loading = document.createElement('p'); loading.setAttribute('role', 'status'); loading.textContent = t.loading; target.replaceChildren(loading);
    keys.forEach(navKey => {
      const a = document.createElement('a'); a.href = documentHref(item, navKey, lang); a.textContent = t[navKey];
      if (navKey === key) a.setAttribute('aria-current', 'page'); nav.append(a);
    });
    try {
      const response = await fetch(url, { signal: activeController.signal });
      if (!response.ok) throw new Error('Document unavailable');
      const body = await response.text();
      if (currentRequest !== requestId) return;
      const parsed = new DOMParser().parseFromString(body, 'text/html');
      const source = parsed.querySelector('main');
      if (!source) throw new Error('Document body unavailable');
      source.querySelectorAll('script,style,iframe,object,embed,footer,.back').forEach(el => el.remove());
      const originalTitle = source.querySelector('h1');
      if (originalTitle) { document.getElementById('reader-title').textContent = originalTitle.textContent; originalTitle.remove(); }
      source.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => { if (/^on/i.test(attr.name) || attr.name === 'style') el.removeAttribute(attr.name); });
        if (el.tagName === 'A') {
          const href = el.getAttribute('href');
          if (href && /^javascript:/i.test(href)) el.removeAttribute('href');
          else if (href && !href.startsWith('#')) el.href = new URL(href, new URL(url, location.origin)).href;
          if (el.target === '_blank') el.rel = 'noopener noreferrer';
          const sourceLanguage = el.getAttribute('hreflang');
          if (el.closest('.lang-switch') && Object.hasOwn(translations, normalizeLanguage(sourceLanguage))) {
            // Keep a valid original URL for modifier clicks; ordinary clicks keep the document reader.
            el.addEventListener('click', event => {
              if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault(); window.SiteLocale.setLanguage(sourceLanguage);
            });
          }
        }
      });
      target.replaceChildren(...source.childNodes);
      target.querySelectorAll('h2').forEach((heading, index) => {
        heading.id = `section-${index + 1}`;
        const link = document.createElement('a'); link.href = `#${heading.id}`; link.textContent = heading.textContent; toc.append(link);
      });
      document.getElementById('toc-wrap').hidden = !toc.children.length;
    } catch (error) {
      if (currentRequest !== requestId || error.name === 'AbortError') return;
      const p = document.createElement('p'); p.className = 'load-error'; p.textContent = t.loadError;
      const a = document.createElement('a'); a.href = url; a.textContent = `${t[key]} — ${t.original}`;
      target.replaceChildren(p, a); document.getElementById('toc-wrap').hidden = true;
    } finally {
      if (currentRequest === requestId) target.setAttribute('aria-busy', 'false');
    }
  }
  search.addEventListener('input', () => renderRows());
  window.addEventListener('site:languagechange', () => { renderRows(); if (isReader) loadDocument(type); });
  renderRows();
  if (isReader) loadDocument(type);
})();
