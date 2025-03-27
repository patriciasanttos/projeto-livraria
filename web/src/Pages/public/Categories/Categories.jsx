import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { data as mock } from '../../../mocks/categoriesMocks.json';
import kitCanetas from '../../../assets/Images/kit-canetas.svg';

import Card from '../../../components/Card/Card';

import './Categories.scss';
import { toast } from 'react-toastify';

function Categories() {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!categoryName)
      return setData(
        mock.map(category => ({
          id: category.id,
          name: category.name,
          image: category.image
        }))
      );

    const category = mock.filter(category => category.name.toLowerCase() === categoryName.toLowerCase());
    if (category.length <= 0) {
      toast.error('Opa, parece que essa categoria não foi encontrada!', {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true
      });

      return navigate('/categories');
    }

    const items = category[0].items;

    setData(items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    })));
  }, [categoryName, navigate]);

  if (data.length <= 0)
    return <p className='no-items-warn'>Desculpe, não encontramos nenhum produto nessa categoria até o momento.</p>

  return (
    <div className='category-page'>
      {categoryName && <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>}

      <div className='category-page-items'>
        {data.map(option => (
          <Card
            key={option.id}
            id={option.id}
            name={option.name}
            image={kitCanetas}
            price={option.price}
            color='pink'
            isCategory={categoryName ? false : true}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;