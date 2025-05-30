import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return notFound();

  if (!post.content) {
    return <p>No content available for this post.</p>;
  }

  // Format the date nicely
  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        {post.tag && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            {post.tag}
          </span>
        )}
        {publishedDate && (
          <time
            dateTime={post.createdAt?.toISOString()}
            className="block text-gray-500 text-sm">
            Published on {publishedDate}
          </time>
        )}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-auto mt-4 rounded-md object-cover max-h-96"
            loading="lazy"
          />
        )}
      </header>

      <section
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
