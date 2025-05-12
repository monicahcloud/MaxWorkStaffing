"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";

type BlogPost = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | StaticImageData; // <-- fix
  tag?: string;
};

interface BlogPostGridProps {
  posts: BlogPost[];
}

export const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
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
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
