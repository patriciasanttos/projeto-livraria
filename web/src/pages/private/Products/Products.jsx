import React, { useCallback, useState, useMemo, useEffect } from "react";
import _ from "lodash";

import "./Products.scss";
import { ProductsModal } from "./ProductsModal";

import AdminList from "../../../components/AdminList/AdminList";
import SearchInputAdmin from "../../../components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../components/DropdownAdmin/DropdownAdmin";
import AdminAddButton from "../../../components/AdminAddButton/AdminAddButton";

import { useCategoriesData } from "../../../hooks/useCategories";
import { useDeleteProduct, useAllProductsData } from "../../../hooks/useProducts";
import Loading from "../../../components/PageProcessing/Loading/Loading";
import ErrorFinding from "../../../components/PageProcessing/ErrorFinding/ErrorFinding";
import { toast } from "react-toastify";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const initialFormDataState = {
  name: '',
  description: '',
  price: '',
  available: true,
  mainImage: '',
  image_1: '',
  image_2: '',
  image_3: ''
}

function Products() {
  const { data: allProducts, isLoading: isLoadingProducts } = useAllProductsData()
  const { data: categoriesData, isLoading, error } = useCategoriesData();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateItem, setIsCreateItem] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [filters, setFilters] = useState({
    available: "",
    category: "",
  });
  const [formData, setFormData] = useState(initialFormDataState);

  const categories = useMemo(() =>
    categoriesData
      ? categoriesData.map((category) => ({
        id: category.id,
        name: category.name
      }))
      : [], [categoriesData]
  );

  const filteredProducts = useMemo(() => {
    let products = categoriesData
      ? categoriesData.reduce(
        (acc, category) => [
          ...acc,
          ...category.items.map((item) => ({
            ...item,
            category: category.name,
            priceFormatted: currency.format(item.price),
          })),
        ],
        []
      )
      : [];

    if (filters.category !== "") {
      products = products.filter(
        (product) => product.category == filters.category
      );
    }

    if (filters.name) {
      products = products.filter(
        (product) =>
          product.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1
      );
    }

    if (filters.priceFrom) {
      products = products.filter(
        (product) => Number(product.price) >= filters.priceFrom
      );
    }

    if (filters.priceTo) {
      products = products.filter(
        (product) => Number(product.price) <= filters.priceTo
      );
    }

    if (_.isBoolean(filters.available)) {
      products = products.filter((product) =>
        filters.available ? product.available : !product.available
      );
    }

    return _.uniqBy(products, "id");
  }, [allProducts, categoriesData, filters]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      return setIsInitialLoad(false)
    }
  }, [categories])

  const handleFilterChange = useCallback((evt) => {
    const { name, value } = evt.target;

    const getValue = (val) => {
      if (val === "true") {
        return true;
      } else if (val === "false") {
        return false;
      } else {
        return val;
      }
    };

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: getValue(value),
    }));
  }, []);

  const onClickCreate = () => {
    setFormData(initialFormDataState)
    setIsModalOpen(true);
    setIsCreateItem(true);
  };

  const onClickUpdate = (row) => {
    const productCategories = categoriesData
      ?.filter((category) => category.items.some((item) => item.id === row.id))
      .map((category) => ({
        id: category.id,
        name: category.name
      }));

    setFormData({
      ...row,
      categories: productCategories,
    });
    setIsModalOpen(true);
    setIsCreateItem(false);
  };

  const onClickDelete = (data) => {
    const deletingDataToast = toast.loading("Deletando produto...", {
      autoClose: false,
    });

    try {
      deleteProduct(data.id);
      toast.dismiss(deletingDataToast);
      toast.success("Produto deletado com sucesso!");
    } catch (err) {
      toast.dismiss(deletingDataToast);
      toast.error("Erro ao deletar produto.");
    }
  };

  if (isLoading || isLoadingProducts || isInitialLoad)
    return <Loading title="Buscando produtos" style={{ marginTop: "15rem" }} />

  if (error)
    return (
      <ErrorFinding
        text="Erro ao carregar os produtos"
        style={{ marginTop: "13rem" }}
      />
    );

  return (
    <section className="item-page-container">
      <section className="filter-container">
        <div className="filter-inputs">
          <SearchInputAdmin
            title="Produto"
            placeholder="Kit caneta"
            name="name"
            onChange={handleFilterChange}
          />

          <div className="input-price">
            <SearchInputAdmin
              title="Preço"
              placeholder="De"
              className="price"
              name="priceFrom"
              onChange={handleFilterChange}
            />
            <SearchInputAdmin
              placeholder="Até"
              className="until-price price"
              name="priceTo"
              onChange={handleFilterChange}
            />
          </div>
          <DropdownAdmin
            title="Categoria"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "Todos" },
              ...categories.map((category) => ({
                value: category.name,
                label: category.name,
              })),
            ]}
          />

          <DropdownAdmin
            title="Status"
            name="available"
            value={filters.available}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "Tudo" },
              { value: true, label: "Disponível" },
              { value: false, label: "Sem estoque" },
            ]}
          />
          <div className="results-found">
            <h3>Itens encontrados</h3>
            <p>{filteredProducts.length}</p>
          </div>
        </div>
        <AdminAddButton title="Adicionar" onClick={onClickCreate} />
      </section>

      <AdminList
        tableLayout={[
          {
            key: "name",
            label: "Produto",
          },
          {
            key: "priceFormatted",
            label: "Preço",
          },
          {
            key: "category",
            label: "Categoria",
          },
          {
            key: "available",
            label: "Status",
          },
        ]}
        listData={filteredProducts}
        onEdit={onClickUpdate}
        onDelete={onClickDelete}
      ></AdminList>

      {isModalOpen && (
        <ProductsModal
          isCreateItem={isCreateItem}
          categories={categories}
          formData={formData}
          setFormData={setFormData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}

export default React.memo(Products);
