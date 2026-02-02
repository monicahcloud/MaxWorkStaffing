/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPostGrid } from "@/components/BlogPost";
import React from "react";
import { generateBlogPostsIfNeeded } from "../home/action";
import { tagToImageMap } from "@/utils/constants";
import prisma from "@/lib/prisma";
import defaultImage from "@/public/blog/team.jpg";
import SectionTitle from "@/components/SectionTitle";
import { Newspaper } from "lucide-react";

const BlogHome = async () => {
  await generateBlogPostsIfNeeded();

  const getImageByTag = (tag: string | null) =>
    tagToImageMap[tag ?? ""] || defaultImage;

  const rawPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Grouping logic
  const groupedPosts: Record<string, any[]> = {};

  rawPosts.forEach((post) => {
    const tag = post.tag ?? "General Intelligence";
    if (!groupedPosts[tag]) {
      groupedPosts[tag] = [];
    }
    groupedPosts[tag].push({
      ...post,
      imageUrl: getImageByTag(post.tag),
      tag: post.tag ?? undefined,
      slug: post.slug!,
    });
  });

  const categories = Object.entries(groupedPosts);

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-20 pb-24">
      {/* Page Header */}
      <header className="space-y-4">
        <SectionTitle
          text="Career Intelligence"
          subtext="Data-driven reports and tactical guides for the modern professional."
        />
      </header>

      {/* Grouped Categories */}
      <div className="space-y-24">
        {categories.map(([tag, posts]) => (
          <section key={tag} className="space-y-10">
            {/* Category Header with Divider */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-black p-2 rounded-lg">
                  <Newspaper className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-black">
                  {tag} <span className="text-red-600">Feed</span>
                </h2>
              </div>
              <div className="h-px bg-slate-100 flex-1" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {posts.length} Reports
              </p>
            </div>

            {/* Grid for this specific category */}
            <BlogPostGrid posts={posts} />
          </section>
        ))}
      </div>

      {/* Empty State */}
      {rawPosts.length === 0 && (
        <div className="py-32 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
          <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
            Scanning for new career data...
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogHome;
