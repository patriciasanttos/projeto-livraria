import React from "react";
import { useMediaQuery } from "react-responsive";

import HeaderMobile from "./HeaderMobile";
import HeaderDesktop from "./HeaderDesktop";

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};

export default Header;
