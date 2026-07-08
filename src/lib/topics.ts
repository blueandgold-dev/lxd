export type Topic = {
  title: string;
  slug: string;
  description: string;
};

export const topics: Topic[] = [
  {
    title: "Learning Experience Design",
    slug: "learning-experience-design",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "Instructional Design",
    slug: "instructional-design",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "AI in Education",
    slug: "ai-in-education",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "Course Design",
    slug: "course-design",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "Assessment Design",
    slug: "assessment-design",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "Learner Engagement",
    slug: "learner-engagement",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
  {
    title: "Digital Learning",
    slug: "digital-learning",
    description: "Explore concepts, examples, and practical design prompts for this learning design area.",
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}
