import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error , setError] = useState(null)
    const [isPending , setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, confirmPassword) => {
        setError(null)
        setIsPending(true)
        if(password !== confirmPassword){
            setError('確認密碼不一致，請重新輸入')
            setIsPending(false)
            return
        }
           
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res.user)
            
            if (!res) {
                throw new Error('註冊失敗')
            }

            dispatch({ type: 'LOGIN', payload: res.user })
            if(!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if(!isCancelled){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])

    return { error , isPending , signup }
}