import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

//-----Images
import kitCanetas from '../../../assets/Images/kit-canetas.svg';

//-----Components
import Card from '../../../components/Card/Card';
import Pagination from '../../../components/Pagination/Pagination';
import WhatsappContact from '../../../components/WhatsappContact/WhatsappContact';
import Loading from '../../../components/PageProcessing/Loading/Loading';
import ErrorFinding from '../../../components/PageProcessing/ErrorFinding/ErrorFinding';

import { useCategoriesData } from '../../../hooks/useCategories';

import './Categories.scss';


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
      image: item.mainImage || item.images[0]?.url,
    }));

    return categoryItems;
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
    return <Loading title="Buscando categorias" style={{ marginTop: "6rem" }} />;

  if ((data && data.length <= 0) || error)
    return (
      <ErrorFinding
        text="Desculpe, parece que nenhum item foi adicionado nessa categoria ainda"
        style={{ marginTop: "6rem" }}
      />
    );

  return (
    <div className='category-page'>
      {categoryName && <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>}

      <div className='category-page-items'>
        {displayedItems.map((option, index) => (
          <Card
            key={`${option.id}-${index}`}
            id={option.id}
            name={option.name}
            image={option.image || option.mainImage || kitCanetas}
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

      <WhatsappContact />
    </div>
  );
}

export default Categories;