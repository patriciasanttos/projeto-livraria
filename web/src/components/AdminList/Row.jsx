//-----Icons
import EditIcon from "../../assets/icons/editIcon.svg";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";

const Row = ({ index, style, data }) => {
  const row = data.listData[index];
  const {
    tableLayout,
    type,
    currentAdmin,
    actionsLoaded,
    onEdit,
    handleConfirmDelete,
  } = data;

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
    <div className="table-row" style={style}>
      {tableLayout.map(({ key }) => (
        <div className="table-cell" key={key}>
          {getCellValue(row, key)}
        </div>
      ))}

      <div className="table-cell table-actions">
        <img
          src={EditIcon}
          className="icon-edit"
          onClick={() => onEdit(row)}
          data-tooltip-id="tooltip"
          data-tooltip-content="Editar"
        />
        {
          (
            type === "adminAccounts" &&
            currentAdmin !== row.id &&
            actionsLoaded
          )
            || type !== "adminAccounts" ?
            (
              <img
                src={DeleteIcon}
                className="icon-delete"
                onClick={() => handleConfirmDelete(row)}
                data-tooltip-id="tooltip"
                data-tooltip-content="Excluir"
              />
            ) : null
        }
      </div>
    </div>
  );
};


export default Row;