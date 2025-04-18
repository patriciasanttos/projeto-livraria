import React, { useCallback, useState } from "react";
import { useAdminsData } from "../../../hooks/useAdmins";

//-----Components
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";
import AdminList from "../../../Components/AdminList/AdminList";
import { ManagesModal } from "./ManagesModal";
import Loading from "../../../Components/PageProcessing/Loading/Loading";
import ErrorFinding from "../../../Components/PageProcessing/ErrorFinding/ErrorFinding";

import "./Manages.scss";

function Manages() {
  const { data, isLoading, error } = useAdminsData();

  const [filters, setFilters] = useState({});
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);

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

  if (isLoading)
    return (
      <Loading
        title="Buscando lista de administradores"
        style={{ marginTop: "18rem" }}
      />
    );     

  if (error)
    return (
      <ErrorFinding
        text="Erro ao carregar lista de administradores"
        style={{ marginTop: "13rem" }}
      />
    );

  return (
    <section className="manage-page">
      <div className="manage-page-inputs">
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
