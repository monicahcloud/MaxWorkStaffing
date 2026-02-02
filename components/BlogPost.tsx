"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  tag?: string;
  slug: string;
};

interface BlogPostGridProps {
  posts: BlogPost[];
}

export const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visiblePosts.map((post) => (
          <Card
            key={post.id}
            className="group rounded-[2rem] overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
            {/* Image Container with Zoom Effect */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <CardContent className="p-7 space-y-4">
              {/* Tag Style */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                  {post.tag || "Intelligence"}
                </p>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-xl font-black text-black leading-tight uppercase tracking-tighter group-hover:text-red-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Styled Link */}
              <div className="pt-2">
                <Link href={`/blog/${post.slug || ""}`} passHref legacyBehavior>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black hover:gap-3 transition-all border-b-2 border-black pb-1 hover:border-red-600 hover:text-red-600">
                    Access Report
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Show More Button - Styled to match "Elite" UI */}
      {visibleCount < posts.length && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={showMore}
            variant="outline"
            className="group border-2 border-black rounded-xl px-10 py-6 font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all flex items-center gap-2">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Load More Insights
          </Button>
        </div>
      )}
    </div>
  );
};
