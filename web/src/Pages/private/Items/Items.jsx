import React from 'react';
import AdminList from '../../../Components/AdminList/AdminList'
import { useState } from 'react';
import './Items.scss';
import data from '../../../mocks/categoriesMocks.json'
const cards = data.data;
function Items() {
  console.log(cards)
  // Início dos códigos usados para implementar o componente AdminList
  const [productsData, setProductsData] = useState(cards);
    //[
    // {
    //   id: 1,
    //   produto: 'Produto 1',
    //   preco: 'Produto A',
    //   categoria: 'Escola',
    //   status: 'Indisponível',
    //   description: 'Detalhes da description A'
    // },
    // {
    //   id: 2,
    //   produto: 'Produto 2',
    //   preco: 'Produto B',
    //   categoria: 'Presesente',
    //   status: 'Disponível',
    //   description: 'Detalhes da description B'
    // },
    // {
    //   id: 3,
    //   produto: 'Produto 3',
    //   preco: 'Produto C',
    //   categoria: 'Papelaria',
    //   status: 'Disponível',
    //   description: 'Detalhes da description C'
    // },
    // {
    //   id: 4,
    //   produto: 'Produto 4',
    //   preco: 'Produto D',
    //   categoria: 'Geral',
    //   status: 'Indisponível',
    //   description: 'Detalhes da description D'
    // }]

  // Função para atualizar a lista de produtos
  const handleUpdateProducts = (updatedProducts) => {
    setProductsData(updatedProducts);
  };

  const columnTitles = [
    { key: "categoria", label: "Categoria" },
    { key: "name", label: "Nome" },
    { key: "price", label: "Preço" },
    { key: "description", label: "Descrição" },
    { key: "status", label: "Status" },
  ];
 // Fim dos códigos usados para implementar o componente AdminList
  return (
    <div>
      <h1>Items</h1>
      <AdminList 
        columnTitles={columnTitles} 
        productsData={productsData} // Passando os dados para o componente filho
        onUpdateProducts={handleUpdateProducts} // Função para atualizar os produtos
      />
    </div>
  );
}

export default Items;