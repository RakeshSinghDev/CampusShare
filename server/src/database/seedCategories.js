const mongoose = require('mongoose');
const config = require('../config/env');
const Category = require('../modules/categories/category.model');

const categories = [
  { name: 'Books & Textbooks', slug: 'books', description: 'Academic course textbooks, workbooks, and study guides', icon: 'BookOpen', sortOrder: 1, isActive: true },
  { name: 'Scientific Calculators', slug: 'scientific-calculators', description: 'Graphing calculators, accessories, and STEM tools', icon: 'Calculator', sortOrder: 2, isActive: true },
  { name: 'Lab Coats & Gear', slug: 'lab-coats', description: 'Lab coats, safety goggles, dissection kits, and scrubs', icon: 'Glasses', sortOrder: 3, isActive: true },
  { name: 'Electronics & Tech', slug: 'electronics', description: 'Laptops, tablets, monitors, headphones, and chargers', icon: 'Laptop', sortOrder: 4, isActive: true },
  { name: 'Notes & Cheat Sheets', slug: 'notes', description: 'Summarized course notes, flashcards, and exam solutions', icon: 'FileText', sortOrder: 5, isActive: true },
  { name: 'Stationery & Supplies', slug: 'stationery', description: 'Notebooks, binders, pens, drawing tools, and organization', icon: 'PenTool', sortOrder: 6, isActive: true },
  { name: 'Sports & Campus Equipment', slug: 'equipment', description: 'Dorm accessories, sports gear, and campus transport', icon: 'Package', sortOrder: 7, isActive: true },
  { name: 'Semester Bundles', slug: 'semester-bundles', description: 'Complete course resource bundles for specific majors', icon: 'Layers', sortOrder: 8, isActive: true },
];

async function seedCategories() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(config.mongoUri);
    }
    console.log('[Seed] Connecting to MongoDB for Category Seeding...');

    for (const cat of categories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    }

    console.log('[Seed] Idempotent Category Seeding Complete! (8 Categories synchronized)');
  } catch (error) {
    console.error('[Seed] Error during category seeding:', error.message);
  } finally {
    if (require.main === module && mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('[Seed] Database connection closed.');
    }
  }
}

if (require.main === module) {
  seedCategories();
}

module.exports = { seedCategories };
