import React from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import "./ItemPage.scss";
import ItemDescription from "../../../Components/ItemDescription/ItemDescription";
import Category from "../../../components/Category/Category";
import mock from "../../../mocks/categoriesMocks.json";

import whatsappContactImage from "../../../assets/Images/whatsapp-contact.svg";
import whatsappContactImageMobile from "../../../assets/Images/whatsapp-contact-mobile.svg";

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
            // name={
            //   category1.name.charAt(0).toUpperCase() + category1.name.slice(1)
            // }
            categoryColor="blue"
          />
        </div>
        <div className="categoris-container">
          <Category
            data={_.shuffle(productsOfDifferentCategory)}
            name={"Compre junto"}
            // name={
            //   category2.name.charAt(0).toUpperCase() + category2.name.slice(1)
            // }
            categoryColor="blue"
          />
        </div>
        <a target="_blank" href="https://wa.me/5512982294420">
          <img
            className="whatsapp-contact-image"
            src={
              window.innerWidth >= 768
                ? whatsappContactImage
                : whatsappContactImageMobile
            }
            alt="Whatsapp"
          />
        </a>
      </section>
    </div>
  );
}

export default ItemPage;
