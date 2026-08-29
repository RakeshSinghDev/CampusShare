import React from 'react';

export function SecondaryButton({
  children,
  onClick,
  leftIcon: LeftIcon,
  className = '',
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors disabled:opacity-50 ${className}`}
    >
      {LeftIcon && <LeftIcon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
