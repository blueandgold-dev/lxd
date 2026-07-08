import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata = {
  title: "About | Learning Experience Design",
};

export default function AboutPage() {
  return (
    <main className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="About this publication" description="A practical space for educators, trainers, and course creators who want learning to feel meaningful and usable." />
        <div className="mt-10 rounded-lg border border-border bg-surface p-6 text-lg leading-8 text-muted shadow-sm sm:p-8">
          <p>
            Learning Experience Design helps people move beyond content delivery and toward learner-centered journeys. This site explains the concepts, tools,
            and decisions behind better courses, workshops, tutorials, and training programs.
          </p>
          <p className="mt-5">
            The focus is practical: understand the learner, define the outcome, design meaningful activity, provide feedback, invite reflection, and support real
            application.
          </p>
        </div>
      </div>
    </main>
  );
}

