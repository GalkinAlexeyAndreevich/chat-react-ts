import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { signIn } from '@src/api/user';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@src/store/hook';
import { userActions } from '@src/store';

const AuthPage = () => {
	const dispatch = useAppDispatch()
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
	const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post('/api/auth/register', formData);
        if (response.status === 200) {
          alert('Registration successful');
        }
      } else {
				const {userId, accessToken, refreshToken} = await signIn(formData.login,formData.password)
				console.log("Ответ",accessToken);
				
        if (accessToken?.length) {
					localStorage.setItem('token', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
					navigate('/chat')
          localStorage.setItem("currentUser", String(userId))
					dispatch(userActions.setCurrentUser(userId))
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? 'Регистрация' : 'Авторизация'}</h2>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">{isRegister ? 'Регистрация' : 'Войти'}</button>
        <button type="button" className="toggle-button" onClick={toggleAuthMode}>
          {isRegister ? 'Уже имеете аккаунт? Войти' : 'У вас нет аккуанта? Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
