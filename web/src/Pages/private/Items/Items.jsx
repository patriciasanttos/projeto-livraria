import React from 'react';

import './Items.scss';
import ModalAdmin from '../../../Components/ModalAdmin/ModalAdmin';
import AdminList from '../../../Components/AdminList/AdminList'
import SearchInputAdmin from '../../../Components/SearchInputAdmin/SearchInputAdmin';
import DropdownAdmin from '../../../Components/DropdownAdmin/DropdownAdmin';
import AdminAddButton from '../../../Components/AdminAddButton/AdminAddButton';

function Items() {
  return (
    <section className="item-page-container">
      <section className="filter-container">
        <div className="filter-inputs">
          <SearchInputAdmin title="Produto" placeholder="Kit caneta" />
          <div className="input-price">
            <SearchInputAdmin
              title="Preço"
              placeholder="De"
              className="price"
            />
            <SearchInputAdmin placeholder="Até" className="until-price price" />
          </div>
          <SearchInputAdmin title="Categoria" placeholder="Papelaria" />

          <DropdownAdmin title="Status">
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
            <option value="Tudo">Tudo</option>
          </DropdownAdmin>
        </div>
        <AdminAddButton title="Adicionar" />
      </section>

      <AdminList
        tableLayout={[
          {
            key: "name",
            label: "Produto",
          },
          {
            key: "price",
            label: "Preço",
          },
          {
            key: "category",
            label: "Categoria",
          },
          {
            key: "status",
            label: "Status",
          },
        ]}
        listData={[
          {
            name: "Kit canetas 1",
            price: "R$00,00",
            category: "Escola",
            status: "Disponível",
          },
          {
            name: "Kit canetas 2",
            price: "R$00,00",
            category: "Escola",
            status: "Disponível",
          },
        ]}
      ></AdminList>
    </section>
  );
}

export default Items;