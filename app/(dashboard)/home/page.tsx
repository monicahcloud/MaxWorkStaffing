import { BlogPostGrid } from "@/components/BlogPost";
import ClientHome from "@/components/tourGuide/ClientHome";
import office from "../../../assets/office.webp";
import handshake from "../../../assets/handshake.webp";
import transition from "../../../assets/office.webp";
import { ResumeTools } from "@/components/ResumeTools";
import JobSearchWrapper from "../jobsearch/JobSearchWrapper";

const posts = [
  {
    id: "1",
    title:
      "The Hidden Benefits of Temporary Work: Why It’s a Smart Career Move",
    description:
      "Temporary roles offer flexibility, skill-building opportunities, and a chance to explore different industries.",
    imageUrl: office,
  },
  {
    id: "2",
    title: "How Companies Can Win the War for Talent in 2025",
    description:
      "Key trends shaping how companies hire and retain top talent this year.",
    imageUrl: transition,
  },
  {
    id: "3",
    title: "From Military to Civilian Careers: How Veterans Can Transition",
    description:
      "Translating military experience into the corporate world can be challenging—here’s how to do it right.",
    imageUrl: handshake,
  },
];

export default function HomePageWrapper() {
  // Calculate this dynamically based on profile completion

  return (
    <>
      <ClientHome />
      {/* <ServicePromoCard /> */}
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
      </main>
    </>
  );
}
