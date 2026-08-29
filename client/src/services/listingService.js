import apiClient from './apiClient';

export const listingService = {
  /**
   * Upload resource listing photos via multipart/form-data
   * @param {File[]} files - Array of File objects
   */
  async uploadListingPhotos(files) {
    if (!files || files.length === 0) return { images: [] };

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    // Do NOT set Content-Type header manually so the browser sets the boundary
    const response = await apiClient.post('/listings/upload-images', formData);
    return response.data;
  },

  /**
   * Fetch paginated listings with search, category, condition, campus, price range, and sort
   */
  async getListings(params = {}) {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  /**
   * Fetch single listing details by ID
   */
  async getListingById(id) {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data;
  },

  /**
   * Create a new campus resource listing
   */
  async createListing(payload) {
    const response = await apiClient.post('/listings', payload);
    return response.data;
  },

  /**
   * Edit existing listing details
   */
  async updateListing(id, payload) {
    const response = await apiClient.patch(`/listings/${id}`, payload);
    return response.data;
  },

  /**
   * Soft delete listing
   */
  async deleteListing(id) {
    const response = await apiClient.delete(`/listings/${id}`);
    return response.data;
  },

  /**
   * Change listing status (active <-> paused)
   */
  async updateListingStatus(id, status) {
    const response = await apiClient.patch(`/listings/${id}/status`, { status });
    return response.data;
  },

  /**
   * Increment view count for listing
   */
  async recordListingView(id) {
    try {
      const response = await apiClient.post(`/listings/${id}/view`);
      return response.data;
    } catch (err) {
      // Ignore background view increment error
      return null;
    }
  },

  /**
   * Fetch listings owned by current authenticated user
   */
  async getUserListings(params = {}) {
    const response = await apiClient.get('/users/me/listings', { params });
    return response.data;
  },
};
