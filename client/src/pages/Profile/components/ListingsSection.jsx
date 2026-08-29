import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, PauseCircle, PlayCircle, Trash2, Eye, Heart, PlusCircle, Package } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { EmptyState } from '@/components/common/EmptyState';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

/**
 * Manage User Listings Section.
 */
export function ListingsSection({ listings = [], onUpdateListings }) {
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No active listings yet"
        description="List your unused textbooks, calculators, or lab coats to earn or help campus peers."
        actionLabel="List a Resource"
        onAction={() => window.location.assign('/sell')}
      />
    );
  }

  const handleTogglePause = (id) => {
    const updated = listings.map((item) => {
      if (item.id === id) {
        const isPaused = item.status === 'paused';
        const newStatus = isPaused ? 'available' : 'paused';
        toast.info(isPaused ? 'Listing resumed & visible to campus' : 'Listing paused');
        return { ...item, status: newStatus };
      }
      return item;
    });
    onUpdateListings(updated);
  };

  const handleConfirmDelete = () => {
    if (!deleteTargetId) return;
    const updated = listings.filter((item) => item.id !== deleteTargetId);
    onUpdateListings(updated);
    setDeleteTargetId(null);
    toast.success('Listing removed from your account');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((item) => (
          <Card key={item.id} className="rounded-2xl border-slate-200 bg-white overflow-hidden shadow-subtle flex flex-col justify-between">
            <CardContent className="p-4 sm:p-5">
              <div className="flex gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-20 w-20 rounded-xl object-cover bg-slate-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <StatusBadge status={item.status} />
                    <span className="text-[11px] text-slate-400 font-medium">{item.createdAt}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                    <Link to={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </h3>

                  <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                    <PriceDisplay
                      buyPrice={item.buyPrice}
                      rentPrice={item.rentPrice}
                      rentPeriod={item.rentPeriod}
                      listingType={item.listingType}
                      size="sm"
                    />

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{item.viewsCount}</span>
                      <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{item.savesCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listing Management Action Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link to="/sell" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full rounded-xl text-xs gap-1">
                    <Edit3 className="h-3.5 w-3.5" /> Edit
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePause(item.id)}
                  className="flex-1 rounded-xl text-xs gap-1"
                >
                  {item.status === 'paused' ? (
                    <>
                      <PlayCircle className="h-3.5 w-3.5 text-emerald-600" /> Resume
                    </>
                  ) : (
                    <>
                      <PauseCircle className="h-3.5 w-3.5 text-amber-600" /> Pause
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteTargetId(item.id)}
                  className="rounded-xl text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                  title="Delete listing"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Listing?"
        description="Are you sure you want to delete this listing? This action cannot be undone."
        confirmLabel="Delete Listing"
        isDestructive
      />
    </div>
  );
}
