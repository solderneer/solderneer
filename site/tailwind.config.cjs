/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "text-color": "var(--text-color)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",

        "beige-light": "var(--beige-light)",
        "beige-medium": "var(--beige-medium)",
        "beige-dark": "var(--beige-dark)",
      },
      typography: ({ theme }) => ({
        pink: {
          css: {
            "--tw-prose-body": theme("colors.text-color"),
            "--tw-prose-headings": theme("colors.text-color"),
            "--tw-prose-lead": theme("colors.text-color"),
            "--tw-prose-links": theme("colors.text-color"),
            "--tw-prose-bold": theme("colors.text-color"),
            "--tw-prose-counters": theme("colors.text-color"),
            "--tw-prose-bullets": theme("colors.primary-color"),
            "--tw-prose-hr": theme("colors.beige-dark"),
            "--tw-prose-quotes": theme("colors.text-color"),
            "--tw-prose-quote-borders": theme("colors.secondary-color"),
            "--tw-prose-captions": theme("colors.text-color"),
            "--tw-prose-code": theme("colors.text-color"),
            "--tw-prose-pre-code": theme("colors.text-color"),
            "--tw-prose-pre-bg": "transparent",
            "--tw-prose-th-borders": theme("colors.text-color"),
            "--tw-prose-td-borders": theme("colors.text-color"),
            // Remove background from blockquotes (poetry)
            "blockquote": {
              backgroundColor: "transparent",
              background: "none",
            },
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
