import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/**
 * Category Card component for browsing resources by academic category.
 */
export function CategoryCard({ category, className }) {
  const IconComponent = Icons[category.iconName] || Icons.BookOpen;

  return (
    <Link
      to={`/search?category=${category.id}`}
      className={cn(
        'group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle hover:shadow-card-hover hover:border-blue-200 transition-all duration-200 hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <IconComponent className="h-6 w-6" />
        </div>
        {category.badgeText && (
          <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[11px] font-medium border-none">
            {category.badgeText}
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-base">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
        <span>{category.count} listings</span>
        <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
          Browse &rarr;
        </span>
      </div>
    </Link>
  );
}
