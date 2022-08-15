import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  SET,
} from "../store/types";

const handlers = {
  [ADD_EXPENSE]: (state, { expenseData }) => [expenseData, ...state],
  [SET]: (_, action) => action.payload.reverse(),
  [DELETE_EXPENSE]: (state, { id }) => state.filter((ex) => ex.id !== id),
  [UPDATE_EXPENSE]: (state, { id, expenseData }) => {
    const expenseIndex = state.findIndex((ex) => ex.id === id);
    const updatableExpense = state[expenseIndex];
    const updatedExpense = { ...updatableExpense, ...expenseData };
    const updateExpenses = [...state];
    updateExpenses[expenseIndex] = updatedExpense;
    return updateExpenses;
  },
  DEFAULT: (state) => state,
};

export const reducerExpense = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
