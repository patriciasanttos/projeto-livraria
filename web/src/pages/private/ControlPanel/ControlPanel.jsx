import React from 'react';

import './ControlPanel.scss';

function ControlPanel() {
  return (
    <div className='control-panel'>
      <h2>Escolha uma opção no menu lateral e consiga ter mais controle no seu dia a dia!</h2>

      <ul>
        <li>
          <h3>Produtos</h3>
          <p>Adicionar e/ou excluir produtos, preços e imagens</p>
        </li>

        <li>
          <h3>Categorias</h3>
          <p>Adicionar e/ou excluir categorias, lançar campanhas</p>
        </li>

        <li>
          <h3>Relatórios</h3>
          <p>Verificar itens mais buscados</p>
        </li>

        <li>
          <h3>Gerenciar</h3>
          <p>Adicionar e/ou excluir usuários para gerenciar a página</p>
        </li>
      </ul>
    </div>
  );
}

export default ControlPanel;