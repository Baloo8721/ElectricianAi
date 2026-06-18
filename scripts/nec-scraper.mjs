/**
 * NEC Content Scraper
 *
 * Uses Playwright to log into the NFPA free-access site and extract
 * NEC 2026 article text into a JSON file the app can search.
 *
 * Usage:
 *   npm install --save-dev playwright
 *   npx playwright install chromium
 *   node scripts/nec-scraper.mjs
 *
 * When the browser opens, log into NFPA manually, then the script
 * will detect the login and start scraping.
 *
 * Output: data/nec-content.json
 */

import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(root, "data", "nec-content.json");
const STATE_FILE = join(root, "scripts", ".nfpa-auth.json");

const NFPA_URL =
  "https://link.nfpa.org/free-access/publications/70/2026";

async function main() {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  // Try restoring previous auth
  if (existsSync(STATE_FILE)) {
    await context.addCookies(
      JSON.parse(readFileSync(STATE_FILE, "utf8"))
    );
    console.log("Restored previous session. Checking if still valid...");
  }

  const page = await context.newPage();

  console.log(`Navigating to ${NFPA_URL}...`);
  await page.goto(NFPA_URL, { waitUntil: "networkidle", timeout: 30000 });

  // Detect if we're on the login page vs the app
  const currentUrl = page.url();
  const isLoggedIn = !currentUrl.includes("login") && !currentUrl.includes("b2clogin");

  if (!isLoggedIn) {
    console.log("\n=== LOGIN REQUIRED ===");
    console.log("A browser window is open. Log into NFPA in that window.");
    console.log("After login, you'll be redirected to the code viewer.");
    console.log("The script will detect successful login automatically.");
    console.log("Waiting up to 5 minutes for login...\n");

    // Wait for the URL to change away from login domains
    try {
      await page.waitForURL(
        (url) =>
          !url.hostname.includes("b2clogin") &&
          !url.hostname.includes("login") &&
          url.hostname.includes("nfpa"),
        { timeout: 300000 }
      );
      console.log("Login detected!");
    } catch {
      console.log("Login timeout. The page may already be loaded.");
    }
  } else {
    console.log("Already logged in. Proceeding...");
  }

  // Wait a bit for the SPA to fully render
  await page.waitForTimeout(3000);

  // Save auth state for next time
  const cookies = await context.cookies();
  writeFileSync(STATE_FILE, JSON.stringify(cookies, null, 2));
  console.log("Session saved for future runs.");

  // === SCRAPING ===
  console.log("\n=== SCRAPING NEC CONTENT ===\n");

  // Discover articles from the page
  const articles = await discoverArticles(page);

  if (articles.length === 0) {
    console.log(
      "Could not auto-discover articles. The site layout may differ from expected."
    );
    console.log("Trying alternative discovery methods...");
    const altArticles = await discoverByScanning(page);
    if (altArticles.length === 0) {
      console.log(
        "\nManual article list creation required."
      );
      console.log(
        "1. Open the NFPA site in your browser while logged in."
      );
      console.log(
        "2. Use DevTools to find the article navigation/structure."
      );
      console.log(
        "3. Look for the S3 API calls in the Network tab that return article data."
      );
      console.log(
        "4. Edit this script's 'articleOverrides' array with the article data."
      );
      await browser.close();
      process.exit(1);
    }
  }

  console.log(`Found ${articles.length} articles to scrape.`);

  // Scrape each article's content
  const scraped = [];
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(
      `[${i + 1}/${articles.length}] ${article.label || article.title}...`
    );
    try {
      const content = await scrapeArticle(page, article);
      if (content) {
        scraped.push(content);
      }
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }

  // Build the output
  const output = {
    meta: {
      title: "NEC 2026",
      source: NFPA_URL,
      scrapedAt: new Date().toISOString(),
      articleCount: scraped.length,
    },
    articles: scraped,
  };

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\nSaved ${scraped.length} articles to ${OUTPUT}`);
  console.log(
    `File size: ${(Buffer.byteLength(JSON.stringify(output)) / 1024 / 1024).toFixed(1)} MB`
  );

  await browser.close();
}

/**
 * Discover articles by looking at the page DOM.
 * Tries known NFPA navigation patterns.
 */
async function discoverArticles(page) {
  let articles = [];

  // Pattern 1: Sidebar navigation links
  const patterns = [
    // NFPA LiNK sidebar items
    'nav a, nav button, [role="navigation"] a',
    // Article list items
    'a[href*="/article/"], a[href*="/section/"]',
    // Table of contents links
    ".toc a, .table-of-contents a",
    // Tree navigation
    '[class*="tree"] a, [class*="nav"] a, [class*="sidebar"] a',
    // Any link containing article numbers (90., 100., 110., etc.)
    'a:has-text("Article")',
  ];

  for (const sel of patterns) {
    try {
      const links = await page.$$(sel);
      for (const link of links) {
        const text = await link.textContent();
        const href = await link.getAttribute("href");
        if (text && text.trim()) {
          articles.push({ label: text.trim(), href });
        }
      }
    } catch {}

    if (articles.length > 0) break;
  }

  // Deduplicate by label
  const seen = new Set();
  articles = articles.filter((a) => {
    const key = a.label.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Filter to only NEC-like articles
  const necPattern = /(article|section|annex|table|chapter|90\.|100\.|110\.|200\.|210\.|300\.|250\.|430\.|Table|Annex)/i;
  articles = articles.filter((a) => necPattern.test(a.label));

  return articles;
}

/**
 * Fallback: try to find content sections by scanning the page.
 */
async function discoverByScanning(page) {
  const articles = [];

  try {
    // Look for any article-like headings in the main content
    const headings = await page.$$(
      'main h1, main h2, main h3, [class*="content"] h2, [class*="content"] h3'
    );
    for (const h of headings) {
      const text = await h.textContent();
      const href = await h.getAttribute("id");
      if (text && text.trim()) {
        articles.push({ label: text.trim(), href: href ? "#" + href : null });
      }
    }
  } catch {}

  return articles;
}

/**
 * Scrape a single article's text content.
 */
async function scrapeArticle(page, article) {
  if (article.href) {
    // Navigate to the article
    const fullUrl = article.href.startsWith("http")
      ? article.href
      : new URL(article.href, NFPA_URL).href;

    try {
      await page.goto(fullUrl, {
        waitUntil: "networkidle",
        timeout: 15000,
      });
      await page.waitForTimeout(1000);
    } catch {
      // If navigation fails, try clicking
      try {
        const link = await page.$(`a:has-text("${article.label}")`);
        if (link) {
          await link.click();
          await page.waitForTimeout(2000);
        }
      } catch {}
    }
  }

  // Extract text content from the main content area
  const contentSelectors = [
    "main",
    '[class*="content"]',
    '[class*="article"]',
    '[class*="document"]',
    "article",
    "#content",
    ".content",
  ];

  let content = "";
  for (const sel of contentSelectors) {
    try {
      const el = await page.$(sel);
      if (el) {
        content = await el.textContent();
        break;
      }
    } catch {}
  }

  // Fallback: get visible text from the body
  if (!content || content.trim().length < 50) {
    content = await page.evaluate(() => {
      const body = document.body;
      const clone = body.cloneNode(true);
      // Remove script, style, nav elements
      clone.querySelectorAll("script, style, nav, header, footer").forEach((el) => el.remove());
      return clone.textContent || "";
    });
  }

  content = content
    .replace(/\s+/g, " ")
    .replace(/\t/g, " ")
    .trim();

  // Extract article number from label
  const numMatch = article.label.match(/(Article|Annex|Table)\s+([\d.]+)/i);
  const sectionId = numMatch ? numMatch[2] : article.label.toLowerCase().replace(/\s+/g, "-");
  const sectionType = numMatch ? numMatch[1].toLowerCase() : "section";

  return {
    id: sectionId,
    type: sectionType,
    title: article.label.trim(),
    content: content,
    url: page.url(),
  };
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
