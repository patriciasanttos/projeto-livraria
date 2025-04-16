import React from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import mock from "../../../mocks/categoriesMocks.json";

import ItemDescription from "../../../Components/ItemDescription/ItemDescription";
import Category from "../../../Components/Category/Category";
import WhatsappContact from "../../../Components/WhatsappContact/WhatsappContact";

import "./ItemPage.scss";

function ItemPage() {
  const { id } = useParams();

  const allProducts = mock.data.reduce((acc, category) => {
    return [
      ...acc,
      ...category.items.map((item) => ({
        ...item,
        categoryId: category.id,
        categoryName: category.name,
      })),
    ];
  }, []);

  const product = allProducts.find((product) => product.id == id);

  const productsOfSameCategory = allProducts.filter(
    (item) => item.id !== product.id && item.categoryId === product.categoryId
  );

  const productsOfDifferentCategory = allProducts.filter(
    (item) => item.id !== product.id && item.categoryId !== product.categoryId
  )

  return (
    <div>
      <ItemDescription product={product} />

      <section className="item-page-categories">
        <div className="categoris-container">
          <Category
            data={_.shuffle(productsOfSameCategory)}
            name={"Produtos similares"}
            categoryColor="blue"
          />
        </div>
        <div className="categoris-container">
          <Category
            data={_.shuffle(productsOfDifferentCategory)}
            name={"Compre junto"}
            categoryColor="blue"
          />
        </div>

        <WhatsappContact />
      </section>
    </div>
  );
}

export default ItemPage;
