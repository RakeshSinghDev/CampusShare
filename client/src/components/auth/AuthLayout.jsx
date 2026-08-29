import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ShieldCheck } from 'lucide-react';

export function AuthLayout({ title, subtitle, children }) {
  return (
    <PageContainer className="py-8 sm:py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          <span>Verified Student Marketplace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="w-full">
        {children}
      </div>
    </PageContainer>
  );
}
