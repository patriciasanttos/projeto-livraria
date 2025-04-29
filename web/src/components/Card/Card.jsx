import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//-----Icons
import addToCartIcon from '../../assets/icons/addToCart.svg';
import addedToCart from '../../assets/icons/addedToCart.svg';

import { toast } from 'react-toastify';

import './Card.scss';

function Card({ id, name, price, image, color, isCategory, currentCategory }) {
  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartCookie = JSON.parse(localStorage.getItem('cart')) || {};

    if (cartCookie[id])
      setIsInCart(true);
  }, [id, isInCart]);

  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const addToCart = () => {
    const cartCookie = JSON.parse(localStorage.getItem('cart')) || {};

    cartCookie[id] = (cartCookie[id] || 0) + 1;

    localStorage.setItem('cart', JSON.stringify(cartCookie));
    setIsInCart(true);

    return toast.success('Item adicionado ao seu carrinho')
  }

  const removeFromCart = () => {
    const cartCookie = JSON.parse(localStorage.getItem('cart'));

    if (!cartCookie || !cartCookie[id])
      return;

    delete cartCookie[id];

    if (Object.keys(cartCookie).length === 0)
      localStorage.removeItem('cart');
    else
      localStorage.setItem('cart', JSON.stringify(cartCookie));

    setIsInCart(false);

    return toast.success('Item removido de seu carrinho');
  }

  const handleOpenPage = () => {
    if (isCategory)
      return navigate(`/categories/${name.toLowerCase()}`)

    return navigate(`/products/${id}`, { state: { currentCategory } })
  }

  return (
    <div className={`card ${isCategory ? "category-card" : "item-card"}`}>
      <div className="card-image" onClick={handleOpenPage}>
        <img src={image} alt={name} />
      </div>

      <div className="card-data">
        <p
          className={isCategory ? color : ""}
          title={name}
          onClick={handleOpenPage}
        >
          {name}
        </p>
        {!isCategory && (
          <>
            <p className="price">{currency.format(price)}</p>

            <div className="cart-buttons">
              {!isInCart ? (
                <img
                  src={addToCartIcon}
                  alt="Adicionar ao carrinho"
                  onClick={addToCart}
                />
              ) : (
                <img
                  src={addedToCart}
                  alt="Remover do carrinho"
                  onClick={removeFromCart}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;