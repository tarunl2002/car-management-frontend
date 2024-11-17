import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api-url';

export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const fetchCars = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Add other API calls like createCar, updateCar, deleteCar as needed.
