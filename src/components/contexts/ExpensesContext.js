import React, { useContext, useState } from "react";

import { addDoc, getDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../firebase";

import { useAuthUser } from "./UserContext";

const Expenses = React.createContext();

export const useExpenses = () => {
  return useContext(Expenses);
};

export const ExpensesProvider = ({ children }) => {
  const { userId, isAuthorized } = useAuthUser();
  const [expenses, setExpenses] = useState([]);

  const refreshExpenses = async () => {
    if (!isAuthorized) return;
    try {
      const expenseQuery = query(
        collection(db, "expenses"),
        where("uid", "==", userId)
      );
      const response = await getDocs(expenseQuery);
      setExpenses(response.docs);
    } catch (err) {
      console.error(err);
    }
  };

  const saveExpense = async expense => {
    if (!isAuthorized) return;
    try {
      await addDoc(collection(db, "expenses"), expense);
      await refreshExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const updateExpense = async (id, expense) => {
    if (!isAuthorized) return;
    try {
        const docRef = doc(db, "expenses", id)
        await updateDoc(
            docRef,
            expense
        );
        await refreshExpenses();
    } catch (err) {
        console.error(err)
    }
  }

  const deleteExpense = async (id) => {
    if (!isAuthorized) return;
    try {
        await deleteDoc(
            doc(db, "expenses", id)
        );
        await refreshExpenses();
    } catch (err) {
        console.error(err)
    }
  }

  const getExpenseById = async (id) => {
    if (!isAuthorized) return;
    try {
        const expense = await getDoc(
            doc(db, "expenses", id)
        )
        return expense
    } catch (err) {
        console.error(err)
        return null;
    }
}

  return (
    <Expenses.Provider
      value={{
        expenses,
        refreshExpenses,
        saveExpense,
        updateExpense,
        deleteExpense,
        getExpenseById
      }}
    >
      {children}
    </Expenses.Provider>
  );
};
