import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/context-expense";

export const AllExpenses = () => {
  const { expensesState } = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expensesState}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
};

const style = StyleSheet.create({});
