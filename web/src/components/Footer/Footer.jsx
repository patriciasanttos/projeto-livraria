import React from 'react';
import FooterMobile from './FooterMobile/FooterMobile';
import FooterDesktop from './FooterDesktop/FooterDesktop';

function Footer() {
  return window.innerWidth <= 821
    ? <FooterMobile />
    : <FooterDesktop />
}

export default Footer;