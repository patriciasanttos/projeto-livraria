import "./ItemList.scss";
import ItemImage from "../../assets/Images/itemImage.svg";
import { useState } from "react";

function ItemList() {
  const [productList, setProductList] = useState([
    {
      id: 1,
      image: ItemImage,
      name: "Kit Canetas",
      value: 10.0,
      quantity: 1,
      subtotal: 10.0,
    },
    {
      id: 2,
      image: ItemImage,
      name: "Kit Lápis",
      value: 5.0,
      quantity: 1,
      subtotal: 5.0,
    },
  ]);

  const formatValues = (value) => {
    const formattedValue = value.toFixed(2).replace(".", ",");

    if (value < 10) {
      return `R$0${formattedValue}`;
    }

    return `R$${formattedValue}`;
  };

  const calculateTotal = () => {
    let total = 0;

    for (let i = 0; i < productList.length; i++) {
      total += productList[i].subtotal;
    }
    return total;
  };

  const onClickLess = (index) => {
    const products = [...productList];

    if (products[index].quantity > 0) {
      products[index].quantity = products[index].quantity - 1;
      products[index].subtotal =
        products[index].value * products[index].quantity;
      setProductList(products);
    }
  };

  const onClickMore = (index) => {
    const products = [...productList];

    if (products[index].quantity < 99) {
      products[index].quantity = products[index].quantity + 1;
      products[index].subtotal =
        products[index].value * products[index].quantity;
      setProductList(products);
    }
  };

  return (
    <main className="item-list-main">
      <h1 className="item-list-title">Carrinho</h1>
      <section>
        <table>
          <thead>
            <tr>
              <th className="product-title">Produto</th>
              <th className="right">Valor unitário</th>
              <th className="right">Quantidade</th>
              <th className="right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {productList.map((product, index) => {
              return (
                <tr>
                  <td className="product-item">
                    <img
                      src={product.image}
                      alt="Imagem do item"
                      width="120px"
                    />
                    <p>{product.name}</p>
                  </td>
                  <td className="right">{formatValues(product.value)}</td>
                  <td className="right">
                    <div className="td-quantify">
                      <div
                        className="btn-quantify less"
                        onClick={() => onClickLess(index)}
                      >
                        -
                      </div>
                      <div className="btn-quantifyList">{product.quantity}</div>
                      <div
                        className="btn-quantify more"
                        onClick={() => onClickMore(index)}
                      >
                        +
                      </div>
                    </div>
                  </td>
                  <td className="right">{formatValues(product.subtotal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="total-price">
        <h3>TOTAL</h3>
        <h3>{formatValues(calculateTotal())}</h3>
      </section>

      <section className="buy">
        <div finish-info>
          <button className="finish">FINALIZAR COMPRA</button>
          <p className="btn-info">
            Você será direcionado para o nosso <br /> WhatsApp para finalizar
            seu pedido!
          </p>
        </div>
        <div>
          <button className="continue">CONTINUAR COMPRANDO</button>
        </div>
      </section>
    </main>
  )
}

export default ItemList;
