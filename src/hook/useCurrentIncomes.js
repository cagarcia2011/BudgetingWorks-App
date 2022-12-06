import { useEffect, useState } from "react";

const useCurrentIncomes = (user) => {
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        let cancelRequest = false;
        const controller = new AbortController()
        const signal = controller.signal
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Incomes')
            const url = '/incomes'
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
                    setIncomes(data)
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('Successfully Aborted Incomes Get Request.')
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

    const refreshIncomes = () => {
        if (!user.isLoading && user.isAuthorized) {
            console.log('Getting Incomes')
            const url = '/incomes'
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
                    setIncomes(data)
                })
                .catch((err) => {
                    console.log("Error fetching Incomes: ", err)
                })
        }
    }

    const postIncome = (income) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/incomes'
            const args = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(income)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Income posted ${data}`)
                })
        }

    }

    const deleteIncome = (incomeId) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/incomes'
            const body = {
                id: incomeId
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

    const putIncome = (income) => {
        if (!user.isLoading && user.isAuthorized) {
            const url = '/incomes'
            const args = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                    'X-USER-ID': user.id
                },
                body: JSON.stringify(income)
            }
            fetch(url, args)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(`Incomes updated ${data}`)
                })
        }
    }


  return [incomes, refreshIncomes, postIncome, deleteIncome, putIncome]
}

export default useCurrentIncomes