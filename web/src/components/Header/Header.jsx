import React from 'react'

//-----Icons & images
import logo from '../../assets/images/logo.svg'
import backgroundImage from '../../assets/images/background-header.svg'
import instagramGreenIcon from '../../assets/icons/instagramGreenIcon.svg'
import locationGreenIcon from '../../assets/icons/locationGreenIcon.svg'
import shoppingCartIcon from '../../assets/icons/shoppingCartIcon.svg'

import './Header.scss'
import { Link } from 'react-router-dom'
import SearchInput from './SearchInput/SearchInput'

const Header = () => {
    return (
        <header>
            <img className='backgound-image' src={backgroundImage} alt="Image"></img>

            <div className='header-content'>
                <div>
                    <img className='header-logo' src={logo} alt="Logo DNC" />

                    <SearchInput />

                    <div className='header-buttons'>
                        <Link to='/cart'>
                            <img
                                src={shoppingCartIcon}
                                alt="Logo DNC"
                            />
                        </Link>

                        <a target='_blank' href='https://www.instagram.com/ciadaeducacaosjc/'>
                            <img
                                src={instagramGreenIcon}
                                alt="Logo DNC"
                            />
                        </a>

                        <a target='_blank' href="">
                            <img
                                src={locationGreenIcon}
                                alt="Logo DNC"
                            />
                        </a>
                    </div>
                </div>

                <div className='header-items-categories'>
                    <Link>
                        Presentes
                    </Link>
                    <Link>
                        Livros Infantis
                    </Link>
                    <Link>
                        Canetas
                    </Link>
                    <Link>
                        Cadernos
                    </Link>
                    <Link>
                        Materiais para colorir
                    </Link>
                    <Link>
                        Ver tudo
                    </Link>
                </div>
            </div>
        </header >
    )
}

export default Header
