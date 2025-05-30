import React from "react";
import { Link } from "react-router-dom";

//-- Icons and Images
import logo from "../../../assets/images/logo.svg";
import instagram from "../../../assets/icons/instagram-blue.svg";
import flags from "../../../assets/icons/card-flags.svg";
import location from "../../../assets/icons/location-blue.svg";

//-- Components
import "./FooterDesktop.scss";

const FooterDesktop = () => {
    return (
      <footer className="footer">
        <div className="about">
          <Link to="/">
            <img className="logo-footer" src={logo} alt="logo" />
          </Link>

          <Link to="/aboutus">
            <h2 className="flex-field-title">Sobre Nós</h2>
          </Link>

          <h2 className="flex-field-title">Redes Sociais</h2>

          <a
            className="social-media"
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
          >
            <img src={instagram} alt="insta-logo" />
            <p>@ciadaeducacaosjc</p>
          </a>
        </div>

        <div className="category">
          <h2 className="flex-field-title">Categorias</h2>

          <div>
            <Link to="/categories/presentes">Presentes</Link>
            <Link to="/categories/livros%20infantis">Livros Infantis</Link>
            <Link to="/categories/papelaria">Papelaria</Link>
            <Link to="/categories/cadernos">Cadernos</Link>
            <Link to="/categories/atividades">
              Atividades
            </Link>
            <Link to="/categories">Ver tudo</Link>
          </div>
        </div>

        <div className="time">
          <div className="business-hour">
            <h3 className="flex-field-title">Horário de Funcionamento</h3>

            <div>
              <p>
                Das 10h às 22h
                <br />
                Segunda a Sábado
              </p>
            </div>
          </div>

          <div className="card-flags">
            <h2 className="flex-field-title">Formas de Pagamento</h2>
            <img src={flags} alt="flags" className="flags" />
          </div>
        </div>

        <div className="location">
          <div>
            <img src={location} alt="location" className="location-img" />
            <h2 className="flex-field-title">Como Chegar</h2>
          </div>

          <a href="https://maps.app.goo.gl/KQMV5vfECNFFPpeF9" target="_blank">
            Shopping Jardim Oriente, <br />
            R. Andorra, 500 - Jardim America, <br />
            São José dos Campos - SP
          </a>
        </div>
      </footer>
    );
};

export default FooterDesktop;