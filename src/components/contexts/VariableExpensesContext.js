import React, { useContext } from "react"
import useCurrentVariableExpenses from "../../hook/useCurrentVariableExpenses"
import { useAuthUser } from "./UserContext"

const VariableExpenses = React.createContext()

export const useVariableExpenses = () => {
    return useContext(VariableExpenses)
}

export const VariableExpensesProvider = ({ children }) => {
    const {user} = useAuthUser()
    const [variableExpenses, refreshVariableExpenses, postVariableExpense, deleteVariableExpense, putVariableExpense] = useCurrentVariableExpenses(user);

    const getVariableExpensesById = (id) => {
        return VariableExpenses.map(variableExpense => variableExpense.id === id)
    }

    const saveVariableExpense = (variableExpense) => {
        postVariableExpense(variableExpense);
    }

    const updateVariableExpense = (variableExpense) => {
        putVariableExpense(variableExpense);
    }
    return (
        <VariableExpenses.Provider value={{
            variableExpenses,
            getVariableExpensesById,
            refreshVariableExpenses,
            saveVariableExpense,
            updateVariableExpense,
            deleteVariableExpense
        }}>
            {children}
        </VariableExpenses.Provider>
    )
}