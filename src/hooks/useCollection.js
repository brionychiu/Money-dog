import { uesReducer, useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// initialState 寫在外面是因為不要每次use hook都要init一次
let initialState = {
    document:null,
    isPending:false,
    error:null,
    success:null
} 

const collectionReducer = (state,action) => {
    switch (action.type){
        case 'STOCK_LIST_BY_UID':
            // ...state = initialState , 在把isPending 改 true
            return { isPending:true, document:null, error:null, success:false}
        case 'DAILY_PRICE_BY_STOCKID':
            return {...state, isPending:false, document:action.payload, success:true, error:null}
        case 'DAILY_PE_BY_STOCKID':
            return {...state, isPending:false, document:action.payload, success:true, error:null}
        case 'BASIC_INFO_BY_STOCKID':
            return {isPending:false, document:null, success:true, error:null}
        case 'INDUSTRY_INFO_BY_STOCKID':
            return {isPending:false, document:null, success:true, error:null}
        case 'LONG_PE_BY_STOCKID':
            return {isPending:false, document:action.payload, success:true, error:null}
        case 'Q-EPS_BY_STOCKID':
            return {isPending:false, document:null, success:false, error:action.payload}
        case 'MONTH_PRICE_BY_STOCKID':
            return {isPending:false, document:null, success:false, error:action.payload}
        case 'LONG_YOY_BY_STOCKID':
            return {isPending:false, document:null, success:false, error:action.payload}
        default:
            return state
    }
}

export const useCollection = (col, qu) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const [response , dispatch] = useReducer(collectionReducer,initialState)


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
    
    return { documents }
}