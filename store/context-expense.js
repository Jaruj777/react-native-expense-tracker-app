import { createContext, useReducer } from "react";
import { reducerExpense } from "./reducerExpense";
import { ADD_EXPENSE, DELETE_EXPENSE, SET, UPDATE_EXPENSE } from "./types";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(reducerExpense, []);

  const addExpense = (expenseData) => {
    dispatch({ type: ADD_EXPENSE, expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: SET, payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: DELETE_EXPENSE, id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: UPDATE_EXPENSE, id, expenseData });
  };

  return (
    <ExpenseContext.Provider
      value={{
        expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
