import React from 'react';
import { Link } from 'react-router-dom';
import './AsideBar.scss';

//-----Icons & images
import logo from '../../assets/images/logo.svg'
import produtos from '../../assets/icons/produtos.svg'
import categorias from '../../assets/icons/categorias.svg'
import relatorios from '../../assets/icons/relatorios.svg'
import clientes from '../../assets/icons/clientes.svg'
import gerenciar from '../../assets/icons/gerenciar.svg'

function AsideBar({ produto }) {
    const arrayIcones = [logo, produtos, categorias, relatorios, clientes, gerenciar];

    return (
        <ul className="sidebar-list">
            <Link to="/" className="sidebar-link">
                <img id='logo' src={logo} alt="Home" className="sidebar-icon" />
            </Link><br /> <br />
            {
                produto.map((string, indice) => (
                    <>
                        <Link to="/" className="sidebar-link">
                            <img src={arrayIcones[indice + 1]} alt="Home" className="sidebar-icon" />
                        </Link>
                        <li key={indice} className="sidebar-item">{string}</li>
                    </>
                ))}
        </ul>
    );
}

export default AsideBar;
