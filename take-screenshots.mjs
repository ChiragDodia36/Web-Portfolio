import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Navigate and wait for full load
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
await setTimeout(3000); // wait for animations

// Hero section
await page.screenshot({ path: "public/screenshots/hero.png", fullPage: false });
console.log("✅ Hero screenshot taken");

// Scroll to About
await page.evaluate(() => document.getElementById("about")?.scrollIntoView({ behavior: "instant" }));
await setTimeout(1500);
await page.screenshot({ path: "public/screenshots/about.png", fullPage: false });
console.log("✅ About screenshot taken");

// Scroll to Skills
await page.evaluate(() => document.getElementById("skills")?.scrollIntoView({ behavior: "instant" }));
await setTimeout(1500);
await page.screenshot({ path: "public/screenshots/skills.png", fullPage: false });
console.log("✅ Skills screenshot taken");

// Scroll to Projects
await page.evaluate(() => document.getElementById("projects")?.scrollIntoView({ behavior: "instant" }));
await setTimeout(1500);
await page.screenshot({ path: "public/screenshots/projects.png", fullPage: false });
console.log("✅ Projects screenshot taken");

// Scroll to Experience
await page.evaluate(() => document.getElementById("experience")?.scrollIntoView({ behavior: "instant" }));
await setTimeout(1500);
await page.screenshot({ path: "public/screenshots/experience.png", fullPage: false });
console.log("✅ Experience screenshot taken");

// Scroll to Contact
await page.evaluate(() => document.getElementById("contact")?.scrollIntoView({ behavior: "instant" }));
await setTimeout(1500);
await page.screenshot({ path: "public/screenshots/contact.png", fullPage: false });
console.log("✅ Contact screenshot taken");

await browser.close();
console.log("\n🎉 All screenshots saved to public/screenshots/");
