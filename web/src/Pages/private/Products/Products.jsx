import React, { useCallback, useState, useMemo } from "react";
import _ from "lodash";

import "./Products.scss";
import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import AdminList from "../../../Components/AdminList/AdminList";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";

import { useAllCagegoriesData } from "../../../hooks/useCategoriesData";

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

function Products() {
  const { data: categoriesData, isLoading, error } = useAllCagegoriesData();

  const [imagePreview, setImagePreview] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    available: "",
    category: "BROCHURA",
  });
  const [formData, setFormData] = useState({});

  const categories = useMemo(() => {
    return categoriesData
      ? categoriesData.map((category) => ({
          id: category.id,
          name: category.name,
        }))
      : [];
  }, [categoriesData]);

  const filteredProducts = useMemo(() => {
    let filteredProducts = categoriesData
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

    if (filters.category !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.name) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1
      );
    }

    if (filters.priceFrom) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= filters.priceFrom
      );
    }

    if (filters.priceTo) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= filters.priceTo
      );
    }

    if (_.isBoolean(filters.available)) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.available ? product.available : !product.available
      );
    }

    return filteredProducts;
  }, [categoriesData, filters]);

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

  const handleFormChange = useCallback((evt) => {
    const { name, value, files } = evt.target;

    const getValue = (val) => {
      if (val === "true") {
        return true;
      } else if (val === "false") {
        return false;
      } else {
        return val;
      }
    };

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: getValue(value),
      }));
    }
  }, []);

  const onConfirmSaveProduct = useCallback(() => {
    console.log(formData);
  }, [formData]);

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
          >
            <option value=""> Todos </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </DropdownAdmin>

          <DropdownAdmin
            title="Status"
            name="available"
            value={filters.available}
            onChange={handleFilterChange}
          >
            <option name="available" value="">
              Tudo
            </option>
            <option name="available" value={true}>
              Disponível
            </option>
            <option name="available" value={false}>
              Sem estoque
            </option>
          </DropdownAdmin>
        </div>
        <AdminAddButton
          title="Adicionar"
          onClick={() => setIsCreateModalOpen(true)}
        />
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
      ></AdminList>

      {isCreateModalOpen && (
        <ModalAdmin
          title={`Adicionar novo produto`}
          onClose={() => setIsCreateModalOpen(false)}
          onConfirm={onConfirmSaveProduct}
          buttonConfirmText={"Adicionar"}
        >
          <div className="modal-row">
            <div className="modal-column">
              <SearchInputAdmin
                className="modal-field"
                placeholder="Nome"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />

              <SearchInputAdmin
                className="modal-field"
                placeholder="Preço"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
              />

              <DropdownAdmin
                className="modal-select"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </DropdownAdmin>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Descrição do produto"
                className="textarea-product"
              ></textarea>
              <p className="input-status-title">Status:</p>
              <div className="input-status">
                <p>Disponível</p>
                <input type="radio" />
                <p>Indisponível</p>
                <input type="radio" />
              </div>
            </div>

            <div className="modal-column">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                  style={{
                    marginTop: "10px",
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              )}
              <button
                type="button"
                className="upload-button"
                onClick={() => document.getElementById("image-upload").click()}
              >
                Escolher Imagem (máx. 03)
              </button>
              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </ModalAdmin>
      )}
    </section>
  );
}

export default React.memo(Products);