import React, { useCallback, useEffect, useState } from "react";

//-----Component
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import { FixedSizeList as List } from "react-window";
import Row from './Row.jsx';

import "./AdminList.scss";
import { validate as validateAdmin } from "../../service/api/admins";


function AdminList({ type, tableLayout, listData, onEdit, onDelete }) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [confirmDelteteProp, setConfirmDelteteProp] = useState();

  const [currentAdmin, setCurrentAdmin] = useState(false);
  const [actionsLoaded, setAcionsLoaded] = useState(false)

  const loadCurrentAdmin = useCallback(async () => {
    const currentAdminData = await validateAdmin();

    setCurrentAdmin(currentAdminData?.data?.id);
    setAcionsLoaded(true);
  }, [type, listData]);

  useEffect(() => {
    if (type !== "adminAccounts") return setAcionsLoaded(true);
    loadCurrentAdmin();
  }, [type, listData]);

  const handleConfirmDelete = (row) => {
    setConfirmDelteteProp(row);
    setIsConfirmDeleteModalOpen(true);
  };

  return (
    <div className="admin-table">
      {isConfirmDeleteModalOpen && (
        <ModalAdmin
          title={`Deseja mesmo deletar "${confirmDelteteProp.name}"?`}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          onConfirm={() => {
            setIsConfirmDeleteModalOpen(false);
            onDelete(confirmDelteteProp);
          }}
          isButtonConfirmRed={true}
          buttonConfirmText="Excluir"
        />
      )}

      <div className="table">
        <div className="table-header">
          {tableLayout.map((title, index) => (
            <div className="table-cell" key={index}>{title.label}</div>
          ))}
          <div className="table-cell table-actions-header">Ações</div>
        </div>

        <div className="table-body">
          <List
            height={500}
            itemCount={listData.length}
            itemSize={60}
            width="100%"
            itemData={{
              listData,
              tableLayout,
              type,
              currentAdmin,
              actionsLoaded,
              onEdit,
              handleConfirmDelete,
            }}
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
}

export default AdminList;
