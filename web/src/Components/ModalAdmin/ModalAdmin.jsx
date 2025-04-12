import "./ModalAdmin.scss";

import CloseBtnAdmin from '../../assets/icons/close-btn-admin.svg'

function ModalAdmin({
  onClose,
  onConfirm,
  title,
  children,
  buttonConfirmText,
  isButtonConfirmRed
}) {
  return (
    <section className="modal-admin">
      <div className="modal-admin-content">
        <div className="modal-admin-header">
          <div></div>
          <h2>{title}</h2>
          <img src={CloseBtnAdmin} alt="Fechar" onClick={onClose} />
        </div>
        {children}
        <div className="modal-admin-buttons">
          <button
            className="delete"
            onClick={onConfirm}
            style={isButtonConfirmRed ? { backgroundColor: "#e33b3b" } : {}}
          >
            {buttonConfirmText ? buttonConfirmText : "Confirmar"}
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
