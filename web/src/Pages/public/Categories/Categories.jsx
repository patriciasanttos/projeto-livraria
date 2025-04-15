import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

//-----Images
import kitCanetas from '../../../assets/Images/kit-canetas.svg';
import whatsappContactImage from '../../../assets/Images/whatsapp-contact.svg'
import whatsappContactImageMobile from '../../../assets/Images/whatsapp-contact-mobile.svg'

//-----Components
import Card from '../../../components/Card/Card';
import Pagination from '../../../components/Pagination/Pagination';

import './Categories.scss';
import { useCategoriesData } from '../../../hooks/useCategoriesData';

function Categories() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { categoryName } = useParams();

  const { data: categoriesData, isLoading, error } = useCategoriesData();

  const [data, setData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  const handleChangePage = useCallback(page => {
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;

    const itemsPage = data.slice(startIndex, endIndex);

    setDisplayedItems(itemsPage);
  }, [data]);

  const loadData = useCallback(() => {
    if (!categoriesData) return [];

    if (!categoryName) {
      return categoriesData.map(category => ({
        id: category.id,
        name: category.name,
        image: category.image
      }))
    }

    const category = categoriesData.find(category => category.name.toLowerCase() === categoryName.toLowerCase());
    if (!category) {
      toast.error('Opa, parece que essa categoria não foi encontrada!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true
      });

      navigate('/categories');
      return [];
    };

    const categoryItems = category.items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    }));

    const multipliedItems = [];
    for (let i = 0; i < 40; i++) {
      multipliedItems.push(...categoryItems.map(item => ({
        ...item,
        id: item.id,
        name: item.name
      })));
    }

    return multipliedItems;
  }, [categoriesData, categoryName, navigate]);


  useEffect(() => {
    if (isLoading)
      return;

    const newData = loadData();
    if (!newData || newData.length === 0) {
      setData([]);
      setDisplayedItems([]);
      return;
    }

    setData(newData);
    setDisplayedItems(newData.slice(0, 9));
  }, [categoryName, navigate, categoriesData, loadData]);

  if (isLoading)
    return <p className='no-items-warn'>Buscando dados...</p>

  if ((data && data.length <= 0) || error)
    return <p className='no-items-warn'>Desculpe, parece que nenhum item foi adicionado nessa categoria ainda.</p>

  return (
    <div className='category-page'>
      {categoryName && <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>}

      <div className='category-page-items'>
        {displayedItems.map((option, index) => (
          <Card
            key={`${option.id}-${index}`}
            id={option.id}
            name={option.name}
            image={kitCanetas}
            price={option.price}
            color='pink'
            isCategory={categoryName ? false : true}
            currentCategory={pathname.split('/')[2]}
          />
        ))}
      </div>

      <Pagination
        totalItems={data?.length}
        onPageChange={handleChangePage}
      />

      <a href="https://wa.me/5512982294420" target='_blank'>
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

export default Categories;