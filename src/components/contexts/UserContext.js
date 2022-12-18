import React, { useContext, useEffect, useState } from "react"
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import { 
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"

import { app, db } from "../../firebase"

const AuthUser = React.createContext()

export const useAuthUser = () => {
    return useContext(AuthUser)
}

export const AuthUserProvider = ({ children }) => {
    const auth = getAuth(app);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);
    const [user, setUser] = useState(() => {
        const user = auth.currentUser;

        return user;
    });
    const [userId, setUserId] = useState(() => {
        const user = auth.currentUser;

        if (!user) return ''
        return user.uid
    })
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setIsAuthorized(currentUser !== null)
            if (currentUser) setUserId(currentUser.uid)
            setIsFetched(true)
            console.log(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [auth])

    useEffect(() => {
        if (isAuthorized) {
            setIsLoading(false)
            return
        }
        if (error !== "") {
            setIsLoading(false)
            return
        }
        if (isFetched) {
            setIsLoading(false)
            return
        }

    }, [isAuthorized, error, isFetched])

    // Auth Functions
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const currentUser = res.user;
            const userQuery = query(collection(db, "users"), where("uid", "==", currentUser.uid));
            const docs = await getDocs(userQuery);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: currentUser.uid,
                    name: currentUser.displayName,
                    authProvider: "google",
                    email: currentUser.email
                })
            }
        } catch (err) {
            console.error(err)
            setError(err.message)
        }
    }

    const logInWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            
        } catch (err) {
            console.error(err)
            setError(err.message)
            alert(err.message)
        }
    }

    const registerWithEmailAndPassword = async (name, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const user = res.user;
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email
            })
        } catch (err) {
            console.error(err)
            setError(err.message)
            alert(err.message)
        }
    }

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset link sent!")
        } catch (err) {
            console.error(err)
            setError(err.message)
            alert(err.message)
        }
    }

    const logout = () => {
        try {
            signOut(auth);
        } catch (err) {
            console.error(err)
            setError(err.message)
            alert(err.message)
        }
    }

    return (
       <AuthUser.Provider value={{
            user,
            userId,
            setUser,
            isAuthorized,
            isLoading,
            error,
            setError,
            signInWithGoogle,
            logInWithEmailAndPassword,
            registerWithEmailAndPassword,
            sendPasswordReset,
            logout
       }}>
        {children}
       </AuthUser.Provider>
    )
}