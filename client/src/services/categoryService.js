import apiClient from './apiClient';

export const categoryService = {
  /**
   * Fetch all active categories from backend
   */
  async getCategories() {
    const response = await apiClient.get('/categories');
    return response.data;
  },

  /**
   * Fetch single category information by slug
   */
  async getCategoryBySlug(slug) {
    const response = await apiClient.get(`/categories/${slug}`);
    return response.data;
  },
};
