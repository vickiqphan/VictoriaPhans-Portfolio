import { FadeIn } from '../ui/FadeIn';
import type { SiteSettings } from '../../types';

type Props = {
  settings: Required<SiteSettings>;
};

export function ContactSection({ settings }: Props) {
  return (
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
  );
}
