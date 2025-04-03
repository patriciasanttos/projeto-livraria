import React from 'react';

import './HomePageForm.scss';

function HomePageForm() { 
    return (
        <div className="container-form">
            <h3>Cadastre-se e fique por dentro de <br/>
                todas as novidades e promoções!</h3>

            <form action="" method="POST">

                <input placeholder="Digite seu melhor e-mail" type="text" required="required" name="emailInput"/>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default HomePageForm;