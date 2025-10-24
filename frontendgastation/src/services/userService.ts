import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/usuarios';

const getAuthHeaders = () => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    return { Authorization: `Bearer ${user.jwt}` };
  }
  return {};
};

export const getUsers = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const createUser = (user) => {
  return axios.post(API_URL, user, { headers: getAuthHeaders() });
};

export const updateUser = (id, user) => {
  return axios.put(`${API_URL}/${id}`, user, { headers: getAuthHeaders() });
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
