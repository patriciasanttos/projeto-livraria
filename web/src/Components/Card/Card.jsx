import React from 'react';

import './Card.scss';

function Card({ id, name, price, image, color, isCategory }) {
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

                <button>Adicionar ao Carrinho</button>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Card;