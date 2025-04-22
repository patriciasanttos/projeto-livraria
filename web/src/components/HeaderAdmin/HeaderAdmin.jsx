import React from 'react';
import './HeaderAdmin.scss';

import LogoutIcon from '../../assets/icons/logOut.svg'

function HeaderAdmin({ page }) {

    const onClickLogout = () => {
        alert('coringamos')
    }

    return (
      <div className="admin-header">
        <h2>{page}</h2>
        <div className="logout-container" onClick={onClickLogout}>
          <img src={LogoutIcon} alt="Ícone de sair" />
          <p>Sair</p>
        </div>
      </div>
    );
}

export default HeaderAdmin;