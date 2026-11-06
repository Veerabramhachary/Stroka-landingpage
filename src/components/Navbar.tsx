import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Cockpit', href: '#cockpit' },
    { label: 'Features', href: '#capabilities' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F1E9]/95 backdrop-blur-md border-b border-[#E2DED4] shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 tracking-tight group whitespace-nowrap shrink-0 text-[#252922]"
        >
          <Logo size={28} className="group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold tracking-tight text-[#252922]">
            STROKA
          </span>
          <span className="text-[11px] font-mono font-medium text-[#898A80] hidden sm:inline">
            · INR Ledger
          </span>
        </a>

        {/* Zone 2: Navigation Links (Clean & working section anchors only) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#65685F]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0 relative py-1 text-[13px] hover:-translate-y-0.5 duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Currency indicator + Login + Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* INR Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-[#65685F] bg-[#EDEAE1] rounded-lg border border-[#E2DED4]">
            <span>₹ INR</span>
          </div>

          {/* Login Link */}
          <button
            type="button"
            onClick={() => onOpenAuth('signin')}
            className="hidden sm:inline-block text-xs font-semibold text-[#65685F] hover:text-[#252922] transition-colors px-2 py-1"
          >
            Sign In
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => onOpenAuth('signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] rounded-xl transition-all shadow-xs whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Tracking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E2DED4] text-[#252922] hover:bg-[#EDEAE1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Menu Drawer using Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#F4F1E9] border-b border-[#E2DED4] overflow-hidden shadow-lg"
          >
            <div className="px-6 py-5">
              <div className="flex flex-col gap-3 text-sm font-medium text-[#252922] mb-5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.18 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 hover:text-[#B18B58] transition-colors border-b border-[#E2DED4]/50 flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#898A80] font-mono">→</span>
                  </motion.a>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E2DED4] flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signin');
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-[#252922] bg-[#EDEAE1] hover:bg-[#FAF9F5] rounded-xl border border-[#E2DED4] transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#667267] hover:bg-[#505D52] rounded-xl transition-colors shadow-2xs"
                >
                  Start Free Tracking
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
