import React, { useCallback, useState } from "react";

import "./Manages.scss";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import AdminAddButton from "../../../Components/AdminAddButton/AdminAddButton";
import mock from "../../../mocks/adminsMock.json";
import AdminList from "../../../Components/AdminList/AdminList";

function Manages() {
  const [filters, setFilters] = useState({});

  const data = mock.data;

  const getFilteredData = () => {
    let filteredData = [...data]
    
    if (filters.name) {
      filteredData = filteredData.filter((adminItem) => adminItem.name.toUpperCase().indexOf(filters.name.toUpperCase()) !== -1)
    }

    return filteredData
  }

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

  return (
    <section className="manages">
      <div className="inputs-manages">
        <SearchInputAdmin
          title="Nome"
          placeholder="Pessoa 1"
          name="name"
          onChange={handleFilterChange}
        />
        <AdminAddButton title="Adicionar" />
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
      ></AdminList>
    </section>
  );
}

export default Manages;
