# kaadz.me — WatchLLM Landing Page

A polished, minimal "me page" that funnels technical and paid users to WatchLLM.

## Overview

This site showcases WatchLLM — an infra-first LLM tooling platform featuring:
- Semantic caching
- Agent debugging
- Enterprise self-hosting
- Prompt normalization
- Observability

## Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter, Space Grotesk, JetBrains Mono
- **Analytics:** Plausible
- **Forms:** Netlify Forms

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deploy

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Deploy!

### Vercel

1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Enable Netlify Forms in site settings
5. Deploy!

## Environment Variables

See `.env.example` for available configuration options.

**Optional:**
- `VITE_GITHUB_TOKEN` - GitHub personal access token (increases API rate limit for star counts)
- `VITE_MAILERLITE_API_KEY` - If switching from Netlify Forms to MailerLite
- `VITE_CONVERTKIT_API_KEY` - If switching from Netlify Forms to ConvertKit

**Note:** Plausible analytics and Netlify Forms work out of the box with no configuration required.

## Features

### 🎨 Animated Background
A subtle canvas animation visualizing the LLM pipeline: prompt → cache → model → alert. 
Toggle on/off with the button in the top-right corner.

### 🚀 Interactive Demo
Try prompt normalization in real-time:
- Paste any prompt
- See normalized output
- View estimated token savings
- Get cost calculations

### 📧 Lead Magnet
"LLM Incident Checklist" — one-page guide for safe LLM deployment.
Email capture uses Netlify Forms with zero configuration.

### 📊 Analytics Tracking

Events tracked:
- `CTA Click` - Primary/secondary CTA clicks
- `WatchLLM CTA` - Feature card button clicks  
- `Demo Run` - Interactive demo usage
- `Email Capture` - Newsletter signups

View analytics at: `https://plausible.io/kaadz.me` (requires Plausible account)

## Project Structure

```
src/
├── components/
│   ├── NewHero.jsx           # Hero section with main CTAs
│   ├── BackgroundCanvas.jsx  # Animated pipeline visualization
│   ├── WatchLLMCard.jsx      # Feature card with GitHub stars
│   ├── DemoSandbox.jsx       # Interactive prompt normalization demo
│   ├── EmailCapture.jsx      # Lead magnet + email form
│   └── Footer.jsx            # Footer with social links
├── App.jsx                   # Main app component
├── index.css                 # Global styles + Tailwind
└── main.jsx                  # React entry point
```

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast WCAG AA compliant
- Focus indicators on all interactive elements

## Performance

- Lighthouse score target: 80+
- Lazy-loaded animations
- Optimized canvas rendering with `requestAnimationFrame`
- Minimal dependencies
- Code splitting enabled

## License

© 2026 kaadz. All rights reserved.

## Support

- Email: kiwi092020@gmail.com
- GitHub: [@kaadipranav](https://github.com/kaadipranav)
- X/Twitter: [@kaad_zz](https://x.com/kaad_zz)
