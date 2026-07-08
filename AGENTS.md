# AGENTS.md

## Project Overview

Build a modern, clean, responsive blogsite about **Learning Experience Design (LXD)**.

The site should educate readers about Learning Experience Design, instructional design, learner-centered course creation, AI-assisted learning design, and practical teaching strategies.

The target audience includes educators, trainers, instructional designers, software educators, academic professionals, and people interested in designing better learning experiences.

## Technology Stack

Use the following stack:

* React.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Vite
* Lucide React for icons
* React Router for routing

Avoid using heavy UI frameworks outside shadcn/ui unless required.

## Design Direction

The blogsite should feel:

* Modern
* Clean
* Academic but friendly
* Professional
* Calm and easy to read
* Optimized for long-form reading

The design should not feel childish, overly colorful, or corporate-heavy.

## Recommended Color Scheme

Use a soft, readable, eye-friendly palette inspired by calm learning spaces.

### Primary Palette

| Purpose        |      Color |       Hex |
| -------------- | ---------: | --------: |
| Primary        |  Deep Teal | `#0F766E` |
| Primary Dark   |  Dark Teal | `#115E59` |
| Accent         | Warm Amber | `#F59E0B` |
| Background     | Soft Ivory | `#FFFBF5` |
| Surface        |      White | `#FFFFFF` |
| Muted Surface  | Light Sand | `#F5F1E8` |
| Text Primary   |   Charcoal | `#1F2937` |
| Text Secondary | Slate Gray | `#64748B` |
| Border         |  Soft Gray | `#E5E7EB` |

### Tailwind Theme Guidance

Configure the visual system around:

* Background: `#FFFBF5`
* Foreground: `#1F2937`
* Primary: `#0F766E`
* Secondary: `#F5F1E8`
* Accent: `#F59E0B`
* Muted text: `#64748B`
* Card background: `#FFFFFF`

Use the accent color sparingly for highlights, tags, buttons, and callouts.

## Site Structure

Create the following main pages:

1. Home
2. Blog
3. Blog Post Detail
4. Topics
5. About
6. Resources
7. Contact

## Home Page Requirements

The home page should include:

* Hero section with a clear headline about Learning Experience Design
* Short explanation of what LXD is
* Featured blog articles
* Topic categories
* Call-to-action section
* Newsletter subscription mockup
* Clean footer

Suggested hero headline:

> Design learning experiences that people actually remember.

Suggested subheadline:

> A modern blog about Learning Experience Design, learner-centered teaching, AI-assisted course creation, and practical strategies for meaningful learning.

## Blog Page Requirements

The blog page should include:

* Blog cards
* Category filter UI
* Search input
* Featured article section
* Responsive grid layout

Use sample blog categories:

* Learning Experience Design
* Instructional Design
* AI in Education
* Course Design
* Learner Engagement
* Assessment Design
* Digital Learning

## Blog Post Detail Requirements

Each blog post detail page should include:

* Title
* Author
* Date
* Reading time
* Category badge
* Cover image placeholder
* Long-form article layout
* Table of contents sidebar on desktop
* Related posts
* Share buttons
* Clean typography

Prioritize readability. Use comfortable line height, max-width content area, and clear headings.

## Components to Create

Create reusable components:

* `Navbar`
* `Footer`
* `HeroSection`
* `BlogCard`
* `FeaturedPost`
* `CategoryPill`
* `NewsletterSection`
* `ResourceCard`
* `SectionHeader`
* `ArticleLayout`
* `TableOfContents`
* `CalloutBox`
* `SearchInput`
* `ThemeToggle` if dark mode is implemented

Use shadcn/ui components where appropriate:

* Button
* Card
* Badge
* Input
* Separator
* Avatar
* Sheet
* DropdownMenu

## Content Requirements

Use realistic placeholder content related to Learning Experience Design.

Avoid generic lorem ipsum.

Sample post titles:

* What Is Learning Experience Design?
* Instructional Design vs Learning Experience Design
* How to Design Learner-Centered Courses
* Using AI to Support Learning Experience Design
* Creating Assessments That Improve Learning
* Designing Engaging Online Learning Activities
* The Role of Reflection in Learning Design
* How to Build a Course Journey Map

## Visual Style

Use:

* Rounded cards
* Soft shadows
* Generous spacing
* Large clean headings
* Clear contrast
* Subtle hover states
* Responsive layout
* Minimal but useful animation

Avoid:

* Excessive gradients
* Too many colors
* Complex animations
* Cluttered layouts
* Tiny text
* Dense paragraphs

## Typography

Use a modern readable font stack.

Recommended:

* Headings: `Inter`, `Manrope`, or system sans-serif
* Body: `Inter`, `Source Sans 3`, or system sans-serif
* Code or technical snippets: `JetBrains Mono` or `ui-monospace`

Suggested sizing:

* Body text: `text-base` or `text-lg`
* Article line height: `leading-8`
* Section headings: `text-3xl` to `text-5xl`
* Hero heading: `text-4xl` to `text-6xl`

## Responsiveness

The site must work well on:

* Mobile
* Tablet
* Desktop

Mobile requirements:

* Collapsible navigation
* Single-column blog cards
* Comfortable spacing
* No horizontal scrolling
* Readable article layout

Desktop requirements:

* Centered max-width layout
* Multi-column blog grid
* Optional sticky table of contents on article pages

## Routing

Use React Router.

Suggested routes:

```txt
/
 /blog
 /blog/:slug
 /topics
 /resources
 /about
 /contact
```

## Data Structure

Use local mock data first.

Create a file such as:

```txt
src/data/posts.ts
```

Each blog post should include:

```ts
type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  coverImage?: string;
  tags: string[];
  featured?: boolean;
};
```

## Development Rules

* Use TypeScript.
* Use functional React components.
* Keep components small and reusable.
* Use semantic HTML.
* Ensure accessibility basics.
* Use meaningful alt text.
* Avoid hardcoded repeated UI patterns.
* Prefer clean composition over large components.
* Use Tailwind utility classes consistently.
* Use shadcn/ui components when they improve quality.
* Do not introduce unnecessary dependencies.

## Accessibility Requirements

Implement:

* Semantic headings
* Keyboard-friendly navigation
* Visible focus states
* Proper button and link usage
* Sufficient color contrast
* Descriptive labels for inputs
* Meaningful alt text for images

## File Organization

Use a clean structure:

```txt
src/
  components/
    layout/
    blog/
    home/
    shared/
  data/
  pages/
  routes/
  lib/
  styles/
```

## Quality Expectations

Before finishing, ensure:

* The app runs without TypeScript errors.
* The layout is responsive.
* The design is visually consistent.
* The content is relevant to Learning Experience Design.
* Components are reusable.
* Navigation links work.
* Blog detail pages work using slugs.
* No placeholder lorem ipsum remains.

## Final Output Expected

When the implementation is complete, provide:

* A short summary of what was built
* Main files created or modified
* How to run the project
* Any assumptions made
* Suggested next improvements
