import React, { useState } from "react";
import "./AdminList.scss";

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
        <div className="confirm-delete-modal">
          <div className="confirm-delete-modal-content">
            <p>Deseja mesmo deletar "{confirmDeltetePropName}"?</p>

            <div>
              <button className="confirm-delete-modal-button" onClick={() => onDelete(category.name, index)}>
                Confirmar
              </button>
              <button className="confirm-delete-modal-button" onClick={() => setIsConfirmDeleteModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
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
          {listData.map(row => (
            <tr key={row.id}>
              {tableLayout.map(({ key }) => (
                <td key={key}>
                  {
                    (row[key] === undefined || row[key] === '')
                      ? 'Indisponível'
                      : key === 'status'
                        ? row.status ? "Disponível" : "Sem estoque"
                        : row[key]
                  }
                </td>
              ))}

              <td>
                <button className="btn-editar" onClick={() => onEdit(row.name, index)}>
                  Editar
                </button>
              </td>
              <td>
                <button className="btn-deletar" onClick={() => handleConfirmDelete(item.name)}>
                  Deletar
                </button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminList;
