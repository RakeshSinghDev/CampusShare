import React from 'react';

export function RentalHeader({ activeCount = 0 }) {
  return (
    <div className="mb-6 pb-4 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Rentals Dashboard
        </h1>
        <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-700 border border-purple-200/80">
          {activeCount} {activeCount === 1 ? 'active rental' : 'active rentals'}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 mt-1">
        Manage academic resources you're currently renting, check return due dates & pickup locations.
      </p>
    </div>
  );
}
