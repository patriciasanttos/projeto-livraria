import React from 'react';

import './AboutUs.scss';
import aboutUsImg from '../../../assets/images/aboutUsImg.svg';
import instagramIcon from '../../../assets/images/aboutUsInstagramIcon.svg';
import whatsappIcon from '../../../assets/images/aboutUsWppIcon.svg';
import locationIcon from '../../../assets/images/aboutUsLocationIcon.svg';

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            beatae dolorem dignissimos, pariatur amet possimus deserunt iste
            accusantium nesciunt nobis magnam culpa explicabo ex est,
            consectetur ipsa? Officiis aperiam doloribus eligendi inventore.
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
                Endereço da loja
              </p>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1598!2d-46.6544!3d-23.5632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQ3LjUiUyA0NsKwMzknMTUuOCJX!5e0!3m2!1spt-BR!2sbr!4v1"
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
              <a target='_blank' href="#" className="info-number">
                (00) 00000-0000
              </a>
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
                target='_blank'
                href="#"
                className="info-instagram"
              >
                @instagram
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
            <p className="faq-answer">Basta navegar pelas categorias, escolher os produtos desejados e adicioná-los ao carrinho. Ao finalizar, você será direcionado para o nosso WhatsApp para confirmar o pedido!</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Quais são as formas de pagamento?
            </summary>
            <p className="faq-answer">Aceitamos cartão de crédito, débito, Pix e dinheiro. Para compras pelo site, o pagamento é feito na retirada do pedido na loja.</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Até que horas posso retirar meu pedido?
            </summary>
            <p className="faq-answer">Nosso horário de funcionamento é de segunda a sábado, das 10h às 22h. Basta fazer o pedido e retirar dentro desse horário!</p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">Vocês fazem entrega?</summary>
            <p className="faq-answer">No momento trabalhamos apenas com retirada na loja. Mas fique tranquilo, separamos seu pedido com carinho para você retirar quando for mais conveniente!</p>
          </details>
        </div>
      </section>
    </main>
  );
}

export default AboutUs;