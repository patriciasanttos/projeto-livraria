import React, { useCallback, useEffect, useState } from "react";

import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import CategoryThumb from "./CategoryThumb";
import { useCreateCategory, useUpdateCategory } from "../../../hooks/useCategories";
import { toast } from "react-toastify";
import TextAreaAdmin from "../../../Components/TextAreaAdmin/TextAreaAdmin";

export const CategoriesModal = ({
  allCategories,
  isCreateItem,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const { mutate: createCategory, status: statusCreate, error: errorCreate } = useCreateCategory();
  const  { mutate: updateCategory, status: statusUpdate, error: errorUpdate } = useUpdateCategory();
  const [toastLoading, setToastLoading] = useState();

  const isFormValid = (form) => {
    let isValid = true
    const requiredFields = ['name']

    requiredFields.forEach((requiredField) => {
      if(!form.get(requiredField)) {
        isValid = false
        toast.error(`Campo obrigatório: ${requiredField}`)
      }
    })

    if (isValid) {
      const results = allCategories.filter((category) => category.name.toUpperCase() === form.get('name').toUpperCase())
      if (results.length > 0) {
        isValid = false
        toast.error(`Categoria já existente`)
      }
    }

    return isValid
  }

  useEffect(() => {
    if (statusUpdate === 'success') {
      setIsModalOpen(false);
      toast.dismiss(toastLoading);
      toast.success('Categoria atualizada com sucesso!');
    }

    if (statusUpdate === 'error') {
      const errorMessage = errorUpdate.response.data.message[0]
      toast.dismiss(toastLoading);
      toast.error(`Erro ao atualizar categoria: ${errorMessage}`);
    } 
  }, [statusUpdate])

  useEffect(() => {
    if (statusCreate === 'success') {
      setIsModalOpen(false);
      toast.dismiss(toastLoading);
      toast.success('Categoria criada com sucesso!');
    }

    if (statusCreate === 'error') {
      const errorMessage = errorCreate.response.data.message[0]
      toast.dismiss(toastLoading);
      toast.error(`Erro ao criar categoria: ${errorMessage}`);
    } 
  }, [statusCreate])

  const onConfirmSaveProduct = useCallback(() => {
    if (isCreateItem) {
      const toastLoading = toast.loading('Criando categoria...', {
        autoClose: false
      })
      setToastLoading(toastLoading)

      const createItemFormData = new FormData();
      createItemFormData.append('name', formData.name);
      createItemFormData.append('description', formData.description);
      createItemFormData.append('available', formData.available);
      createItemFormData.append('image', formData.image);
      createItemFormData.append('banner', formData.banner);

      try {
        if (isFormValid(createItemFormData)) {
          createCategory(createItemFormData);
        } else {
          toast.dismiss(toastLoading)
        }
      } catch (err) {
        toast.dismiss(toastLoading);
        toast.error('Erro ao criar categoria.');
      }
    } else if (!isCreateItem) {
      const toastLoading = toast.loading('Atualizando categoria...', {
        autoClose: false
      })
      setToastLoading(toastLoading)

      const updatedFormData = new FormData();
      updatedFormData.append('id', formData.id);
      updatedFormData.append('name', formData.name);
      updatedFormData.append('description', formData.description);
      updatedFormData.append('available', formData.available);

      if (formData.image === null)
        updatedFormData.append('deleteImage', 'true');
      else if (formData.image)
        updatedFormData.append('image', formData.image);

      if (formData.banner === null)
        updatedFormData.append('deleteBanner', 'true');
      else if (formData.banner)
        updatedFormData.append('banner', formData.banner);

      try {
        if (isFormValid(updatedFormData)) {
          updateCategory(updatedFormData)
        } else {
          toast.dismiss(toastLoading)
        }
      } catch (err) {
        toast.dismiss(toastLoading);
        toast.error('Erro ao atualizar categoria.');
      }
    }
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
        <div className="modal-column-category">
          <div>
            <SearchInputAdmin
              className="modal-field name-category"
              placeholder="Nome da categoria"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <TextAreaAdmin
              className="modal-field"
              placeholder="Descrição da categoria"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              style={{ height: '235px' }}
            />
          </div>

         

          
        </div>

        <div className="modal-column-category">
          <div>
          <div className="image-preview-row">
            {formData?.image && (
              <CategoryThumb
                name="image"
                image={formData.image}
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

         
        </div>
        
      </div>
      <div className="modal-column-category">
      <div className="image-preview-row">
            {formData?.banner && (
              <CategoryThumb
                name="banner"
                image={formData?.banner}
                onClickDeleteImage={onClickDeleteImage}
                style={{ width: '100%' }}
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
    </ModalAdmin>
  );
};
