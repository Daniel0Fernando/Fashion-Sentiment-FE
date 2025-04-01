// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api'; // Your Flask API URL

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chat`, { message });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error; // Re-throw to handle in component
    }
};