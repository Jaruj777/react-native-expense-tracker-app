import { StyleSheet, FlatList } from "react-native";
import { ExpenseItem } from "./ExpenseItem";

export const ExpensesList = ({ data }) => {
  const renderExpenseItem = ({ item }) => {
    return <ExpenseItem {...item} />;
  };
  return (
    <FlatList
      data={data}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const style = StyleSheet.create({});
