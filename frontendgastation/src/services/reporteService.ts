import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/reportes';

const getAuthHeaders = () => {
  const user = getCurrentUser();
  if (user && user.jwt) {
    return { Authorization: `Bearer ${user.jwt}` };
  }
  return {};
};

export const getReportes = () => {
  return axios.get(API_URL, { headers: getAuthHeaders() });
};

export const getReporteFinanciero = (startDate, endDate) => {
  return axios.get(`${API_URL}/financiero`, { params: { startDate, endDate }, headers: getAuthHeaders() });
};

export const getReporteExistencias = () => {
  return axios.get(`${API_URL}/existencias`, { headers: getAuthHeaders() });
};

export const getReporteRendimiento = (startDate, endDate) => {
  return axios.get(`${API_URL}/rendimiento`, { params: { startDate, endDate }, headers: getAuthHeaders() });
};
