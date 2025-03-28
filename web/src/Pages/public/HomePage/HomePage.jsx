import React from 'react';

import mock from '../../../mocks/categoriesMocks.json'
import './HomePage.scss';
import Category from '../../../components/Category/Category';

function HomePage() {
  const category1 = mock.data[0];
  const category2 = mock.data[1];
  const allCategories = mock.data;

  return (
    <div>
      <h1>Home Page</h1>

      <Category
        data={category1.items}
        name={category1.name.charAt(0).toUpperCase() + category1.name.slice(1)}
        categoryColor='pink'
      />
      <Category
        data={category2.items}
        name={category2.name.charAt(0).toUpperCase() + category2.name.slice(1)}
        categoryColor='green'
      />
      <Category
        data={allCategories}
        name='Compre por Categoria'
        categoryColor='blue'
        showOnlyCategories
      />
    </div>
  );
}

export default HomePage;