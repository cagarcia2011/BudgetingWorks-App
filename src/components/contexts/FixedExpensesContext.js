import React, { useContext } from "react"
import useCurrentFixedExpenses from "../../hook/useCurrentFixedExpenses"
import { useAuthUser } from "./UserContext"

const FixedExpenses = React.createContext()

export const useFixedExpenses = () => {
    return useContext(FixedExpenses)
}

export const FixedExpensesProvider = ({ children }) => {
    const {user} = useAuthUser()
    const [fixedExpenses, refreshFixedExpenses, postFixedExpense, deleteFixedExpense, putFixedExpense] = useCurrentFixedExpenses(user);

    const getFixedExpensesById = (id) => {
        return FixedExpenses.map(fixedExpense => fixedExpense.id === id)
    }

    const saveFixedExpense = (fixedExpense) => {
        postFixedExpense(fixedExpense);
    }

    const updateFixedExpense = (fixedExpense) => {
        putFixedExpense(fixedExpense);
    }
    return (
        <FixedExpenses.Provider value={{
            fixedExpenses,
            getFixedExpensesById,
            refreshFixedExpenses,
            saveFixedExpense,
            updateFixedExpense,
            deleteFixedExpense
        }}>
            {children}
        </FixedExpenses.Provider>
    )
}