import React, { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Image Gallery component with thumbnail selector for product details.
 */
export function ImageGallery({ images = [], className }) {
  const defaultImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Featured Main Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-subtle">
        <img
          src={defaultImages[selectedIndex]}
          alt={`Resource preview ${selectedIndex + 1}`}
          className="h-full w-full object-cover object-center transition-all duration-300"
        />
      </div>

      {/* Thumbnail Selector */}
      {defaultImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {defaultImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                'relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                selectedIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xs'
                  : 'border-slate-200 opacity-70 hover:opacity-100'
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const ProductImageGallery = ImageGallery;
