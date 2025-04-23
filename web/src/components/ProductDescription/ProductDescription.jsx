import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ModalInfoBuy from "../ModalInfoBuy/ModalInfoBuy";

//-----Images
import kitCanetas from '../../assets/images/kit-canetas.svg';

import "./ProductDescription.scss";

function ProductDescription({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState();

  const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};

  const [isProductInCart, setIsProductInCart] = useState(false);

  useEffect(() => {
    setMainImage(product?.images[0]?.url)

    setIsProductInCart(cartCookie[product.id] ? true : false);
  }, [product]);

  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const onClickAddToCart = () => {
    cartCookie[product.id] = (cartCookie[product.id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cartCookie));

    setIsProductInCart(true);

    return toast.success('Produto adicionado ao seu carrinho', {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true
    })
  }

  const onClickRemoveFromCart = () => {
    delete cartCookie[product.id];

    if (Object.keys(cartCookie).length === 0)
      localStorage.removeItem("cart");
    else
      localStorage.setItem("cart", JSON.stringify(cartCookie));

    setIsProductInCart(false);

    return toast.success('Produto removido de seu carrinho', {
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
          <img className="main-product" src={mainImage ?? kitCanetas} alt="" />

          <div className="item-description-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt=""
                onClick={() => setMainImage(image.url)}
                style={{
                  border:
                    mainImage === image.url
                      ? "3px solid var(--button-pink)"
                      : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="item-description-text-container">
          <h1>{product.name}</h1>
          <h2>{currency.format(product.price)}</h2>
          <p className="description-text">
            {product.description == "null" || product.description == "undefined"
              ? ""
              : product.description}
          </p>
          <div className="item-description-buttons">
            {!isProductInCart ? (
              <button
                className="add-cart description-btn"
                onClick={onClickAddToCart}
              >
                ADICIONAR AO CARRINHO
              </button>
            ) : (
              <button
                className="remove-cart description-btn"
                onClick={onClickRemoveFromCart}
              >
                REMOVER DO CARRINHO
              </button>
            )}
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

export default ProductDescription;
