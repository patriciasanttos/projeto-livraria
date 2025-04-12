import React, { useState } from "react";

import "./AdminList.scss";
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import EditIcon from "../../assets/icons/editIcon.svg";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";

function AdminList({ tableLayout, listData, onEdit, onDelete }) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [confirmDeltetePropName, setConfirmDeltetePropName] = useState(null);

  const handleConfirmDelete = (name) => {
    setConfirmDeltetePropName(name);
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
          title={`Deseja mesmo deletar "${confirmDeltetePropName}"?`}
          onClose={() => setIsConfirmDeleteModalOpen(false)}
          onConfirm={() => onDelete(category.name, index)}
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
          {listData.map((row, index) => (
            <tr key={row.id}>
              {tableLayout.map(({ key }) => (
                <td key={key}>{getCellValue(row, key)}</td>
              ))}

              <td className="actions">
                <img
                  src={EditIcon}
                  className="icon-editar"
                  onClick={() => onEdit(row, index)}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Editar"
                />
                <img
                  src={DeleteIcon}
                  className="icon-deletar"
                  onClick={() => handleConfirmDelete(row.name, index)}
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Excluir"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
