import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

export function CampusSearchSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const popularTags = [
    'Engineering Mechanics',
    'TI-84 Calculator',
    'Lab Coat & Goggles',
    'DBMS Notes',
    'Semester Bundles',
  ];

  return (
    <section id="campus-search" className="py-16 md:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Campus Discovery
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            What are you looking for?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mx-auto">
            Find textbooks, calculators, lab gear and course essentials from students on your campus.
          </p>
        </div>

        {/* Refined Search Input Control */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campus resources (textbooks, calculators, lab coats...)"
              className="w-full h-[50px] pl-11 pr-28 rounded-[12px] border border-slate-200 bg-white text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors"
            />
            <button
              type="submit"
              className="group absolute right-1.5 h-[40px] px-[16px] rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Search</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-[2px]" />
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span className="font-medium mr-1 text-slate-400">Popular:</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
              className="rounded-lg bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
