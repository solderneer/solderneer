/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "text": "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "bg": "var(--bg)",
        "bg-code": "var(--bg-code)",
        "border": "var(--border)",
        "accent": "var(--accent)",
        "accent-light": "var(--accent-light)",
      },
      fontFamily: {
        'serif': ['IBM Plex Serif', 'Georgia', 'serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text)",
            "--tw-prose-headings": "var(--text)",
            "--tw-prose-lead": "var(--text-secondary)",
            "--tw-prose-links": "var(--accent)",
            "--tw-prose-bold": "var(--text)",
            "--tw-prose-counters": "var(--text-secondary)",
            "--tw-prose-bullets": "var(--accent)",
            "--tw-prose-hr": "var(--border)",
            "--tw-prose-quotes": "var(--text-secondary)",
            "--tw-prose-quote-borders": "var(--accent)",
            "--tw-prose-captions": "var(--text-tertiary)",
            "--tw-prose-code": "var(--text)",
            "--tw-prose-pre-code": "var(--text)",
            "--tw-prose-pre-bg": "var(--bg-code)",
            "--tw-prose-th-borders": "var(--border)",
            "--tw-prose-td-borders": "var(--border)",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
