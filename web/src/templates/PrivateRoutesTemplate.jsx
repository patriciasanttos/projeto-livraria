import React from 'react';
import { Outlet } from 'react-router-dom';

import AsideBar from '../Components/AsideBar/AsideBar';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';

function PrivateRoutesTemplate() {
  return (
    <div style={{
      display: 'flex',
    }}>
      <AsideBar />

      <main
        style={{
          width: '100%',
          height: '100dvh'
        }}
      >
        <HeaderAdmin />
        <Outlet />
      </main>
    </div>
  );
}

export default PrivateRoutesTemplate;