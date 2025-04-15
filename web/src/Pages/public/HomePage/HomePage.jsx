import React, { useEffect } from 'react';

import mock from '../../../mocks/categoriesMocks.json'

//-----Components
import Category from '../../../components/Category/Category';
import BannerSlider from '../../../Components/Banner/Banner';

//-----Images
import whatsappContactImage from '../../../assets/Images/whatsapp-contact.svg'
import whatsappContactImageMobile from '../../../assets/Images/whatsapp-contact-mobile.svg'

import './HomePage.scss';

function HomePage() {
  const category1 = mock.data[0];
  const category2 = mock.data[1];
  const allCategories = mock.data;

  return (
    <div className='home-page'>
      <BannerSlider />
      <section>
        <Category
          data={category1.items}
          id={category1.id}
          name={category1.name.charAt(0).toUpperCase() + category1.name.slice(1)}
          categoryColor='pink'
        />

        <Category
          data={category2.items}
          id={category2.id}
          name={category2.name.charAt(0).toUpperCase() + category2.name.slice(1)}
          categoryColor='green'
        />

        <Category
          data={allCategories}
          name='Compre por Categoria'
          categoryColor='blue'
          showOnlyCategories
        />
      </section>

      <a target='_blank' href="https://wa.me/5512982294420">
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
    </div>
  );
}

export default HomePage;