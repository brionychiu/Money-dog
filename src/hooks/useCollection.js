import { useEffect, useState, useRef } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (col, _qu) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const qu = useRef(_qu).current

    useEffect(() => {
        setIsPending(false)
        let ref = collection(db,col)

        if(qu){
            ref = query(ref , where(...qu))
        }

        const unsub = onSnapshot(ref , (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data()})
                setIsPending(true)
            });
            setDocuments(results)
            // console.log(results)
            setError(null)
            setIsPending(false)

        },(error) => {
            console.log(error)
            setError('目前資料無法連線，請稍後再試')
            setIsPending(false)
        })
        return () => unsub()

    }, [col, qu])
    
    return { documents }
}