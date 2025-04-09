import "./ModalAdmin.scss";

import CloseBtnAdmin from '../../assets/icons/close-btn-admin.svg'

function ModalAdmin({
  onClose,
  onConfirm,
  title,
  children,
  buttonConfirmText,
}) {
  return (
    <section className="modal-admin">
      <div className="modal-admin-content">
        <div className="modal-admin-header">
          <h2>{title}</h2>
          <img src={CloseBtnAdmin} alt="Fechar" onClick={onClose} />
        </div>
        {children}
        <div className="modal-admin-buttons">
          <button className="delete" onClick={onConfirm}>
            {buttonConfirmText}
          </button>
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModalAdmin;
