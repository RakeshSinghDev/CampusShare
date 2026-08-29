import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { PublicRoute } from '@/routes/PublicRoute';
import { useAuth } from '@/hooks/useAuth';

import LandingView from '@/views/landing/LandingView';
import HomeView from '@/views/home/HomeView';
import CategoryView from '@/views/category/CategoryView';
import SearchView from '@/views/search/SearchView';
import ProductDetailsView from '@/views/product/ProductDetailsView';
import SellView from '@/views/sell/SellView';
import ProfileView from '@/views/profile/ProfileView';

import WishlistPage from '@/pages/Wishlist/WishlistPage';
import RentalsPage from '@/pages/Rentals/RentalsPage';
import RentalDetailPage from '@/pages/Rentals/RentalDetailPage';
import ChatsPage from '@/pages/Chats/ChatsPage';
import SettingsPage from '@/pages/Settings/SettingsPage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage';
import EmailVerificationPage from '@/pages/Auth/EmailVerificationPage';
import VerifyPage from '@/pages/Auth/VerifyPage';

function RootIndexRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs font-bold text-slate-500">
        Initializing CampusShare...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <LandingView />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Root Public Landing Route */}
      <Route path="/" element={<RootIndexRoute />} />

      {/* Main Marketplace App Layout */}
      <Route element={<AppShell />}>
        {/* Authenticated Marketplace Dashboard */}
        <Route path="home" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />

        {/* Public Browsing Routes */}
        <Route path="category/:slug" element={<CategoryView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="product/:id" element={<ProductDetailsView />} />

        {/* Auth Public Routes */}
        <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
        <Route path="reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
        <Route path="email-verification" element={<PublicRoute><EmailVerificationPage /></PublicRoute>} />
        <Route path="verify" element={<PublicRoute><VerifyPage /></PublicRoute>} />

        {/* Protected Marketplace Routes */}
        <Route path="sell" element={<ProtectedRoute><SellView /></ProtectedRoute>} />
        <Route path="wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
        <Route path="rentals" element={<ProtectedRoute><RentalsPage /></ProtectedRoute>} />
        <Route path="rentals/:id" element={<ProtectedRoute><RentalDetailPage /></ProtectedRoute>} />
        <Route path="chats" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />
        <Route path="chats/:conversationId" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<RootIndexRoute />} />
      </Route>
    </Routes>
  );
}
