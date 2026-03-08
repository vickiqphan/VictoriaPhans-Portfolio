import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy, SiteSettings } from '../../types';

type Props = {
  settings: Required<SiteSettings>;
  caseStudies: CaseStudy[];
};

export function HeroSection({ settings, caseStudies }: Props) {
  const previewCards = caseStudies.slice(0, 3);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden bg-bg-warm">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-6xl"
        >
          <h1 className="text-[14vw] md:text-[10vw] font-sans font-black leading-[0.85] tracking-tighter mb-6 uppercase text-ink">
            {settings.heroTagline}
          </h1>
          <h2 className="text-3xl md:text-6xl font-serif italic text-ink-light mb-12">
            {settings.heroSubtitle}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-24">
            <p className="text-xs md:text-sm text-ink font-bold max-w-sm leading-relaxed tracking-[0.15em] uppercase">
              {settings.heroBlurb}
            </p>
            <div className="flex flex-col gap-4">
              <a href="#experience" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group">
                See my work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group">
                Let's talk <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* About Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-3xl mb-32"
        >
          {settings.aboutParagraphs.slice(0, 2).map((p, i) => (
            <p key={i} className="text-xl md:text-2xl font-serif leading-relaxed text-ink-light mb-6">
              {p}
            </p>
          ))}
          <a href="#about" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group">
            A bit more about me <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Featured Work Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewCards.map((cs) => (
              <a key={cs._id} href="#experience" className="group block border border-ink/10 p-8 hover:border-accent transition-colors bg-white">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">{cs.company} · {cs.dates}</p>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">{cs.title}</h3>
                <p className="text-ink-light font-light leading-relaxed mb-8">{cs.summary}</p>
                <div className="text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
                  Read the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
