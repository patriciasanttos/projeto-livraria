import React, { useCallback, useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { validate as validateAdmin } from '../../../service/api/admins';
import { useCreateAdmin, useUpdateAdmin } from "../../../hooks/useAdmins";

//-----Components
import ModalAdmin from "../../../Components/ModalAdmin/ModalAdmin";
import SearchInputAdmin from "../../../Components/SearchInputAdmin/SearchInputAdmin";
import { toast } from "react-toastify";

export const ManagesModal = ({
  isCreateAdmin,
  formData,
  setFormData,
  setIsModalOpen,
}) => {
  const { mutateAsync: createAdmin, status: statusCreate, error: errorCreate } = useCreateAdmin();
  const { mutateAsync: updateAdmin, status: statusUpdate, error: errorUpdate } = useUpdateAdmin();

  const [initialAdminData, setInitialAdminData] = useState();

  const [currentAdmin, setCurrentAdmin] = useState(false);

  const loadCurrentAdmin = useCallback(async () => {
    const currentAdminData = await validateAdmin();

    setCurrentAdmin(currentAdminData?.data?.id);
  }, [formData]);

useEffect(() => {
    if (statusUpdate === 'success') {
      setIsModalOpen(false);
      // toast.dismiss(toastLoading);
      toast.success("Administrador atualizado com sucesso!");
    }

    if (statusUpdate === 'error') {
      const errorMessage = errorUpdate.response.data.message[0]
      // toast.dismiss(toastLoading);
      toast.error(`Erro ao atualizar administrador: ${errorMessage}`);
    }
  }, [statusUpdate, errorUpdate, setIsModalOpen])

  useEffect(() => {
    console.log(">>> statusCreate", statusCreate);
    if (statusCreate === 'success') {
      setIsModalOpen(false);
      // toast.dismiss(toastLoading);
      toast.success('Administrador criado com sucesso!');
    }

    if (statusCreate === 'error') {
      const errorMessage = errorCreate.response.data.message[0]
      // toast.dismiss(toastLoading);
      toast.error(`Erro ao criar administrador: ${errorMessage}`);
    }
  }, [statusCreate, errorCreate, setIsModalOpen])

  useEffect(() => {
    if (!formData)
      return;

    loadCurrentAdmin();

    if (!initialAdminData)
      setInitialAdminData({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      });
  }, [formData]);

  const onConfirmSaveAdmin = useCallback(() => {
    if (isCreateAdmin) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        return toast.warning('Por favor, insira um e-mail válido.');

      if (formData.phone.length < 1)
        return toast.warning('A numero de contato deve ter pelo menos 9 caracteres.');

      if (formData.newPassword.length < 8)
        return toast.warning('A senha deve ter pelo menos 8 caracteres.');

      if (formData.newPassword !== formData.passwordConfirmation)
        return toast.warning('As senhas não coincidem.');

      const creatingDataToast = toast.loading('Criando administrador...', {
        autoClose: false
      });

      try {
console.log(">>>> createAdmin");

        createAdmin({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.newPassword,
        });
        setIsModalOpen(false)
        toast.dismiss(creatingDataToast);
        toast.success('Administrador criado com sucesso!');
      } catch (err) {
        toast.dismiss(creatingDataToast);
        toast.error('Erro ao criar Administrador.');
      }
    }
    else if (!isCreateAdmin) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        return toast.warning('Por favor, insira um e-mail válido.');

      if (formData.phone.length < 1)
        return toast.warning('O numero de contato deve ter pelo menos 9 caracteres.');

      if (formData.newPassword) {
        if (formData.newPassword.length < 8)
          return toast.warning('A senha deve ter pelo menos 8 caracteres.');

        if (formData.newPassword !== formData.passwordConfirmation)
          return toast.warning('As senhas não coincidem.');
      }

      const updatingDataToast = toast.loading('Atualizando administrador...', {
        autoClose: false
      });

      try {
        if (!initialAdminData) {
          toast.dismiss(updatingDataToast);
          toast.error("Não houve nenhuma alteração.");
          return
        }

        const updatedFields = { id: formData.id };

        if (formData.name !== initialAdminData.name) updatedFields.name = formData.name;
        if (formData.phone !== initialAdminData.phone) updatedFields.phone = formData.phone;
        if (formData.email !== initialAdminData.email) updatedFields.email = formData.email;
        if (formData.newPassword) updatedFields.newPassword = formData.newPassword;

        if (Object.keys(updatedFields).length <= 1)
          return toast.info('Nenhuma alteração foi feita.');

        updateAdmin(updatedFields);

        setIsModalOpen(false)
        toast.dismiss(updatingDataToast);
        toast.success('Administrador atualizado com sucesso!');
      } catch (err) {
        toast.dismiss(updatingDataToast);
        toast.error('Erro ao atualizar Administrador.');
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

          <IMaskInput
            className="modal-field input-contact"
            placeholder="Contato"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            mask={"(00) 00000-0000"}
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

          {currentAdmin === formData.id && (
            <SearchInputAdmin
              className="modal-field"
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
            />
          )}

          <SearchInputAdmin
            className="modal-field"
            placeholder="Nova senha"
            name="newPassword"
            value={formData.newPassword}
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
