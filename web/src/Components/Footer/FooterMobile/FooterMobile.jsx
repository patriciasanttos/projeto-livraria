import React from "react";

//-- Icons and Images
import logo from "../../../assets/Images/logo.svg";
import instagram from "../../../assets/icons/instagram-blue.svg";
import flags from "../../../assets/icons/card-flags.svg";
import location from "../../../assets/icons/location-blue.svg";

//-- Components
import "./FooterMobile.scss";
import { Link } from "react-router-dom";

const FooterMobile = () => {
    return (
        <footer className="footer-mobile">
            <div className="first-footer-section">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>

                <div>
                    <div className="about">
                        <Link to="/aboutus">
                            <h2 className="flex-field-title">Sobre Nós</h2>
                        </Link>

                        <h2 className="flex-field-title">Redes Sociais</h2>

                        <a className="social-media" href={import.meta.env.VITE_INSTAGRAM_URL} target="_blank">
                            <img src={instagram} alt="insta-logo" />
                            <p>@ciadaeducacaosjc</p>
                        </a>
                    </div>

                    <div className="category">
                        <h2 className="flex-field-title">Categorias</h2>

                        <div>
                            <Link to='/categories/presentes'>
                                Presentes
                            </Link>
                            <Link to='/categories/livros%20infantis'>
                                Livros Infantis
                            </Link>
                            <Link to='/categories/canetas'>
                                Canetas
                            </Link>
                            <Link to='/categories'>
                                Ver tudo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="time">
                <div className="business-hour">
                    <h3 className="flex-field-title">Horário de Funcionamento</h3>

                    <div>
                        <p>
                            Das 10h às 22h<br />
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

                <p>
                    Shopping Jardim Oriente, <br />
                    R. Andorra, 500 - Jardim America, <br />
                    São José dos Campos - SP
                </p>
            </div>
        </footer>
    );
};

export default FooterMobile;