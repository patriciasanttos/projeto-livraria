import React, { useEffect, useState } from 'react';

//-----Icons
import addToCartIcon from '../../assets/icons/addToCart.svg';
import addedToCart from '../../assets/icons/addedToCart.svg';

import './Card.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Card({ id, name, price, image, color, isCategory }) {
  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartCookie = JSON.parse(localStorage.getItem('cart')) || {};

    if (cartCookie[id])
      setIsInCart(true);
  }, [id, isInCart]);


  const addToCart = () => {
    const cartCookie = JSON.parse(localStorage.getItem('cart')) || {};

    cartCookie[id] = (cartCookie[id] || 0) + 1;

    localStorage.setItem('cart', JSON.stringify(cartCookie));
    setIsInCart(true);

    return toast.success('Item adicionado ao seu carrinho', {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true
    })
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

    return toast.success('Item removido de seu carrinho', {
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: true
    });
  }

  return (
    <div
      className={`card ${isCategory ? 'category-card' : 'item-card'}`}
      onClick={() =>
        isCategory && navigate(`/categories/${name.toLowerCase()}`)
      }
    >
      <div className="card-image">
        <img src={image} alt={name} />
      </div>

      <div className='card-data'>
        <p className={isCategory ? color : ''} title={name}>{name}</p>
        {
          !isCategory && (
            <>
              <p className="price">{`R$${price},00`}</p>
              <p className="installment">Até xxxx no cartão de crédito</p>

              <div className='cart-buttons'>
                {!isInCart ? (
                  <img src={addToCartIcon} alt="Adicionar ao carrinho" onClick={addToCart} />
                ) : (
                  <img src={addedToCart} alt="Remover do carrinho" onClick={removeFromCart} />
                )}
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Card;