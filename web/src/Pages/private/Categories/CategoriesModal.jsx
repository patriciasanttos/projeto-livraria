import React, { useCallback, useEffect } from "react";

import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import CategoryThumb from "./CategoryThumb";
import { useUpdateCategory } from "../../../hooks/useCategories";

export const CategoriesModal = ({
  isCreateItem,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const { mutate: updateProduct } = useUpdateCategory();

  const onConfirmSaveProduct = useCallback(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onClickDeleteImage = (name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: null
    }));
  };

  const handleFormChange = (evt) => {
    const { name, value, files, checked, type } = evt.target;

    const getValue = (val) => {
      if (type === "checkbox") {
        return checked;
      } else if (type === "radio") {
        return value === "on";
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

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file
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
      title={isCreateItem ? `Adicionar nova categoria` : `Editar categoria`}
      onClose={() => setIsModalOpen(false)}
      onConfirm={onConfirmSaveProduct}
      buttonConfirmText={
        isCreateItem ? `Adicionar` : `Salvar`
      }
    >
      <div className="modal-row">
        <div className="modal-column">
          <div className="input-name">
            <SearchInputAdmin
              className="modal-field"
              placeholder="Nome da categoria"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>

          <div className="image-preview-row">
            {formData?.image && (
              <CategoryThumb
                name="image"
                image={formData?.image}
                onClickDeleteImage={onClickDeleteImage}
              />
            )}
          </div>

          <button
            disabled={formData?.image}
            type="button"
            className={
              formData?.image ? "upload-button disabled" : "upload-button"
            }
            onClick={() => document.getElementById("image-upload").click()}
          >
            Enviar Imagem
          </button>
          <input
            type="file"
            id="image-upload"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFormChange}
          />
        </div>

        <div className="modal-column">
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

                <p>Habilitado</p>
              </div>

              <div className="status-input">
                <input
                  type="radio"
                  name="available"
                  checked={!formData?.available}
                  onChange={() =>
                    handleFormChange({
                      target: {
                        name: "available",
                        value: false,
                        type: "radio",
                      },
                    })
                  }
                />
                <p>Desabilitado</p>
              </div>
            </div>
          </div>

          <div className="image-preview-row">
            {formData?.banner && (
              <CategoryThumb
                name="banner"
                image={formData?.banner}
                onClickDeleteImage={onClickDeleteImage}
              />
            )}
          </div>

          <button
            disabled={formData?.banner}
            type="button"
            className={
              formData?.banner ? "upload-button disabled" : "upload-button"
            }
            onClick={() => document.getElementById("image-upload2").click()}
          >
            Enviar Banner
          </button>
          <input
            type="file"
            id="image-upload2"
            name="banner"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFormChange}
          />
        </div>
      </div>
    </ModalAdmin>
  );
};
