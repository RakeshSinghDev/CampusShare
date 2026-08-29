import React from 'react';
import { AlertCircle } from 'lucide-react';

export function AuthError({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2.5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 font-medium my-2">
      <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
      <span>{message}</span>
    </div>
  );
}
