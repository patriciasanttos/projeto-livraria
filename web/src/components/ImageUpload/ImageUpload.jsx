import React, { useState } from 'react';

const ImageUpload = () => {
  // State para armazenar a imagem selecionada
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Função para lidar com a seleção de uma imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // Se um arquivo for selecionado
    if (file) {
      // Gerar um URL temporário para visualizar a imagem
      const objectUrl = URL.createObjectURL(file);
      setImage(file); // Armazenar o arquivo
      setImagePreview(objectUrl); // Definir o preview da imagem
    }
  };

  return (
    <div>     
      {/* Mostrar o preview da imagem, se houver */}
      {imagePreview && <img src={imagePreview} alt="Preview" width="350" />}
      {/* Input para seleção de imagem */}
      <p>Escolha uma Imagem</p>
      <input type="file" onChange={handleImageChange} accept="image/*" />
    </div>
  );
};

export default ImageUpload;
