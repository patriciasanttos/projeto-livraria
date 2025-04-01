import React from 'react';
import { Outlet } from 'react-router-dom';

//-----Components
import Header from '../components/Header/Header';
import WhatsappPopup from '../components/WhatsappPopup/WhatsappPopup';
import Footer from '../Components/Footer/Footer';

function PublicRoutesTemplate() {
  return (
    <>
      <Header />
      <WhatsappPopup />

      <main><Outlet /></main>

      <Footer />
    </>
  );
}

export default PublicRoutesTemplate;