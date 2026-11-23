/* ============================================================
   GEW Counsellor Hub — site config
   Edit this file to change contact details, sheet source, etc.
   ============================================================ */
window.GEW_CONFIG = {
  brand: "Govt Exam Wallah",
  tagline: "Counsellor Hub",
  poweredBy: "Powered by Physics Wallah",
  helpline: "7303699227",
  centres: "28",
  selections: "1K+",
  lastUpdated: "23 Nov 2026",

  /* Selections data: data/selections.json
     Built from the "Selection Result 2025-26" Google Sheet by tools/build_selections.py.
     Only final "Selected" students are kept. Mobile numbers, registration numbers and
     non-selected students are removed, so nothing private ships with the website. */
  selectionsFile: "data/selections.json",

  /* "Coming up" live source (optional). Paste the ID of a separate Google Sheet that holds only exam dates
     (shared: Anyone with the link = Viewer). Leave "" to use data/upcoming.json. */
  upcomingSheetId: "14xDdmFVXti3o9sm4hOO4b6uT3pg2LXv6Dg-2zRKDkGw",
  upcomingSheetTab: "Sheet1",

  /* Vacancies page: tab "Vacancies" in the same sheet (columns: Category, Exam, Post, Vacancies, LastDate, Link, Notes) */
  vacanciesSheetId: "14xDdmFVXti3o9sm4hOO4b6uT3pg2LXv6Dg-2zRKDkGw",
  vacanciesSheetTab: "Vacancies"
};
