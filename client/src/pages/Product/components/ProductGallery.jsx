import React, { useState } from 'react';
import { Maximize2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/**
 * Product Photo Gallery with thumbnail bar & lightbox modal preview.
 */
export function ProductGallery({ images = [] }) {
  const imageList = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % imageList.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Container */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-subtle cursor-pointer"
      >
        <img
          src={imageList[selectedIndex]}
          alt={`Resource preview ${selectedIndex + 1}`}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating Controls & Badge Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            {selectedIndex + 1} / {imageList.length}
          </span>

          <button
            onClick={() => setIsLightboxOpen(true)}
            className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur-sm hover:bg-white hover:text-blue-600 transition-all active:scale-90"
            title="Expand Photo"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Carousel Prev/Next Buttons (if > 1 image) */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:text-blue-600 transition-all"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-md backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white hover:text-blue-600 transition-all"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Bar */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                'relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                selectedIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xs scale-105'
                  : 'border-slate-200 opacity-60 hover:opacity-100'
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-2 bg-slate-950 border-slate-800">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-black">
            <img
              src={imageList[selectedIndex]}
              alt="Enlarged resource view"
              className="h-full w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
