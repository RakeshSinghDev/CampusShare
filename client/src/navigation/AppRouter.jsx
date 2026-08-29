import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

import HomeView from '@/views/home/HomeView';
import CategoryView from '@/views/category/CategoryView';
import SearchView from '@/views/search/SearchView';
import ProductDetailsView from '@/views/product/ProductDetailsView';
import SellView from '@/views/sell/SellView';
import ProfileView from '@/views/profile/ProfileView';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<HomeView />} />
        <Route path="category/:slug" element={<CategoryView />} />
        <Route path="search" element={<SearchView />} />
        <Route path="product/:id" element={<ProductDetailsView />} />
        <Route path="sell" element={<ProtectedRoute><SellView /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfileView /></ProtectedRoute>} />
        <Route path="*" element={<HomeView />} />
      </Route>
    </Routes>
  );
}
