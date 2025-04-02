import './ModalDelete.scss'

function ModalDelete({ setModalDelete, handleDelete }) {
  return (
    <section className="modal-delete">
      <div className="modal-delete-content">
        <h2>Excluir item</h2>
        <p>Você tem certeza que deseja excluir este item?</p>
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