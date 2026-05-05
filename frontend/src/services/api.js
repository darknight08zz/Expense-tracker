import axios from 'axios';

export const getAllExpenses = async () => {
  try {
    const response = await axios.get('http://localhost:8000/expenses');
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const addExpense = async (amount, description) => {
  try {
    const response = await axios.post('http://localhost:8000/expenses', {
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
    const response = await axios.delete(`http://localhost:8000/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
