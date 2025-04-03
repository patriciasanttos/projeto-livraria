import React, { useState, useRef, useEffect } from "react";
import "./AdminList.scss";
import ImageUpload from "../ImageUpload/ImageUpload";

function AdminList({ columnTitles, productsData, onUpdateProducts }) {
  const [newProduct, setNewProduct] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const deleteIndexRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(productsData.map((product) => product.name))];
    setCategories(uniqueCategories);
  }, [productsData]);

  useEffect(() => {
    resetNewProduct();
  }, []);

  function resetNewProduct() {
    setNewProduct({
      categoria: "",
      name: "",
      price: "",
      description: "",
      status: "Indisponível",
    });
  }

  function handleAddEditProduct() {
    if (!newProduct.categoria) {
      alert("Por favor, selecione uma categoria.");
      return;
    }

    let updatedProducts = [...productsData];
    const categoryIndex = updatedProducts.findIndex((cat) => cat.name === newProduct.categoria);

    if (categoryIndex === -1) return;

    if (editingIndex !== null) {
      updatedProducts[categoryIndex].items[editingIndex] = { ...newProduct };
    } else {
      const newId = Date.now();
      updatedProducts[categoryIndex].items.push({ ...newProduct, id: newId });
    }

    onUpdateProducts(updatedProducts);
    resetNewProduct();
    setEditingIndex(null);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditProduct(categoryName, index) {
    const category = productsData.find((cat) => cat.name === categoryName);
    if (!category) return;

    const item = category.items[index];

    setNewProduct({
      categoria: categoryName,
      name: item.name,
      price: item.price,
      description: item.description,
      status: item.status || "Indisponível",
    });
    setEditingIndex(index);
  }

  function confirmDelete(categoryName, index) {
    deleteIndexRef.current = { categoryName, index };
    setShowConfirmDelete(true);
  }

  function handleDeleteProduct() {
    const { categoryName, index } = deleteIndexRef.current;
    let updatedProducts = [...productsData];

    const categoryIndex = updatedProducts.findIndex((cat) => cat.name === categoryName);
    if (categoryIndex !== -1) {
      updatedProducts[categoryIndex].items.splice(index, 1);
      onUpdateProducts(updatedProducts);
    }

    setShowConfirmDelete(false);
  }

  return (
    <div className="container">
      <div className="div-cadastrar">
        <h2>{editingIndex !== null ? "Editar Produto" : "Cadastrar Produto"}</h2>

        {/* Campo de Categoria */}
        <div className="form-group">
          <select
            name="categoria"
            value={newProduct.categoria || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Inputs baseados nos títulos da tabela */}
        {columnTitles
          .filter((title) => title.key !== "categoria") // Removendo categoria duplicada
          .map((title) => {
            if (title.key === "status") {
              return (
                <div key={title.key} className="radio-group">
                  <label className="titulo-label">{title.label}</label>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="Disponível"
                        checked={newProduct.status === "Disponível"}
                        onChange={handleInputChange}
                      />
                      Disponível
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="Indisponível"
                        checked={newProduct.status === "Indisponível"}
                        onChange={handleInputChange}
                      />
                      Indisponível
                    </label>
                  </div>
                </div>
              );
            }
            return (
              <div key={title.key} className="input-text">
                <input
                  required
                  type="text"
                  name={title.key}
                  placeholder={title.label}
                  value={newProduct[title.key] || ""}
                  onChange={handleInputChange}
                />
              </div>
            );
          })}

        <div className="input-right">
          <ImageUpload />
        </div>

        <div className="btn-cadastrar">
          <button onClick={handleAddEditProduct}>
            {editingIndex !== null ? "Editar Produto" : "Cadastrar Produto"}
          </button>
        </div>
      </div>

      <div className="div-listar">
        <h3>Lista de Produtos</h3>

        {showConfirmDelete && (
          <div className="confirmation-box">
            <p>Tem certeza de que deseja excluir este produto?</p>
            <button className="confirm-delete" onClick={handleDeleteProduct}>
              Sim
            </button>
            <button className="confirm-delete" onClick={() => setShowConfirmDelete(false)}>
              Não
            </button>
          </div>
        )}

        <table>
          <thead>
            <tr>
              {columnTitles.map((title) => (
                <th key={title.key}>{title.label}</th>
              ))}
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {productsData.flatMap((category) =>
              category.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{category.name}</td>
                  <td>{item.name}</td> {/* Corrigido para mostrar o nome corretamente */}
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.status || "Indisponível"}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEditProduct(category.name, index)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="btn-deletar" onClick={() => confirmDelete(category.name, index)}>
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminList;
