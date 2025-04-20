import React, { useMemo, useState, useCallback, useEffect } from "react";

import "./Categories.scss";

import AdminList from "../../../Components/AdminList/AdminList";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";
import Loading from "../../../Components/PageProcessing/Loading/Loading";
import ErrorFinding from "../../../Components/PageProcessing/ErrorFinding/ErrorFinding";

import { useCategoriesData, useDeleteCategory } from "../../../hooks/useCategories";
import { CategoriesModal } from "./CategoriesModal";
import { toast } from "react-toastify";

function Categories() {
  const { data: categoriesData, isLoading, error } = useCategoriesData();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateItem, setIsCreateItem] = useState(false);

  const [filters, setFilters] = useState({ available: 'all' });
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

    if (filters.available !== 'all') {
      categories = categories.filter(
        (category) => category.available === filters.available
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

  const onClickCreate = () => {
    setFormData({
      name: '',
      available: true
    });
    setIsModalOpen(true);
    setIsCreateItem(true);
  };

  const onClickUpdate = (row) => {
    setFormData(row);
    setIsModalOpen(true);
    setIsCreateItem(false);
  };

  const onClickDelete = (data) => {
    const deletingDataToast = toast.loading('Deletando categoria...', {
      autoClose: false
    });

    try {
      deleteCategory(data.id)
      toast.dismiss(deletingDataToast);
      toast.success('Categoria deletada com sucesso!');
    } catch (err) {
      toast.dismiss(deletingDataToast);
      toast.error('Erro ao deletar categoria.');
    }
  }

    if (isLoading)
      return <Loading title="Buscando categorias" style={{ marginTop: "18rem" }} />

    if (error)
      return (
        <ErrorFinding
          text="Erro ao carregar as categorias"
          style={{ marginTop: "13rem" }}
        />
      );

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

          <DropdownAdmin
            title="Status"
            name="available"
            value={filters.available}
            defaultValue={filters.available}
            onChange={handleFilterChange}
            options={[
              { id: 'all', name: "Tudo" },
              { id: true, name: "Disponível" },
              { id: false, name: "Indisponível" }
            ]}
          />
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
        onDelete={onClickDelete}
      ></AdminList>

      {isModalOpen && (
        <CategoriesModal
          allCategories={categoriesData}
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
