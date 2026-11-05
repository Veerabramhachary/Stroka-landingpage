import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, FileSpreadsheet, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'signup' | 'signin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'glass-nav bg-[#F4F1E9]/90 border-b border-[#E2DED4] shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 tracking-tight group whitespace-nowrap shrink-0 text-[#252922]"
        >
          <div className="w-7 h-7 rounded-lg bg-[#667267] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <span className="w-2 h-2 rounded-full bg-[#FAF9F5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#252922]">
            STROKA
          </span>
          <span className="text-[11px] font-mono font-medium text-[#898A80] hidden sm:inline">
            · INR Ledger
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#65685F]">
          <a
            href="#ledgers"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            Personal & Business Ledgers
          </a>
          <a
            href="#cockpit"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            Ledger Cockpit
          </a>
          <a
            href="#tax-management"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            Tax & GST
          </a>
          <a
            href="#history"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            Billing History
          </a>
          <a
            href="#pricing"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="hover:text-[#252922] transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: Currency indicator + Login + Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* INR Indicator */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold text-[#65685F] bg-[#EDEAE1] rounded-lg border border-[#E2DED4]">
            <span>₹ INR</span>
          </div>

          {/* Login Link */}
          <button
            onClick={() => onOpenAuth('signin')}
            className="hidden sm:inline-block text-xs font-semibold text-[#65685F] hover:text-[#252922] transition-colors px-2 py-1"
          >
            Sign In
          </button>

          {/* Primary Action Button in #667267 Brand Color */}
          <button
            onClick={() => onOpenAuth('signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#667267] hover:bg-[#505D52] active:bg-[#414C43] rounded-xl transition-all shadow-xs whitespace-nowrap"
          >
            <span>Start Tracking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[#E2DED4] text-[#252922]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F1E9] border-b border-[#E2DED4] px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-3.5 text-sm font-medium text-[#252922] mb-5">
            <a
              href="#ledgers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              Personal & Business Ledgers
            </a>
            <a
              href="#cockpit"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              Interactive Cockpit
            </a>
            <a
              href="#tax-management"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              Tax & GST Management
            </a>
            <a
              href="#history"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              Billing History
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#B18B58]"
            >
              FAQ
            </a>
          </div>

          <div className="pt-4 border-t border-[#E2DED4] flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signin');
              }}
              className="flex-1 py-2.5 text-xs font-semibold text-[#252922] bg-[#EDEAE1] rounded-xl border border-[#E2DED4]"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#667267] rounded-xl"
            >
              Start Free Tracking
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
