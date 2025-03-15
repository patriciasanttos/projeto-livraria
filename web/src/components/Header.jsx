//import { Link } from "react-router-dom";

//ASSETS
import './Header.scss'
import Logo from '../assets/dnc-logo.svg'
import Logo2 from '../assets/logo.svg'
import whatsapp from '../assets/icone-whatsapp.svg'
import localizacao from '../assets/icone-localizacao.svg'
import lupa from '../assets/lupa.svg'
import carrinho from '../assets/carrinho.svg'


function Header() {
    return (
        <header>
            <div id='my-icons'>
                <img src={Logo2} alt="Logo DNC" />
                <div className='input-com-figura'>
                    <input type="text" placeholder='O que você está buscando?' />
                    <img src={lupa} alt="Logo DNC" />
                </div>
                <div id='icones-sup-direito'>
                    <img src={carrinho} alt="Logo DNC" />
                    <img src={whatsapp} alt="Logo DNC" />
                    <img src={localizacao} alt="Logo DNC" />
                </div>
            </div>            
                <ul>
                    <li>Presentes</li>
                    <li>Livros Infantis</li>
                    <li>Canetas</li>
                    <li>Cadernos</li>
                    <li>Materiais para colorir</li>
                    <li>Ver tudo</li>                    
                </ul>      

        </header>
    )
}

export default Header
