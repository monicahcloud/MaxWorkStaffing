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
- imageUrl (choose from "/images/blog/office.jpg", "/images/blog/handshake.jpg", "/images/blog/transition.jpg")
- tag (one of "Career", "Job Search", "Advice", "Remote Work", "Transitions".)
- content (a full detailed article formatted as an HTML string with multiple paragraphs, headings, and lists if appropriate)

Make sure the posts are all unique in title, description, and content. Respond with JSON only.
Make sure there at least 3 blogposts for each tag.
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

    await prisma.blogPost.create({
      data: {
        id: post.id || nanoid(),
        title: post.title,
        description: post.description,
        imageUrl: post.imageUrl,
        content: `<p>${post.description}</p><p>Generated detailed content here...</p>`,
        slug,
        tag: post.tag ?? null,
      },
    });
  }

  console.log("Generated and saved blog posts:", blogPosts);
}
