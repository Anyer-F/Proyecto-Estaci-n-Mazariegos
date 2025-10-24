import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/bombas';

const getAuthHeaders = () => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    return { Authorization: `Bearer ${user.jwt}` };
  }
  return {};
};

export const getBombas = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const createBomba = (bomba) => {
  return axios.post(API_URL, bomba, { headers: getAuthHeaders() });
};

export const updateBomba = (id, bomba) => {
  return axios.put(`${API_URL}/${id}`, bomba, { headers: getAuthHeaders() });
};

export const deleteBomba = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
