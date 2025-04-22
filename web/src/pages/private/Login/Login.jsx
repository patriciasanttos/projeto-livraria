import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Logo from '../../../assets/images/logo.svg';

import './Login.scss';
import { login } from '../../../service/api/admins';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return toast.warning('Por favor, insira um e-mail válido');

    if (password.length < 8)
      return toast.warning('A senha deve ter pelo menos 8 caracteres');

    const loginResponse = await login(email, password);

    switch (loginResponse.status) {
      case 200:
        navigate('/admin/control_panel');
        return toast.success('Login realizado com sucesso!');

      case 401:
        return toast.error('Senha incorreta!');

      case 404:
        return toast.error('Usuário não encontrado!');

      default:
        throw new Error('Ocorreu um erro inesperado ao realizar o login');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <img src={Logo} alt="Logo" className="logo" />
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>E-mail</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>

            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                sx={{ border: 'none' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <button type="submit" className="login-button">
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;