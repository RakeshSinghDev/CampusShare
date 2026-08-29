import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Laptop,
  FileText,
  PenTool,
  Microscope,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { homeCategories } from '@/data/homeData';

/**
 * CategorySection component for home screen category browsing.
 * Renders compact category cards matching PDF reference (Books, Scientific Calculator, Lab Coat, Electronics).
 */
export function CategorySection({ categories = homeCategories }) {
  const iconMap = {
    BookOpen,
    Calculator,
    FlaskConical,
    Laptop,
    FileText,
    PenTool,
    Microscope,
    Layers,
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Browse Categories</h2>
          <p className="text-xs text-slate-500 font-medium">Explore academic essentials by category</p>
        </div>
        <Link
          to="/search"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-0.5"
        >
          <span>All Categories</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {categories.map((cat) => {
          const Icon = iconMap[cat.iconName] || BookOpen;

          return (
            <Link key={cat.id} to={`/search?category=${cat.id}`} className="group focus:outline-none">
              <Card className="p-3 rounded-2xl border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-subtle transition-all duration-200 hover:-translate-y-[1px] flex flex-col items-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-blue-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </span>
                {cat.count !== undefined && (
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {cat.count} items
                  </span>
                )}
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
