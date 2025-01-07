import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // Fallback to local server
});

export const getAllBirdsRoute = async () => {
  try {
    const response = await API.get('/bird');
    return response.data;
  } catch (error) {
    console.error('Error fetching birds:', error);
    throw error;
  }
};

export const getBirdByIdRoute = async (birdId: string) => {
  try {
    const response = await API.get(`/bird/${birdId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bird:', error);
    throw error;
  }
}

export const addBirdRoute = async (bird: any) => {
  try {
    const response = await API.post('/bird', bird);
    return response.data;
  } catch (error) {
    console.error('Error adding bird:', error);
    throw error;
  }
}

export const updateBirdRoute = async (birdId: string, updatedBird: any) => {
  try {
    const response = await API.put(`/bird/${birdId}`, updatedBird);
    return response.data;
  } catch (error) {
    console.error('Error updating bird:', error);
    throw error;
  }
}

export const deleteBirdRoute = async (birdId: string) => {
  try {
    const response = await API.delete(`/bird/${birdId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bird:', error);
    throw error;
  }
}