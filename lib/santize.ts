// lib/sanitize.ts
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export function sanitizeHTML(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "b",
      "i",
      "u",
      "em",
      "strong",
      "p",
      "ul",
      "ol",
      "li",
      "br",
      "span",
      "div",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  });
}
