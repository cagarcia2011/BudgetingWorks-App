import React, { useContext } from "react"
import useCurrentBudgets from "../../hook/useCurrentBudgets"
import { useAuthUser } from "./UserContext"

const BudgetsContext = React.createContext()

export const useBudgets = () => {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const {user} = useAuthUser()
    const [budgets, refreshBudgets, postBudget, deleteBudget, putBudget] = useCurrentBudgets(user);

    const getBudgetsByMonthYear = (month, year) => {
        return budgets.filter(budget => budget.month === month && budget.year === year)
    }

    const getBudgetById = (id) => {
        return budgets.map(budget => budget.id === id)
    }

    const saveBudget = (budget) => {
        postBudget(budget);
    }

    const updateBudget = (budget) => {
        putBudget(budget);
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            getBudgetsByMonthYear,
            getBudgetById,
            refreshBudgets,
            saveBudget,
            deleteBudget,
            updateBudget
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}