import React, { useState } from "react";
import { Link } from "react-router-dom";

//-----Icons & images
import logo from "../../assets/images/logoV2.svg";
import waveHeader from "../../assets/images/wave-header.png";
import shoppingCartIcon from "../../assets/icons/shoppingCartIconBlue.svg";
import menuIcon from "../../assets/icons/menu.svg";

//-----Components
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchResults/SearchResults";

import "./HeaderMobile.scss";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

const HeaderMobile = () => {
  const [query, setQuery] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState();

  return (
    <>
      <header
        className="header-mobile"
        style={{
          backgroundImage: `url(${waveHeader})`,
          backgroundSize: "cover",
          height: "100%"
        }}
      >
        <div className="row-top">
          <img
            className="icon"
            src={menuIcon}
            alt="Menu"
            onClick={() => setIsMenuOpen(true)}
          />

          <Link to="/">
            <img className="logo" src={logo} alt="Logo DNC" />
          </Link>

          <Link to="/cart">
            <img className="icon" src={shoppingCartIcon} alt="Logo Carrinho" />
          </Link>
        </div>
        <div className="row-bottom">
          <div className="search-container">
            <SearchInput setQuery={setQuery} />
            {query && <SearchResults query={query} />}
          </div>
        </div>
      </header>
      <MenuDrawer isOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default HeaderMobile;
