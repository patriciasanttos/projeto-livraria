import React, { useState } from "react";
import { Link } from "react-router-dom";

//-----Icons & images
import logo from "../../assets/images/logoV2.svg";
import shoppingCartIcon from "../../assets/icons/shoppingCartIconBlue.svg";
import menuIcon from "../../assets/icons/menu.svg";

//-----Components
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchResults/SearchResults";
import MenuDrawer from "../MenuDrawer/MenuDrawer";

import "./HeaderMobile.scss";

const HeaderMobile = () => {
  const [query, setQuery] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState();

  return (
    <>
      <header className="header-mobile">
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
            <img className="icon" src={shoppingCartIcon} alt="Carrinho" />
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
