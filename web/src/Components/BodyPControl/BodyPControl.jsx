import React from 'react';
import './BodyPControl.scss';

function BodyPControl() {
    return (
        <div>
            {/* <h1>BodyPControl</h1> */}
            <div className="content-body">
                <span>Escolha uma opção no menu lateral e consiga ter mais controle no seu dia a dia!</span>
                <div className='column-edit'>
                    <div>
                        <h3>Produtos</h3>
                        <p>Adicionar e/ou excluir produtos, preços e imagens</p>
                    </div>
                    <div>
                        <h3>Categorias</h3>
                        <p>Adicionar e/ou excluir categorias, lançar campanhas</p>
                    </div>
                    <div>
                        <h3>Relatórios</h3>
                        <p>Verificar itens mais buscados</p>
                    </div>
                    <div>
                        <h3>Clientes</h3>
                        <p>Relação de e-mail de clientes que se cadastraram para receberem novidades</p>
                    </div>
                    <div>
                        <h3>Gerenciar</h3>
                        <p>Adicionar e/ou excluir usuários para gerenciar a página</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BodyPControl;