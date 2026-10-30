# Product search discoverability

The user approved all recommendations from the SEO review, with Search Console deferred. Keep GitHub Pages and the current visual design. Improve discovery and installation for Selah, Receipt Roll, and the Biblical Dictionary.

## Approach

Use the existing buildless HTML site. Each language has a stable, directly linked URL, static translated title/body/description, a self canonical, and reciprocal hreflang. This avoids adding a framework or depending on browser language for indexing. Selah keeps its existing URLs but stops automatic language redirects. Home uses `/`, `/en/`, `/es/`, `/pt-br/`; Receipt Roll uses `/receipt-cam/` (English), plus `/receipt-cam/ko/`, `/ja/`, `/zh-hans/`, `/zh-hant/`, `/pt-pt/`, `/es/` under that prefix. Preserve old entry URLs and policy destinations. Language choice navigates through ordinary links; stored preferences must not replace the language of a directly requested landing URL.

## Content and facts

- Name the camera Receipt Roll, with Receipt Camera retained once as the former website name. Correct every published camera App Store link to id6793950109.
- Correct the Biblical Dictionary's inaccurate free FAQ. State that it is paid and refer to stores for current regional prices. Use ReferenceApplication for its category and MultimediaApplication for the camera, matching Google's supported vocabulary.
- Add both platform download/install URLs and accurate store offers. Do not invent reviews or promise rich results; omit ratings unless separately maintained and visibly sourced. Avoid hard-coding changing regional prices for paid apps. Selah can state a free download, with its existing paid-use limit explained visibly.
- Add concise, app-specific usage guidance in the landing content: sermon notes, receipt photos and saving, Strong's-number lookup and verse exploration. Translate guidance for every published locale. Do not introduce unsupported features or physical printer claims.
- Refresh sitemap modification dates for genuinely changed landing URLs and include all locale URLs. Search Console access, submission, and indexing confirmation remain pending.

## Acceptance

All language URLs work without JavaScript, use stable static metadata, and have working reciprocal language links and local assets. Main install buttons resolve to the correct applications. No automatic language redirect from Selah; localized home language selection navigates to stable URLs. Structured data agrees with visible copy. Verify static integrity, browser behavior and small-screen rendering, independent review, then publish through the existing main-branch GitHub Pages deployment and verify live artifacts.
