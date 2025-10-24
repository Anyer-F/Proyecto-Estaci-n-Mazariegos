import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/tanques';

const getAuthHeaders = () => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    return { Authorization: `Bearer ${user.jwt}` };
  }
  return {};
};

export const getTanques = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const createTanque = (tanque) => {
  return axios.post(API_URL, tanque, { headers: getAuthHeaders() });
};

export const updateTanque = (id, tanque) => {
  return axios.put(`${API_URL}/${id}`, tanque, { headers: getAuthHeaders() });
};

export const deleteTanque = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
