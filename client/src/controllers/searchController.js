import apiClient from '@/services/apiClient';

export const searchController = {
  /**
   * Fetch lightweight autocomplete search suggestions
   */
  async getSuggestions(query) {
    if (!query || query.trim().length < 2) return [];
    try {
      const response = await apiClient.get('/search/suggestions', {
        params: { q: query.trim() },
      });
      return response.data || [];
    } catch (err) {
      return [];
    }
  },

  /**
   * Build clean URL query string params object from state
   */
  buildQueryParams(state) {
    const params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category && state.category !== 'all') params.set('category', state.category);
    if (state.condition) params.set('condition', state.condition);
    if (state.listingType) params.set('listingType', state.listingType);
    if (state.campus) params.set('campus', state.campus);
    if (state.minPrice) params.set('minPrice', state.minPrice);
    if (state.maxPrice) params.set('maxPrice', state.maxPrice);
    if (state.sort && state.sort !== 'newest') params.set('sort', state.sort);
    if (state.page && state.page > 1) params.set('page', state.page.toString());
    return params;
  },

  /**
   * Generate active filter chip representations
   */
  getActiveFilterChips(state) {
    const chips = [];
    if (state.query) chips.push({ key: 'query', label: `Search: "${state.query}"` });
    if (state.category && state.category !== 'all') chips.push({ key: 'category', label: `Category: ${state.category}` });
    if (state.condition) chips.push({ key: 'condition', label: `Condition: ${state.condition.replace('_', ' ')}` });
    if (state.listingType) chips.push({ key: 'listingType', label: `Type: ${state.listingType.replace('_', ' ')}` });
    if (state.campus) chips.push({ key: 'campus', label: `Campus: ${state.campus}` });
    if (state.minPrice || state.maxPrice) chips.push({ key: 'price', label: `Price: ₹${state.minPrice || 0} - ₹${state.maxPrice || '∞'}` });
    return chips;
  },
};
