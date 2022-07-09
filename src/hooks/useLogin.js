import { useState ,useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword ,signInWithPopup, 
        GoogleAuthProvider,  FacebookAuthProvider } from 'firebase/auth'

export const useLogin = () => { 
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    // google login
    const googleLogin = async () => {
        const googleProvider = new GoogleAuthProvider();
        setError(null)
        setIsPending(true)

        try{
            const res = await signInWithPopup(auth, googleProvider)
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
                if (err.message ==='Firebase: Error (auth/user-not-found).'){
                    setError('密碼或帳號錯誤，請重新輸入。')
                }else{
                    setError('密碼或帳號錯誤，請重新輸入。')
                }
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    },[])
    
    const fbLogin = async () => {
        const fbProvider = new FacebookAuthProvider();
        setError(null)
        setIsPending(true)

        try{
            const res = await signInWithPopup(auth, fbProvider)
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
                if (err.message ==='Firebase: Error (auth/user-not-found).'){
                    setError('密碼或帳號錯誤，請重新輸入。')
                }else{
                    setError('密碼或帳號錯誤，請重新輸入。')
                }
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    },[])

    // mail login
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try{
            const res = await signInWithEmailAndPassword(auth, email, password)
            
            dispatch({ type: 'LOGIN', payload: res.user })

            if (!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch (err) {
            if (!isCancelled) {
                if (err.message ==='Firebase: Error (auth/user-not-found).'){
                    setError('密碼或帳號錯誤，請重新輸入。')
                }else{
                    setError('密碼或帳號錯誤，請重新輸入。')
                }
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return () => setIsCancelled(true)
    },[])
    return { googleLogin, fbLogin, login, error, isPending }
}