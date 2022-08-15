import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-246c4-default-rtdb.firebaseio.com/";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(BACKEND_URL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "expenses.json");
  const expenses = [];

  for (const key in response.data) {
    const exspenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(exspenseObj);
  }
  return expenses;
};

export const updateExp = (id, expenseData) => {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
};

export const deleteExp = (id) => {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
};
