import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { Toaster } from 'sonner';

/**
 * Main Application Shell wrapper for CampusShare.
 */
export function AppShell() {
  const { pathname } = useLocation();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Toast Notifications Provider */}
      <Toaster position="top-right" richColors closeButton />

      {/* Desktop Navigation */}
      <DesktopHeader />

      {/* Mobile Top Header */}
      <MobileHeader />

      {/* Main Dynamic View Content */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
