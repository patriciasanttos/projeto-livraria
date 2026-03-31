import React from 'react';
import { Outlet } from 'react-router-dom';

//-----Components
import Header from '../components/Header/Header';
import WhatsappPopup from '../components/WhatsappPopup/WhatsappPopup';
import Footer from '../components/Footer/Footer';

function PublicRoutesLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <WhatsappPopup />

      <main style={{ flex: 1 }}><Outlet /></main>

      <Footer />
    </div>
  );
}

export default PublicRoutesLayout;