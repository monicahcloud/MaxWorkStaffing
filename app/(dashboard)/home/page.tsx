export const dynamic = "force-dynamic";

import { ResumeTools } from "@/components/ResumeTools";
import ClientHome from "@/components/tourGuide/ClientHome";
import defaultImage from "@/public/blogs/team.jpg";

import prisma from "@/lib/prisma";
import JobSearchWrapper from "../jobsearch/JobSearchWrapper";
import { BlogPostGrid } from "@/components/BlogPost";
import { generateBlogPostsIfNeeded } from "./action";
import { tagToImageMap } from "@/utils/constants";

export default async function HomePageWrapper() {
  await generateBlogPostsIfNeeded(); //
  const getImageByTag = (tag: string | null) =>
    tagToImageMap[tag ?? ""] || defaultImage;

  const rawPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const posts = rawPosts
    // .filter((post) => post.slug) // keep only posts with slug
    .map((post) => ({
      ...post,
      imageUrl: getImageByTag(post.tag),
      tag: post.tag ?? undefined,
      slug: post.slug!, // non-null assertion since filtered
    }));
  console.log("Fetched posts:", posts);

  return (
    <>
      <ClientHome />
      <main className="p-6">
        <ResumeTools />
        <hr className="border-4 my-8" />
        <h1 className="text-2xl font-extrabold text-blue-900 mb-4 mt-8 capitalize">
          Let's find your next beginning together.
        </h1>
        <JobSearchWrapper />
        <hr className="border-4 my-8" />
        <h1 className="text-2xl font-extrabold text-blue-900 mb-4 mt-8 capitalize">
          Career Tips & Insights
        </h1>
        <BlogPostGrid posts={posts} />
        {posts.length === 0 && (
          <p className="text-red-500 mt-4">No blog posts found.</p>
        )}
      </main>
    </>
  );
}
