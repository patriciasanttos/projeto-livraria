import React from 'react';

import whatsappIcon from '../../assets/icons/whatsapp-popup.svg';

import './WhatsappPopup.scss';

function WhatsappPopup() {
  return (
    <a className="whatsapp-popup" target='_blank' href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}>
      <img src={whatsappIcon} alt="Whatsapp" />
    </a>
  );
}

export default WhatsappPopup;