import React, { useState } from "react";
import { Link } from "react-router-dom";

//-----Icons & images
import logo from "../../../assets/images/logoV2.svg";
import instagramGreenIcon from "../../../assets/icons/instagramGreenIcon.svg";
import locationGreenIcon from "../../../assets/icons/locationGreenIcon.svg";
import shoppingCartIcon from "../../../assets/icons/shoppingCartIcon.svg";

//-----Components
import SearchInput from "../SearchInput/SearchInput";
import SearchResults from "../SearchResults/SearchResults";

import "./HeaderDesktop.scss";

const HeaderDesktop = () => {
  const [query, setQuery] = useState();

  return (
    <header className="header-desktop">
      <div className="header-content">
        <div className="header-content-top">
          <Link to="/" className="header-logo-link">
            <img className="header-logo" src={logo} alt="Logo DNC" />
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
            <Link to="/cart">
              <img src={shoppingCartIcon} alt="Logo DNC" />
            </Link>

            <a
              target="_blank"
              href="https://www.instagram.com/ciadaeducacaosjc/"
            >
              <img src={instagramGreenIcon} alt="Logo DNC" />
            </a>

            <a target="_blank" href="">
              <img src={locationGreenIcon} alt="Logo DNC" />
            </a>
          </div>
        </div>

        <div className="header-content-bottom">
          <Link to='/categories/presentes'>
            Presentes
          </Link>
          <Link to='/categories/livros%20infantis'>
            Livros Infantis
          </Link>
          <Link to='/categories/canetas'>
            Canetas
          </Link>
          <Link to='/categories/cadernos'>
            Cadernos
          </Link>
          <Link to='/categories/materiais%20para%20colorir'>
            Materiais para colorir
          </Link>
          <Link to='/categories'>
            Ver tudo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderDesktop;
