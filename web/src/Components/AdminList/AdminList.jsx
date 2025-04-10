import React, { useState } from "react";
import "./AdminList.scss";
import ModalAdmin from "../ModalAdmin/ModalAdmin";

function AdminList({
  tableLayout,
  listData,
  onEdit,
  onDelete
}) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [confirmDeltetePropName, setConfirmDeltetePropName] = useState(null);

  const handleConfirmDelete = (name) => {
    setConfirmDeltetePropName(name);
    setIsConfirmDeleteModalOpen(true);
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
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>

        <tbody>
          {listData.map((row, index) => (
            <tr key={row.id}>
              {tableLayout.map(({ key }) => (
                <td key={key}>
                  {row[key] === undefined || row[key] === ""
                    ? "Indisponível"
                    : key === "status"
                    ? row.status
                      ? "Disponível"
                      : "Sem estoque"
                    : row[key]}
                </td>
              ))}

              <td>
                <button
                  className="btn-editar"
                  onClick={() => onEdit(row.name, index)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  className="btn-deletar"
                  onClick={() => handleConfirmDelete(row.name)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
