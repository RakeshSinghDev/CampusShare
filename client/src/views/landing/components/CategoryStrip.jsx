import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Laptop,
  FileText,
  PenLine,
  Package,
} from 'lucide-react';

export function CategoryStrip() {
  const categories = [
    { name: 'Books', icon: BookOpen, path: '/search?category=books' },
    { name: 'Scientific Calculators', icon: Calculator, path: '/search?category=calculators' },
    { name: 'Lab Gear', icon: FlaskConical, path: '/search?category=lab-coats' },
    { name: 'Electronics', icon: Laptop, path: '/search?category=electronics' },
    { name: 'Study Notes', icon: FileText, path: '/search?category=notes' },
    { name: 'Stationery', icon: PenLine, path: '/search?category=stationery' },
    { name: 'Semester Bundles', icon: Package, path: '/search?category=bundles' },
  ];

  return (
    <section className="py-6 border-b border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1 text-xs font-bold">
          <span className="text-slate-400 uppercase tracking-wider text-[10px] shrink-0 mr-1">
            Categories
          </span>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                to={cat.path}
                className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white px-3.5 py-2 text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:shadow-2xs transition-all whitespace-nowrap shrink-0"
              >
                <Icon className="h-4 w-4 text-blue-600" />
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
