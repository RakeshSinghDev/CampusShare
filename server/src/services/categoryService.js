const mongoose = require('mongoose');
const Category = require('../modules/categories/category.model');
const Listing = require('../modules/listings/listing.model');
const ApiError = require('../utils/ApiError');
const { LISTING_STATUS } = require('../constants/enums');

// Default System Categories Fallback when DB is not connected
const DEFAULT_CATEGORIES = [
  { _id: 'cat_books', name: 'Books & Textbooks', slug: 'books', description: 'Academic course textbooks, workbooks, and study guides', icon: 'BookOpen', sortOrder: 1, isActive: true },
  { _id: 'cat_calc', name: 'Scientific Calculators', slug: 'scientific-calculators', description: 'Graphing calculators, accessories, and STEM tools', icon: 'Calculator', sortOrder: 2, isActive: true },
  { _id: 'cat_lab', name: 'Lab Coats & Gear', slug: 'lab-coats', description: 'Lab coats, safety goggles, dissection kits, and scrubs', icon: 'Glasses', sortOrder: 3, isActive: true },
  { _id: 'cat_electronics', name: 'Electronics & Tech', slug: 'electronics', description: 'Laptops, tablets, monitors, headphones, and chargers', icon: 'Laptop', sortOrder: 4, isActive: true },
  { _id: 'cat_notes', name: 'Notes & Cheat Sheets', slug: 'notes', description: 'Summarized course notes, flashcards, and exam solutions', icon: 'FileText', sortOrder: 5, isActive: true },
  { _id: 'cat_stationery', name: 'Stationery & Supplies', slug: 'stationery', description: 'Notebooks, binders, pens, drawing tools, and organization', icon: 'PenTool', sortOrder: 6, isActive: true },
  { _id: 'cat_equipment', name: 'Sports & Campus Equipment', slug: 'equipment', description: 'Dorm accessories, sports gear, and campus transport', icon: 'Package', sortOrder: 7, isActive: true },
  { _id: 'cat_bundles', name: 'Semester Bundles', slug: 'semester-bundles', description: 'Complete course resource bundles for specific majors', icon: 'Layers', sortOrder: 8, isActive: true },
];

class CategoryService {
  isDbConnected() {
    return mongoose.connection.readyState === 1;
  }

  /**
   * Get all active categories sorted by sortOrder then name
   */
  async getCategories() {
    if (!this.isDbConnected()) {
      return DEFAULT_CATEGORIES.filter((c) => c.isActive);
    }

    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean();

    return categories;
  }

  /**
   * Get single category details by slug + active listing count
   */
  async getCategoryBySlug(slug) {
    if (!this.isDbConnected()) {
      const category = DEFAULT_CATEGORIES.find((c) => c.slug === slug);
      if (!category) {
        throw new ApiError(404, 'Category not found', 'CATEGORY_NOT_FOUND');
      }
      return {
        ...category,
        activeListingsCount: 12,
      };
    }

    const category = await Category.findOne({ slug, isActive: true }).lean();
    if (!category) {
      throw new ApiError(404, 'Category not found', 'CATEGORY_NOT_FOUND');
    }

    // Count active listings assigned to this category
    const activeListingsCount = await Listing.countDocuments({
      category: category._id,
      status: LISTING_STATUS.ACTIVE,
    });

    return {
      ...category,
      activeListingsCount,
    };
  }
}

module.exports = new CategoryService();
