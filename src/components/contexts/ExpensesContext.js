import React, { useContext, useState, useEffect } from "react";
import uuid from "react-uuid";

import { 
  getDoc, 
  collection, 
  doc, 
  getDocs, 
  query, 
  runTransaction 
} from "firebase/firestore";
import { db } from "../../firebase";

import { useAuthUser } from "./UserContext";

const Expenses = React.createContext();

export const useExpenses = () => {
  return useContext(Expenses);
};

export const ExpensesProvider = ({ children }) => {
  const { userId, isAuthorized } = useAuthUser();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (isAuthorized) {
        try {
            const incomeQuery = query(
                collection(db, "userData", userId, "expenses")
            )
            getDocs(incomeQuery)
                .then((res) => {
                    setExpenses(res.docs)
                })
        } catch (err) {
            console.error(err)
        }
    }
}, [isAuthorized, userId])

  const getBudgetRef = (budgetId) => {
    return doc(db, "userData", userId, "budgets", budgetId)
  }

  const getExpenseRef = (expenseId) => {
    return doc(db, "userData", userId, "expenses", expenseId)
  }

  const createNewExpenseDoc = (expense) => {
    return doc(db, "userData", userId, "expenses", uuid())
  }

  const getExpensesColletion = () => {
    return collection(db, "userData", userId, "expenses")
  }

  const refreshExpenses = async () => {
    if (!isAuthorized) return;
    try {
      const expenseQuery = query(
        getExpensesColletion()
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
      const budgetRef = expense.budgetId ? getBudgetRef(expense.budgetId) : null
      await runTransaction(db, async (transaction) => {
        if (!expense.budgetId) throw new Error("Fixed expense functionality is not yet developed.")
        const budgetDocRef = await transaction.get(budgetRef)

        const newExpenseAmount = budgetDocRef.data().expenses + expense.amount

        transaction.update(
          budgetRef,
          {
            expenses: newExpenseAmount
          }
        )
        transaction.set(
          createNewExpenseDoc(expense),
          expense
        )
      })
      await refreshExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const updateExpense = async (id, expense) => {
    if (!isAuthorized) return;
    try {
        const budgetRef = expense.budgetId ? getBudgetRef(expense.budgetId) : null
        const expenseRef = getExpenseRef(id)

        await runTransaction(db, async (transaction) => {
          if (!expense.budgetId) throw new Error("Fixed expense functionality is not yet developed.")
          const budgetDocRef = await transaction.get(budgetRef)
          if (!budgetDocRef.exists) throw new Error("Doc does not exist")
          const expenseDocRef = await transaction.get(expenseRef)
          if (!expenseDocRef.exists) throw new Error("Doc does not exist")

          const oldExpenseAmount = expenseDocRef.data().amount
          const newExpenseAmount = budgetDocRef.data().expenses - oldExpenseAmount + expense.amount

          transaction.update(
            budgetRef,
            {
              expenses: newExpenseAmount
            }
          )
          transaction.update(
            expenseRef,
            expense
          )
        })
        await refreshExpenses();
    } catch (err) {
        console.error(err)
    }
  }

  const deleteExpense = async (id) => {
    if (!isAuthorized) return;
    try {
       const expenseRef = getExpenseRef(id)
       const expense = await getExpenseById(id)
       console.log(expense.data().budgetId)
       const budgetRef = expense.data().budgetId ? getBudgetRef(expense.data().budgetId) : null
       
       await runTransaction(db, async (transaction) => {
        if (!expense.data().budgetId) throw new Error("Fixed expense functionality is not yet developed.")
        const budgetDocRef = await transaction.get(budgetRef)
        if (!budgetDocRef.exists) throw new Error("Doc does not exists")

        const expenseAmount = expense.data().amount
        const newExpenseAmount = budgetDocRef.data().expenses - expenseAmount

        transaction.update(
          budgetRef,
          {
            expenses: newExpenseAmount
          }
        )
        transaction.delete(expenseRef)
       })

       await refreshExpenses()
    } catch (err) {
        console.error(err)
    }
  }

  const getExpenseById = async (id) => {
    if (!isAuthorized) return;
    try {
        const expense = await getDoc(
            doc(db, "userData", userId, "expenses", id)
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
