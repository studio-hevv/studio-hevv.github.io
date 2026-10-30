# Product SEO Implementation Plan

**Goal:** Implement the user-approved SEO recommendations, excluding Search Console.
**Architecture:** Buildless, language-specific HTML on the existing GitHub Pages site; keep existing entry URLs and visual design.
**Tech Stack:** HTML, CSS, vanilla JavaScript, Python standard-library validation.
**Spec:** `docs/superpowers/specs/2026-10-30-product-seo-design.md`

## Global constraints

- Worktree: `/Users/minchul/.codex/worktrees/product-seo/studio-hevv-website`; do not touch the original checkout's preview or browser artifacts.
- Three non-overlapping implementation owners: home locales, Receipt Roll locales, parent-owned Selah/Biblical Dictionary/sitemap/integration.
- Preserve policy content and existing paths. No fictional ratings, hard-coded paid regional prices, framework migration, or Search Console changes.

## Review focus

- A saved language or English browser must not change a directly requested landing URL's language.
- Every language selector, asset, store CTA, and reciprocal hreflang must resolve, including nested language paths.
- Landing copy and JSON-LD must agree about app identity, supported platforms and paid/free access.
- No dependency on JavaScript for localized content or search metadata.
- Mobile layout, browser back navigation, and shared policy language controls must still work.

## Tasks

- [x] 1. Write and run failing static-site contract checks for language URL integrity, camera installation, accurate schema, and execute Selah's redirect script against English browser input.
- [x] 2. Home worker: own `index.html`, `locale.js`, `en/index.html`, `es/index.html`, `pt-br/index.html`. Publish static home translations, localized app links, reciprocal language links and stable navigation. Preserve shared policy-page behavior. Run home checks.
- [x] 3. Camera worker: own `receipt-cam/index.html` and six new language landing files. Split existing translations into stable pages, correct identity/store IDs/category/platform schema, and add translated practical guidance. Run camera checks.
- [x] 4. Parent: own Selah landing files, `biblical-dict/index.html`, sitemap, tests and documentation. Remove automatic redirects, correct schema and price FAQ, add guides, fix old camera IDs elsewhere, update sitemap. Run full checks.
- [x] 5. Run representative desktop/mobile browser checks, inspect the whole diff and request an independent reviewer. Resolve actionable findings and rerun affected checks.
- [ ] 6. Commit and publish the validated change to the existing main-branch Pages site; verify build status, live HTML/resources, and representative browser paths. Record final result and Search Console deferral.

## Validation commands

`python3 -m unittest discover -s tests -v` must report zero failures. `git diff --check` must pass. Static preview runs with `python3 -m http.server 8765 --bind 127.0.0.1`. Browser QA uses the available CUA browser; production verification compares deployed landing files to the checked commit and checks HTTP status codes.
