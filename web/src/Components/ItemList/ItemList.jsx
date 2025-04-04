import "./ItemList.scss";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ItemImage from "../../assets/Images/itemImage.svg";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";
import CartEmpty from "../../assets/Images/cart-empty.svg";

import categoriesMock from "../../mocks/categoriesMocks.json";
import QuantityInput from "./QuantityInput";
import ModalDelete from "../ModalDelete/ModalDelete";

function ItemList() {
  const isMobile = useMediaQuery({ maxWidth: 821 });
  const [modalDelete, setModalDelete] = useState(false);

  const getProductById = (id) => {
    const products = categoriesMock.data.reduce(
      (acc, category) => [...acc, ...category.items],
      []
    );
    const results = products.filter((item) => item.id == id);

    return results.length > 0
      ? {
          ...results[0],
          quantity: 1,
          subtotal: Number(results[0].price),
        }
      : null;
  };

  const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};
  const [productList, setProductList] = useState(
    Object.keys(cartCookie).map(getProductById)
  );
  const [lastUpdatedIndex, setLastUpdatedIndex] = useState(null);

  const formatValues = (value) => {
    const formattedValue = Number(value).toFixed(2).replace(".", ",");

    if (Number(value) < 10) {
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
        products[index].price * products[index].quantity;
      setProductList(products);
      setLastUpdatedIndex(index);
    }
  };

  const onClickMore = (index) => {
    const products = [...productList];

    if (products[index].quantity < 99) {
      products[index].quantity = products[index].quantity + 1;
      products[index].subtotal =
        products[index].price * products[index].quantity;
      setProductList(products);
      setLastUpdatedIndex(index);
    }
  };

  const onClickRemoveItem = (index) => {
    const products = [...productList];
    products.splice(index, 1);
    setProductList(products);

    const cartCookie = JSON.parse(localStorage.getItem("cart"));
    delete cartCookie[productList[index].id];

    if (Object.keys(cartCookie).length === 0) localStorage.removeItem("cart");
    else localStorage.setItem("cart", JSON.stringify(cartCookie));
  };

  const removeAllItems = () => {
    setModalDelete(true);
  };

  const onDeleteConfirm = () => {
    setProductList([]);
    localStorage.removeItem("cart");
    setModalDelete(false);
  };

  const onChangeQuantity = (index, e) => {
    e.preventDefault();

    const quantity = Number(e.target.value);
    const products = [...productList];

    if (quantity >= 0 && quantity <= 99) {
      products[index].quantity = quantity;
      products[index].subtotal =
        products[index].price * products[index].quantity;
      setProductList(products);
      setLastUpdatedIndex(index);
    }
  };

  const NoItems = () => {
    return (
      <section className="no-items">
        <img src={CartEmpty} alt="" />
        <h2>Seu carrinho está vazio!</h2>
        <p>
          Parece que você ainda não adicionou nenhum item ao seu carrinho. Vamos
          às compras?
        </p>
        <button>VER PRODUTOS</button>
      </section>
    );
  };

  const TableDesktop = () => (
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
                <img src={ItemImage} alt="Imagem do item" width="120px" />
                <p className="product-text">{product.name}</p>
              </td>
              <td className="right">{formatValues(product.price)}</td>
              <td className="right">
                <QuantityInput
                  quantity={product.quantity}
                  index={index}
                  onClickLess={onClickLess}
                  onClickMore={onClickMore}
                  onChangeQuantity={onChangeQuantity}
                  lastUpdatedIndex={lastUpdatedIndex}
                />
              </td>
              <td className="right">{formatValues(product.subtotal)}</td>
              <td>
                <img
                  className="icon-remove"
                  src={DeleteIcon}
                  onClick={() => onClickRemoveItem(index)}
                  alt="Excluir"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const TableMobile = () => {
    return productList.map((product, index) => {
      return (
        <section className="mobile-row">
          <img src={ItemImage} alt="Imagem do item" width="120px" />

          <div className="column">
            <div className="mobile-row">
              <p className="product-text">{product.name}</p>
              <div className="right">{formatValues(product.price)}</div>
            </div>

            <div className="mobile-row">
              <QuantityInput
                quantity={product.quantity}
                index={index}
                onClickLess={onClickLess}
                onClickMore={onClickMore}
                onChangeQuantity={onChangeQuantity}
                lastUpdatedIndex={lastUpdatedIndex}
              />

              <div className="right">{formatValues(product.subtotal)}</div>
            </div>
          </div>

          <img
            className="icon-remove"
            src={DeleteIcon}
            onClick={() => onClickRemoveItem(index)}
            alt="Excluir"
          />
        </section>
      );
    });
  };

  return (
    <main
      className="item-list-main"
      style={{ width: isMobile ? "95vw" : "90vw" }}
    >
      {productList.length === 0 ? (
        <NoItems />
      ) : (
        <>
          <h1 className="item-list-title">Carrinho</h1>
          <section>{isMobile ? <TableMobile /> : <TableDesktop />}</section>
          <section className="clear-cart-container">
            <div className="clear-cart" onClick={removeAllItems}>
              <div className="clear-cart-text">
                <h3>Limpar carrinho</h3>
              </div>
              <div className="clear-cart-icon">
                <img src={DeleteIcon} alt="Excluir" width="30px" />
              </div>
            </div>
          </section>

          <section className="total-price">
            <h3>TOTAL</h3>
            <h3>{formatValues(calculateTotal())}</h3>
          </section>

          <section className="buy">
            <div finish-info>
              <button className="finish">FINALIZAR COMPRA</button>
              <p className="btn-info">
                Você será direcionado para o nosso <br /> WhatsApp para
                finalizar seu pedido!
              </p>
            </div>
            <div>
              <button className="continue">CONTINUAR COMPRANDO</button>
            </div>
          </section>

          {modalDelete && (
            <ModalDelete
              setModalDelete={setModalDelete}
              handleDelete={onDeleteConfirm}
            />
          )}
        </>
      )}
    </main>
  );
}

export default ItemList;
