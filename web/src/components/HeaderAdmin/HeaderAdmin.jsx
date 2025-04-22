import React from 'react';
import { logout } from '../../service/api/admins';

import LogoutIcon from '../../assets/icons/logOut.svg'

import './HeaderAdmin.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin({ page }) {
  const navigate = useNavigate();

  const onClickLogout = async () => {
    await logout()
      .then(() => navigate('/admin/login'))
      .catch(error => toast.error('Erro ao sair:', error));
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