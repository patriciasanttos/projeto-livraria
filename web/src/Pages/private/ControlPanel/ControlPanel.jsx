import React, { useState } from 'react';

import './ControlPanel.scss';
import AdminList from '../../../Components/AdminList/AdminList';

function ControlPanel() {
  const [productsData, setProductsData] = useState( [
    {
      id: 1,
      produto: 'Produto 1',
      preco: 'Produto A',
      categoria: 'Escola',
      status: 'Indisponível',
      description: 'Detalhes da description A'
    },
    {
      id: 2,
      produto: 'Produto 2',
      preco: 'Produto B',
      categoria: 'Presesente',
      status: 'Disponível',
      description: 'Detalhes da description B'
    },
    {
      id: 3,
      produto: 'Produto 3',
      preco: 'Produto C',
      categoria: 'Papelaria',
      status: 'Disponível',
      description: 'Detalhes da description C'
    },
    {
      id: 4,
      produto: 'Produto 4',
      preco: 'Produto D',
      categoria: 'Geral',
      status: 'Indisponível',
      description: 'Detalhes da description D'
    }
  ]);

  // Função para atualizar a lista de produtos
  const handleUpdateProducts = (updatedProducts) => {
    setProductsData(updatedProducts);
  };

  const columnTitles = [
    { key: 'produto', label: 'Produto' },
    { key: 'preco', label: 'Preço' },
    { key: 'categoria', label: 'Categoria' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status' }

  ];

   

  // Uso no componente:


  return (
    <div>
      {/* <h1>ControlPanel</h1> */}
      <h1>Gestão de Produtos</h1>
      {/* Passando a função handleUpdateProducts para o componente AdminList */}
      <AdminList 
        columnTitles={columnTitles} 
        productsData={productsData} // Passando os dados para o componente filho
        onUpdateProducts={handleUpdateProducts} // Função para atualizar os produtos
      />
    </div>
  );
}

export default ControlPanel;