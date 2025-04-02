import React from "react"

//-- Icons and Images
import product from "../../../src/assets/Images/ProductPage/product.svg"
import productMini from "../../../src/assets/Images/ProductPage/product-mini.svg"

//-- Components
import "/.ProductPage.scss";

const ProductPage = () => {
    return (
        <section>
            <div className="section-product">
                <img className="product" src={product} alt="Produto"/>
                <div className="product-mini">
                    <img src={productMini} alt="Imagem Secundária"/>
                    <img src={productMini} alt="Imagem Secundária"/>
                    <img src={productMini} alt="Imagem Secundária"/>
                </div>
            </div>
            <div className="info-product">
                <h1><span>XXXX</span></h1>
                <div>
                    <h2>R$ <span>0,00</span></h2>
                    <h5>em até <span>0</span>x no cartão de crédito</h5>
                </div>
                <h4>Descrição do Produto:</h4>
                <p><span>XXXX</span></p>
                <button className="add-to">ADICIONAR AO CARRINHO</button>
                <button className="payment">Saiba como Pagar</button>
            </div>
        </section>
    );
};

export default ProductPage;