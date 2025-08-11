export const dynamic = "force-dynamic";

import { ResumeTools } from "@/components/ResumeTools";
import ClientHome from "@/components/tourGuide/ClientHome";
import defaultImage from "@/public/blog/team.jpg";
import prisma from "@/lib/prisma";
import JobSearchWrapper from "../jobsearch/JobSearchWrapper";
import { BlogPostGrid } from "@/components/BlogPost";
import { generateBlogPostsIfNeeded } from "./action";
import { tagToImageMap } from "@/utils/constants";
export const metadata = {
  title: "Max ResumeBuilder User Portal",
  description:
    "Easily build a professional, recruiter-approved resume with AI-powered guidance. Start from scratch or upload your current resume to enhance it.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "My Resume | Max ResumeBuilder",
    description:
      "Build a job-winning resume in minutes. ATS-friendly, customizable templates designed to get you hired.",
    url: "https://www.maxresumebuilder.com/coverletter",
    images: [{ url: "/og/og-coverletter.png", width: 1200, height: 630 }],
    siteName: "Max ResumeBuilder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Cover Letter with AI",
    description:
      "Fast, flexible, and proven to impress recruiters. Create a cover letter that gets results.",
    images: ["/og/og-coverletter.png"],
  },
};
export default async function HomePageWrapper() {
  await generateBlogPostsIfNeeded();
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

  return (
    <>
      <ClientHome />
      <main className="p-6">
        <ResumeTools />
        <hr className="border-4 my-8" />
        <h1 className="text-2xl font-extrabold text-blue-900 mb-4 mt-8 capitalize">
          Let's find your next beginning together
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
