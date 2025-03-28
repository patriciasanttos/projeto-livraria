import React from 'react';
import './ControlPanel.scss';
import AsideBar from '../../../Components/AsideBar/AsideBar'
import BodyPControl from '../../../Components/BodyPControl/BodyPControl';
import HeaderAdmin from '../../../Components/HeaderAdmin/HeaderAdmin';

function ControlPanel() {

  const arrayAdmin = ['Produtos', 'Categorias', 'Relatórios', 'Clientes', 'Gerenciar'];
  return (
    <div className='painel-controle'>
      {/* <h1>ControlPanel</h1> */}      
      <AsideBar produto={arrayAdmin}/>
      <div>
        <HeaderAdmin />
        <BodyPControl />
      </div>
    </div>
  );
}

export default ControlPanel;