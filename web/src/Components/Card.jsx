import './Card.scss';
import kitCanetas from '../assets/kit-canetas.svg'
//  import imgRedonda from '../assets/imgredonda.svg'
import React, { useState, useEffect } from 'react';

const Card = (
    {
        data,
        category,
        cardBackground,
        titleColorClass,
        cartText,
        typeLeftArrow,
        typeRightArrow
    }) => {
    let numberCardsDisplayed;
    const [startIndex, setStartIndex] = useState(0);
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
    const [myMouseOut, setmyMouseOut] = useState(false);

    useEffect(() => {
        // Função para atualizar a screenWidth
        const handleResize = () => {
            setscreenWidth(window.innerWidth);
        };

        // Adiciona o evento de redimensionamento
        window.addEventListener('resize', handleResize);

        // Remove o evento quando o componente for desmontado
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // O array vazio faz o efeito rodar apenas uma vez após a montagem do componente

    //Este console.log(), printa a largura da tela no console
    // console.log(screenWidth)
    if (screenWidth < 768) {
        numberCardsDisplayed = 1;
    }
    else { numberCardsDisplayed = 3; }
    // Função para mover os cards para a esquerda
    const moveLeft = () => {
        if (startIndex < data.length - numberCardsDisplayed) {
            setStartIndex(startIndex + 1);
        }
    };

    // Função para mover os cards para a direita
    const moveRight = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };

    // Extrair os 3 cards para mostrar
    const displayedCards = data.slice(startIndex, startIndex + numberCardsDisplayed);
    function myModal() {
        if (!myMouseOut) {
            setmyMouseOut(true);
            window.alert("Clique na imagem para saber mais detalhes ou para comprar o produto");
        }
    }
console.log(titleColorClass)
    return (
        <div className='class-card'>
            {/* Título único acima dos cards */}
            <h2 className={titleColorClass}>{category}</h2>
            <div className="general-container">
                <img className='arrow' src={typeLeftArrow} alt="seta-esquerda"
                    onClick={moveLeft} style={{
                        cursor: startIndex === data.length - numberCardsDisplayed ?
                            'not-allowed' : 'pointer'
                    }} />
                {/* Renderizando os 3 cards */}
                {displayedCards.map((card) => (
                    <div key={card.id} className=' card-container'>
                    <div  className= {`${cardBackground} card`}>
                            <img src={kitCanetas} alt="Logo DNC" onMouseOut={myModal} />
                            {/* <img src={card.items[0].image} alt="Imagem do produto" /> */}
                            <div className='cart-text' >
                                <p className={titleColorClass}>{card.name}</p>
                                <p className={titleColorClass}>{card.description}</p>
                                <p className={titleColorClass}>{`R$${card.items[0].price},00`}</p>
                                <h3>{cartText}</h3>
                            </div>                            
                        </div>
                        
                    </div>
                    
                ))}

                <img className='arrow' src={typeRightArrow} alt="seta-direita"
                    onClick={moveRight} style={{
                        cursor: startIndex === 0 ?
                            'not-allowed' : 'pointer'
                    }} />
            </div>

        </div>
    );
}

export default Card;
