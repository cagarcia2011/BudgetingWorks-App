import React, { useContext } from "react"
import useCurrentIncomes from "../../hook/useCurrentIncomes"
import { useAuthUser } from "./UserContext"

const Incomes = React.createContext()

export const useIncomes = () => {
    return useContext(Incomes)
}

export const IncomesProvider = ({ children }) => {
    const {user} = useAuthUser()
    const [incomes, refreshIncomes, postIncome, deleteIncome, putIncome] = useCurrentIncomes(user);

    const getIncomesById = (id) => {
        return Incomes.map(income => income.id === id)
    }

    const saveIncome = (income) => {
        postIncome(income);
    }

    const updateIncome = (income) => {
        putIncome(income);
    }
    return (
        <Incomes.Provider value={{
            incomes,
            getIncomesById,
            refreshIncomes,
            saveIncome,
            updateIncome,
            deleteIncome
        }}>
            {children}
        </Incomes.Provider>
    )
}