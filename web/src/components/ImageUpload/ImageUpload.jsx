import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(objectUrl);
    }
  };

  return (
    <div>
      {imagePreview && <img src={imagePreview} alt="Preview" width="350" />}
      <p>Escolha uma Imagem</p>
      <input type="file" onChange={handleImageChange} accept="image/*" />
    </div>
  );
};

export default ImageUpload;
