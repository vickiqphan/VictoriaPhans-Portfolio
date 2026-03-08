import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import PasswordPage from './components/PasswordPage';

function FadeIn({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

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

  if (!isAuthenticated) {
    return <PasswordPage onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-bg-warm text-ink selection:bg-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 lg:px-6 py-6 mix-blend-difference text-white" style={{ transform: navVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}>
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
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-12 lg:px-6 pt-24 pb-12 overflow-hidden bg-bg-warm">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <h1 className="text-[14vw] md:text-[10vw] font-sans font-black leading-[0.85] tracking-tighter mb-6 uppercase text-ink">
              Clarity in<br />
              Complexity.
            </h1>
            <h2 className="text-3xl md:text-6xl font-serif italic text-ink-light mb-12">
              Humanity in scale.
            </h2>
            <div className="flex flex-col gap-4 mb-12">
              <a href="#experience" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group w-max">
                See my work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group w-max">
                Let's talk <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* About Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl mb-32"
          >
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink-light mb-6">
              I build products for millions of people — and I think about each and every one of them.
            </p>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink-light mb-6">
              I'm a Senior Product Manager with a soft spot for hard problems — the ones that live inside large, complicated systems and affect real people in ways that aren't obvious from a roadmap.
            </p>
            <p className="text-xl md:text-2xl font-serif leading-relaxed text-ink-light mb-8">
              Right now, I lead the Agentic AI and Innovation teams at TELUS Health, building intelligent systems designed to fundamentally change how clinicians work.
            </p>
            <a href="#about" className="text-xs font-bold tracking-[0.2em] uppercase hover:text-accent transition-colors flex items-center gap-2 group">
              A bit more about me <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Featured Work Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <a href="#experience" className="group flex flex-col h-full border border-ink/10 p-8 hover:border-accent transition-colors bg-white">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">TELUS Health · 2023 — Present</p>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">Inbox Triage: First GenAI in our EMR</h3>
                <p className="text-ink-light font-light leading-relaxed mb-8">
                  Clinicians were drowning in inbox messages—lab results, imaging reports, consult notes. The challenge wasn't just automation, but doing it safely, accurately, and in a way clinicians could trust.
                </p>
                <div className="mt-auto text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
                  Read the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Card 2 */}
              <a href="#experience" className="group flex flex-col h-full border border-ink/10 p-8 hover:border-accent transition-colors bg-white">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">TELUS Health · 2023 — Present</p>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">Agentic AI: Changing how clinicians work</h3>
                <p className="text-ink-light font-light leading-relaxed mb-8">
                  Assistive AI reduces clicks. Agentic AI changes workflows. The challenge was designing AI that could reshape clinical workflows while remaining safe, reliable, and trusted by clinicians.
                </p>
                <div className="mt-auto text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
                  Read the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Card 3 */}
              <a href="#experience" className="group flex flex-col h-full border border-ink/10 p-8 hover:border-accent transition-colors bg-white">
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">Pacific Blue Cross · 2019 — 2023</p>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-accent transition-colors">Rethinking insurance for small businesses</h3>
                <p className="text-ink-light font-light leading-relaxed mb-8">
                  Small businesses are often overlooked in insurance design. Our SMB portfolio had high churn and low adoption, so we redesigned the product specifically for their unique needs.
                </p>
                <div className="mt-auto text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-accent transition-colors">
                  Read the case study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Message / About */}
      <section id="about" className="py-32 px-8 md:px-12 lg:px-6 bg-white border-t border-ink/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-6">01 — ABOUT ME</h2>
                <p className="text-3xl md:text-4xl font-serif leading-snug">
                  I build products that people rely on.
                </p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <div className="text-lg text-ink-light font-light leading-relaxed mb-16 space-y-8">
                  <p>
                    I build products that work for real people — inside organizations that aren't always designed to make that easy.
                  </p>
                  <p>
                    Before product, I studied Molecular Biology and Entrepreneurship at Simon Fraser University, which, in many ways, is about understanding complex systems and figuring out where to intervene.
                  </p>
                  <p>
                    Since then, I've explored that from a few different angles. I built digital products and led new business at Tribal DDB in London. At Pacific Blue Cross, I led Product and Innovation. At TELUS Health, I'm a Principal Product Manager, leading Agentic AI and AI platform initiatives.
                  </p>
                  <p>
                    Across all of it, the work has been the same: finding the real problem, aligning teams around a solution, and turning ideas into products people actually use.
                  </p>
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
      <section id="experience" className="py-32 px-8 md:px-12 lg:px-6 bg-bg-warm border-t border-ink/10">
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
              {/* Role 1 */}
              <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 group border-t border-ink py-16">
                  <div className="lg:col-span-4 lg:pr-16">
                    <div className="sticky top-32">
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">2023 — Present</p>
                      <h4 className="text-3xl font-sans font-bold uppercase tracking-tight">Telus Health</h4>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <h5 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-accent transition-colors">Inbox Triage: The first GenAI in our EMR</h5>
                    <div className="text-xl text-ink-light mb-8 leading-relaxed font-light space-y-4">
                      <p>Clinicians were drowning in documents — lab results, consult notes, patient messages. The opportunity wasn't just automation. It was introducing generative AI into a regulated clinical system for the first time, in a way that clinicians could actually trust.</p>
                    </div>
                    <ul className="space-y-6 text-ink-light">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">I led the product from 0→1 — defining where GenAI could responsibly operate inside the EMR, shaping the workflow, and establishing the validation model with human oversight. The goal wasn't just accuracy. It was creating a feature clinicians would adopt inside their daily practice.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">Alongside the product, I worked with leadership and commercial teams to design the pricing and packaging model that allowed the feature to launch sustainably.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">2.4M+ documents processed with 96% validated accuracy. The first GenAI feature in our EMR — proving the technology could scale safely inside clinical workflows.</span>
                      </li>
                    </ul>

                    <div className="mt-10 mb-6 bg-ink/5 border border-ink/10 rounded-xl overflow-hidden aspect-video flex items-center justify-center relative">
                      <video
                        src="/CHR AI - Inbox triage.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <h5 className="text-2xl md:text-3xl font-serif mt-16 mb-6 group-hover:text-accent transition-colors">Agentic AI: Changing how clinicians work</h5>
                    <div className="text-xl text-ink-light mb-8 leading-relaxed font-light space-y-4">
                      <p>Most healthcare AI today is assistive — it reduces clicks or summarizes information. Useful, but incremental.</p>
                      <p>Agentic AI is different. It changes workflows.</p>
                      <p>Instead of simply helping clinicians navigate the system, these agents actively perform work across documentation, billing, and chart review — reshaping how care teams interact with the EMR.</p>
                    </div>
                    <ul className="space-y-6 text-ink-light">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">I led the 0→1 strategy and product development for our agentic AI platform. That meant identifying the highest-impact workflows, defining what autonomous actions should look like in a clinical setting, and working closely with engineering, clinical UX, and compliance to design the guardrails needed to deploy responsibly.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">The focus wasn't just capability — it was trust, adoption, and measurable workflow impact.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">Early beta agents have already generated 2.2K+ accepted AI suggestions, showing clinicians are willing to let AI participate directly in their workflow.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">Commercially, the platform launched with pricing and packaging tied to clinic size and workflow volume — reaching 25% attach rate in new sales and $1.5M+ ARR in its first year.</span>
                      </li>
                    </ul>
                    <div className="mt-10 mb-6 bg-ink/5 border border-ink/10 rounded-xl overflow-hidden aspect-video">
                      <video
                        src="/CHR Agentic AI.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Role 2 */}
              <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 group border-t border-ink py-16">
                  <div className="lg:col-span-4 lg:pr-16">
                    <div className="sticky top-32">
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">2019 — 2023</p>
                      <h4 className="text-3xl font-sans font-bold uppercase tracking-tight">Pacific Blue Cross</h4>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <h5 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-accent transition-colors">Redesigning SMB Benefits for solopreneurs, contractors, and micro-businesses</h5>
                    <div className="text-xl text-ink-light mb-8 leading-relaxed font-light space-y-4">
                      <p>Small businesses are often an afterthought in benefits design. Most plans are built for large employers, leaving solopreneurs, contractors, and very small teams with products that don't actually fit how they work.</p>
                      <p>Our SMB portfolio had growing churn and stagnant growth — a signal that the product itself needed to change.</p>
                    </div>
                    <ul className="space-y-6 text-ink-light mb-8">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">I led the end-to-end redesign of the SMB benefits portfolio, rethinking plan structures, coverage options, and pricing models to better serve businesses with 1–3 employees, contractors, and independent workers.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">The work required aligning across pricing, actuarial, underwriting, operations, and sales to ensure the new plans were viable from both a risk and commercial perspective.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">We also introduced new benefits — including virtual care and expanded mental health coverage — designed to meet the expectations of modern small businesses.</span>
                      </li>
                    </ul>
                    <ul className="space-y-6 text-ink-light">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">The redesigned portfolio delivered 70% YoY sales growth, while the new virtual care benefit reduced employer churn by 25% and increased sales 40% YoY.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

              {/* Role 3 */}
              <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 group border-t border-ink py-16 border-b">
                  <div className="lg:col-span-4 lg:pr-16">
                    <div className="sticky top-32">
                      <p className="text-xs font-bold tracking-[0.2em] uppercase text-ink-light mb-4">2016 — 2019</p>
                      <h4 className="text-3xl font-sans font-bold uppercase tracking-tight">Tribal DDB</h4>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <h5 className="text-2xl md:text-3xl font-serif mb-6 group-hover:text-accent transition-colors">New business, digital products, new city</h5>
                    <div className="text-xl text-ink-light mb-8 leading-relaxed font-light space-y-4">
                      <p>At Tribal DDB London, I owned client accounts end-to-end while leading digital product development.</p>
                      <p>New business in an agency is a strange discipline — you're asking people to believe in ideas before they exist.</p>
                      <p>My role sat at the intersection of strategy, product, and delivery: shaping the ideas we pitched, working with creative and technology teams to define the products behind them, and then helping bring those products to life once we won the work.</p>
                    </div>
                    <ul className="space-y-6 text-ink-light mb-8">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">I partnered closely with UX, engineering, and creative teams to design and launch digital experiences for global brands including Disney, Volkswagen, and GSK — bridging concept development with real product execution.</span>
                      </li>
                    </ul>
                    <ul className="space-y-6 text-ink-light">
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">Over three years, this approach generated £20M+ in new business and several multi-year client partnerships.</span>
                      </li>
                      <li className="flex gap-6 items-start">
                        <span className="text-accent font-bold mt-1">—</span>
                        <span className="text-lg">More importantly, it taught me how to align teams around a vision, tell a story people believe in, and turn early concepts into products people actually use.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </FadeIn>

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
      <section id="contact" className="py-32 px-8 md:px-12 lg:px-6 bg-ink text-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
              <div>
                <h2 className="text-[10vw] md:text-[6vw] font-sans font-black leading-[0.85] tracking-tighter uppercase mb-8">
                  Let's<br />Talk.
                </h2>
                <p className="text-xl text-white/70 font-serif italic max-w-md">
                  I'm happy to connect — whether you're curious about the work, want to talk through a product problem, or just want to compare notes on building responsibly in healthcare.
                </p>
              </div>
              <div className="flex flex-col justify-end gap-8">
                <a href="mailto:victoria.q.phan@gmail.com" className="group flex items-center justify-between border-b border-white/20 pb-6 hover:border-accent transition-colors">
                  <span className="text-2xl font-sans font-bold tracking-tight uppercase">Email</span>
                  <span className="text-lg font-serif italic text-white/70 group-hover:text-accent transition-colors">victoria.q.phan@gmail.com</span>
                </a>
                <div className="flex items-center justify-between border-b border-white/20 pb-6">
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
