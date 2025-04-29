import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { useAvailableProductsData } from '../../hooks/useProducts';
import { useCreateReport } from '../../hooks/useReports';

//-----Images and icons
import DeleteIcon from "../../assets/icons/deleteIcon.svg";
import CartEmpty from "../../assets/images/cart-empty.svg";
import kitCanetas from '../../assets/images/kit-canetas.svg';

//-----Components
import QuantityInput from "./QuantityInput";
import ModalDelete from "../ModalDelete/ModalDelete";
import Loading from "../PageProcessing/Loading/Loading";
import ErrorFinding from "../PageProcessing/ErrorFinding/ErrorFinding";

import "./ItemList.scss";

function ItemList() {
  const { mutate } = useCreateReport();

  const isMobile = useMediaQuery({ maxWidth: 821 });
  const [modalDelete, setModalDelete] = useState(false);

  const { data, isLoading, error } = useAvailableProductsData()

  const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};
  const [productList, setProductList] = useState([]);
  const [lastUpdatedIndex, setLastUpdatedIndex] = useState(null);

  const loadProducts = () => {
    if (!data)
      return [];

    const productsData = [];

    for (let [productId, quantity] of Object.entries(cartCookie)) {
      const product = data.find(p => p.id == productId);

      if (!product?.id)
        continue;

      productsData.push({
        id: product?.id,
        name: product?.name,
        image: product?.mainImage || product?.images[0],
        price: product?.price,
        quantity,
        subtotal: product?.price * quantity
      });
    };

    return productsData;
  }

  useEffect(() => {
    setProductList(loadProducts());
    console.log(productList);
  }, [data]);

  const handleSaveCart = useCallback(() => {
    let newCookie = {};

    for (const product of productList) {
      if (product.quantity > 0)
        newCookie[product.id] = product.quantity;
    }

    localStorage.setItem("cart", JSON.stringify(newCookie))
  }, [productList]);

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
      const product = productList[i]

      if (product?.id)
        total += product.subtotal;
    }

    return total;
  };

  const onClickLess = (index) => {
    const products = [...productList];
    const currentProduct = products[index]

    if (currentProduct.quantity > 0) {
      currentProduct.quantity -= 1;

      if (currentProduct.quantity <= 0) {
        products.splice(index, 1);
        delete cartCookie[currentProduct.id];

        if (Object.keys(cartCookie).length === 0)
          localStorage.removeItem("cart");
        else
          localStorage.setItem("cart", JSON.stringify(cartCookie));

        setProductList(products);
        return handleSaveCart();
      }

      currentProduct.subtotal = currentProduct.price * currentProduct.quantity;

      products[index] = currentProduct;
      setProductList(products);
      setLastUpdatedIndex(index);
      return handleSaveCart();
    }
  };

  const onClickMore = (index) => {
    const products = [...productList];

    if (products[index].quantity < 99) {
      products[index].quantity += 1;
      products[index].subtotal = products[index].price * products[index].quantity;

      setProductList(products);
      setLastUpdatedIndex(index);
      handleSaveCart();
    }
  };

  const onClickRemoveItem = (index) => {
    const products = [...productList];
    products.splice(index, 1);
    setProductList(products);

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
      handleSaveCart();
    }
  };

  const onClickCompletePurchase = () => {
    let url =
      `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Lista+de+compras+no+carrinho%3A%0A`;

    productList.forEach((product) => {
      url += `%0A%E2%80%A2${product.quantity}x+${product.name}+(R$${product.price})`;
    });
    url += `%0A%0ATotal da compra: ${formatValues(calculateTotal())}`;

    for (const product of productList) {
      mutate({
        type: 'sale',
        entityType: 'item',
        entityId: product.id,
        count: product.quantity
      });
    };

    window.open(url, "_blank").focus();
  };

  if (isLoading)
    return <Loading title="Buscando lista de compras" style={{ marginTop: "4rem" }} />;

  if (error)
    return (
      <ErrorFinding
        text="Erro ao carregar a lista de compras"
        style={{ marginTop: "6rem" }}
      />
    );

  const NoItems = () => {
    return (
      <section className="no-items">
        <img src={CartEmpty} alt="" />
        <h2>Seu carrinho está vazio!</h2>
        <p>
          Parece que você ainda não adicionou nenhum item ao seu carrinho. Vamos
          às compras?
        </p>
        <Link to="/categories">
          <button>VER PRODUTOS</button>
        </Link>
      </section>
    );
  };

  const TableDesktop = () => (
    <section className="table-container">
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
          {productList.map(
            (product, index) =>
              product?.id && (
                <tr key={index}>
                  <td className="product-item">
                    <img
                      src={product.image ?? kitCanetas}
                      alt="Imagem do item"
                      width="120px"
                      className="item-list-image"
                    />
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
              )
          )}
        </tbody>
      </table>
    </section>
  );

  const TableMobile = () => {
    return productList.map((product, index) => product?.id && (
      <section className="mobile-row" key={index}>
        <img src={product.image} alt="Imagem do item" className="item-list-image" width="120px" />

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
    ));
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
            <div>
              <button className="finish" onClick={onClickCompletePurchase}>
                FINALIZAR COMPRA
              </button>
              <p className="btn-info">
                Você será direcionado para o nosso <br /> WhatsApp para
                finalizar seu pedido!
              </p>
            </div>
            <Link to="/categories">
              <button className="continue">CONTINUAR COMPRANDO</button>
            </Link>
          </section>

          {modalDelete && (
            <ModalDelete
              setModalDelete={setModalDelete}
              handleDelete={onDeleteConfirm}
              text={"Você tem certeza que deseja excluir todos os itens?"}
            />
          )}
        </>
      )}
    </main>
  );
}

export default ItemList;
