import React from 'react';
import { Link } from 'react-router-dom';
import { CampusShareLogo } from '@/components/common/CampusShareLogo';
import { ArrowRight } from 'lucide-react';

export function LandingHeader() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        
        {/* LEFT: Authoritative CampusShare Logo */}
        <CampusShareLogo size="header" linkTo="/" />

        {/* CENTER: Understated Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('campus-search')}
            className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600"
          >
            Explore
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('campus-trust')}
            className="hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600"
          >
            Safety
          </button>
        </nav>

        {/* RIGHT: Text Log In & Refined 44px Get Started Primary CTA */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="group inline-flex items-center justify-center gap-2 h-[44px] px-[20px] rounded-[10px] bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600/30"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-[2px]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
