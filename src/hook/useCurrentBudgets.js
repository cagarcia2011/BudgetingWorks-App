import { useEffect, useState } from "react";

const useCurrentBudgets = (user) => {
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        let cancelRequest = false;
        const controller = new AbortController()
        const signal = controller.signal
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Budgets')
            const url = '/budgets'
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
                    setBudgets(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Successfully Aborted Get Budgets Request.')
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

    const refreshBudgets = () => {
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Budgets')
            const url = '/budgets'
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
                    setBudgets(data)
                })
        }
    }

    const postBudget = (budget) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/budgets'
            const args = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(budget)
            }
            fetch(url, args)
                .then((res) => {
                    if (res.status === 200) refreshBudgets()
                    return res.json()
                })
                .then((data) => {
                    console.log(`Budget posted ${data}`)
                })
        }

    }

    const deleteBudget = (budget_id) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/budgets'
            const body = {
                id: budget_id
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
                    if (res.status === 200) refreshBudgets()
                    return res.json()
                })
                .then((data) => {
                    console.log(`Budget deleted ${data}`)
                })
        }
    }

    const putBudget = (budget) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/budgets'
            const args = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(budget)
            }
            fetch(url, args)
                .then((res) => {
                    if (res.status === 200) refreshBudgets()
                    return res.json()
                })
                .then((data) => {
                    console.log(`Budget updated ${data}`)
                })
        }
    }


  return [budgets, refreshBudgets, postBudget, deleteBudget, putBudget]
}

export default useCurrentBudgets