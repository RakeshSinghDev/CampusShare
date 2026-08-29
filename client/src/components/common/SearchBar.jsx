import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';

/**
 * SearchBar component for header & search page.
 */
export function SearchBar({
  placeholder = 'Search campus textbooks, gear...',
  defaultValue = '',
  onSearch,
  showCategoryDropdown = false,
  className,
}) {
  const [query, setQuery] = useState(defaultValue);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('', selectedCategory);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query, selectedCategory);
    } else {
      const searchUrl = `/search?q=${encodeURIComponent(query)}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}`;
      navigate(searchUrl);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 p-1.5 shadow-2xs focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15 transition-all',
        className
      )}
    >
      {/* Search Icon */}
      <div className="pl-2.5 pr-1 text-slate-400">
        <Search className="h-4.5 w-4.5" />
      </div>

      {/* Main Text Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search campus resources"
        className="w-full bg-transparent px-2 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />

      {/* Clear Button */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search query"
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Optional Category Select Pill */}
      {showCategoryDropdown && (
        <div className="hidden sm:flex items-center border-l border-slate-200 pl-2 ml-1">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer pr-1"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Search Submit Button */}
      <button
        type="submit"
        className="ml-1 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 transition-colors shrink-0"
      >
        Search
      </button>
    </form>
  );
}
