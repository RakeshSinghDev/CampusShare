import React from 'react';

export function FormField({ label, required, error, helperText, children }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}
      {error && (
        <p className="text-[11px] font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}
