import React, { useState } from "react";
import { Link } from "react-router-dom";

//-----Icons & images
// import logo from "../../assets/images/logo.svg";
import logoV2 from "../../assets/images/logoV2.svg";
import waveHeader from "../../assets/images/wave-header.png";
import instagramGreenIcon from "../../assets/icons/instagramGreenIcon.svg";
import locationGreenIcon from "../../assets/icons/locationGreenIcon.svg";
import shoppingCartIcon from "../../assets/icons/shoppingCartIcon.svg";
import shoppingCartIconBlue from "../../assets/icons/shoppingCartIconBlue.svg";
import menuIcon from "../../assets/icons/menu.svg";

//-----Components
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchResults/SearchResults";
import { useMediaQuery } from "react-responsive";

import "./Header.scss";

const Header = () => {
  const [query, setQuery] = useState();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-content">
        <img
          className="background-image"
          src={waveHeader}
          alt="Image"
        ></img>
        <div>
          {isMobile && (
            <div>
              <img
                className="menu-icon"
                src={menuIcon}
                alt="Menu"
                onClick={toggleMenu}
              />

              {isMenuOpen && (
                <div className="header-items-categories-mobile">
                  <Link to="/categories" state={{ category: "presentes" }}>
                    Presentes
                  </Link>
                  <Link
                    to="/categories"
                    state={{ category: "livros infantis" }}
                  >
                    Livros Infantis
                  </Link>
                  <Link to="/categories" state={{ category: "canetas" }}>
                    Canetas
                  </Link>
                  <Link to="/categories" state={{ category: "cadernos" }}>
                    Cadernos
                  </Link>
                  <Link
                    to="/categories"
                    state={{ category: "materiais para colorir" }}
                  >
                    Materiais para colorir
                  </Link>
                  <Link to="/categories">Ver tudo</Link>
                </div>
              )}
            </div>
          )}
          <Link to="/" className="header-logo-link">
            <img className="header-logo" src={logoV2} alt="Logo DNC" />
          </Link>

          <div
            className="header-search-container"
            onBlur={(e) => {
              setQuery("");
              e.target.value = "";
            }}
          >
            <SearchInput setQuery={setQuery} />
            {query && <SearchResults query={query} />}
          </div>

          <div className="header-buttons">
            {!isMobile ? (
              <Link to="/cart">
                <img src={shoppingCartIcon} alt="Cart" />
              </Link>
            ) : (
              <Link to="/cart">
                <img
                  className="cart-icon-blue"
                  src={shoppingCartIconBlue}
                  alt="Carrinho"
                />
              </Link>
            )}

            {!isMobile && (
              <>
                <a
                  target="_blank"
                  href="https://www.instagram.com/ciadaeducacaosjc/"
                >
                  <img src={instagramGreenIcon} alt="Instagram" />
                </a>

                <a target="_blank" href="">
                  <img src={locationGreenIcon} alt="Location" />
                </a>
              </>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className="header-items-categories">
            <Link to="/categories" state={{ category: "presentes" }}>
              Presentes
            </Link>
            <Link to="/categories" state={{ category: "livros infantis" }}>
              Livros Infantis
            </Link>
            <Link to="/categories" state={{ category: "canetas" }}>
              Canetas
            </Link>
            <Link to="/categories" state={{ category: "cadernos" }}>
              Cadernos
            </Link>
            <Link
              to="/categories"
              state={{ category: "materiais para colorir" }}
            >
              Materiais para colorir
            </Link>
            <Link to="/categories">Ver tudo</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;