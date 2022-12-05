import React, { useContext } from "react"
import useCurrentUser from "../../hook/useCurrentUser"

const AuthUser = React.createContext()

export const useAuthUser = () => {
    return useContext(AuthUser)
}

export const AuthUserProvider = ({ children }) => {
    const {user, setUser} = useCurrentUser();

    return (
       <AuthUser.Provider value={{
            user,
            setUser
       }}>
        {children}
       </AuthUser.Provider>
    )
}