import apiClient from './apiClient';

/**
 * CampusShare Chat API Service
 */
export const chatService = {
  /**
   * Start or find an existing conversation between current user and listing seller
   * @param {string} listingId
   * @param {string} sellerId
   */
  async startConversation(listingId, sellerId) {
    const response = await apiClient.post('/conversations/start', { listingId, sellerId });
    return response.data;
  },

  /**
   * Get all active conversations for the authenticated user
   */
  async getConversations() {
    const response = await apiClient.get('/conversations');
    return response.data;
  },

  /**
   * Get specific conversation details & message history by ID
   * @param {string} id
   */
  async getConversationById(id) {
    const response = await apiClient.get(`/conversations/${id}`);
    return response.data;
  },

  /**
   * Send a text message to a conversation
   * @param {string} conversationId
   * @param {string} text
   */
  async sendMessage(conversationId, text) {
    const response = await apiClient.post(`/conversations/${conversationId}/messages`, { text });
    return response.data;
  },
};
