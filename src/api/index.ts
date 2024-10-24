import axios from 'axios';
import { SERVER_API_URL } from '../config';
import type { configureStore } from '@reduxjs/toolkit';
import { userActions } from '@src/store';
// import { useNavigate } from 'react-router-dom';
const api = axios.create({
  baseURL: SERVER_API_URL, // Базовый URL вашего API
});


export const initAxiosInterceptors = (store: ReturnType<typeof configureStore>) => {  
  // Интерсептор запросов
  api.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Интерсептор ответов
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
			console.log("Это ошибка попала сюда", originalRequest);
      // Проверяем, истек ли токен (статус 401)
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Устанавливаем флаг, чтобы не зациклиться
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            // Запрос на обновление токена
						console.log("Попытка обновления refresh токена",refreshToken );
						
            const response = await api.post('/user/auth/refresh-token', { token: refreshToken });

            const newAccessToken = response.data.accessToken;
            localStorage.setItem('token', newAccessToken);

            // Обновляем заголовок и повторяем запрос
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest); // Повторяем оригинальный запрос с новым токеном
          } catch (err) {
            console.error('Refresh token is invalid', err);
            // Здесь можно реализовать логику выхода из аккаунта
            // Например, очистка токенов из localStorage и редирект на страницу входа
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser')
            store.dispatch(userActions.setCurrentUser(0))
          }
        }else{
          localStorage.removeItem('currentUser')
          store.dispatch(userActions.setCurrentUser(0))
        }
      }

      return Promise.reject(error);
    }
  );
};


export default api;