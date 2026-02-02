import { ResumeTools } from "@/components/ResumeTools";
import ClientHome from "@/components/tourGuide/ClientHome";
import defaultImage from "@/public/blog/team.jpg";
import prisma from "@/lib/prisma";
import JobSearchWrapper from "../jobsearch/JobSearchWrapper";
import { BlogPostGrid } from "@/components/BlogPost";
import { generateBlogPostsIfNeeded } from "./action";
import { tagToImageMap } from "@/utils/constants";
import { Sparkles, Newspaper, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Command Center | MaxResumeBuilder.com",
  description:
    "Your personalized dashboard for career intelligence, job search, and AI-powered resumes.",
  // ... rest of metadata
};

export default async function HomePageWrapper() {
  await generateBlogPostsIfNeeded();

  const getImageByTag = (tag: string | null) =>
    tagToImageMap[tag ?? ""] || defaultImage;

  const rawPosts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  const posts = rawPosts.map((post) => ({
    ...post,
    imageUrl: getImageByTag(post.tag),
    tag: post.tag ?? undefined,
    slug: post.slug!,
  }));

  return (
    <>
      {/* 1. Hero / Progress Section */}
      <ClientHome />

      <main className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-16">
        {/* 2. Resume Tools Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-black">
              Creation <span className="text-red-600">Suite</span>
            </h2>
          </div>
          <ResumeTools />
        </section>

        {/* 3. Job Search Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-black">
                Market <span className="text-red-600">Opportunities</span>
              </h2>
            </div>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <JobSearchWrapper />
        </section>

        {/* 4. Career Insights Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-black p-2 rounded-lg">
                <Newspaper className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-black">
                Career <span className="text-red-600">Intelligence</span>
              </h2>
            </div>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          <BlogPostGrid posts={posts} />

          {posts.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Analyzing market trends... check back soon.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
