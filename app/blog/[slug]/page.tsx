import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
// import { cn } from "@/lib/utils"; // optional, if using ShadCN's `cn` util
import { Separator } from "@/components/ui/separator";
export const metadata = {
  title: "Career & Resume Tips Blog",
  description:
    "Expert advice on resumes, interviews, cover letters, and career growth. Updated weekly with actionable content.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Max ResumeBuilder Blog",
    description:
      "Insights to level up your job search — from resume writing to acing your next interview.",
    url: "https://www.maxresumebuilder.com/blog",
    images: [{ url: "/og/blog-home.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Tips & Resume Advice",
    description: "Weekly content to help you stand out and get hired faster.",
    images: ["/og/blog-home.png"],
  },
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatContentWithSeparators(content: string) {
  // Add <hr /> after each closing </p> tag
  let formatted = content.replace(
    /<\/p>/g,
    "</p><hr class='my-6 border-muted/30' />"
  );

  // Optional: bold <strong> or <h3> tags inside paragraphs
  // If your headings are manually wrapped in <strong> or <h3>, style them
  formatted = formatted.replace(
    /<strong>(.*?)<\/strong>/g,
    "<strong class='font-semibold text-xl text-foreground'>$1</strong>"
  );

  return formatted;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post) return notFound();
  if (!post.content) return <p>No content available for this post.</p>;

  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article className="max-w-7xl mx-auto p-6 mt-10 bg-background rounded-2xl shadow-lg border border-muted/30 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-2 text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 flex-wrap text-sm text-muted-foreground">
          {post.tag && (
            <span className="bg-muted px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
              {post.tag}
            </span>
          )}
          {publishedDate && (
            <time dateTime={post.createdAt?.toISOString()}>
              Published on {publishedDate}
            </time>
          )}
        </div>

        {post.imageUrl && (
          <div className="mt-6 overflow-hidden rounded-xl border border-muted/30">
            <Image
              src={post.imageUrl}
              alt={post.title || "Blog post image"}
              className="w-full object-cover max-h-[450px] transition-all hover:scale-[1.02]"
              width={1280}
              height={720}
              loading="lazy"
            />
          </div>
        )}
      </header>

      <Separator className="my-8" />

      <section
        className="prose prose-lg prose-slate dark:prose-invert text-xl p-5 max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: formatContentWithSeparators(post.content),
        }}
      />
    </article>
  );
}
