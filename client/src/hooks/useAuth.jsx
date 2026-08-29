import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

const AuthContext = createContext(null);

/**
 * Authentication Context Provider & Hook for CampusShare.
 * Manages authenticated user state, initialization check on startup, login, googleLogin, register, and logout.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore authenticated session on application mount
  useEffect(() => {
    let isMounted = true;

    async function initializeAuthSession() {
      try {
        const currentUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeAuthSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res?.user) {
        setUser(res.user);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const loginWithGoogle = async (idToken) => {
    setIsLoading(true);
    try {
      const res = await authService.googleLogin(idToken);
      if (res?.user) {
        setUser(res.user);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (studentData) => {
    setIsLoading(true);
    try {
      const res = await authService.register(studentData);
      if (res?.user) {
        setUser(res.user);
      }
      setIsLoading(false);
      return res;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  /**
   * Complete, production-quality Sign Out Flow:
   * 1. Terminates Firebase Web Auth session (signOut(auth)).
   * 2. Clears backend session & campusshare_token from localStorage.
   * 3. Clears local user state and wishlist storage.
   * 4. Invalidates React Query cache if queryClient is passed.
   */
  const logout = async (queryClient) => {
    setIsLoading(true);
    try {
      // 1. Terminate Firebase Auth session
      try {
        if (auth && auth.currentUser) {
          await signOut(auth);
        }
      } catch (fbErr) {
        console.warn('[Firebase Auth] Sign out notice:', fbErr.message);
      }

      // 2. Clear backend session & JWT token
      await authService.logout();

      // 3. Clear user & cached storage state
      setUser(null);
      localStorage.removeItem('campusshare_token');
      localStorage.removeItem('campusshare_wishlist');

      // 4. Clear React Query cache if available
      if (queryClient && typeof queryClient.clear === 'function') {
        queryClient.clear();
      }

      toast.success('Signed out of CampusShare session.');
    } catch (err) {
      console.error('[Auth] Logout error:', err);
      toast.error(err.message || 'Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      return null;
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    loginWithGoogle,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
