import { FadeIn } from '../ui/FadeIn';
import type { CaseStudy } from '../../types';

type Props = {
  caseStudies: CaseStudy[];
};

export function ExperienceSection({ caseStudies }: Props) {
  return (
    <section id="experience" className="py-32 px-6 bg-bg-warm border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-6">02 — Experience</h2>
              <h3 className="text-5xl md:text-7xl font-sans font-black tracking-tighter uppercase">Track Record</h3>
            </div>
            <p className="text-ink-light max-w-md font-serif italic text-lg">
              Some recent work — a few highlights from projects I've loved leading.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-0">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs._id}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 group border-t border-ink py-16${i === caseStudies.length - 1 ? ' border-b' : ''}`}>
                <div className="lg:col-span-4 lg:pr-16">
                  <div className="sticky top-32">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">{cs.dates}</p>
                    <h4 className="text-3xl font-sans font-bold uppercase tracking-tight">{cs.company}</h4>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <h5 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-accent transition-colors">{cs.title}</h5>
                  <p className="text-xl text-ink-light mb-8 leading-relaxed font-light">{cs.summary}</p>
                  {cs.bullets && cs.bullets.length > 0 && (
                    <ul className="space-y-6 text-ink-light">
                      {cs.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-6 items-start">
                          <span className="text-accent font-bold mt-1">—</span>
                          <span className="text-lg">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <div className="py-16 text-center max-w-3xl mx-auto">
              <p className="text-xl text-ink-light font-serif italic">
                These are just a few examples of work I've led — there's much more behind the scenes, across healthcare, insurance, and digital products. Each taught me new ways to create meaningful impact at scale.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
