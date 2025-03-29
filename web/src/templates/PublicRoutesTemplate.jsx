import React from 'react';
import { Outlet } from 'react-router-dom';

//-----Components
import Header from '../components/Header/Header';
import WhatsappPopup from '../components/WhatsappPopup/WhatsappPopup';

function PublicRoutesTemplate() {
  return (
    <>
      <Header />
      <WhatsappPopup />

      <main><Outlet /></main>
    </>
  );
}

export default PublicRoutesTemplate;