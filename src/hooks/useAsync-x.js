import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where, getDocs } from 'firebase/firestore'

export const useAsync = async(col_1, qu_1, col_2, qu_2) => {
    const [documents_1, setDocuments_1] = useState(null)
    const [documents_2, setDocuments_2] = useState(null)
    const [error, setError] = useState(null)
      
    useEffect(() => {
            let ref_1 = collection(db,col_1)

            if(qu_1){
                ref_1 = query(ref_1 , where("id","==",qu_1))
            }

            const querySnapshot =  getDocs(ref_1);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            }); 
            // const unsub =  onSnapshot(ref_1 , (snapshot) => {
            //     let results = []
            //     snapshot.docs.forEach(doc => {
            //         results.push({...doc.data()})
            //     });
            //     setDocuments_1(results)
            //     setError(null)

            // },(error) => {
            //     console.log(error)
            //     setError('目前資料無法連線，請稍後再試')
            // })
            // return () => unsub()

    }, [col_1, qu_1, col_2, qu_2])

    // const doc_1 = async (col_1, qu_1) => {
    //     let citiesRef = db.collection(col_1);
    //     let allCities = await citiesRef.get();
    //     for(const doc of allCities.docs){
    //       console.log(doc.id, '=>', doc.data());
    //     }
    //   }
    return { documents_1, documents_2}
}