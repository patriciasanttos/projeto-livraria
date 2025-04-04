import './ModalDelete.scss'

function ModalDelete({ setModalDelete, handleDelete, text, textItem }) {
  return (
    <section className="modal-delete">
      <div className="modal-delete-content">
        <h2>Confirmação</h2>
        <p>
          {text} {textItem}
        </p>
        <div className="modal-delete-buttons">
          <button className="delete" onClick={handleDelete}>
            Excluir
          </button>
          <button className="cancel" onClick={() => setModalDelete(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalDelete;