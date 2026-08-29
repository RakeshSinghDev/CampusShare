import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function ChatSearch({ value, onChange }) {
  return (
    <div className="relative mb-3">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search student, product, or message..."
        className="pl-9 h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
      />
    </div>
  );
}
