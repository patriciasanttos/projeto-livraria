import React from 'react';

//-----Images
import whatsappContactImage from '../../assets/Images/whatsapp-contact.svg'
import whatsappContactImageMobile from '../../assets/Images/whatsapp-contact-mobile.svg'

import './WhatsappContact.scss';

function WhatsappContact() {
  return (
    <a target='_blank' href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}>
      <img
        className='whatsapp-contact-image'
        src={
          window.innerWidth >= 768
            ? whatsappContactImage
            : whatsappContactImageMobile
        }
        alt="Whatsapp"
      />
    </a>
  );
}

export default WhatsappContact;