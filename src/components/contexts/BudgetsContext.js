import React, { useContext, useEffect, useState } from "react";

import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { db } from "../../firebase";

import { useAuthUser } from "./UserContext";
import { useIncomes } from "./IncomesContext";
import { useExpenses } from "./ExpensesContext";

const BudgetsContext = React.createContext();

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsProvider = ({ children }) => {
  const { userId, isAuthorized } = useAuthUser();
  const [budgets, setBudgets] = useState([]);
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();

  useEffect(
    () => {
      if (isAuthorized) {
        try {
          const budgetQuery = query(
            collection(db, "userData", userId, "budgets")
          );
          getDocs(budgetQuery).then(res => {
            setBudgets(res.docs);
          });
        } catch (err) {
          console.error(err);
        }
      }
    },
    [isAuthorized, userId, incomes.length, expenses.length]
  );

  const refreshBudgets = async () => {
    if (!isAuthorized) return;
    try {
      const budgetQuery = query(
        collection(db, "userData", userId, "budgets")
      );
      const response = await getDocs(budgetQuery);
      setBudgets(response.docs);

    } catch (err) {
      console.error(err);
    }
  };

  const saveBudget = async budget => {
    if (!isAuthorized) return;
    try {
      await addDoc(collection(db, "userData", userId, "budgets"), budget);
      await refreshBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const updateBudget = async (id, budget) => {
    if (!isAuthorized) return;
    try {
      const docRef = doc(db, "userData", userId, "budgets", id);
      await updateDoc(docRef, budget);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBudget = async id => {
    if (!isAuthorized) return;
    try {
      await deleteDoc(doc(db, "userData", userId, "budgets", id));
      await refreshBudgets();
    } catch (err) {
      console.error(err);
    }
  };

  const getBudgetById = async id => {
    if (!isAuthorized) return;
    try {
      const budget = await getDoc(doc(db, "userData", userId, "budgets", id));

      return budget;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getBudgetsByMonthYear = async monthYear => {
    if (!isAuthorized) return;
    try {
      const budgetQuery = query(
        collection(db, "userData", userId, "budgets"),
        where("uid", "==", userId),
        where("monthYear", "==", monthYear)
      );
      const response = await getDocs(budgetQuery);

      return response.docs;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        saveBudget,
        deleteBudget,
        refreshBudgets,
        updateBudget,
        getBudgetsByMonthYear,
        getBudgetById,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
