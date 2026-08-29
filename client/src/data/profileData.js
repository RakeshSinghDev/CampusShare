/**
 * Detailed mock dataset for CampusShare Profile (/profile) & Settings (/settings).
 */

export const studentProfile = {
  id: 'usr_101',
  name: 'Rakesh Singh',
  email: 'rakesh.s@university.edu',
  university: 'UIET Kurukshetra',
  department: 'Electronics & Communication Engineering',
  major: 'ECE \'26',
  academicYear: '3rd Year',
  campus: 'Main Campus',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  isVerified: true,
  rating: '4.9',
  reviewCount: 24,
  successfulExchanges: 12,
  joinedDate: 'August 2024',
  responseRate: '98%',
  avgResponseTime: '< 15 mins',
};

export const profileStats = {
  listingsCount: 12,
  soldCount: 8,
  rentalsCount: 4,
  wishlistCount: 15,
};

export const userListings = [
  {
    id: 'lst_1',
    title: 'Casio FX-991ES Plus 2nd Gen Scientific Calculator',
    category: 'Calculators',
    condition: 'Like New',
    buyPrice: 18,
    rentPrice: 4,
    rentPeriod: 'week',
    listingType: 'both',
    status: 'available',
    location: 'Central Library',
    viewsCount: 142,
    savesCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    createdAt: '2 days ago',
  },
  {
    id: 'lst_2',
    title: 'Organic Chemistry (9th Ed) — Wade & Simek',
    category: 'Textbooks',
    condition: 'Like New',
    buyPrice: 45,
    rentPrice: 8,
    rentPeriod: 'week',
    listingType: 'both',
    status: 'rented',
    location: 'Science Quad',
    viewsCount: 289,
    savesCount: 34,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    createdAt: '1 week ago',
  },
  {
    id: 'lst_3',
    title: 'Signals & Systems (2nd Ed) — Oppenheim & Willsky',
    category: 'Textbooks',
    condition: 'Good Condition',
    buyPrice: 32,
    rentPrice: 6,
    rentPeriod: 'week',
    listingType: 'both',
    status: 'sold',
    location: 'ECE Department',
    viewsCount: 178,
    savesCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    createdAt: '3 weeks ago',
  },
];

export const userRentals = [
  {
    id: 'rnt_101',
    title: 'TI-84 Plus CE Graphing Calculator (Color Screen)',
    lender: {
      name: 'Maya Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
    startDate: 'Aug 15, 2026',
    dueDate: 'Sep 15, 2026',
    rate: '₹12/month',
    deposit: '₹35',
    status: 'active',
    pickupLocation: 'Engineering Library Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rnt_102',
    title: 'White Chemistry Lab Coat (Size M) + Safety Goggles',
    lender: {
      name: 'David Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
    },
    startDate: 'May 01, 2026',
    dueDate: 'Jun 15, 2026',
    rate: '₹16/semester',
    deposit: '₹15',
    status: 'completed',
    pickupLocation: 'Chemistry Annex',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
  },
];

export const recentActivity = [
  {
    id: 'act_1',
    type: 'listing',
    title: 'Listed Casio FX-991ES Plus Calculator',
    timestamp: '2 hours ago',
    detail: 'Available for ₹18 Buy or ₹4/week Rent at Central Library',
  },
  {
    id: 'act_2',
    type: 'rental',
    title: 'Rented TI-84 Plus CE Graphing Calculator',
    timestamp: 'Aug 15, 2026',
    detail: 'Rented from Maya Chen • Due Sep 15, 2026',
  },
  {
    id: 'act_3',
    type: 'sale',
    title: 'Completed Sale of Signals & Systems Textbook',
    timestamp: 'Aug 05, 2026',
    detail: 'Sold to Alex Rivera for ₹32 at ECE Department',
  },
  {
    id: 'act_4',
    type: 'wishlist',
    title: 'Saved iPad Air 5th Gen to Wishlist',
    timestamp: 'Jul 28, 2026',
    detail: 'Listing by Lucas Zhao (₹380 Buy / ₹35/mo Rent)',
  },
];
