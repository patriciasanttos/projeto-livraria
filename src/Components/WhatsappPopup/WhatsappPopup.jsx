import React from 'react';

import whatsappIcon from '../../assets/icons/whatsapp-popup.svg';

import './WhatsappPopup.scss';

function WhatsappPopup() {
  return (
    <a className="whatsapp-popup" target='_blank' href='https://wa.me/5512982294420'>
      <img src={whatsappIcon} alt="Whatsapp" />
    </a>
  );
}

export default WhatsappPopup;