import React, { useState, useRef, useEffect } from 'react';
import './AdminList.scss'; // Certifique-se de importar o arquivo .scss
import ImageUpload from '../ImageUpload/ImageUpload'; // Reimportando o componente ImageUpload

function AdminList({ columnTitles, productsData, onUpdateProducts }) {
  const [newProduct, setNewProduct] = useState(
    columnTitles.reduce((acc, title) => {
      acc[title.key] = title.key === 'status' ? 'Disponível' : ''; // Status tem valor padrão
      return acc;
    }, {})
  );
  const [editingIndex, setEditingIndex] = useState(null); // Para saber qual produto está sendo editado
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const deleteIndexRef = useRef(null);
  const [categories, setCategories] = useState([]);

  // Função para adicionar ou editar produto
  function handleAddEditProduct() {
    // Verificar se todos os campos obrigatórios estão preenchidos
    const emptyFields = columnTitles.filter((title) => {
      if (title.key === 'status') {
        return false; // Ignora o campo de status
      }
      if (title.key === 'categoria') {
        return newProduct[title.key] === ''; // Verifica se a categoria foi selecionada
      }
      return newProduct[title.key] === ''; // Verifica os outros campos obrigatórios
    });

    if (emptyFields.length > 0) {
      // Se houver campos vazios, mostre um alerta
      alert(`Por favor, preencha os seguintes campos: ${emptyFields.map((field) => field.label).join(', ')}`);
      return; // Não prossegue com a operação se houver campos vazios
    }

    let updatedProducts = [...productsData]; // Usando productsData do pai para garantir que estamos alterando a lista correta

    if (editingIndex !== null) {
      // Caso esteja editando um produto
      updatedProducts[editingIndex] = { ...newProduct }; // Atualiza o produto
    } else {
      // Caso seja um novo cadastro
      const newId = Date.now(); // Usando o timestamp como id único
      updatedProducts = [...productsData, { ...newProduct, id: newId }];
    }

    // Chama a função do pai para atualizar a lista de produtos
    onUpdateProducts(updatedProducts);

    // Limpar os campos do formulário após o cadastro ou edição
    setNewProduct(
      columnTitles.reduce((acc, title) => {
        acc[title.key] = title.key === 'status' ? 'Disponível' : '';
        return acc;
      }, {})
    );
    setEditingIndex(null); // Limpa o estado de edição
  }

  // Função para lidar com as mudanças nos inputs
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  }

  // Função para preencher o formulário ao editar um produto
  function handleEditProduct(index) {
    setNewProduct({ ...productsData[index] }); // Preenche os campos com os dados do produto selecionado
    setEditingIndex(index); // Define o índice do produto sendo editado
  }

  // Função para confirmar a exclusão do produto
  function confirmDelete(index) {
    deleteIndexRef.current = index;
    setShowConfirmDelete(true); // Exibe o modal de confirmação
  }

  // Função para excluir o produto
  function handleDeleteProduct() {
    const indexToDelete = deleteIndexRef.current;
    const updatedProducts = productsData.filter((_, index) => index !== indexToDelete);
    // Chama a função do pai para atualizar a lista de produtos
    onUpdateProducts(updatedProducts);
    setShowConfirmDelete(false); // Esconde o modal após deletar
  }

  // Usar useEffect para extrair as categorias únicas de productsData
  useEffect(() => {
    // Extraindo categorias únicas de productsData
    const uniqueCategories = [
      ...new Set(productsData.map((product) => product.categoria))
    ];
    setCategories(uniqueCategories);
  }, [productsData]);

  return (
    <div className="container">
      {/* Se estiver em modo de edição ou cadastro, exibe o formulário */}
      <div className="div-cadastrar">
        <h2>{editingIndex !== null ? 'Editar Produto' : 'Cadastrar Produto'}</h2>

        {columnTitles.map((title) => {
          if (title.key === 'description') {
            return (
              <div className="form-group" key={title.key}>
                <div className="input-left">
                  <textarea
                    name={title.key}
                    placeholder={title.placeholder || title.label}
                    value={newProduct[title.key] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            );
          } else if (title.key === 'status') {
            return (
              <div key={title.key} className="radio-group">
                <label className="titulo-label">{title.label}</label>
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Disponível"
                      checked={newProduct[title.key] === 'Disponível'}
                      onChange={handleInputChange}
                    />
                    Disponível
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="status"
                      value="Indisponível"
                      checked={newProduct[title.key] === 'Indisponível'}
                      onChange={handleInputChange}
                    />
                    Indisponível
                  </label>
                </div>
              </div>
            );
          } else if (title.key === 'categoria') {
            return (
              <div key={title.key} className="form-group">
                <select
                  name="categoria"
                  value={newProduct[title.key] || ''}
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
            );
          } else {
            return (
              <div key={title.key} className="input-text">
                <input
                  required
                  type={title.type || 'text'}
                  name={title.key}
                  placeholder={title.placeholder || title.label}
                  value={newProduct[title.key] || ''}
                  onChange={handleInputChange}
                />
              </div>
            );
          }
        })}

        {/* Exibe o componente de upload de imagem apenas quando em modo de edição */}
        <div className="input-right">
          <ImageUpload />
        </div>

        <div className="btn-cadastrar">
          <button onClick={handleAddEditProduct}>
            {editingIndex !== null ? 'Editar Produto' : 'Cadastrar Produto'}
          </button>
        </div>
      </div>

      <div className="div-listar">
        <h3>Lista de Produtos</h3>

        {/* Exibir Modal de Confirmação de Deletar */}
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

        {/* Exibição da Tabela com Produtos */}
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
            {productsData.map((product, index) => (
              <tr key={product.id}>
                {columnTitles.map((title) => (
                  <td key={title.key}>{product[title.key]} </td>
                ))}
                <td>
                  <button className="btn-editar" onClick={() => handleEditProduct(index)}>
                    Editar
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-deletar" onClick={() => confirmDelete(index)}>
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminList;
