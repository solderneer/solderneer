// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "solderneer";
export const SITE_DESCRIPTION =
  "A slice-of-life blog by Sudharshan, on technology with a little sprinkle of poetry.";

const SITE_MODE = process.env.SITE_MODE ?? "PROD";
export const SITE_BASEURL =
  SITE_MODE === "PROD" ? "https://solderneer.me/" : "http://localhost:3000/";
