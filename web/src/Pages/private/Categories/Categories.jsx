import React, { useMemo } from "react";

import "./Categories.scss";

import AdminList from "../../../Components/AdminList/AdminList";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";

import { useAllCagegoriesData } from "../../../hooks/useCategoriesData";

function Categories() {
    const { data: categoriesData} = useAllCagegoriesData();
      // const [isModalOpen, setIsModalOpen] = useState(false);
      // const [isCreateItem, setIsCreateItem] = useState(false);
    

  const categories = useMemo(() => {
    return categoriesData
      ? categoriesData.map((category) => ({
          ...category,
          itemsQuantity: category.items.length
        }))
      : [];
  }, [categoriesData]);




  return (
    <section className="categories-page-container">
      <section className="categories-filter-container">
        <section className="categories-page-filter">
          <SearchInputAdmin
            title="Categoria"
            placeholder="Papelaria"
            name="categories"
            // onChange={handleFilterChange}
          />
          <SearchInputAdmin
            title="Quantidade de itens"
            placeholder="20"
            name="quantity"
            className="input-quantity"
          />
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
        <AdminAddButton title="Adicionar" />
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
        listData={categories}
        // onEdit={onClickUpdate}
      ></AdminList>
    </section>
  );
}

export default Categories;
