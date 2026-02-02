/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();

    // 1. Resolve Chromium Property Errors
    // We cast to 'any' because the minified library types often mismatch puppeteer-core
    const executablePath = await chromium.executablePath();

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: (chromium as any).defaultViewport || {
        width: 1280,
        height: 720,
      },
      executablePath: executablePath,
      headless: (chromium as any).headless ?? true,
    });

    const page = await browser.newPage();

    // 2. Generate HTML (Ensure Tailwind is injected for styling)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact !important; }
          </style>
        </head>
        <body>
          <div id="resume-container">${values.html}</div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // 3. Create the PDF Buffer
    const pdfUint8Array = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // 4. Fix: Convert Uint8Array to Buffer for NextResponse
    const pdfBuffer = Buffer.from(pdfUint8Array);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${
          values.filename || "resume"
        }.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
