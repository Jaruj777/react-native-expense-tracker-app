import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";
import { IconButton } from "../components/UI/IconButton";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { deleteExp, storeExpense, updateExp } from "../components/utils/http";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/context-expense";

export const ManageExpense = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const { deleteExpense, addExpense, updateExpense, expensesState } =
    useContext(ExpenseContext);

  const selectedExpense = expensesState.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExp(editedExpenseId);
      deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (err) {
      setError("Could not delete expense - please tryagain later!");
      setIsSubmitting(false);
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const comfirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExp(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (err) {
      setError("Cloud not save data - please try again latet!");
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitBattonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={comfirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: "center",
  },
});
