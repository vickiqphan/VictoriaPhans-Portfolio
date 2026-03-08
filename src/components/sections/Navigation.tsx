export function Navigation({ visible }: { visible: boolean }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference text-white"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}
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
  );
}
