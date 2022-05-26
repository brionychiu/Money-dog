import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// initialState 寫在外面是因為不要每次use hook都要init一次
// let initialState = {
//     query:null,
//     isPending:false,
//     error:null,
//     success:null
// } 

// const collectionReducer = (state,action) => {
//     switch (action.type){
//         case 'IS_PENDING':
//             return { isPending:true, query:null, error:null, success:false}
//         case 'SEARCH_BY_UID':
//             // ...state = initialState , 在把isPending 改 true
//             return {...state, isPending:false, query:action.payload, error:null, success:false}
//         case 'SEARCH_BY_STOCKID':
//             return {...state, isPending:false, query:action.payload, success:true, error:null}
//         case 'SEARCH_BY_INDUS_ID':
//             return {...state, isPending:false, query:action.payload, success:true, error:null}
//         case 'ERROR':
//             return {isPending:false, query:null, success:false, error:action.payload}
//         default:
//             return state
//     }
// }

export const useCollection = (col, qu) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    // const [response , dispatch] = useReducer(collectionReducer,initialState)


    useEffect(() => {

        let ref = collection(db,col)

        if(qu){
            ref = query(ref , where("id","==",qu))
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

    }, [col, qu])
    
    return { documents, error }
}