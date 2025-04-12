import "./ItemDescription.scss";
import { useState } from "react";
import { toast } from "react-toastify";


import ModalInfoBuy from "../ModalInfoBuy/ModalInfoBuy";

function ItemDescription({product}) {
  const [modalOpen, setModalOpen] = useState(false);  

  const onClickAddToCart = () => {
    const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};
    cartCookie[product.id] = (cartCookie[product.id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cartCookie));

    return toast.success('Item adicionado ao seu carrinho', {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
          draggable: true
        })
  }

  const onClickOpenModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    product && (
      <section className="item-description-container">
        <div className="item-description-images-container">
          <img className="main-product" src={product.image} alt="" />

          <div className="item-description-images">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>
        </div>

        <div className="item-description-text-container">
          <h1>{product.name}</h1>
          <h2>R$ {product.price}</h2>
          <p>até xxxxxx no cartão de crédito</p>
          <p className="description-title">Descrição do produto:</p>
          <p className="description-text">{product.description}</p>
          <div className="item-description-buttons">
            <button
              className="add-cart description-btn"
              onClick={onClickAddToCart}
            >
              ADICIONAR AO CARRINHO
            </button>
            <button
              className="info-buy description-btn"
              onClick={onClickOpenModal}
            >
              Saiba como pagar
            </button>
          </div>
        </div>

        {modalOpen && (
          <ModalInfoBuy isOpen={modalOpen} setModalOpen={onCloseModal} />
        )}
      </section>
    )
  );
}

export default ItemDescription;
