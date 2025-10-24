import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/ventas';

const getAuthHeaders = () => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    return { Authorization: `Bearer ${user.jwt}` };
  }
  return {};
};

export const getVentas = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const createVenta = (venta) => {
  return axios.post(API_URL, venta, { headers: getAuthHeaders() });
};

export const updateVenta = (id, venta) => {
  return axios.put(`${API_URL}/${id}`, venta, { headers: getAuthHeaders() });
};

export const deleteVenta = (id) => {
  return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
};
