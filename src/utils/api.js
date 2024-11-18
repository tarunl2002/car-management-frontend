import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


export const login = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
  return response.data;
};

export const createCar = async (data) => {
    const token = localStorage.getItem('token'); // Assuming you're using JWT authentication
    try {
      const response = await axios.post(`${API_BASE_URL}/cars`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating car:', error);
      throw error;
    }
  };

export const fetchCars = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_BASE_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateCar = async (carId, formData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`${API_BASE_URL}/cars/${carId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for sending files
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating car:", error);
      throw error;
    }
  };
  

  export const deleteCar = async (carId) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("User is not authenticated.");
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      });
    } catch (error) {
      console.error("Error deleting car:", error);
      throw error;
    }
  };

// Add other API calls like createCar, updateCar, deleteCar as needed.
