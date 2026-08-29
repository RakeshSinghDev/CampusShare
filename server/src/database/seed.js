const mongoose = require('mongoose');
const User = require('../modules/users/user.model');
const Category = require('../modules/categories/category.model');
const Listing = require('../modules/listings/listing.model');
const { LISTING_TYPES, LISTING_STATUS, ITEM_CONDITIONS, RENTAL_UNITS, VERIFICATION_STATUS, USER_ROLES } = require('../constants/enums');

const categories = [
  { name: 'Textbooks', slug: 'textbooks', description: 'Academic course textbooks, workbooks, and solutions', icon: 'BookOpen', sortOrder: 1 },
  { name: 'Calculators & Tech', slug: 'calculators', description: 'Graphing calculators, accessories, and STEM tools', icon: 'Calculator', sortOrder: 2 },
  { name: 'Electronics', slug: 'electronics', description: 'Laptops, tablets, monitors, headphones, and chargers', icon: 'Laptop', sortOrder: 3 },
  { name: 'Lab Gear & Uniforms', slug: 'lab-gear', description: 'Lab coats, safety goggles, dissection kits, and scrubs', icon: 'Glasses', sortOrder: 4 },
  { name: 'Notes & Study Guides', slug: 'notes', description: 'Summarized course notes, cheat sheets, and flashcards', icon: 'FileText', sortOrder: 5 },
];

async function seedDatabase() {
  if (mongoose.connection.readyState !== 1) {
    return;
  }
  try {
    // 1. Seed Categories if empty
    for (const cat of categories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }

    // 2. Seed Default Verified Seller User if empty
    let seller = await User.findOne({ email: 'alex.rivera@stanford.edu' });
    if (!seller) {
      seller = await User.create({
        name: 'Alex Rivera',
        email: 'alex.rivera@stanford.edu',
        passwordHash: 'dummy_hash_alex',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        college: 'Stanford University',
        course: 'Computer Science',
        branch: 'B.S. CS',
        academicYear: 'Senior (Year 4)',
        campus: 'Stanford Main Campus',
        isEmailVerified: true,
        verificationStatus: VERIFICATION_STATUS.VERIFIED,
        role: USER_ROLES.STUDENT,
      });
    }

    // 3. Seed Sample Listings if Listing collection is empty
    const listingCount = await Listing.countDocuments();
    if (listingCount === 0) {
      const textbooksCat = await Category.findOne({ slug: 'textbooks' });
      const calculatorsCat = await Category.findOne({ slug: 'calculators' });
      const electronicsCat = await Category.findOne({ slug: 'electronics' });
      const labGearCat = await Category.findOne({ slug: 'lab-gear' });

      const sampleListings = [
        {
          seller: seller._id,
          title: 'TI-84 Plus CE Graphing Calculator (Color Display)',
          description: 'Used for two quarters in MATH 51. Comes with original USB charging cable and protective slip cover. Battery holds full charge.',
          images: [
            { url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800', isPrimary: true, order: 0 },
          ],
          category: calculatorsCat._id,
          condition: ITEM_CONDITIONS.LIKE_NEW,
          listingType: LISTING_TYPES.SALE_AND_RENT,
          salePrice: 85,
          rentalPricing: { unit: RENTAL_UNITS.WEEK, price: 12, securityDeposit: 30, minimumDuration: 1 },
          brand: 'Texas Instruments',
          model: 'TI-84 Plus CE',
          campus: 'Stanford Main Campus',
          pickupLocation: 'Tressider Student Union or Green Library',
          pickupAvailability: 'Mon-Fri 2 PM - 6 PM',
          status: LISTING_STATUS.ACTIVE,
          isNegotiable: true,
          views: 42,
          wishlistCount: 5,
        },
        {
          seller: seller._id,
          title: 'Campbell Biology (12th Edition) Hardcover',
          description: 'Required textbook for BIO 81 & BIO 82. Crisp pages with zero highlighting or notes. Includes unopened MasteringBiology access code sheet.',
          images: [
            { url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800', isPrimary: true, order: 0 },
          ],
          category: textbooksCat._id,
          condition: ITEM_CONDITIONS.GOOD,
          listingType: LISTING_TYPES.SALE_AND_RENT,
          salePrice: 95,
          rentalPricing: { unit: RENTAL_UNITS.SEMESTER, price: 35, securityDeposit: 25, minimumDuration: 1 },
          brand: 'Pearson',
          campus: 'Stanford Main Campus',
          pickupLocation: 'Meyer Green or Science Quad',
          pickupAvailability: 'Weekdays after 3 PM',
          status: LISTING_STATUS.ACTIVE,
          isNegotiable: false,
          views: 68,
          wishlistCount: 8,
        },
        {
          seller: seller._id,
          title: 'Apple iPad Air M1 (64GB Space Gray) + Apple Pencil 2',
          description: 'Perfect note-taking setup for engineering and science students. Screen protector applied since day 1. Includes magnetic smart folio case.',
          images: [
            { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800', isPrimary: true, order: 0 },
          ],
          category: electronicsCat._id,
          condition: ITEM_CONDITIONS.LIKE_NEW,
          listingType: LISTING_TYPES.SALE,
          salePrice: 420,
          brand: 'Apple',
          model: 'iPad Air 5th Gen',
          campus: 'Stanford Main Campus',
          pickupLocation: 'Huang Engineering Center',
          pickupAvailability: 'Anytime during weekends',
          status: LISTING_STATUS.ACTIVE,
          isNegotiable: true,
          views: 110,
          wishlistCount: 14,
        },
        {
          seller: seller._id,
          title: 'Organic Chemistry Lab Coat (100% Cotton, Size M) & Safety Goggles',
          description: 'Heavy duty 100% white cotton lab coat compliant with CHEM 33 requirements. Includes splash-proof safety goggles and nitrile gloves box.',
          images: [
            { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', isPrimary: true, order: 0 },
          ],
          category: labGearCat._id,
          condition: ITEM_CONDITIONS.GOOD,
          listingType: LISTING_TYPES.SALE_AND_RENT,
          salePrice: 24,
          rentalPricing: { unit: RENTAL_UNITS.SEMESTER, price: 10, securityDeposit: 10, minimumDuration: 1 },
          campus: 'Stanford Main Campus',
          pickupLocation: 'Lokey Chemistry Building',
          pickupAvailability: 'Mon/Wed 10 AM - 12 PM',
          status: LISTING_STATUS.ACTIVE,
          isNegotiable: false,
          views: 29,
          wishlistCount: 2,
        },
      ];

      await Listing.insertMany(sampleListings);
    }
  } catch (error) {
    console.warn('[Seed] Database seeding notice:', error.message);
  }
}

module.exports = {
  seedDatabase,
};
