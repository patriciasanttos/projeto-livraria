import HomePage from "./public/HomePage/HomePage";
import Categories from "./public/Categories/Categories";
import ItemPage from "./public/ItemPage/ItemPage";
import Cart from "./public/Cart/Cart";
import AboutUs from "./public/AboutUs/AboutUs";

import Login from "./private/Login/Login";
import ControlPanel from "./private/ControlPanel/ControlPanel";
import Products from "./private/Products/Products";
import AdminCategoriesPage from "./private/Categories/Categories";

export const publicPages = {
  HomePage,
  Categories,
  ItemPage,
  Cart,
  AboutUs,
};

export const privatePages = {
  Login,
  ControlPanel,
  Products,
  AdminCategoriesPage,
};
