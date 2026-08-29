import React from 'react';
import { Link } from 'react-router-dom';
import { CampusShareLogo } from '@/components/common/CampusShareLogo';

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50/70 pt-10 pb-8 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-200/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-2">
            <CampusShareLogo size="default" linkTo="/" />
            <p className="text-xs text-slate-500 font-normal max-w-sm leading-relaxed">
              Academic resources, shared within the campus community.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li><Link to="/search" className="hover:text-blue-600">Explore Marketplace</Link></li>
              <li><Link to="/search?type=buy" className="hover:text-blue-600">Buy Textbooks & Gear</Link></li>
              <li><Link to="/search?type=rent" className="hover:text-blue-600">Rent for a Semester</Link></li>
              <li><Link to="/sell" className="hover:text-blue-600">Pass On an Item</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
              <li><a href="#campus-trust" className="hover:text-blue-600">Safety</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Account</h4>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li><Link to="/login" className="hover:text-blue-600">Log In</Link></li>
              <li><Link to="/register" className="hover:text-blue-600">Sign Up</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 CampusShare. All rights reserved.</p>
          <p className="text-[11px]">Academic Resources • Student Peer Marketplace</p>
        </div>
      </div>
    </footer>
  );
}
