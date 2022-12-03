import { useEffect, useState } from "react";

const useCurrentVariableExpenses = (user) => {
    const [variableExpenses, setVariableExpenses] = useState([])

    useEffect(() => {
        let cancelRequest = false;
        const controller = new AbortController()
        const signal = controller.signal
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Variable Expenses')
            const url = '/variable-expenses'
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
                    setVariableExpenses(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Successfully Aborted Variable Expenses Get Request.')
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

    const refreshVariableExpenses = () => {
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Variable Expenses')
            const url = '/variable-expenses'
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
                    setVariableExpenses(data)
                })
                .catch((err) => {
                    console.log("Error fetching Variable Expenses: ", err)
                })
        }
    }

    const postVariableExpense = (variableExpense) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/variable-expenses'
            const args = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(variableExpense)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Variable Variable posted ${data}`)
                })
        }

    }

    const deleteVariableExpense = (variableExpenseId) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/variable-expenses'
            const body = {
                id: variableExpenseId
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
                    console.log(`Variable Expense deleted ${data}`)
                })
        }
    }

    const putVariableExpense = (variableExpense) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/variable-expenses'
            const args = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(variableExpense)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Variable Expenses updated ${data}`)
                })
        }
    }


  return [variableExpenses, refreshVariableExpenses, postVariableExpense, deleteVariableExpense, putVariableExpense]
}

export default useCurrentVariableExpenses