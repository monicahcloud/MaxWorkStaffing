"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <Card key={post.id} className="rounded-2xl overflow-hidden shadow-md">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
              <p className="text-sm text-red-600 font-medium mb-1">
                {post.tag || "Article"}
              </p>
              <h2 className="text-lg font-semibold leading-snug mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-700 mb-4">{post.description}</p>
              <Link href={`/blog/${post.slug || ""}`} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleCount < posts.length && (
        <div className="mt-6 text-center">
          <Button onClick={showMore}>See More Articles</Button>
        </div>
      )}
    </>
  );
};
