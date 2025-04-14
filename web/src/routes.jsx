import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { privatePages, publicPages } from "./pages/pages";
import PublicRoutesLayout from "./layouts/PublicRoutesLayout";
import PrivateRoutesLayout from "./layouts/PrivateRoutesLayout";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />

      <Routes>
        <Route element={<PublicRoutesLayout />}>
          <Route path="/" element={<publicPages.HomePage />} />
          <Route path="categories" element={<publicPages.Categories />} />
          <Route path="categories/:categoryName" element={<publicPages.Categories />} />
          <Route path="item/:id" element={<publicPages.ItemPage />} />
          <Route path="cart" element={<publicPages.Cart />} />
          <Route path="aboutus" element={<publicPages.AboutUs />} />
        </Route>

        <Route path="admin" element={<PrivateRoutesLayout />}>
          <Route index element={<Navigate to="/admin/login" />} />

          <Route path="login" element={<privatePages.Login />} />
          <Route path="control_panel" element={<privatePages.ControlPanel />} />
          <Route path="admin/products" element={<privatePages.Products />} />
          <Route path="admin/categories" element={<privatePages.AdminCategoriesPage />} />
          <Route path="reports" element={<privatePages.Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}