import { ResourceCard } from "@/components/shared/ResourceCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { topics } from "@/lib/topics";

export const metadata = {
  title: "Topics | Learning Experience Design",
};

export default function TopicsPage() {
  return (
    <main className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Topics" description="Browse core themes for designing learning that is clear, active, and useful." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <ResourceCard key={topic.slug} title={topic.title} description={topic.description} href={`/topics/${topic.slug}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
