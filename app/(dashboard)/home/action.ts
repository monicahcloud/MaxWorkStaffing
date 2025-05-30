// checkUserProgress.ts
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { nanoid } from "nanoid";
import slugify from "slugify";

export async function checkUserProgress() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const [resumes, coverLetters, jobs] = await Promise.all([
    prisma.resume.findFirst({ where: { clerkId: userId } }),
    prisma.coverLetter.findFirst({ where: { clerkId: userId } }),
    prisma.job.findFirst({ where: { clerkId: userId } }),
  ]);

  return {
    hasResume: !!resumes,
    hasCoverLetter: !!coverLetters,
    hasJob: !!jobs,
  };
}

export async function generateBlogPostsIfNeeded() {
  const existingPosts = await prisma.blogPost.count();
  console.log("Existing blog post count:", existingPosts);

  if (existingPosts >= 12) return;

  const { text } = await generateText({
    model: openai("gpt-4"),
    prompt: `
Generate 12 unique blog posts for jobseekers in JSON format with the following fields:

- id (uuid)
- title (unique, no duplicates)
- description (2–3 sentences, unique)
- imageUrl (choose from "/blog/office.jpg", "/blog/handshake.jpg", "/blog/transition.jpg")
- tag (one of "Career", "Job Search", "Advice", "Remote Work", "Transitions")
- content (IGNORE for now — we'll generate detailed content separately)

Make sure the posts are all unique in title, description, and imageUrl. Provide valid JSON only.
Ensure at least 3 posts for each tag.
`,
  });

  let blogPosts;
  try {
    blogPosts = JSON.parse(text);
  } catch (error) {
    console.error(
      "Failed to parse blog posts JSON:",
      error,
      "Raw response:",
      text
    );
    return;
  }

  for (const post of blogPosts) {
    const slug = slugify(post.title, { lower: true, strict: true });

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      console.log(`Skipping post with duplicate slug: ${slug}`);
      continue;
    }

    // Now generate full HTML article content per post.title
    const { text: contentHTML } = await generateText({
      model: openai("gpt-4"),
      prompt: `
Write a detailed blog article in HTML format for the title: "${post.title}". 
Audience: job seekers. 
Include headings, subheadings, multiple paragraphs, and lists if helpful.
Do not include <html> or <body> tags. Only provide the inner HTML content.
`,
    });

    await prisma.blogPost.create({
      data: {
        id: post.id || nanoid(),
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        content: contentHTML,
        slug,
        tag: post.tag ?? null,
      },
    });

    console.log(`Created blog post: ${post.title}`);
  }

  console.log("✅ Blog post generation complete");
}
