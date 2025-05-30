// // scripts/fixSlugs.ts
// import { PrismaClient } from "@prisma/client";
// import slugify from "slugify";

// const prisma = new PrismaClient();

// async function fixSlugs() {
//   const posts = await prisma.blogPost.findMany();

//   for (const post of posts) {
//     if (!post.slug || post.slug === "null") {
//       const generatedSlug = slugify(post.title, { lower: true, strict: true });
//       await prisma.blogPost.update({
//         where: { id: post.id },
//         data: { slug: generatedSlug },
//       });
//       console.log(
//         `Updated slug for post "${post.title}" to "${generatedSlug}"`
//       );
//     }
//   }

//   await prisma.$disconnect();
// }

// fixSlugs().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });
