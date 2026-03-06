import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function PasswordPage({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple check - you can change "clarity" to whatever password you prefer
    if (password.toLowerCase() === 'clarity') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm text-ink flex flex-col justify-center items-center px-6 selection:bg-accent/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <h1 className="text-5xl md:text-6xl font-sans font-black tracking-tighter mb-6 uppercase">
          Off The<br />Record.
        </h1>
        <p className="text-xl font-serif italic text-ink-light mb-12 leading-relaxed">
          Some of my best work is a little camera-shy (and under NDA). If you have the password, come on in.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full bg-transparent border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-ink/20 focus:border-accent'} py-4 pr-12 text-lg font-sans outline-none transition-colors placeholder:text-ink/30`}
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-ink hover:text-accent transition-colors p-2"
            >
              <ArrowRight size={24} />
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs font-bold tracking-[0.1em] uppercase mt-2"
            >
              Incorrect password. Try again.
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
