import React, { useContext, useEffect, useState } from "react"
import uuid from 'react-uuid';

import { 
    collection, 
    getDocs, 
    query,
    doc,
    getDoc,
    runTransaction
} from "firebase/firestore"

import { db } from "../../firebase"

import { useAuthUser } from "./UserContext"

const Incomes = React.createContext()

export const useIncomes = () => {
    return useContext(Incomes)
}

export const IncomesProvider = ({ children }) => {
    const {userId, isAuthorized} = useAuthUser()
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        if (isAuthorized) {
            try {
                const incomeQuery = query(
                    collection(db, "userData", userId, "incomes")
                )
                getDocs(incomeQuery)
                    .then((res) => {
                        setIncomes(res.docs)
                    })
            } catch (err) {
                console.error(err)
            }
        }
    }, [isAuthorized, userId])

    const getBudgetRef = (budgetId) => {
        return doc(db, "userData", userId, "budgets", budgetId)
    }

    const getIncomeRef = (incomeId) => {
        return doc(db, "userData", userId, "incomes", incomeId)
    }

    const createNewIncomeDoc = (income) => {
        return doc(db, "userData", userId, "incomes", uuid())
    }

    const getIncomesColletion = () => {
        return collection(db, "userData", userId, "incomes")
    }

    const refreshIncomes = async () => {
        if (!isAuthorized) return;
        try {
            const incomeQuery = query(
                getIncomesColletion()
            ) 
            const response = await getDocs(incomeQuery)
            setIncomes(response.docs)

        } catch (err) {
            console.error(err)
        }
    }

    const saveIncome = async (income) => {
        if (!isAuthorized) return;
        try {
            const budgetRef = getBudgetRef(income.budgetId)
            await runTransaction(db, async (transaction) => {
                const docRef = await transaction.get(budgetRef)
                if (!docRef.exists) throw new Error("Doc does not exist")

                const newIncomeAmount = docRef.data().incomes + income.amount

                transaction.update(
                    budgetRef,
                    {
                        incomes: newIncomeAmount
                    }
                )
                transaction.set(
                    createNewIncomeDoc(income),
                    income
                )
            })

            await refreshIncomes();

        } catch (err) {
            console.error(err);
        }
    }

    const updateIncome = async (id, income) => {
        if (!isAuthorized) return;
        try {
            const budgetRef = getBudgetRef(income.budgetId);
            const incomeRef = getIncomeRef(id)

            await runTransaction(db, async (transaction) => {
                const budgetDocRef = await transaction.get(budgetRef)
                if (!budgetDocRef.exists) throw new Error("Doc does not exist")
                const incomeDocRef = await transaction.get(incomeRef)
                if (!incomeDocRef.exists) throw new Error("Doc does not exist")

                const oldIncomeAmount = incomeDocRef.data().amount
                const newIncomeAmount = budgetDocRef.data().incomes - oldIncomeAmount + income.amount

                transaction.update(
                    budgetRef,
                    {
                        incomes: newIncomeAmount
                    }
                )
                transaction.update(
                    incomeRef,
                    income
                )

            })

            await refreshIncomes()
        } catch (err) {
            console.error(err)
        }
    }

    const deleteIncome = async (incomeId) => {
        if (!isAuthorized) return;
        try {
            const incomeRef = getIncomeRef(incomeId)
            const budgetRef = getBudgetRef(getIncomeById(incomeId).data().budgetId)

            await runTransaction(db, async (transaction) => {
                const budgetDocRef = await transaction.get(budgetRef)
                if (!budgetDocRef.exists) throw new Error("Doc does not exist")
                const incomeDocRef = await transaction.get(incomeRef)
                if (!incomeDocRef.exists) throw new Error("Doc does not exist")

                const incomeAmount = incomeDocRef.data().amount
                const newIncomeAmount = budgetDocRef.data().incomes - incomeAmount

                transaction.update(
                    budgetRef,
                    {
                        incomes: newIncomeAmount
                    }
                )

                transaction.delete(incomeRef)

            })

            await refreshIncomes();
        } catch (err) {
            console.error(err);
        }
    }

    const getIncomeById = async (id) => {
        if (!isAuthorized) return;
        try {
            const income = await getDoc(
                doc(db, "userData", userId, "incomes", id)
            )
            return income
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    return (
        <Incomes.Provider value={{
            incomes,
            refreshIncomes,
            saveIncome,
            updateIncome,
            deleteIncome,
            getIncomeById
        }}>
            {children}
        </Incomes.Provider>
    )
}