/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import chromium from "@sparticuz/chromium-min";
import puppeteer, { Browser } from "puppeteer-core";

export async function generateResumePdf(htmlContent: string) {
  let browser: Browser | null = null;
  try {
    const isLocal = process.env.NODE_ENV === "development";
    const chrome = chromium as any;

    browser = await puppeteer.launch({
      args: isLocal
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : chrome.args,
      defaultViewport: chrome.defaultViewport || { width: 1280, height: 720 },
      executablePath: isLocal
        ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        : await chrome.executablePath(),
      headless: isLocal ? true : chrome.headless,
    });

    const page = await browser.newPage();

    // FIX: Change 'networkidle0' to 'domcontentloaded' to prevent frame detachment
    await page.setContent(htmlContent, {
      waitUntil: "domcontentloaded",
      timeout: 30000, // 30 second timeout
    });

    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: {
        top: "10mm", // Standard professional padding
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    return Buffer.from(pdfUint8Array).toString("base64");
  } catch (error) {
    console.error("PDF Gen Error:", error);
    throw new Error("Failed to generate PDF");
  } finally {
    // ALWAYS close the browser in finally to prevent memory leaks
    if (browser) {
      await (browser as any).close();
    }
  }
}
