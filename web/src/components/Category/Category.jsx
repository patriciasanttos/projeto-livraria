import React, { useState, useEffect } from 'react';

import kitCanetas from '../../assets/images/kit-canetas.svg'

import Card from '../Card/Card';

//-----Icons
import leftArrowPink from '../../assets/icons/left-arrow-pink.svg'
import rightArrowPink from '../../assets/icons/right-arrow-pink.svg'
import leftArrowBlue from '../../assets/icons/left-arrow-blue.svg'
import rightArrowBlue from '../../assets/icons/right-arrow-blue.svg'
import leftArrowGreen from '../../assets/icons/left-arrow-green.svg'
import rightArrowGreen from '../../assets/icons/right-arrow-green.svg'

import './Category.scss';

const Category = ({
    data,
    id,
    name,
    categoryColor,
    showOnlyCategories
}) => {
    const [categoryArrow, setCategoryArrow] = useState({
        leftArrow: leftArrowPink,
        rightArrow: rightArrowPink
    });

    const [startIndex, setStartIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3);

    useEffect(() => {
        setCategoryArrow(prev => {
            if (categoryColor === 'blue')
                return { leftArrow: leftArrowBlue, rightArrow: rightArrowBlue }
            else if (categoryColor === 'green')
                return { leftArrow: leftArrowGreen, rightArrow: rightArrowGreen }

            return prev;
        });
    }, [categoryColor]);

    useEffect(() => {
        const loadCardsPerPage = () => {
            if (window.innerWidth <= 503)
                return setCardsPerPage(1)

            if (window.innerWidth <= 820)
                return setCardsPerPage(2)

            return setCardsPerPage(3);
        };

        loadCardsPerPage();
        window.addEventListener('resize', loadCardsPerPage);

        return () => window.removeEventListener('resize', loadCardsPerPage);
    }, []);


    const moveLeft = () => {
        if (startIndex > 0)
            return setStartIndex(prev => prev - 1);
    };
    const moveRight = () => {
        if (startIndex + cardsPerPage < data.length)
            return setStartIndex(prev => prev + 1);
    };


    const displayedCards = data.slice(startIndex, startIndex + cardsPerPage);

    return (
        <div className='category-component'>
            <h2 className={categoryColor}>{name}</h2>

            <div className="category-component-container">
                {startIndex > 0 && (
                    <img
                        className="arrows"
                        src={categoryArrow.leftArrow}
                        alt="seta-esquerda"
                        onClick={moveLeft}
                    />
                )}

                {
                    displayedCards.map(card => (
                        <Card
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            description={card.description}
                            price={card?.price}
                            image={card.images && card.images.length > 0 ? card.images[0].url : kitCanetas}
                            color={categoryColor}
                            isCategory={showOnlyCategories}
                            currentCategory={id ? id : 0}
                        />
                    ))
                }

                {startIndex + cardsPerPage < data.length && (
                    <img
                        className="arrows"
                        src={categoryArrow.rightArrow}
                        alt="seta-direita"
                        onClick={moveRight}
                    />
                )}
            </div>
        </div>
    );
}

export default Category;