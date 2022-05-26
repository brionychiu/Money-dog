import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where, orderBy} from 'firebase/firestore'

export const useTrackingList = (col, qu) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        let ref = collection(db,col)

        if(qu){
            ref = query(ref, where("uid","==",qu))
        }
        ref = query(ref, orderBy('createdAt','desc'))

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

    }, [col, qu])
    
    return { documents, error }
}