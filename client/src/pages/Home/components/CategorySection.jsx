import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

/**
 * Academic Category Navigation Section.
 */
export function CategorySection({ categories }) {
  return (
    <section className="mb-8">
      <SectionHeader
        title="Browse Categories"
        subtitle="Explore resources by academic field & campus supply type"
        action={
          <Link
            to="/search"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* Horizontal Scroll on Mobile / Flex-wrap Grid on Desktop */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar md:grid md:grid-cols-4 lg:grid-cols-8 md:overflow-visible">
        {categories.map((cat) => {
          const Icon = Icons[cat.iconName] || Icons.BookOpen;

          return (
            <Link
              key={cat.id}
              to={`/search?category=${cat.id}`}
              className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 text-center shrink-0 w-28 md:w-auto snap-start shadow-2xs hover:border-blue-300 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative mb-2.5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
                {cat.badge && (
                  <span className="absolute -top-1.5 -right-1.5 rounded-full bg-emerald-500 px-1.5 py-0.2 text-[9px] font-bold text-white shadow-2xs">
                    {cat.badge}
                  </span>
                )}
              </div>

              <span className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </span>
              <span className="mt-0.5 text-[10px] text-slate-400 font-medium">
                {cat.count} items
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
