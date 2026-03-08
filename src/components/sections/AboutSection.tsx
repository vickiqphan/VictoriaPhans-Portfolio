import { FadeIn } from '../ui/FadeIn';
import type { SiteSettings } from '../../types';

type Props = {
  settings: Required<SiteSettings>;
};

export function AboutSection({ settings }: Props) {
  return (
    <section id="about" className="py-32 px-6 bg-white border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-6">01 — The Approach</h2>
              <p className="text-3xl md:text-4xl font-serif leading-snug">
                "I build products people actually use."
              </p>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <div className="prose prose-lg text-ink-light font-light leading-relaxed mb-16">
                {settings.aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                <FadeIn delay={0.1}>
                  <div className="border-t border-ink pt-6 group">
                    <h3 className="text-xl font-sans font-bold tracking-tight uppercase mb-3 group-hover:text-accent transition-colors">Human at scale</h3>
                    <p className="text-ink-light leading-relaxed font-serif">The products I'm most proud of are the ones where someone — a clinician, a patient, or a small business owner — felt like it was made for them. That's not easy at scale, but it's worth caring about.</p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div className="border-t border-ink pt-6 group">
                    <h3 className="text-xl font-sans font-bold tracking-tight uppercase mb-3 group-hover:text-accent transition-colors">Strategic clarity</h3>
                    <p className="text-ink-light leading-relaxed font-serif">I help teams see the bigger picture without losing the thread of what we're actually building. Sometimes that's a three-year vision. Sometimes it's asking why a button label is confusing. Usually both, in the same week.</p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="border-t border-ink pt-6 group">
                    <h3 className="text-xl font-sans font-bold tracking-tight uppercase mb-3 group-hover:text-accent transition-colors">Collaborative momentum</h3>
                    <p className="text-ink-light leading-relaxed font-serif">The work I'm proud of is genuinely shared. I bring people with me — engineering, design, data, leadership — not just align them. There's a difference, and it shows in the product.</p>
                  </div>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <div className="border-t border-ink pt-6 group">
                    <h3 className="text-xl font-sans font-bold tracking-tight uppercase mb-3 group-hover:text-accent transition-colors">Always growing</h3>
                    <p className="text-ink-light leading-relaxed font-serif">I'm still learning. That part hasn't changed.</p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
