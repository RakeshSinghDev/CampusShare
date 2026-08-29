const mongoose = require('mongoose');
const Listing = require('../modules/listings/listing.model');
const Category = require('../modules/categories/category.model');
const { LISTING_STATUS } = require('../constants/enums');

// Regex helper escaping special characters to prevent regex injection attacks
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

class SearchService {
  isDbConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get fast autocomplete search suggestions (Max 8 items)
   */
  async getSuggestions(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') return [];
    
    const query = rawQuery.trim();
    if (query.length < 2) return [];

    const safeRegex = new RegExp(escapeRegex(query), 'i');

    if (!this.isDbConnected()) {
      const fallbackSuggestions = [
        'TI-84 Plus CE Graphing Calculator',
        'Campbell Biology Textbook',
        'iPad Air Note-Taking Tablet',
        'Organic Chemistry Lab Coat',
        'Calculus Study Notes',
        'Scientific Calculator',
      ];
      return fallbackSuggestions
        .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);
    }

    // Search active listing titles, brands, and categories in parallel
    const [matchingListings, matchingCategories] = await Promise.all([
      Listing.find(
        {
          status: LISTING_STATUS.ACTIVE,
          $or: [{ title: safeRegex }, { brand: safeRegex }, { model: safeRegex }],
        },
        'title category brand'
      )
        .limit(6)
        .lean(),

      Category.find({ isActive: true, name: safeRegex }, 'name slug')
        .limit(3)
        .lean(),
    ]);

    const suggestionsSet = new Set();

    // 1. Add Category suggestions
    for (const cat of matchingCategories) {
      suggestionsSet.add({ text: cat.name, type: 'category', slug: cat.slug });
    }

    // 2. Add Listing title suggestions
    for (const item of matchingListings) {
      if (item.title) {
        suggestionsSet.add({ text: item.title, type: 'listing', id: item._id });
      }
    }

    return Array.from(suggestionsSet).slice(0, 8);
  }
}

module.exports = new SearchService();
