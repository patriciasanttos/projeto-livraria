import React, { useMemo, useState, useCallback } from "react";

import "./Categories.scss";

import AdminList from "../../../Components/AdminList/AdminList";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";

import { useAllCagegoriesData } from "../../../hooks/useCategoriesData";
import { CategoriesModal } from "./CategoriesModal";

function Categories() {
  const { data: categoriesData } = useAllCagegoriesData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateItem, setIsCreateItem] = useState(false);

  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({});

  const filteredCategories = useMemo(() => {
    let categories = categoriesData
      ? categoriesData?.map((category) => ({
          ...category,
          itemsQuantity: category.items.length,
        }))
      : [];

    if (filters.name) {
      categories = categories.filter(
        (category) =>
          category.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1
      );
    }

    if (filters.quantityFrom) {
      categories = categories.filter(
        (category) => Number(category.itemsQuantity) >= filters.quantityFrom
      );
    }

    if (filters.quantityTo) {
      categories = categories.filter(
        (category) => Number(category.itemsQuantity) <= filters.quantityTo
      );
    }

    return categories;
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

  const onClickUpdate = (row) => {
    setFormData({
      ...row,
    });
    setIsModalOpen(true);
    setIsCreateItem(false);
  };

  const onClickCreate = () => {
    setFormData({});
    setIsModalOpen(true);
    setIsCreateItem(true);
  };

  return (
    <section className="categories-page-container">
      <section className="categories-filter-container">
        <section className="categories-page-filter">
          <SearchInputAdmin
            title="Categoria"
            placeholder="Papelaria"
            name="name"
            onChange={handleFilterChange}
          />
          <div className="input-quantity">
            <SearchInputAdmin
              title="Qte Items"
              placeholder="De"
              className="quantity"
              name="quantityFrom"
              onChange={handleFilterChange}
            />
            <SearchInputAdmin
              placeholder="Até"
              className="until-quantity quantity"
              name="quantityTo"
              onChange={handleFilterChange}
            />
          </div>

          <DropdownAdmin title="Status" name="available">
            <option name="available" value="">
              Tudo
            </option>
            <option name="available" value={true}>
              Habilitado
            </option>
            <option name="available" value={false}>
              Desabilitado
            </option>
          </DropdownAdmin>
        </section>
        <AdminAddButton title="Adicionar" onClick={onClickCreate} />
      </section>
      <AdminList
        tableLayout={[
          {
            key: "name",
            label: "Categoria",
          },
          {
            key: "itemsQuantity",
            label: "Quantidade de itens",
          },
          {
            key: "available",
            label: "Status",
          },
        ]}
        listData={filteredCategories}
        onEdit={onClickUpdate}
      ></AdminList>

      {isModalOpen && (
        <CategoriesModal
          isCreateItem={isCreateItem}
          formData={formData}
          setFormData={setFormData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}

export default Categories;
