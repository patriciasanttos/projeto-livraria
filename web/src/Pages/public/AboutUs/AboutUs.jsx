import React from 'react';

import './AboutUs.scss';
import aboutUsImg from '../../../assets/Images/aboutUsImg.svg';
import instagramIcon from '../../../assets/Images/aboutUsInstagramIcon.svg';
import whatsappIcon from '../../../assets/Images/aboutUsWppIcon.svg';
import locationIcon from '../../../assets/Images/aboutUsLocationIcon.svg';

function AboutUs() {
  return (
    <main className="aboutus-page">
      <h1 className="aboutus-section-title">Sobre nós</h1>
      <section className="aboutus-apresentation">
        <figure className="aboutus-team">
          <img src={aboutUsImg} alt="Foto da equipe" />
        </figure>

        <div className="aboutus-text-container">
          <p className="aboutus-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            beatae dolorem dignissimos, pariatur amet possimus deserunt iste
            accusantium nesciunt nobis magnam culpa explicabo ex est,
            consectetur ipsa? Officiis aperiam doloribus eligendi inventore.
          </p>
        </div>
      </section>

      <section className="contacts">
        <h1 className="contacts-title">Fale conosco</h1>

        <address className="address-section">
          <div>
            <div className="location">
              <h3 className="location-title">Endereço</h3>
              <img
                src={locationIcon}
                alt="Icone de localização"
                className="location-icon"
              />
            </div>

            <div className="address-location">
              <p>
                R. Andorra, 500 - Jardim America, São José dos Campos - SP,
                12235-050
              </p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.14969880942!2d-45.8978927!3d-23.237638999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4aa30bf55685%3A0x9a8b6fe5f74882f2!2sShopping%20Jardim%20Oriente!5e0!3m2!1spt-BR!2sbr!4v1742417598628!5m2!1spt-BR!2sbr"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da loja no mapa"
          />
        </address>

        <section className="socialnetwork">
          <div className="socialnetwork-item">
            <div className="wpp-instagram">
              <h3 className="socialnetwork-title">Whatsapp</h3>
              <img
                src={whatsappIcon}
                alt="Icone do Whatsapp"
                className="wpp-instagram-icon"
              />
            </div>

            <div className="wpp-number">
              <p className="info-number">(12) 98229-4420</p>
            </div>
          </div>

          <div className="socialnetwork-item">
            <div className="wpp-instagram">
              <h3 className="socialnetwork-title">Nosso Instagram</h3>
              <img
                src={instagramIcon}
                alt="Icone do Instagram"
                className="wpp-instagram-icon"
              />
            </div>

            <div className="instagram-info">
              <a
                href="https://www.instagram.com/ciadaeducacaosjc/"
                className="info-instagram"
              >
                @ciadaeducacaosjc
              </a>
            </div>
          </div>
        </section>
      </section>

      <section className="faq-section">
        <h1 className="faq-section-title">Dúvidas Frequentes</h1>

        <div className="faq-container">
          <details className="faq-item">
            <summary className="faq-question">
              Como faço para comprar no site?
            </summary>
            <p className="faq-answer">Resposta a ser enviada.</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Quais são as formas de pagamento?
            </summary>
            <p className="faq-answer">Resposta a ser enviada.</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Até que horas posso retirar meu pedido?
            </summary>
            <p className="faq-answer">Resposta a ser enviada.</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">Vocês fazem entrega?</summary>
            <p className="faq-answer">Resposta a ser enviada.</p>
          </details>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;