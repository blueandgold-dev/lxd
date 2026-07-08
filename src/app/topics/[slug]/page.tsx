import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAllPosts } from "@/lib/posts";
import { getTopicBySlug, topics } from "@/lib/topics";

type TopicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {};
  }

  return {
    title: `${topic.title} | Learning Experience Design`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const posts = getAllPosts().filter((post) => post.category === topic.title);

  return (
    <main className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title={topic.title} description={topic.description} />
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-10 min-h-48" aria-label={`No posts for ${topic.title} yet`} />
        )}
      </div>
    </main>
  );
}
