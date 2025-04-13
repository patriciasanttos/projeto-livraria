import React from 'react';
import { Link } from 'react-router-dom';

//-----Icons & images
import logo from '../../assets/images/logo.svg'
import products from '../../assets/icons/products.svg'
import categories from '../../assets/icons/categories.svg'
import reports from '../../assets/icons/reports.svg'
import clients from '../../assets/icons/clients.svg'
import manage from '../../assets/icons/manage.svg'

import './AsideBar.scss';

function AsideBar() {
    return (
        <div className="admin-asidebar">
            <div className="logo">
                <Link to="/admin/control_panel">
                    <img src={logo} alt="Home" />
                </Link>
            </div>

            <ul className='admin-asidebar-buttons'>
                <li>
                    <Link to="/admin/products">
                        <img src={products} alt="Produtos" />
                        <p>Produtos</p>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/categories">
                        <img src={categories} alt="Categorias" />
                        <p>Categorias</p>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/control_panel">
                        <img src={reports} alt="Relatórios" />
                        <p>Relatórios</p>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/control_panel">
                        <img src={clients} alt="Clientes" />
                        <p>Clientes</p>
                    </Link>
                </li>

                <li>
                    <Link to="/admin/control_panel">
                        <img src={manage} alt="Gerenciar" />
                        <p>Gerenciar</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AsideBar;
