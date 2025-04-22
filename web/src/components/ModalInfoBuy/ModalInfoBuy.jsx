import './ModalInfoBuy.scss';
import CloseBtn from '../../assets/icons/close-btn.svg'

function ModalInfoBuy({setModalOpen}) {
    return (
      <section className="modal-info-buy">
        <div className="modal-info-buy-content">
          <div className="modal-info-buy-header">
            <h2>Processo de pagamento seguro</h2>
            <img
              src={CloseBtn}
              alt="Fechar"
              onClick={() => setModalOpen(false)}
            />
          </div>
          <ol>
            <li>Escolha os seus produtos preferidos</li>
            <li>Adicione ao carrinho</li>
            <li>Após decidir as escolhas, clique no carrinho</li>
            <li>
              Clique em finalizar compra e você será redirecionado(a) para o
              nosso WhatsApp
            </li>
            <li>Um de nossos vendedores irá te auxiliar com o pagamento</li>
          </ol>
        </div>
      </section>
    );
}

export default ModalInfoBuy;