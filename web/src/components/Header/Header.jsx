import React from "react";

import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

const Header = () => {
  return window.innerWidth <= 821
    ? <HeaderMobile />
    : <HeaderDesktop />;
};

export default Header;
