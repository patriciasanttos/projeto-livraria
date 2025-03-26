import React, { useEffect, useState } from 'react';

import './Card.scss';

function Card({ id, name, price, image, color, isCategory }) {
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
  }

  return (
    <div className="card">
      <div key={id} className={isCategory ? 'category-card' : 'item-card'}>
        <img src={image} alt="Logo DNC" />

        <div className='card-data'>
          <p className={isCategory && color} title={name}>{name}</p>
          {
            !isCategory && (
              <>
                <p>{`R$${price},00`}</p>
                <p>Até xxxx no cartão de crédito</p>

                {!isInCart ? (
                  <button onClick={addToCart}>Adicionar ao Carrinho</button>
                ) : (
                  <button onClick={removeFromCart}>Remover do Carrinho</button>
                )}
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Card;