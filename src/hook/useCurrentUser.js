import { useCallback, useEffect, useState } from 'react'
import { PassageUser } from "@passageidentity/passage-auth/passage-user"

const useCurrentUser = () => {
    const [user, setUser] = useState({
        isLoading: true,
        isAuthorized: false,
        email: "",
        id: ""
    })

    const saveUser = useCallback((email, id, signal) => {
        const url = '/users'
        const args = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-ACCESS-KEY': process.env.REACT_APP_API_KEY,
                'X-USER-ID': id
            },
            body: JSON.stringify({
                email: email,
                user_id: id
            }),
            signal: signal
        }

        fetch(url, args)
            .then((res) => {
                if (res.status === 200) {
                    return
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('Successfully Aborted Request.')
                    return
                }
                // Other error handling
            })
    }, [])

    useEffect(() => {
        let cancelRequest = false;
        const abortController = new AbortController();
        const signal = abortController.signal
        new PassageUser().userInfo().then(
            (userInfo) => {
                if (cancelRequest) return
                console.log("Getting User Auth")
                if (userInfo === undefined) {
                    setUser({
                        isLoading: false,
                        isAuthorized: false,
                        email: "",
                        id: ""
                    })
                    return
                }
                setUser({
                    isLoading: false,
                    isAuthorized: true,
                    email: userInfo.email ? userInfo.email : userInfo.phone,
                    id: userInfo.id
                })
                saveUser(userInfo.email ? userInfo.email : userInfo.phone, userInfo.id, signal)
            }
        )
        return () => {
            cancelRequest = true;
            abortController.abort()
        }
    }, [saveUser])

  return user;
}

export default useCurrentUser