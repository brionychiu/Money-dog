import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (col, qu1, qu2) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        let ref = collection(db,col)

        if(qu1&&!qu2){
            ref = query(ref , where("id","==",qu1))
        }
        if(qu1&&qu2){
            ref = query(ref , where("uid","==",qu1), where("id","==",qu2))
        }

        const unsub = onSnapshot(ref , (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data()})
            });
            setDocuments(results)
            setError(null)

        },(error) => {
            console.log(error)
            setError('目前資料無法連線，請稍後再試')
        })
        return () => unsub()

    }, [col, qu1, qu2])
    
    return { documents, error }
}