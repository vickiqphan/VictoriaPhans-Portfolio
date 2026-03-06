import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { client } from './lib/sanityClient';
import PasswordPage from './PasswordPage';

// ─── Types ────────────────────────────────────────────────────────────────────

type SiteSettings = {
  heroTagline?: string;
  heroSubtitle?: string;
  heroBlurb?: string;
  aboutParagraphs?: string[];
  contactText?: string;
};

type CaseStudy = {
  _id: string;
  title: string;
  company: string;
  dates: string;
  category?: string;
  summary: string;
  bullets?: string[];
  order?: number;
};

// ─── Hardcoded fallbacks ───────────────────────────────────────────────────────

const DEFAULT_SETTINGS: Required<SiteSettings> = {
  heroTagline: 'Clarity in Complexity.',
  heroSubtitle: 'Humanity in scale.',
  heroBlurb: 'I build products for millions of people — and I still think about each one of them.',
  aboutParagraphs: [
    'I build products that work for real people — inside organizations that aren\'t always designed to make that easy. That\'s what drew me to product in the first place: solving hard problems at scale without losing sight of the humans who actually use the product.',
    'Before product, I studied Molecular Biology and Entrepreneurship at SFU — which is really about understanding complex systems and figuring out where to intervene. I\'ve tried a few ways of doing that: business development, agency work in London, and now healthcare product management. Each chapter taught me something about strategy, collaboration, and making ideas real.',
    'At TELUS Health, I lead AI strategy for clinicians. At Pacific Blue Cross, I redesigned SMB benefits for micro-businesses and solopreneurs. At Tribal DDB, I built a new business function and led digital product development — helping clients believe in ideas before they existed and turning concepts into tangible experiences. Across all of it, the lesson has been the same: good product starts with listening, seeing clearly, and moving carefully — but confidently.',
  ],
  contactText: 'I\'m happy to connect — whether you\'re curious about the work, want to talk through a product problem, or just want to compare notes on building responsibly in healthcare.',
};

const DEFAULT_CASE_STUDIES: CaseStudy[] = [
  {
    _id: 'telus-1',
    title: 'Inbox Triage: The first GenAI in our EMR',
    company: 'Telus Health',
    dates: '2023 — Present',
    summary: 'Clinicians were drowning in documents — lab results, consult notes, patient messages. The challenge wasn\'t just automating tasks; it was doing it safely, accurately, and in a way that clinicians would actually trust.',
    bullets: [
      'I led the product strategy, deciding where GenAI could responsibly operate, how to validate it, and how to integrate human oversight. We also created the commercial packaging to make it sustainable.',
      '2.4M+ documents processed with 96% validated accuracy. This first GenAI feature proved the technology could scale safely inside a regulated clinical system.',
    ],
    order: 1,
  },
  {
    _id: 'telus-2',
    title: 'Agentic AI: Changing how clinicians work',
    company: 'Telus Health',
    dates: '2023 — Present',
    summary: 'Assistive AI reduces clicks. Agentic AI changes workflows. We designed AI to actively reshape documentation, billing, and chart review, with safe guardrails built in.',
    bullets: [
      'I defined the 0→1 product vision, identified high-impact use cases, and set adoption and trust as primary measures of success. Partnering across engineering, clinical UX, and compliance, we turned strategy into reality.',
      '2.2K+ accepted AI suggestions in early beta — moving AI from a helper to a workflow-transformer.',
      'Commercial impact: By designing pricing and packaging around clinic size and workflow volume, AI achieved a 25% attach rate in new sales and $1.5M+ ARR in year one.',
    ],
    order: 2,
  },
  {
    _id: 'pbc-1',
    title: 'SMB Benefits: Insurance for Solopreneurs and Contractors',
    company: 'Pacific Blue Cross',
    dates: '2019 — 2023',
    summary: 'Small businesses often get overlooked in insurance plan design. Our SMB benefits portfolio was misaligned, with high churn and low adoption.',
    bullets: [
      'I led the strategic redesign, introducing flexible plan designs, virtual care benefits, mental health coverage, and options for solopreneurs and contractors — all while collaborating with pricing, actuarial, underwriting, operations, and sales to ensure feasibility, compliance, and profitability.',
      'The redesigned portfolio drove 70% YoY sales growth, and the virtual care benefit reduced employer churn by 25% while increasing sales 40% YoY.',
      'Even in a regulated environment, thoughtful, human-centered plan design drives adoption, retention, and real business outcomes.',
    ],
    order: 3,
  },
  {
    _id: 'tribal-1',
    title: 'New business, digital products, new city',
    company: 'Tribal DDB',
    dates: '2016 — 2019',
    summary: 'At Tribal DDB London, I owned client accounts end-to-end while leading digital product development. The challenge: get people to believe in ideas that didn\'t exist yet, and then turn those ideas into tangible digital experiences.',
    bullets: [
      'I partnered with creative, UX, and tech teams to define concepts, pitch them to clients, and bring them to life — bridging strategy, design, and execution in a way that felt human and credible.',
      'Over three years, this approach generated £20M+ in new business and multi-year contracts with Disney, Volkswagen, and GSK. Beyond the numbers, it taught me how to storytell, align cross-functionally, and turn concepts into products people actually use — lessons I carry into every product I lead.',
    ],
    order: 4,
  },
];

// ─── Components ───────────────────────────────────────────────────────────────


function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  const [unlocked, setUnlocked] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [settings, setSettings] = useState<Required<SiteSettings>>(DEFAULT_SETTINGS);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(DEFAULT_CASE_STUDIES);

  useEffect(() => {
    client.fetch<SiteSettings>('*[_type == "siteSettings"][0]').then((data) => {
      if (data) setSettings({ ...DEFAULT_SETTINGS, ...data });
    });

    client.fetch<CaseStudy[]>('*[_type == "caseStudy"] | order(order asc)').then((data) => {
      if (data && data.length > 0) setCaseStudies(data);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        setNavVisible(true);
      } else if (currentY < lastScrollY.current) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current) {
        setNavVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const previewCards = caseStudies.slice(0, 3);

  if (!unlocked) {
    return <PasswordPage onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg-warm text-ink selection:bg-accent/20">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference text-white"
        style={{ transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img src="/victoria-wordmark.png" alt="Victoria" className="h-20 md:h-28 w-auto invert object-contain -my-6" />
          <div className="hidden md:flex gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#experience" className="hover:opacity-70 transition-opacity">Experience</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* About */}
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

      {/* Experience Section */}
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

      {/* Contact / Footer */}
      <section id="contact" className="py-32 px-6 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
              <div>
                <h2 className="text-[10vw] md:text-[6vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-8">
                  Let's<br />Talk.
                </h2>
                <p className="text-xl text-white/70 font-serif italic max-w-md">
                  {settings.contactText}
                </p>
              </div>
              <div className="flex flex-col justify-end gap-8">
                <a href="mailto:victoria.q.phan@gmail.com" className="group flex items-center justify-between border-b border-white/20 pb-6 hover:border-accent transition-colors">
                  <span className="text-2xl font-sans font-bold tracking-tight uppercase">Email</span>
                  <span className="text-lg font-serif italic text-white/70 group-hover:text-accent transition-colors">victoria.q.phan@gmail.com</span>
                </a>
                <div className="group flex items-center justify-between border-b border-white/20 pb-6">
                  <span className="text-2xl font-sans font-bold tracking-tight uppercase">Location</span>
                  <span className="text-lg font-serif italic text-white/70">Vancouver, BC</span>
                </div>
                <a href="https://linkedin.com/in/victoriaqphan" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between border-b border-white/20 pb-6 hover:border-accent transition-colors">
                  <span className="text-2xl font-sans font-bold tracking-tight uppercase">LinkedIn</span>
                  <span className="text-lg font-serif italic text-white/70 group-hover:text-accent transition-colors">linkedin.com/in/victoriaqphan</span>
                </a>
              </div>
            </div>

            <div className="pt-12 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-8">
              <img src="/victoria-wordmark.png" alt="Victoria" className="h-24 md:h-40 w-auto invert opacity-50 object-contain -my-10" />
              <p className="text-white/50 text-sm font-bold tracking-[0.2em] uppercase text-center md:text-right">
                If you've made it this far —<br />I'd love to hear from you
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
