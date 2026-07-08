import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata = {
  title: "Contact | Learning Experience Design",
};

export default function ContactPage() {
  return (
    <main>
      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader title="Contact" description="Send article ideas, collaboration notes, or questions about Learning Experience Design." />
          <div className="mt-10 rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-8">
            <form className="grid gap-5" aria-label="Contact form mockup">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-foreground">Name</label>
                <input id="name" className="min-h-12 rounded-md border border-border bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
                <input id="email" type="email" className="min-h-12 rounded-md border border-border bg-background px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
                <textarea id="message" rows={5} className="rounded-md border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <button type="button" className="min-h-12 w-fit rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
      <NewsletterSection />
    </main>
  );
}
