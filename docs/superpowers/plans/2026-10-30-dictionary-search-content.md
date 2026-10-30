# Dictionary Search Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Give Korean search visitors concrete, truthful dictionary search guidance.
**Architecture:** Edit one existing static HTML landing page, preserve layout/assets/links, update its sitemap date and record the experiment.
**Tech Stack:** Static HTML, JSON-LD, XML, local HTTP preview.
**Spec:** ../specs/2026-10-30-dictionary-search-content-design.md

## Global Constraints

Preserve assets, styles, store links and canonical URL. Use only verified search behavior. No publishing or scheduler creation in this change.

## Review Focus

Check small-screen line wrapping; search results must be selected rather than promising automatic entry navigation; Hebrew spelling input is not promised; all metadata descriptions agree with visible text; page-level and query-level GSC baselines are kept distinct.

### Task 1: Content improvement and experiment record

**Files:** `biblical-dict/index.html`, `sitemap.xml`, `docs/seo/2026-10-30-dictionary-search-content.md`.
**Interfaces:** Existing URL `/biblical-dict/`; existing store and service links. No new runtime interface.

- [x] Edit title, descriptions, introduction and add three search instructions with 사랑/H2617/G26.
- [x] Correct the Strong-number FAQ to describe choosing a result.
- [x] Update only the dictionary sitemap date; record hypothesis, baseline, limits and post-publication measurement procedure.
- [x] Validate JSON-LD, HTML structure, internal references, sitemap and diff; preview at desktop and mobile sizes.
- [x] Obtain independent review; fix material findings and commit the reviewed change.

Expected: readable static page, preserved download routes, valid structured data, no image changes, no unsupported claims. No mirrored-copy test suite for an editorial-only change.
