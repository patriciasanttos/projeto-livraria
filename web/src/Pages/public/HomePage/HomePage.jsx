import React from 'react';
import Card from '../../../Components/Card';
import dataJson from '../../../mocks/categoriesMocks.json'
import './HomePage.scss';
import leftArrowPink from '../../../assets/left-arrow-pink.svg'
import rightArrowPink from '../../../assets/right-arrow-pink.svg'
import leftArrowBlue from '../../../assets/left-arrow-blue.svg'
import rightArrowBlue from '../../../assets/right-arrow-blue.svg'
import leftArrowGreen from '../../../assets/left-arrow-green.svg'
import rightArrowGreen from '../../../assets/right-arrow-green.svg'

function HomePage() {
  const objectArray = dataJson.data;
  console.log(objectArray)

  return (
    <div>
      <h1>Home Page</h1>
      <Card data={objectArray}
        category='Presentes' // Qualquer texto que represente a Categoria de seu produto
        cardBackground='card-with-background'//Opçoes: card-with-background ou ''
        titleColorClass='pink' //Opções de cores: default, pink, green e blue. Outro valor, a cor fica vermelha
        cartText='Adicionar ao Carrinho'//Opções de texto: O texto que você quiser
        typeLeftArrow={leftArrowPink}//Opções de cor de seta: leftArrowPink,leftArrowGreen,leftArrowBlue
        typeRightArrow={rightArrowPink}////Opções de cor de seta: rightArrowPink,rightArrowGreen,rightArrowBlue
      />
      <Card data={objectArray}
        category='Livros Infantis' // Qualquer texto que represente a Categoria de seu produto
        cardBackground=''//Opçoes: card-with-background ou ''
        titleColorClass='green' //Opções de cores: default, pink, green e blue. Outro valor, a cor fica vermelha
        cartText='Adicionar ao Carrinho'//Opções de texto: O texto que você quiser
        typeLeftArrow={leftArrowGreen}//Opções de cor de seta: leftArrowPink,leftArrowGreen,leftArrowBlue
        typeRightArrow={rightArrowGreen}////Opções de cor de seta: rightArrowPink,rightArrowGreen,rightArrowBlue
      />
      <Card data={objectArray}
        category='Compre por Categoria' // Qualquer texto que represente a Categoria de seu produto
        cardBackground=''//Opçoes: card-with-background ou ''
        titleColorClass='blue' //Opções de cores: default, pink, green e blue. Outro valor, a cor fica vermelha
        cartText='Adicionar ao Carrinho'//Opções de texto: O texto que você quiser
        typeLeftArrow={leftArrowBlue}//Opções de cor de seta: leftArrowPink,leftArrowGreen,leftArrowBlue
        typeRightArrow={rightArrowBlue}////Opções de cor de seta: rightArrowPink,rightArrowGreen,rightArrowBlue
      />
    </div>
  );
}

export default HomePage;