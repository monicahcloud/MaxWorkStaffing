/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPostGrid } from "@/components/BlogPost";
import React from "react";
import { generateBlogPostsIfNeeded } from "../home/action";
import { tagToImageMap } from "@/utils/constants";
import prisma from "@/lib/prisma";
import defaultImage from "@/public/blog/team.jpg";
import SectionTitle from "@/components/SectionTitle";

const BlogHome = async () => {
  await generateBlogPostsIfNeeded();

  const getImageByTag = (tag: string | null) =>
    tagToImageMap[tag ?? ""] || defaultImage;

  const rawPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Map posts and group them by tag
  const groupedPosts: Record<string, any[]> = {};

  rawPosts.forEach((post) => {
    const tag = post.tag ?? "Uncategorized";
    if (!groupedPosts[tag]) groupedPosts[tag] = [];
    groupedPosts[tag].push({
      ...post,
      imageUrl: getImageByTag(post.tag),
      tag: post.tag ?? undefined,
      slug: post.slug!,
    });
  });

  const categories = Object.entries(groupedPosts); // [ [tag, posts[]], ... ]

  return (
    <div className="space-y-12">
      <SectionTitle text="Articles & Insights" subtext="" />

      {categories.map(([tag, posts]) => (
        <div key={tag}>
          <h2 className="text-2xl font-bold mb-4">{tag}</h2>
          <BlogPostGrid posts={posts} />
        </div>
      ))}

      {rawPosts.length === 0 && (
        <p className="text-red-500 mt-4">No blog posts found.</p>
      )}
    </div>
  );
};

export default BlogHome;
