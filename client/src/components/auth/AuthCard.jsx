import React from 'react';

export function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-4">
      {children}
    </div>
  );
}
