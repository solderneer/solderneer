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

- Tailwind CSS with custom typography plugin
- Global styles in `site/src/styles/global.css`
- Custom color scheme using CSS variables (beige/orange theme)
- Fonts: Merriweather (body), Kalam (headings)
