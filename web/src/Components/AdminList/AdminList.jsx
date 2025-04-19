import React, { useCallback, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

//-----Icons
import EditIcon from "../../assets/icons/editIcon.svg";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";

//-----Component
import ModalAdmin from "../ModalAdmin/ModalAdmin";

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
    loadCurrentAdmin();
  }, [type, listData]);

  const handleConfirmDelete = (row) => {
    setConfirmDelteteProp(row);
    setIsConfirmDeleteModalOpen(true);
  };

  const getCellValue = (row, key) => {
    if (row[key] === undefined || row[key] === "") {
      return "Indisponível";
    } else if (key === "available") {
      return row.available ? "Disponível" : "Sem estoque";
    } else {
      return row[key];
    }
  };

  return (
    <div className="admin-list">
      {isConfirmDeleteModalOpen && (
        <ModalAdmin
          title={`Deseja mesmo deletar "${confirmDelteteProp.name}"?`}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          onConfirm={() => {
            setIsConfirmDeleteModalOpen(false)
            onDelete(confirmDelteteProp)
          }}
          isButtonConfirmRed={true}
          buttonConfirmText="Excluir"
        />
      )}

      <table>
        <thead>
          <tr>
            {tableLayout.map((title) => (
              <th key={title.key}>{title.label}</th>
            ))}
            <th className="actions">Ações</th>
          </tr>
        </thead>

        <tbody>
          {listData.map(row => (
            <tr key={row.id}>
              {tableLayout.map(({ key }) => (
                <td key={key}>{getCellValue(row, key)}</td>
              ))}

              <td className="actions">
                {
                  (type === 'adminAccounts' && currentAdmin !== row.id && actionsLoaded) && (
                    <>
                      <img
                        src={EditIcon}
                        className="icon-editar"
                        onClick={() => onEdit(row)}
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Editar"
                      />
                      <img
                        src={DeleteIcon}
                        className="icon-deletar"
                        onClick={() => handleConfirmDelete(row)}
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Excluir"
                      />
                    </>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
