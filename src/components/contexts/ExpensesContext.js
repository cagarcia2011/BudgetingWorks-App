import React, { useContext, useState } from "react"

import { 
    collection,
    getDocs,
    query, 
    where
} from "firebase/firestore"
import { db } from "../../firebase"

import { useAuthUser } from "./UserContext"

const Expenses = React.createContext()

export const useExpenses = () => {
    return useContext(Expenses)
}

export const ExpensesProvider = ({ children }) => {
    const { userId, isAuthorized } = useAuthUser()
    const [expenses, setExpenses] = useState([])

    const refreshExpenses = async () => {
        if (!isAuthorized) return;
        try {
            const expenseQuery = query(
                collection(db, "expenses"),
                where("uid", "==", userId)
            )
            const response = await getDocs(expenseQuery)
            setExpenses(response.docs)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Expenses.Provider value={{
            expenses,
            refreshExpenses,
            // getExpensesById,
            // saveFixedExpense,
            // deleteFixedExpense,
            // updateFixedExpense,
        }}>
            {children}
        </Expenses.Provider>
    )
}