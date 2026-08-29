import { categoryService } from '@/services/categoryService';
import { CategoryModel } from '@/models/Category';

export const categoryController = {
  /**
   * Navigate cleanly to category slug page
   */
  handleCategoryClick(navigate, categorySlug) {
    if (!categorySlug || categorySlug === 'all') {
      navigate('/search');
    } else {
      navigate(`/category/${categorySlug}`);
    }
  },

  /**
   * Load active categories
   */
  async loadCategories() {
    const rawData = await categoryService.getCategories();
    return Array.isArray(rawData) ? rawData.map(CategoryModel.fromApiCategory) : [];
  },
};
