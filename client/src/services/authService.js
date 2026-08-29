import apiClient from './apiClient';

/**
 * Authentication API Service Abstraction for CampusShare.
 * Connects directly to Node.js / Express / MongoDB backend auth endpoints.
 */
export const authService = {
  /**
   * Submit login credentials
   * @param {Object} credentials - { email, password }
   */
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    if (response?.data?.token) {
      localStorage.setItem('campusshare_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Submit Firebase ID Token credential for server-side verification
   * @param {string} idToken
   */
  async firebaseLogin(idToken) {
    const response = await apiClient.post('/auth/firebase', { idToken });
    if (response?.data?.token) {
      localStorage.setItem('campusshare_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Alias for Google Login using Firebase ID Token
   * @param {string} idToken
   */
  async googleLogin(idToken) {
    return this.firebaseLogin(idToken);
  },

  /**
   * Register new student account
   * @param {Object} studentData - Student registration payload
   */
  async register(studentData) {
    const payload = {
      name: studentData.fullName || studentData.name,
      email: studentData.email,
      password: studentData.password,
      college: studentData.university || studentData.college,
      course: studentData.department || studentData.course || '',
      branch: studentData.branch || '',
      academicYear: studentData.academicYear || '',
      campus: studentData.campus || 'Main Campus',
    };

    const response = await apiClient.post('/auth/register', payload);
    if (response?.data?.token) {
      localStorage.setItem('campusshare_token', response.data.token);
    }
    return response.data;
  },

  /**
   * Logout user session
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      // Ignore API logout error if offline
    } finally {
      localStorage.removeItem('campusshare_token');
    }
    return { success: true };
  },

  /**
   * Request password reset link
   * @param {string} email
   */
  async forgotPassword(email) {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response;
  },

  /**
   * Reset password with token
   * @param {Object} payload - { token, password }
   */
  async resetPassword(payload) {
    const response = await apiClient.post('/auth/reset-password', payload);
    return response;
  },

  /**
   * Verify email address with token
   * @param {string} token
   */
  async verifyEmail(token) {
    const response = await apiClient.post('/auth/verify-email', { token });
    return response;
  },

  /**
   * Resend email verification link
   * @param {string} email
   */
  async resendVerificationEmail(email) {
    const response = await apiClient.post('/auth/resend-verification', { email });
    return response;
  },

  /**
   * Get current authenticated student user
   */
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return response?.data?.user || null;
    } catch (err) {
      return null;
    }
  },
};
