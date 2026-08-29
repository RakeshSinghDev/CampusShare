import React from 'react';

export function PasswordStrength({ password = '' }) {
  if (!password) return null;

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100 gap-1">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 transition-all duration-300 ${
              step <= strength ? colors[strength - 1] : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <p className="text-[10px] font-semibold text-slate-500 text-right">
        Strength: <span className="text-slate-700">{labels[strength - 1] || 'Weak'}</span>
      </p>
    </div>
  );
}
