// scripts/backfillBlogPosts.ts
import prisma from "@/lib/prisma";
import slugify from "slugify";

async function backfill() {
  const posts = await prisma.blogPost.findMany();

  for (const post of posts) {
    const slug = slugify(post.title, { lower: true, strict: true });
    const content = post.description; // Temporarily reuse description if content is missing

    await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        slug,
        content,
      },
    });
  }

  console.log("Backfill complete");
}

backfill().catch(console.error);
