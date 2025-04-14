import React, { useCallback, useState } from "react";

import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import ProductThumb from "./ProductThumb";

export const ProductsModal = ({
  isCreateItem,
  categories,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const [mainImageIndex, setMainImageIndex] = useState(null);

  const onClickDeleteImage = (index) => {
    const imageList = formData?.images.splice(index, 1);

    if (mainImageIndex == index) {
      setTimeout(() => setMainImageIndex(imageList.length > 0 ? 0 : null), 0);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: imageList,
    }));
  };

  const onConfirmSaveProduct = useCallback(() => {
    console.log(formData);
  }, [formData]);

  const handleFormChange = (evt) => {
    const { name, value, files, checked, type } = evt.target;

    const getValue = (val) => {
      if (type === "checkbox") {
        return checked;
      }else if (type === "radio") {
        return value === 'on';
      } else if (val === "true") {
        return true;
      } else if (val === "false") {
        return false;
      } else {
        return val;
      }
    };

    if (files && files[0]) {
      const file = files[0];

      if (!formData?.images) {
        setMainImageIndex(0);
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formData?.images ? [...formData.images, file] : [file],
      }));

      evt.target.value = null;
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: getValue(value),
      }));
    }
  };

  return (
    <ModalAdmin
      title={isCreateItem ? `Adicionar novo produto` : `Editar produto`}
      onClose={() => setIsModalOpen(false)}
      onConfirm={onConfirmSaveProduct}
      buttonConfirmText={"Adicionar"}
    >
      <div className="modal-row">
        <div className="modal-column">
          <SearchInputAdmin
            className="modal-field"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />

          <SearchInputAdmin
            className="modal-field"
            placeholder="Preço"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
          />

          <DropdownAdmin
            className="modal-select"
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          >
            <option value={null}>
                Selecione uma categoria
              </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </DropdownAdmin>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Descrição do produto"
            className="textarea-product"
          ></textarea>
        </div>

        <div className="modal-column">
          <div className="image-preview-row">
            {formData?.images?.map((image, index) => (
              <ProductThumb
                key={index}
                image={image}
                index={index}
                mainImageIndex={mainImageIndex}
                setMainImageIndex={setMainImageIndex}
                onClickDeleteImage={onClickDeleteImage}
              />
            ))}
          </div>

          <button
            disabled={formData?.images?.length >= 3}
            type="button"
            className={
              formData?.images?.length >= 3
                ? "upload-button disabled"
                : "upload-button"
            }
            onClick={() => document.getElementById("image-upload").click()}
          >
            Upload Imagem ({formData?.images?.length ?? 0}/3)
          </button>
          <input
            type="file"
            id="image-upload"
            name="images"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFormChange}
          />

          <div className="status-container">
            <label className="status-title">Status:</label>

            <div className="status-radio">
              <div className="status-input">
                <input
                  type="radio"
                  name="available"
                  checked={formData?.available}
                  onChange={handleFormChange}
                />

                <p>Disponivel</p>
              </div>

              <div className="status-input">
                <input
                  type="radio"
                  name="available"
                  checked={!formData?.available}
                  onChange={() =>
                    handleFormChange({
                      target: { name: "available", value: false, type: "radio" },
                    })
                  }
                />
                <p>Não Disponivel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalAdmin>
  );
};
