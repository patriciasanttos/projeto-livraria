import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import AsideBar from '../Components/AsideBar/AsideBar';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import { validate } from '../service/api/admins';

function PrivateRoutesLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    validate()
      .then(({ status }) => {
        if (!isMounted) return;

        const isAuth = status === 200;

        if (isAuth && pathname === '/admin/login')
          navigate('/admin/control_panel', { replace: true });
        else if (!isAuth && pathname !== '/admin/login')
          navigate('/admin/login', { replace: true });

        setIsLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;

        if (pathname !== '/admin/login')
          navigate('/admin/login', { replace: true });

        setIsLoading(false);
      });

    return () => isMounted = false;
  }, [pathname]);

  const pagesObj = {
    '/admin/control_panel': 'Painel de controle',
    '/admin/categories': 'Categorias',
    '/admin/products': 'Produtos',
    '/admin/reports': 'Relatórios',
    '/admin/manage': 'Gerenciar',
  };
  const page = pagesObj[pathname];

  if (isLoading) return <p>Carregando...</p>;

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

export default PrivateRoutesLayout;