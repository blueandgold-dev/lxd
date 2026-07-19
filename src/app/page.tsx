import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { RecentArticles } from "@/components/home/RecentArticles";
import { ResourceCard } from "@/components/shared/ResourceCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

const topics = ["Learning Experience Design", "Instructional Design", "AI in Education", "Course Design"];

export default function Home() {
  const posts = getAllPosts();
  const featuredPost = getPostBySlug("what-is-learning-experience-design") ?? posts[0];

  return (
    <main>
      <HeroSection />
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured"
            title="Start with the foundations"
            description="Read practical articles that move from learner needs to meaningful activities, feedback, reflection, and transfer."
          />
          <div className="mt-10">
            <FeaturedPost post={featuredPost} />
          </div>
        </div>
      </section>
      <section className="bg-secondary px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Recent articles" description="Long-form guides for educators, trainers, and instructional designers." />
          <RecentArticles posts={posts} />
        </div>
      </section>
      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Topic categories" description="Explore the main ideas that shape modern learning experience design." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <ResourceCard key={topic} title={topic} description="Practical articles, reflection prompts, and examples for better learning design." />
            ))}
          </div>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
