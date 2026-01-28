# Changelog — kaadz.me Redesign

## Purpose
Transform kaadz.me into a polished, minimal "me page" that funnels technical and paid users to WatchLLM.

## Changes Planned

### STEP 0 — Snapshot & Setup
- [ ] Visit https://kaadz.me and save snapshot (FAILED - site offline)
- [x] Create CHANGELOG.md to document changes
- [x] Create feature branch `feature/kaadz-me-redesign`
- [ ] Create content snapshot from existing workspace files

### STEP 1 — Baseline Structure & Theme
- [ ] Verify Tailwind CSS setup (already present)
- [ ] Verify fonts: Inter + JetBrains Mono
- [ ] Set dark code-ish aesthetic: bg #0b1020, accent #7c5cff
- [ ] Ensure folder structure matches plan

### STEP 2 — Crawl & Extract Current Content
- [ ] Extract current hero text, links, images from workspace
- [ ] Document in `content/current_snapshot.md`

### STEP 3 — Replace Hero + Top Nav
- [ ] Implement new Hero.jsx with WatchLLM-focused copy
- [ ] Headline: "kaadz — I build tools that stop LLMs from breaking production."
- [ ] Subtitle: "Creator of WatchLLM — semantic caching, agent debugging, and enterprise self-hosting..."
- [ ] Primary CTA: "See WatchLLM" → https://watchllm.dev
- [ ] Secondary CTA: "1-minute LLM Checklist" → lead magnet section
- [ ] Add proper title and meta description

### STEP 4 — Standout Visual: Animated Background
- [ ] Create BackgroundCanvas.jsx
- [ ] Lightweight canvas animation: prompt → cache → model → alert
- [ ] Subtle, performant, reduced-motion respected
- [ ] Toggle to disable animation (top-right)
- [ ] Use requestAnimationFrame

### STEP 5 — WatchLLM Feature Card
- [ ] Create ProjectCard for WatchLLM
- [ ] Add "starring" badge
- [ ] One-line pitch with observability/caching/debugging focus
- [ ] Buttons: "Show me how" and "Request self-host trial"
- [ ] Add GitHub star count badge (with fallback)
- [ ] Add visual glyphs for caching/agent/observability

### STEP 6 — Interactive Micro-Demo
- [ ] Create DemoSandbox.jsx
- [ ] Single input: "Paste prompt" + run button
- [ ] Show normalized prompt (trim, unify quotes, remove PII, collapse whitespace)
- [ ] Show estimated token count (chars/4 heuristic)
- [ ] Show faux cost estimate based on tokens
- [ ] CTA: "Full debug & instrumentation → watchllm.dev/demo"
- [ ] Client-only, lightweight, polished

### STEP 7 — Lead Magnet + Email Capture
- [ ] Create email capture form
- [ ] Lead magnet: "LLM Incident Checklist — 1 page"
- [ ] Use Netlify Forms or local CSV fallback
- [ ] Single field: email
- [ ] Add double-opt-in note

### STEP 8 — SEO, OG, Analytics
- [ ] Create public/og-image.png (dark OG image with kaadz + WatchLLM)
- [ ] Add JSON-LD schema with person metadata
- [ ] Add Plausible analytics snippet
- [ ] Track events: watchllm clicks, demo runs, form submissions
- [ ] Add meta tags

### STEP 9 — Microcopy Polish
- [ ] Verify all exact copy snippets from requirements
- [ ] Maintain technical, concise, deadpan tone
- [ ] Add contact microcopy: "Want a private demo..."

### STEP 10 — Deploy Config & README
- [ ] Update README.md with deploy instructions
- [ ] Add preview script
- [ ] Create env.example for API keys

### STEP 11 — QA & Accessibility
- [ ] Run accessibility checks
- [ ] Fix alt text, color contrast, keyboard focus
- [ ] Ensure Lighthouse perf >= 80

### STEP 12 — Final Commit & PR
- [ ] Create PR from feature branch to main
- [ ] Include before/after notes
- [ ] Include screenshots
- [ ] List tracked events
- [ ] Document next steps
- [ ] Produce preview URL

## Notes
- Live site kaadz.me is currently offline/inaccessible
- Working from existing workspace React/Vite app
- Tailwind already configured
- Using existing components as base, will rebuild for WatchLLM focus
