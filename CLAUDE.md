# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal knowledge base and blog for Sudharshan (solderneer.me), built with Astro. Features wiki-style internal linking with a link graph visualization.

## Commands

All commands run from the `site/` directory:

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Build production site to ./dist/
npm run preview      # Preview production build
```

Deployment is automatic via GitHub Actions on push to `main` branch.

## Architecture

### Content System

Notes live in `site/src/content/notes/` as Markdown or MDX files. Each note requires frontmatter validated by Zod schema in `site/src/content/config.ts`:

```yaml
---
title: Note Title
emoji: 📝
pubDate: 01-Jan-2024
updatedDate: 05-Jan-2024  # optional
tags: [general]           # must be from _tags.json
description: ...          # optional
originalPost: ...         # optional, for cross-posts
heroImage: ...            # optional
---
```

Valid tags are defined in `site/src/content/_tags.json`: `society`, `technology`, `life`, `general`, `travel`, `philosophy`, `index`, `science`, `young-shan`, `prose`, `design`, `education`, `ongoing`, `projects`, `startups`.

### Wiki-Style Linking

The site supports `[[note-slug]]` wiki-link syntax via `@portaljs/remark-wiki-link`. A custom Astro integration (`site/integrations/astrojs-indexmd.ts`) runs at build time to generate `mdindex.json` containing forward links, backlinks, and node metadata for D3.js visualization.

### Key Directories

- `site/src/content/notes/` - All blog posts and notes
- `site/src/components/` - Astro components
- `site/src/layouts/` - Page layouts (BaseLayout, Note)
- `site/src/pages/` - Route pages
- `site/integrations/` - Custom Astro integrations
- `site/remarkPlugins.mjs` - Reading time and word count plugins

### Styling

- Global styles in `site/src/styles/global.css`
- Custom color scheme using CSS variables
- Fonts: IBM Plex Serif (body), IBM Plex Mono (UI/labels/code)

## Frontend Design Preferences

### Visual Identity
- **Aesthetic**: Technical notebook / lab journal feel, not sterile minimalism
- **Color palette**: Warm paper background (#faf9f7), navy accent (#1e3a5f), muted borders (#e5e3df)
- **Typography**: IBM Plex Mono for UI/labels/code, IBM Plex Serif for body text
- **Texture**: Subtle SVG noise grain overlay (2.5% opacity) on body::after

### CSS Variables
```css
--text: #1a1a1a;
--text-secondary: #555;
--text-tertiary: #888;
--bg: #faf9f7;
--bg-code: #f3f2ef;
--border: #e5e3df;
--accent: #1e3a5f;
--accent-light: #2d5a8b;
```

### Layout Principles
- Max-width containers (640px for content, 1000px for full page)
- Timeline-based archive layouts with date column (80px) + content
- Grid layouts for object/card collections (auto-fill, minmax)
- Left border accents (3px) on cards instead of full borders

### Component Patterns
- **Headers**: Animated "rune scroll" equation border (floating math symbols)
- **Section headers**: Monospace, 0.75rem, uppercase, letter-spacing 0.08em, accent color
- **Search**: Input with "/" icon, "press /" hint, keyboard shortcut support
- **Tag filters**: Pill buttons, filled background when active, border highlight on hover
- **Cards**: Transparent background, minimal borders, hover reveals additional details
- **Stats/Graphs**: Stock ticker aesthetic with time range filters, gridlines, hover tooltips
- **Info panels**: Fixed bottom, slide up animation

### Interaction Details
- Transitions: 0.15s for UI elements, 0.2s for content reveals
- Hover states: translateY(-4px) + opacity fade for revealing details, color → accent
- No emoji unless explicitly requested
- Monospace for all metadata (dates, word counts, tags, stats, IDs)

### Mobile Behavior
- Stack layouts vertically
- Maintain axis labels and gridlines on graphs (don't oversimplify)
- Full-width graph containers with adequate height (100px minimum)

### Things to Avoid
- Excessive borders or box shadows
- Generic "AI aesthetic" (gradients, glassmorphism, excessive roundedness)
- Bullet points in prose content
- Emoji icons on cards
- Hiding information that aids comprehension on mobile
