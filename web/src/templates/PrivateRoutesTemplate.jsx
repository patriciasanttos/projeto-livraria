import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AsideBar from '../Components/AsideBar/AsideBar';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';

function PrivateRoutesTemplate() {
  const { pathname } = useLocation();

  const pagesObj = {
    '/admin/control_panel': 'Painel de controle',
    '/admin/categories': 'Categorias',
    '/admin/products': 'Produtos'
  };

  const page = pagesObj[pathname];

  return (
    <div style={{
      display: 'flex',
    }}>
      {pathname !== '/admin/login' && <AsideBar />}

      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100dvh'
        }}
      >
        {pathname !== '/admin/login' && <HeaderAdmin page={page} />}
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateRoutesTemplate;