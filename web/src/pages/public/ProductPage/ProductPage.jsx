import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCategoriesData } from '../../../hooks/useCategories';
import _ from "lodash";

//-----Components
import ProductDescription from "../../../components/ProductDescription/ProductDescription";
import Category from "../../../components/Category/Category";
import WhatsappContact from "../../../components/WhatsappContact/WhatsappContact";
import ErrorFinding from "../../../components/PageProcessing/ErrorFinding/ErrorFinding";
import Loading from "../../../components/PageProcessing/Loading/Loading";

import "./ProductPage.scss";

function ItemPage() {
  const { id } = useParams();
  const { state: locationState } = useLocation();

  const { data, isLoading, error } = useCategoriesData()

  const [product, setProduct] = useState();
  const [productsOfSameCategory, setProductsOfSameCategory] = useState([]);
  const [productsOfDifferentCategory, setProductsOfDifferentCategory] = useState([]);

  useEffect(() => {
    if (!data) return;

    for (const category of data) {
      const foundProduct = category.items.find(item => item.id === Number(id));

      if (foundProduct) {
        setProduct(foundProduct);

        if (locationState && (category.id === locationState.currentCategory || category.name.toLowerCase() === locationState.currentCategory)) {
          setProductsOfSameCategory(category.items.filter(p => p.id != id))
        }

        setProductsOfDifferentCategory(
          data
            .filter(c => c.id !== category.id)
            .flatMap(c => c.items)
        );

        break;
      }
    }
  }, [data, id, locationState]);

  if (isLoading)
    return <Loading title="Buscando produto" style={{ marginTop: "4rem" }} />

  if (!data || !product || error)
    return (
      <ErrorFinding
        text="Produto não encontrado. Por favor, busque por outro produto"
        style={{ marginTop: "6rem" }}
      />
    );

  return (
    <div>
      <ProductDescription product={product} />

      <section className="item-page-categories">
        {
          (locationState && productsOfSameCategory.length > 0) && (
            <div className="categoris-container">
              <Category
                data={_.shuffle(productsOfSameCategory)}
                name={"Produtos similares"}
                categoryColor="blue"
              />
            </div>
          )
        }
        {
          productsOfDifferentCategory.length > 0 && (
            <div className="categoris-container">
              <Category
                data={_.shuffle(productsOfDifferentCategory)}
                name={"Compre junto"}
                categoryColor="blue"
              />
            </div>
          )
        }

        <WhatsappContact />
      </section >
    </div >
  );
}

export default ItemPage;
