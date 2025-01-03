import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      localStorage.removeItem('token'); // Remove the expired token
      window.location.href = '/login'; // Redirect to login page
      alert('Session expired. Please log in again.'); // Notify the user
    }
    return Promise.reject(error);
  }
);

export const getMenuItems = async () => {
  const response = await api.get('/menu');
  return response.data;
};

export const createOrder = async (order) => {
  const response = await api.post('/orders', order);
  return response.data;
};

// Add more API calls as needed

export default api;