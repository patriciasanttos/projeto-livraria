import './Header.css'
import { useState } from 'react'
//Importando a função que envia mensagem numero de WhatsApp
import { sendWhasAppMsg } from './sendWhatsAppMsg'
import logo from '../assets/logo.svg'
import whatsAppIcon from '../assets/whatsAppIcon.svg'
import locationIcon from '../assets/locationIcon.svg'
import lupaIcon from '../assets/lupaIcon.svg'
import shoppingCartIcon from '../assets/shoppingCartIcon.svg'
import React from 'react'


const Header = ({ onValorInput }) => {
    //Abaixo linha de código necessária para enviar mensagem
    const [whatsUlr, setWhatsUlr] = useState('')

    //Códigos e funções usadas para permitir pesquisa
    const [valorInput, setValorInput] = useState('');
    const handleInputChange = (evento) => {
        setValorInput(evento.target.value);
        onValorInput(evento.target.value)
    }

    //Usei este telefone e este array para simular um pedido feito pelo cliente na loja
    const sellerPhone = '5535998220841'
    const PedidoCompras = ['Olá', 'seja bem vindo']

    return (
        <header>
            <div id='icons-header'>
                <img src={logo} alt="Logo DNC" />
                <div className='input-with-icons' >
                    <input type="text" placeholder='O que você está buscando?'
                        value={valorInput} onChange={handleInputChange} />
                    <img src={lupaIcon} alt="Logo DNC" />
                </div>
                <div id='icons-right-sup'>
                    <img src={shoppingCartIcon} alt="Logo DNC" />
                    <a target='__blanket' href={whatsUlr}><img src={whatsAppIcon}
                        alt="Logo DNC" onClick={() => setWhatsUlr(sendWhasAppMsg(sellerPhone, PedidoCompras))} /></a>
                    <img src={locationIcon} alt="Logo DNC" />
                </div>
            </div>
            <ul>
                <li>Presentes </li>
                <li>Livros Infantis</li>
                <li>Canetas</li>
                <li>Cadernos</li>
                <li>Materiais para colorir</li>
                <li>Ver tudo</li>
            </ul>
        </header >
    )
}

export default Header
