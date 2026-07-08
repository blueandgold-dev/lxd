import { ResourceCard } from "@/components/shared/ResourceCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

const resources = [
  { title: "Course Design Checklist", description: "A practical sequence for aligning outcomes, activities, feedback, and assessment." },
  { title: "Learner Persona Template", description: "A simple way to document learner goals, barriers, motivation, and support needs." },
  { title: "Course Journey Map", description: "A planning tool for mapping awareness, practice, feedback, reflection, and transfer." },
  { title: "Assessment Design Guide", description: "Prompts for creating assessments that measure application, not only recall." },
  { title: "AI Prompt Guide for Educators", description: "Reusable prompts for lesson planning, activity design, feedback, and reflection." },
];

export const metadata = {
  title: "Resources | Learning Experience Design",
};

export default function ResourcesPage() {
  return (
    <main className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader title="Resources" description="Reusable tools and prompts for designing learner-centered courses and workshops." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} title={resource.title} description={resource.description} />
          ))}
        </div>
      </div>
    </main>
  );
}

