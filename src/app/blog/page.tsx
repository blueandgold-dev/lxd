import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAllPosts, getCategories, getFeaturedPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Learning Experience Design",
  description: "Articles about Learning Experience Design, instructional design, AI in education, and learner-centered course design.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const featuredPost = getFeaturedPosts()[0] ?? posts[0];

  return (
    <main>
      <section className="border-b border-border px-5 py-14 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Blog"
          title="Learning design articles for practical educators"
          description="Search, filter, and read guides that help turn content into useful learning experiences."
        />
        <div className="mx-auto mt-10 max-w-7xl">
          <FeaturedPost post={featuredPost} />
        </div>
      </section>
      <BlogExplorer posts={posts} categories={categories} />
    </main>
  );
}

