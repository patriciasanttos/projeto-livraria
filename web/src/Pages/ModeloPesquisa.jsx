import './ModeloPesquisa.css'
import { useState } from 'react'
//Importando a função que envia mensagem numero de WhatsApp
import { sendWhasAppMsg } from '../components/sendWhatsAppMsg'
// import { useState } from 'react'
import { pesquisarItens } from '../components/pesquisa'
import data from '../components/dados.json'
import Header from '../components/Header'
// Termina aqui
function ModeloPesquisa() {
    //Abaixo linha de código necessária para enviar mensagem
    const [whatsUlr, setWhatsUlr] = useState('')
    const sellerPhone = '5535998220841'
    const PedidoCompras = ['2 Livros', '30 Canetas', '101 Cadernos']
    //Começa aqui - Estas funções comentadas a seguir devem ficar antes do return da função do componente
    //Para implementar o código de pesquisa do Header descomente as 3 "linhas de código" a seguir
    const [valorDigitado, setValorDigitado] = useState('');
    const handleValorInput = (valor) => { setValorDigitado(valor) }
    let resultado = pesquisarItens(data, 'name', valorDigitado);
    //Termina aqui - Estas funções comentadas a seguir devem ficar antes do return da função do componente
    return (
        <>
            <div className='ModeloPesquisa'>
                <Header onValorInput={handleValorInput} />
                <h2>Lista pela pesquisa - prese, presentes ou papelaria</h2>
                <ul>{resultado.map(item => <li key={item.id}>{item.description}</li>)}</ul>
                <a target='__blanket' href={whatsUlr}>
                    <p onClick={() => setWhatsUlr(sendWhasAppMsg(sellerPhone, PedidoCompras))}>
                        Link Lista do vertor PedidosCompras</p>
                </a>
            </div>
        </>
    );
}

export default ModeloPesquisa
