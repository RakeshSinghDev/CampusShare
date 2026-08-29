/**
 * Status tokens, badges, and condition definitions.
 */

export const LISTING_TYPES = {
  SELL: 'buy',
  RENT: 'rent',
  BOTH: 'both',
};

export const STATUS_CONFIG = {
  available: {
    label: 'Available',
    variant: 'success',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  rented: {
    label: 'Rented',
    variant: 'info',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  pending: {
    label: 'Pending Pickup',
    variant: 'warning',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  sold: {
    label: 'Sold',
    variant: 'neutral',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

export const CONDITION_LABELS = {
  like_new: 'Like New',
  good: 'Good Condition',
  fair: 'Fair / Usable',
};
