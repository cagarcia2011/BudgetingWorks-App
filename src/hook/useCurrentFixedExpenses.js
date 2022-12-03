import { useEffect, useState } from "react";

const useCurrentFixedExpenses = (user) => {
    const [fixedExpenses, setFixedExpenses] = useState([])

    useEffect(() => {
        let cancelRequest = false;
        const controller = new AbortController()
        const signal = controller.signal
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Fixed Expenses')
            const url = '/fixed-expenses'
            const args = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                signal: signal
            }

            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    if (cancelRequest) return;
                    setFixedExpenses(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Successfully Aborted Fixed Expenses Request.')
                        return
                    }
                    // Other error handling
                })
        }

        return () => {
            cancelRequest = true;
            controller.abort()
        }

    }, [user.isAuthorized, user.id, user.isLoading])

    const refreshFixedExpenses = () => {
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Fixed Expenses')
            const url = '/fixed-expenses'
            const args = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                }
            }

            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setFixedExpenses(data)
                })
                .catch((err) => {
                    console.log("Error fetching Fixed Expenses: ", err)
                })
        }
    }

    const postFixedExpense = (fixedExpense) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/fixed-expenses'
            const args = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(fixedExpense)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Fixed Expense posted ${data}`)
                })
        }

    }

    const deleteFixedExpense = (fixedExpenseId) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/fixed-expenses'
            const body = {
                id: fixedExpenseId
            }
            const args = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(body)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Fixed Expense deleted ${data}`)
                })
        }
    }

    const putFixedExpense = (fixedExpense) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/fixed-expenses'
            const args = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(fixedExpense)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Fixed Expenses updated ${data}`)
                })
        }
    }


  return [fixedExpenses, refreshFixedExpenses, postFixedExpense, deleteFixedExpense, putFixedExpense]
}

export default useCurrentFixedExpenses