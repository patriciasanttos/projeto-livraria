import React, { useCallback } from "react";

import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";

export const ManagesModal = ({
  isCreateAdmin,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const onConfirmSaveAdmin = useCallback(() => {
    console.log(formData);
  }, [formData]);

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
      title={
        isCreateAdmin ? `Adicionar novo administrador` : `Editar administrador`
      }
      onClose={() => setIsModalOpen(false)}
      onConfirm={onConfirmSaveAdmin}
      buttonConfirmText={isCreateAdmin ? `Adicionar` : `Salvar`}
    >
      <section className="modal-row-admin">
        <section className="modal-column-admin">
          <SearchInputAdmin
            className="modal-field"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />

          <SearchInputAdmin
            className="modal-field"
            placeholder="Contato"
            name="contact"
            value={formData.contact}
            onChange={handleFormChange}
          />
        </section>
        <section className="modal-column-admin">
          <SearchInputAdmin
            className="modal-field"
            placeholder="E-mail"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />

          <SearchInputAdmin
            className="modal-field"
            placeholder="Senha"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </section>
      </section>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleFormChange}
        placeholder="Adicione informações importantes"
        className="textarea-manages"
      ></textarea>
    </ModalAdmin>
  );
};
