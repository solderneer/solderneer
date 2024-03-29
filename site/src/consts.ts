// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "memex";
export const SITE_DESCRIPTION =
  "A blog where Shan (@solderneer) tries to string words together better than LLMs.";

const SITE_MODE = process.env.SITE_MODE ?? "PROD";
export const SITE_BASEURL =
  SITE_MODE === "PROD" ? "https://solderneer.me/" : "http://localhost:3000/";
