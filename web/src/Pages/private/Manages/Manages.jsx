import React, { useCallback, useState } from "react";

import "./Manages.scss";
import { ManagesModal } from "./ManagesModal";

import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";
import mock from "../../../mocks/adminsMock.json";
import AdminList from "../../../Components/AdminList/AdminList";

function Manages() {
  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);

  const data = mock.data;

  const getFilteredData = () => {
    let filteredData = [...data];

    if (filters.name) {
      filteredData = filteredData.filter(
        (adminItem) =>
          adminItem.name.toUpperCase().indexOf(filters.name.toUpperCase()) !==
          -1
      );
    }

    return filteredData;
  };

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
    setIsCreateAdmin(false);
  };

  const onClickCreate = () => {
    setFormData({});
    setIsModalOpen(true);
    setIsCreateAdmin(true);
  };

  return (
    <section className="manages">
      <div className="inputs-manages">
        <SearchInputAdmin
          title="Nome"
          placeholder="Pessoa 1"
          name="name"
          onChange={handleFilterChange}
        />
        <AdminAddButton title="Adicionar" onClick={onClickCreate} />
      </div>

      <AdminList
        tableLayout={[
          {
            key: "name",
            label: "Nome",
          },
          {
            key: "email",
            label: "E-mail",
          },
          {
            key: "contact",
            label: "Contato",
          },
        ]}
        listData={getFilteredData()}
        onEdit={onClickUpdate}
      ></AdminList>

      {isModalOpen && (
        <ManagesModal
          isCreateAdmin={isCreateAdmin}
          formData={formData}
          setFormData={setFormData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}

export default Manages;
