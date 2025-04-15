import React from 'react';

import './Manages.scss';
import SearchInputAdmin from '../../../Components/SearchInputAdmin/SearchInputAdmin';
import AdminAddButton from '../../../Components/AdminAddButton/AdminAddButton';
import mock from '../../../mocks/adminsMock.json';
import AdminList from '../../../Components/AdminList/AdminList';

function Manages() {

  const data = mock.data;
  return (
    
    <div class='manages'> 
      <div class='inputs-manages'>
        <SearchInputAdmin title="Nome" placeholder="Pessoa 1" />
        <AdminAddButton title="Adicionar"/>
      
      </div>
      

      <div class='resources'>
        <p>Nome</p>
        <p>Email</p>
        <p>Contato</p>
        <p>Permissão</p>
        <p>Ações</p>
      </div>
    
    </div>
  );
}


export default Manages;