import React, { useCallback, useEffect, useState } from "react";
import { useAddProductToCategory, useRemoveProductFromCategory } from "../../../hooks/useCategories";
import { useCreateProduct, useUpdateProduct } from "../../../hooks/useProducts";

//-----Components
import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import DropdownAdmin from "../../../Components/DropdownAdmin/DropdownAdmin";
import ProductThumb from "./ProductThumb";
import { toast } from "react-toastify";

export const ProductsModal = ({
  isCreateItem,
  categories,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const [mainImageIndex, setMainImageIndex] = useState(() => {
    const index = formData?.images?.findIndex((img) => img.isMain);
    return index !== -1 && index != null ? index : 0;
  });

  const [prevCategories, setPrevCategories] = useState([]);

  useEffect(() => {
    if (!isCreateItem && formData.categories?.length)
      setPrevCategories(formData.categories);
  }, []);

  const { mutateAsync: updateProduct, status: statusUpdate, error: errorUpdate } = useUpdateProduct();
  const { mutateAsync: createProduct, status: statusCreate, error: errorCreate } = useCreateProduct();
  const { mutateAsync: addProductToCategory } = useAddProductToCategory();
  const { mutateAsync: removeProductFromCategory } = useRemoveProductFromCategory();
  const [toastLoading, setToastLoading] = useState();

  useEffect(() => {
    if (statusUpdate === 'success') {
      setIsModalOpen(false);
      toast.dismiss(toastLoading);
      toast.success('Produto atualizado com sucesso!');
    }

    if (statusUpdate === 'error') {
      const errorMessage = errorUpdate.response.data.message[0]
      toast.dismiss(toastLoading);
      toast.error(`Erro ao atualizar produto: ${errorMessage}`);
    } 
  }, [statusUpdate])

  useEffect(() => {
    if (statusCreate === 'success') {
      setIsModalOpen(false);
      toast.dismiss(toastLoading);
      toast.success('Produto criado com sucesso!');
    }

    if (statusCreate === 'error') {
      const errorMessage = errorCreate.response.data.message[0]
      toast.dismiss(toastLoading);
      toast.error(`Erro ao criar produto: ${errorMessage}`);
    } 
  }, [statusCreate])

  const onClickDeleteImage = useCallback((index) => {
    const updatedImages = formData?.images?.filter((_, i) => i !== index);

    if (mainImageIndex === index) {
      setMainImageIndex(updatedImages.length > 0 ? 0 : null);
    } else if (mainImageIndex > index) {
      setMainImageIndex(mainImageIndex - 1);
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: updatedImages,
    }));
  });

  const onConfirmSaveProduct = useCallback(async () => {
    if (isCreateItem) {
      
      if (formData.images.length < 1) {
        return toast.error("Você precisa adicionar pelo menos 1 imagem");
      }

      setToastLoading(
        toast.loading('Criando produto...', {
          autoClose: false
        })
      )

      const getImageFile = (index) => {
        const image = formData?.images?.[index];

        return image instanceof File ? image : undefined;
      };

      const newDataForm = new FormData();
      newDataForm.append('id', formData.id);
      newDataForm.append('name', formData.name);
      newDataForm.append('description', formData.description);
      newDataForm.append('price', formData.price);
      newDataForm.append('available', formData.available);
      newDataForm.append('main_category', formData.categories?.[0]?.name);
      newDataForm.append('main_image', mainImageIndex ?? 0);
      newDataForm.append('image_1', getImageFile(0));
      newDataForm.append('image_2', getImageFile(1));
      newDataForm.append('image_3', getImageFile(2));

      try {
        const newProduct = await createProduct(newDataForm);

        for (let category of formData.categories) {
          if (category === formData.categories[0])
            continue;

          await addProductToCategory({
            categoryId: String(category.id),
            productId: String(newProduct.id),
          });
        }
      
        setIsModalOpen(false);
        toast.dismiss(toastLoading);
        toast.success("Produto criado com sucesso!");
      } catch (err) {
        toast.dismiss(toastLoading);
        toast.error('Erro ao criar produto.');
      }
    } else if (!isCreateItem) {
      if (formData.images.length < 1) {
        return toast.error('Você precisa adicionar pelo menos 1 imagem')
      }
      
      setToastLoading(
        toast.loading('Atualizando produto...', {
          autoClose: false
        })
      )

      const getImageFile = (index) => {
        const image = formData?.images?.[index];

        return image instanceof File ? image : undefined;
      };

      const updatedFormData = new FormData();
      updatedFormData.append('id', formData.id);
      updatedFormData.append('name', formData.name);
      updatedFormData.append('description', formData.description);
      updatedFormData.append('price', formData.price);
      updatedFormData.append('available', formData.available);
      updatedFormData.append('main_category', formData.categories?.[0]?.name);
      updatedFormData.append('mainImage', formData.mainImage ?? mainImageIndex ?? 0);
      updatedFormData.append('image_1', getImageFile(0));
      updatedFormData.append('image_2', getImageFile(1));
      updatedFormData.append('image_3', getImageFile(2));

      try {
        const updatedProduct = await updateProduct(updatedFormData);

        const addedCategories = formData.categories.filter(
          cat => !prevCategories.some(prev => prev.id === cat.id)
        );

        addedCategories.forEach(async (category) => {
          await addProductToCategory({
            categoryId: String(category.id),
            productId: String(updatedProduct.id),
          });
        })

        const removedCategories = prevCategories.filter(
          prevCat => !formData.categories.some(cat => cat.id === prevCat.id)
        );

        removedCategories.forEach(async (category) => {
          await removeProductFromCategory({
            categoryId: String(category.id),
            productId: String(updatedProduct.id),
          });
        })

        setIsModalOpen(false);
        toast.dismiss(toastLoading);
        toast.success('Produto atualizado com sucesso!');
      } catch (err) {
        toast.dismiss(toastLoading);
        toast.error('Erro ao atualizar produto.');
      }
    }
  }, [formData, mainImageIndex]);

  const handleFormChange = (evt) => {
    const { name, value, files, checked, type } = evt.target;

    const getValue = (val) => {
      if (type === "checkbox") {
        return checked;
      } else if (type === "radio") {
        return value === 'on';
      } else if (val === "true") {
        return true;
      } else if (val === "false") {
        return false;
      } else {
        return val;
      }
    };

    if (name === "categories") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        categories: value.map(v => ({
          id: v.value,
          name: v.label
        })),
      }));
    }
    else if (files && files[0]) {
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
      buttonConfirmText={isCreateItem ? `Adicionar` : `Salvar`}
    >
      <section className="modal-row">
        <div className="modal-column-product">
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
            name="categories"
            value={formData?.categories?.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            onChange={handleFormChange}
            multiple={true}
            placeholder="Categorias"
            options={categories?.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
          <textarea
            name="description"
            value={
              formData.description == "null" ||
              formData.description == "undefined"
                ? ""
                : formData.description
            }
            onChange={handleFormChange}
            placeholder="Descrição do produto"
            className="textarea-product"
          ></textarea>
        </div>

        <div className="modal-column-product">
          <div className="image-preview-row-product">
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
            Adicionar imagem ({formData?.images?.length ?? 0}/3)
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
                      target: {
                        name: "available",
                        value: false,
                        type: "radio",
                      },
                    })
                  }
                />

                <p>Indisponível</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ModalAdmin>
  );
};
