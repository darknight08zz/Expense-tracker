import axios from 'axios';

const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/+$/, '');

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getAllExpenses = async () => {
  try {
    const response = await client.get('/expenses');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const addExpense = async (amount, description) => {
  try {
    const response = await client.post('/expenses', {
      amount: Number(amount),
      description,
    });
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await client.delete(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
