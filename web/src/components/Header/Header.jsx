import React from "react";

import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const Header = () => {
  return window.innerWidth <= 821
    ? <HeaderMobile />
    : <HeaderDesktop />;
};

export default Header;
