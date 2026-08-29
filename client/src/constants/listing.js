import { CATEGORIES } from './categories';

export { CATEGORIES };

export const LISTING_MODES = {
  SELL: 'buy',
  RENT: 'rent',
  BOTH: 'both',
};

export const CONDITION_OPTIONS = [
  {
    id: 'like_new',
    label: 'Like New',
    description: 'Barely used, clean, no defects, original packaging if applicable',
  },
  {
    id: 'good',
    label: 'Good Condition',
    description: 'Minor cosmetic wear, fully functional, no missing parts',
  },
  {
    id: 'fair',
    label: 'Fair / Usable',
    description: 'Visible wear or highlighting, 100% functional for course use',
  },
  {
    id: 'new',
    label: 'Brand New',
    description: 'Unopened, unused, in original condition',
  },
];

export const RENTAL_INTERVALS = [
  { id: '1_day', label: 'Per Day' },
  { id: '1_week', label: 'Per Week' },
  { id: '1_month', label: 'Per Month' },
  { id: 'semester', label: 'Per Semester' },
];

export const WIZARD_STEPS = [
  { number: 1, id: 'photos', title: 'Photos' },
  { number: 2, id: 'details', title: 'Item Details' },
  { number: 3, id: 'pricing', title: 'Pricing' },
  { number: 4, id: 'pickup', title: 'Pickup' },
  { number: 5, id: 'preview', title: 'Preview' },
  { number: 6, id: 'publish', title: 'Publish' },
];
