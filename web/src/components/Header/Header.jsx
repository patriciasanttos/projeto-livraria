import React from "react";

import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";
import useWindowWidth from "../../hooks/useWindowWidth";

const Header = () => {
  const width = useWindowWidth();

  return width <= 931
    ? <HeaderMobile />
    : <HeaderDesktop />;
};

export default Header;
