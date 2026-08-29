/**
 * Navigation item declarations for CampusShare shell navigation.
 */

export const NAV_ITEMS = [
  { label: 'Explore', path: '/home', icon: 'Compass' },
  { label: 'Search', path: '/search', icon: 'Search' },
  { label: 'Rentals', path: '/rentals', icon: 'Clock' },
  { label: 'Wishlist', path: '/wishlist', icon: 'Heart' },
];

export const MOBILE_BOTTOM_NAV = [
  { label: 'Home', path: '/home', icon: 'Home' },
  { label: 'Search', path: '/search', icon: 'Search' },
  { label: 'Sell', path: '/sell', icon: 'PlusCircle', isPrimaryCTA: true },
  { label: 'Chats', path: '/chats', icon: 'MessageSquare', badge: 2 },
  { label: 'Profile', path: '/profile', icon: 'User' },
];

export const USER_MENU_ITEMS = [
  { label: 'My Listings', path: '/profile', icon: 'Package' },
  { label: 'Active Rentals', path: '/rentals', icon: 'Clock' },
  { label: 'Saved Wishlist', path: '/wishlist', icon: 'Heart' },
  { label: 'Student Verification', path: '/verify', icon: 'ShieldCheck', badge: 'Required' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
];
