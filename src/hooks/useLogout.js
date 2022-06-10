import { useState ,useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

// firebase imports
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

export const useLogout = () => { 
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try{
            await signOut(auth)

            dispatch({ type: 'LOGOUT' })
            if(!isCancelled) {
                setError(null)
                setIsPending(false)
            }
        }
        catch(err){
            if(!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    },[])
    return { logout, error, isPending }
}