import React from 'react';

import './Manages.scss';
import SearchInputAdmin from '../../../Components/SearchInputAdmin/SearchInputAdmin';
import AdminAddButton from '../../../Components/AdminAddButton/AdminAddButton';

function Manages() {
  return (
    
    <div class='manages'> 
      <div class='inputs-manages'>
        <SearchInputAdmin title="Nome" placeholder="Pessoa 1" />
        <SearchInputAdmin title="Permissão" placeholder="Nível 1"/>
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