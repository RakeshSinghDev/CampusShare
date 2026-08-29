/**
 * Detailed mock product dataset for CampusShare Product Details page (/product/:id).
 * Includes realistic academic items, rental price schedules, security deposits, seller cards, and campus pickup info.
 */

export const mockProducts = [
  {
    id: '1',
    title: 'Organic Chemistry (9th Edition) — Wade & Simek',
    category: 'Textbooks',
    condition: 'Like New',
    brand: 'Pearson',
    model: '9th Edition (Hardcover)',
    usage: '1 Semester',
    age: '6 Months',
    buyPrice: 45,
    originalPrice: 160,
    listingType: 'both',
    status: 'available',
    description: 'Includes full solutions manual and lecture notes printouts. Barely used, no highlighting or missing pages. Perfect for CHEM 201/202 sequence. Available for immediate pickup at Science Quad or Student Union.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80',
    ],
    rentPricing: {
      '1_day': 3,
      '3_days': 6,
      '1_week': 8,
      '1_month': 18,
      'semester': 35,
    },
    securityDeposit: 25,
    seller: {
      id: 's1',
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      major: 'BioChemistry \'26',
      department: 'Department of Chemistry',
      university: 'State University',
      rating: '4.9',
      reviewCount: 28,
      successfulExchanges: 14,
      joinedDate: 'Aug 2024',
    },
    pickup: {
      campus: 'Main Campus',
      locationName: 'Science Quad / Student Union',
      timingWindow: 'Mon - Fri, 10 AM – 6 PM',
      isAvailableToday: true,
    },
    stats: {
      viewsCount: 142,
      savesCount: 18,
    },
    verification: {
      isStudentVerified: true,
      isListingVerified: true,
      isCampusPickup: true,
      refundableDeposit: true,
    },
  },
  {
    id: '2',
    title: 'TI-84 Plus CE Graphing Calculator (Color Screen)',
    category: 'Calculators',
    condition: 'Like New',
    brand: 'Texas Instruments',
    model: 'TI-84 Plus CE (Mint Green)',
    usage: '2 Semesters',
    age: '1 Year',
    buyPrice: 75,
    originalPrice: 150,
    listingType: 'both',
    status: 'available',
    description: 'Mint green edition in flawless working condition. Screen scratch-free, holds a full charge for weeks. Includes original USB charging cable, slide cover, and pre-loaded calculus apps.',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
    ],
    rentPricing: {
      '1_day': 4,
      '3_days': 8,
      '1_week': 12,
      '1_month': 22,
      'semester': 45,
    },
    securityDeposit: 35,
    seller: {
      id: 's2',
      name: 'Maya Chen',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      major: 'Computer Science \'25',
      department: 'School of Engineering',
      university: 'State University',
      rating: '5.0',
      reviewCount: 42,
      successfulExchanges: 29,
      joinedDate: 'Jan 2024',
    },
    pickup: {
      campus: 'Engineering Quad',
      locationName: 'Engineering Library Lounge',
      timingWindow: 'Mon - Sun, 9 AM – 9 PM',
      isAvailableToday: true,
    },
    stats: {
      viewsCount: 215,
      savesCount: 34,
    },
    verification: {
      isStudentVerified: true,
      isListingVerified: true,
      isCampusPickup: true,
      refundableDeposit: true,
    },
  },
  {
    id: '3',
    title: 'White Chemistry Lab Coat (Size M) + Safety Goggles',
    category: 'Lab Coats',
    condition: 'Good Condition',
    brand: 'Red Kap',
    model: 'Unisex 100% Cotton (Size M)',
    usage: '1 Semester',
    age: '4 Months',
    buyPrice: 22,
    originalPrice: 48,
    listingType: 'both',
    status: 'available',
    description: 'Freshly laundered 100% cotton heavy lab coat with clear anti-fog safety goggles. Complies with all campus General & Organic Chem lab safety mandates.',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
    ],
    rentPricing: {
      '1_day': 2,
      '3_days': 4,
      '1_week': 6,
      '1_month': 10,
      'semester': 16,
    },
    securityDeposit: 15,
    seller: {
      id: 's3',
      name: 'David Kim',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      major: 'Pre-Med / Biology \'27',
      department: 'Department of Life Sciences',
      university: 'State University',
      rating: '4.8',
      reviewCount: 16,
      successfulExchanges: 9,
      joinedDate: 'Sep 2024',
    },
    pickup: {
      campus: 'North Campus',
      locationName: 'Chemistry Annex Courtyard',
      timingWindow: 'Mon - Fri, 11 AM – 5 PM',
      isAvailableToday: true,
    },
    stats: {
      viewsCount: 98,
      savesCount: 12,
    },
    verification: {
      isStudentVerified: true,
      isListingVerified: true,
      isCampusPickup: true,
      refundableDeposit: true,
    },
  },
  {
    id: '4',
    title: 'Apple iPad Air 5th Gen (64GB, Space Gray) + Apple Pencil 2',
    category: 'Electronics',
    condition: 'Like New',
    brand: 'Apple',
    model: 'iPad Air 5 (M1 Chip, Wi-Fi)',
    usage: '6 Months',
    age: '8 Months',
    buyPrice: 380,
    originalPrice: 680,
    listingType: 'both',
    status: 'available',
    description: 'Powered by M1 chip. Includes Apple Pencil 2 for digital note-taking and magnetic protective case. Matte screen protector pre-applied for natural paper-like writing feel.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80',
    ],
    rentPricing: {
      '1_day': 10,
      '3_days': 22,
      '1_week': 35,
      '1_month': 85,
      'semester': 180,
    },
    securityDeposit: 120,
    seller: {
      id: 's4',
      name: 'Lucas Zhao',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      isVerified: true,
      major: 'Digital Media & Design \'25',
      department: 'School of Fine Arts',
      university: 'State University',
      rating: '4.9',
      reviewCount: 38,
      successfulExchanges: 21,
      joinedDate: 'Jan 2024',
    },
    pickup: {
      campus: 'South Campus',
      locationName: 'Student Union Plaza',
      timingWindow: 'Mon - Sat, 10 AM – 7 PM',
      isAvailableToday: true,
    },
    stats: {
      viewsCount: 310,
      savesCount: 54,
    },
    verification: {
      isStudentVerified: true,
      isListingVerified: true,
      isCampusPickup: true,
      refundableDeposit: true,
    },
  },
];

export const productData = mockProducts;

/**
 * Helper to fetch product by ID from mock dataset.
 */
export function getProductById(id) {
  return mockProducts.find((p) => p.id === String(id)) || mockProducts[0];
}

/**
 * Rental duration configuration labels & multipliers.
 */
export const RENTAL_DURATIONS = [
  { key: '1_day', label: '1 Day', description: 'Exam day emergency rental' },
  { key: '3_days', label: '3 Days', description: 'Weekend project or test prep' },
  { key: '1_week', label: '1 Week', description: 'Weekly assignment cycle' },
  { key: '1_month', label: '1 Month', description: 'Monthly module requirement' },
  { key: 'semester', label: 'Full Semester', description: 'Entire term (4 Months)' },
];
