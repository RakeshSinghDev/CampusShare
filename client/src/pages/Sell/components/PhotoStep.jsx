import React, { useRef, useEffect } from 'react';
import { UploadCloud, Trash2, Star, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/forms/FormField';
import { toast } from 'sonner';

/**
 * Step 1 — Resource Photos Upload & Management.
 * Manages selected File objects, object URL previews, demo photos, cover selection, and memory cleanup.
 */
export function PhotoStep({ photos = [], setPhotos, error }) {
  const fileInputRef = useRef(null);

  // Sample stock images for fast demo testing
  const sampleResourcePhotos = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  ];

  // Clean up object URLs on component unmount
  useEffect(() => {
    return () => {
      photos.forEach((p) => {
        if (p.url && p.url.startsWith('blob:')) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    const validPhotos = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        toast.error(`"${file.name}" is not a supported format. Please select PNG, JPG, or WEBP.`);
        continue;
      }
      if (file.size > maxSizeBytes) {
        toast.error(`"${file.name}" exceeds the 10 MB size limit.`);
        continue;
      }

      validPhotos.push({
        id: `photo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
        isDemo: false,
      });
    }

    if (validPhotos.length === 0) {
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (photos.length + validPhotos.length > 5) {
      toast.error('Maximum 5 photos allowed per listing.');
      const availableSlots = Math.max(0, 5 - photos.length);
      if (availableSlots > 0) {
        const sliced = validPhotos.slice(0, availableSlots);
        setPhotos((prev) => [...prev, ...sliced]);
        toast.info(`Added ${sliced.length} photo(s).`);
      }
    } else {
      setPhotos((prev) => [...prev, ...validPhotos]);
      toast.success(`Added ${validPhotos.length} photo(s).`);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (index) => {
    const target = photos[index];
    if (target && target.url && target.url.startsWith('blob:')) {
      URL.revokeObjectURL(target.url);
    }
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    toast.info('Photo removed.');
  };

  const handleSetPrimary = (index) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
    toast.success('Cover photo updated.');
  };

  const handleAddSamplePhotos = () => {
    const availableSlots = 5 - photos.length;
    if (availableSlots <= 0) {
      toast.error('Maximum 5 photos reached.');
      return;
    }

    const demoToAdd = sampleResourcePhotos.slice(0, availableSlots).map((url, i) => ({
      id: `demo_${Date.now()}_${i}`,
      file: null,
      url,
      isDemo: true,
    }));

    setPhotos((prev) => [...prev, ...demoToAdd]);
    toast.success(`Added ${demoToAdd.length} demo photo(s) for preview!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Resource Photos</h2>
        <p className="text-xs text-slate-500 mt-1">
          Add clear photos of your course textbook, calculator, or lab coat. The first photo will be your main cover image.
        </p>
      </div>

      <FormField error={error}>
        {/* Upload Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed border-slate-200/90 rounded-2xl bg-slate-50/40 text-center hover:bg-blue-50/20 hover:border-blue-300 cursor-pointer transition-all duration-150 group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-105 transition-transform duration-150 mb-3 shadow-2xs">
            <UploadCloud className="h-6 w-6" />
          </div>
          <span className="text-sm font-bold text-slate-900">Tap or click to select photos</span>
          <span className="text-xs text-slate-400 mt-1 font-normal">PNG, JPG, WEBP up to 10 MB (max 5 photos)</span>
        </div>
      </FormField>

      {/* Demo Sample Photos Trigger */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/80 text-xs">
        <span className="text-slate-600 font-medium">Want to test quickly without local files?</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddSamplePhotos}
          disabled={photos.length >= 5}
          className="rounded-lg text-xs bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <ImagePlus className="h-3.5 w-3.5 mr-1" /> Add Demo Photos
        </Button>
      </div>

      {/* Uploaded Photos Grid */}
      {photos.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Uploaded Photos ({photos.length} / 5)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {photos.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs"
              >
                <img src={item.url} alt="" className="h-full w-full object-cover" />

                {/* Primary Cover Badge */}
                {idx === 0 ? (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <Star className="h-3 w-3 fill-current" /> Cover Photo
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    className="absolute top-2 left-2 rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs hover:bg-slate-900"
                  >
                    Make Cover
                  </button>
                )}

                {/* Remove Photo Action */}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-red-600/90 text-white shadow-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Remove photo"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
