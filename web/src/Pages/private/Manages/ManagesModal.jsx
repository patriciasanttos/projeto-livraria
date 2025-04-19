import React, { useCallback } from "react";

import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import { useCreateAdmin } from "../../../hooks/useAdmins";
import { toast } from "react-toastify";

export const ManagesModal = ({
  isCreateAdmin,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const { mutate: createAdmin } = useCreateAdmin();

  const onConfirmSaveAdmin = useCallback(() => {
    if (isCreateAdmin) {
      try {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          return toast.warning('Por favor, insira um e-mail válido.');

        if (formData.phone.length < 1)
          return toast.warning('A numero de contato deve ter pelo menos 9 caracteres.');

        if (formData.password.length < 8)
          return toast.warning('A senha deve ter pelo menos 8 caracteres.');

        if (formData.password !== formData.passwordConfirmation)
          return toast.warning('As senhas não coincidem.');

        const creatingDataToast = toast.loading('Criando administrador...', {
          autoClose: false
        });

        createAdmin({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        });

        console.log(formData);
        toast.dismiss(creatingDataToast);
        toast.success('Administrador criado com sucesso!');
      } catch (err) {
        toast.dismiss(creatingDataToast);
        toast.error('Erro ao criar Administrador.');
      }
    }
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
            name="phone"
            value={formData.phone}
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

          <SearchInputAdmin
            className="modal-field"
            placeholder="Confirme a senha"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleFormChange}
          />
        </section>
      </section>
    </ModalAdmin>
  );
};
