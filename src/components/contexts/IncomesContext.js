import React, { useContext, useEffect, useState } from "react"

import { 
    addDoc,
    collection, 
    getDocs, 
    query,
    updateDoc,
    where,
    doc,
    deleteDoc,
    getDoc
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
                    collection(db, "incomes"),
                    where("uid", "==", userId)
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

    const refreshIncomes = async () => {
        if (!isAuthorized) return;
        try {
            const incomeQuery = query(
                collection(db, "incomes"),
                where("uid", "==", userId)
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
            await addDoc(
                collection(db, "incomes"),
                income
            );
            await refreshIncomes();
        } catch (err) {
            console.error(err);
        }
    }

    const updateIncome = async (id, income) => {
        if (!isAuthorized) return;
        try {
            const docRef = doc(db, "incomes", id)
            await updateDoc(
                docRef,
                income
            )
            await refreshIncomes();
        } catch (err) {
            console.error(err)
        }
    }

    const deleteIncome = async (id) => {
        if (!isAuthorized) return;
        try {
            await deleteDoc(
                doc(db, "incomes", id)
            );
            await refreshIncomes();
        } catch (err) {
            console.error(err);
        }
    }

    const getIncomeById = async (id) => {
        if (!isAuthorized) return;
        try {
            const income = await getDoc(
                doc(db, "incomes", id)
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