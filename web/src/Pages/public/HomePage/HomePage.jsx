import imagemPrincipal from '../../../assets/imagem-principal.svg'
import kitCanetas from '../../../assets/kit-canetas.svg'
import imgredonda from '../../../assets/imgredonda.svg'

import './HomePage.scss'
function HomePage() {
  return (
    <>
      <div className='HomePage'>
        <img src={imagemPrincipal} alt="Logo DNC" />
        <div className='Cards'>
          <h2 className='h2-rosa'>Presentes e Papelaria Divertida</h2>
          <ul>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>

          </ul>
          <h2 className='h2-contraste-verde'>Livros Infantis</h2>
          <ul>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>
            <li>
              <img src={kitCanetas} alt="Logo DNC" />
              <h3>Kit Canetas TouchHero R$xx,00</h3>
              <p>até xxxxxx no cartão de crédito </p>
            </li>
          </ul>
          <h2 className='h2-azul'>Compre por Categoria</h2>
          <ul className='Card_redondo'>
            <li>
              <div>
                <img src={imgredonda} alt="Logo DNC" />
                <h2 className='h2-azul'>Agendas</h2>
              </div>
            </li>
            <li>
              <div>
                <img src={imgredonda} alt="Logo DNC" />
                <h2 className='h2-azul'>Presentes</h2>
              </div>
            </li>
            <li>
              <div>
                <img src={imgredonda} alt="Logo DNC" />
                <h2 className='h2-azul'>Infantil</h2>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default HomePage;
