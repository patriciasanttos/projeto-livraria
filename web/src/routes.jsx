import React from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { privatePages, publicPages } from "./pages/pages";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
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
      <Header />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<publicPages.HomePage />} />
        <Route path="categories" element={<publicPages.Categories />} />
        <Route path="categories/:categoryName" element={<publicPages.Categories />} />
        <Route path="item" element={<publicPages.ItemPage />} />
        <Route path="cart" element={<publicPages.Cart />} />
        <Route path="aboutus" element={<publicPages.AboutUs />} />

        <Route path="admin/login" element={<privatePages.Login />} />
        <Route path="admin/control_panel" element={<privatePages.ControlPanel />} />
        <Route path="admin/items" element={<privatePages.Items />} />
        <Route path="admin/categories" element={<privatePages.AdminCategoriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
