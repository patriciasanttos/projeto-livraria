import React from 'react';

import './ItemPage.scss';
import ItemDescription from '../../../Components/ItemDescription/ItemDescription';
import Category from '../../../components/Category/Category';
import mock from '../../../mocks/categoriesMocks.json'

function ItemPage() {
    const category1 = mock.data[0];
    const category2 = mock.data[1];
    
  return (
    <div>
      <ItemDescription />
      <section className="item-page-categories">
        <div className="categoris-container">
          <Category
            data={category1.items}
            name={"Produtos similares"}
            // name={
            //   category1.name.charAt(0).toUpperCase() + category1.name.slice(1)
            // }
            categoryColor="blue"
          />
        </div>
        <div className="categoris-container">
          <Category
            data={category2.items}
            name={"Compre junto"}
            // name={
            //   category2.name.charAt(0).toUpperCase() + category2.name.slice(1)
            // }
            categoryColor="blue"
          />
        </div>
      </section>
    </div>
  );
}

export default ItemPage;