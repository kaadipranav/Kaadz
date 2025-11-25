# CONTEXT.md - Kaadz Personal Website

## Project Overview
Build a flashy, cyberpunk-themed personal landing page for kaadz - a solo app developer and founder of AuthorStack, BookHunt, and other AI-powered applications. The site replaces Linktree with a custom, visually stunning experience that showcases personality and technical prowess.

## Brand Identity
- **Username**: kaadz (@kaad__zz)
- **Visual Theme**: Cyberpunk hacker aesthetic with neon green (#00ff41 primary, darker greens for accents)
- **Personality**: TypeScript demon, AI-first builder, solo founder with 10M+ exit potential
- **Avatar**: Anonymous/Guy Fawkes mask in neon green
- **Vibe**: Matrix meets modern web, mysterious but accessible, technical but artistic

## Tech Stack
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (for background effects)
- **Deployment**: Vercel
- **Domain**: .me domain (provided by user)

## Core Features & Design Elements

### 1. Animated Background
- **Primary Option**: Matrix-style falling code/characters in green
- **Alternative**: Cyberpunk grid with pulsing nodes
- **Effect**: Subtle, not overwhelming - should enhance, not distract
- **Performance**: Use RequestAnimationFrame, optimize for 60fps

### 2. Hero Section
```
[Animated Anonymous Mask - subtle glow/pulse]
[KAADZ - with glitch text effect]
[Bio with typing animation]
solo founder · AuthorStack, BookHunt & 7 more
apps shipped with AI · typescript demon @kaad__zz
[Social Icons - Instagram, X/Twitter]
```

### 3. Link Buttons (Priority Order)
1. Instagram
2. Personal Website (if exists, otherwise omit)
3. X/Twitter
4. (Space for future links: GitHub, LinkedIn, etc.)

**Button Design**:
- Rounded rectangles with neon green borders
- Transparent background with green glow on hover
- Text: White/light green
- Hover effect: Expand slightly, increase glow, maybe scan-line effect
- Click effect: Ripple animation

### 4. Special Effects
- **Mouse tracking**: Subtle particle trail or glow effect following cursor
- **Scroll animations**: Fade in elements as they come into view
- **Glitch effects**: Occasional glitch on title text (not annoying, just 1-2 times on load)
- **Scan lines**: Subtle CRT monitor effect overlay (very light)
- **Glow effects**: Neon green glows on interactive elements

### 5. Typography
- **Headings**: Monospace or cyberpunk-style font (e.g., "Space Mono", "JetBrains Mono", "Orbitron")
- **Body**: Clean sans-serif for readability
- **Colors**: White/light gray text on dark background

### 6. Color Palette
```css
Primary Green: #00ff41 (Matrix green)
Dark Green: #003b00
Background: #0a0a0a (near black)
Secondary BG: #111111
Text Primary: #ffffff
Text Secondary: #b0b0b0
Accent: #00ff41 with opacity variations
```

## File Structure
```
kaadz-personal-site/
├── public/
│   ├── avatar.png (or SVG of mask)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Background3D.jsx (Three.js background)
│   │   ├── Hero.jsx
│   │   ├── LinkButton.jsx
│   │   ├── SocialIcons.jsx
│   │   └── ParticleEffect.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Content Data
```javascript
const profile = {
  name: "kaadz",
  bio: [
    "solo founder · AuthorStack, BookHunt & 7 more",
    "apps shipped with AI · typescript demon @kaad__zz"
  ],
  socials: {
    instagram: "https://instagram.com/kaad__zz",
    twitter: "https://twitter.com/kaad__zz"
  },
  links: [
    {
      title: "Instagram",
      url: "https://instagram.com/kaad__zz",
      icon: "instagram"
    },
    {
      title: "X",
      url: "https://twitter.com/kaad__zz", 
      icon: "x"
    }
    // Add more as needed
  ]
}
```

## Animation Specifications

### On Page Load
1. Background fades in (0.5s)
2. Mask appears with glow effect (1s delay)
3. Name glitches in (1.2s delay)
4. Bio types out character by character (1.5s delay)
5. Social icons fade in (2s delay)
6. Buttons slide up one by one with stagger (2.2s delay, 0.1s stagger)

### Interactive Animations
- **Button Hover**: Scale 1.05, increase glow, duration 0.3s
- **Button Click**: Scale 0.95, ripple effect
- **Mask**: Subtle pulse (2s loop, subtle scale 1.0 to 1.02)
- **Glitch**: Random small position shifts on title every 10-15s

## Performance Targets
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- Mobile-friendly and responsive
- Smooth 60fps animations

## Responsive Design
- **Desktop (1024px+)**: Full effects, large buttons
- **Tablet (768px-1023px)**: Simplified 3D effects, medium buttons
- **Mobile (<768px)**: Minimal 3D (or static gradient), stacked layout, touch-optimized buttons

## Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari & Chrome

## Dependencies to Install
```bash
npm create vite@latest kaadz-site -- --template react
cd kaadz-site
npm install
npm install three @react-three/fiber @react-three/drei
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react  # for icons
```

## Key Implementation Notes

1. **Three.js Background**: Keep it lightweight - use instancing for particles/code rain
2. **Framer Motion**: Use `motion` components for all animations
3. **Icons**: Use lucide-react or custom SVGs for social icons
4. **Performance**: Lazy load Three.js components, use React.memo where needed
5. **SEO**: Add meta tags, Open Graph tags for social sharing
6. **Accessibility**: Ensure buttons are keyboard navigable, proper ARIA labels

## Design Inspirations
- The Matrix (movie) UI aesthetic
- Cyberpunk 2077 menu systems
- Modern hacker/terminal interfaces
- Neon noir aesthetics
- Retro-futuristic design

## Success Criteria
✅ Loads fast (<3s interactive)
✅ Looks significantly better than Linktree Pro
✅ Reflects kaadz's personality and brand
✅ All links functional
✅ Mobile responsive
✅ Smooth animations at 60fps
✅ Memorable first impression

## Deployment Steps
1. Build: `npm run build`
2. Test production build: `npm run preview`
3. Push to GitHub
4. Connect to Vercel
5. Add custom .me domain
6. Deploy

## Future Enhancements (Optional)
- Blog section
- Project showcase
- Terminal easter egg (hidden command line)
- Konami code activation for extra effects
- Music player with cyberpunk beats
- Visitor counter with retro aesthetic
- 3D rotating projects carousel

---

## Prompts for GitHub Copilot

Use these prompt templates when building:

1. **Initial Setup**: "Create a React + Vite project with Tailwind CSS configured. Set up the basic file structure with components folder. Use black background (#0a0a0a) and neon green (#00ff41) as primary colors."

2. **Three.js Background**: "Create a Three.js component with React Three Fiber that renders falling Matrix-style characters in neon green on a black background. Keep it performant with instancing. Add subtle camera movement."

3. **Hero Component**: "Build a hero section with a centered Avatar image (mask), name 'kaadz' with a subtle glitch text effect using Framer Motion, and a two-line bio that types out character by character. Use monospace font and neon green accent colors."

4. **Link Buttons**: "Create a LinkButton component with neon green border, transparent background, and hover effects: scale up, glow increase, and scan-line animation. Use Framer Motion for animations."

5. **Animations**: "Add staggered entrance animations using Framer Motion: mask fades in first, then name glitches in, bio types out, and buttons slide up with 0.1s stagger between each."

6. **Responsive**: "Make the entire layout responsive: stack vertically on mobile, reduce 3D effects, ensure buttons are touch-friendly with minimum 44px height."

Remember: Your co-founders (GPT-5 and Claude 4.5 via Copilot) should understand these specs perfectly. Feed them this context and iterate based on what they generate!
