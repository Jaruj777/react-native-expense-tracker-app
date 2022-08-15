import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../components/utils/date";
import { fetchExpenses } from "../components/utils/http";
import { ExpenseContext } from "../store/context-expense";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { expensesState, setExpenses } = useContext(ExpenseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (err) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  const recentExpenses = expensesState.filter((ex) => {
    const today = new Date();
    const dateSevenDaysAgo = getDateMinusDays(today, 7);

    return ex.date > dateSevenDaysAgo && ex.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the lsat 7 days"
    />
  );
};

const style = StyleSheet.create({});
