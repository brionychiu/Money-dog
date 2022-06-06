import { useReducer , useEffect , useState } from "react";
import { db, timestamp } from '../firebase/config'

// firebase imports
import { collection, deleteDoc, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'

// initialState 寫在外面是因為不要每次use hook都要init一次
let initialState = {
    document:null,
    isPending:false,
    error:null,
    success:null
}

const firestoreReducer = (state,action) => {
    switch (action.type){
        case 'IS_PENDING':
            // ...state = initialState , 在把isPending 改 true
            return { isPending:true, document:null, error:null, success:false}
        case 'ADDED_DOCUMENT':
            // 因為我們操作每個物件，所以就不需要...state(Spread syntax)
            return { isPending:false, document:action.payload, success:true, error:null}
        case 'DELETED_DOCUMENT':
            return { isPending:false, document:null, success:true, error:null}
        case 'UPDATE_DOCUMENT':
            return { isPending:false, document:action.payload, success:true, error:null}
        case 'ERROR':
            return { isPending:false, document:null, success:false, error:action.payload}
        default:
            return state
    }
}

export const useFirestore = (col) => {
    // response = 平常在寫的state , 寫response 代表我們的request-->firestore所
    // 回傳的response(類似)
    const [ response , dispatch ] = useReducer(firestoreReducer,initialState)
    const [ isCancelled , setIsCancelled ] = useState(false)

    //collection ref
    let ref = collection(db,col)

    // only dispatch is not cancelled 
    // 因為每次做動作之前，都要先check isCancalled = true ，所以寫成一個function
    const dispatchIfNotCanaelled = (action) => {
        if(!isCancelled){
            console.log(response)     
            dispatch(action)
            console.log(action)
        }
    }

    // add a document
    const addDocument = async (doc) => {
        dispatch({type:'IS_PENDING'})
        try {
            console.log(doc)
            const createdAt = timestamp.fromDate(new Date())
            // ...doc == name+amount
            const addedDocument = await addDoc(ref,{ ...doc , createdAt:createdAt })
            // paylaod就是要回傳的數值，所以可以把如果寫一個常數addedDocument接收
            // 就可以傳出去，做操作
            console.log(addedDocument)
            dispatchIfNotCanaelled({type:'ADDED_DOCUMENT',payload : addedDocument})
        } catch (err) {
            dispatchIfNotCanaelled({type:'ERROR',payload : err.message})
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({type:'IS_PENDING'})
        try {
            const ref = doc(db, 'trackingList', id)
            // 回傳的deleteDocument就寫undefined,所以上面payload設null就好
            const deleteDocument = await deleteDoc(ref)
            dispatchIfNotCanaelled({type:'DELETED_DOCUMENT',payload:deleteDocument})
        } catch (err) {
            console.log(err.message)
            dispatchIfNotCanaelled({type:'ERROR',payload : 'could not delete'})
        }
    }
    // cancel tracking
    const cancelTracking = async (uid,stockId) => {
        dispatch({type:'IS_PENDING'})
        try {
            // 找出對應的uid和要取消的stockId
            let ref = collection(db,'trackingList')
            ref = query(ref, where("uid","==",uid), where("stockId", "==", stockId))
            const docSnap = await getDocs(ref);
            let results
            docSnap.docs.forEach(doc => {
                results={id:doc.id}
            });
            // 找到的doc.id --> 刪除那個id
            ref = doc(db, 'trackingList', results.id)
            const deleteDocument = await deleteDoc(ref)
            dispatchIfNotCanaelled({type:'DELETED_DOCUMENT',payload:deleteDocument})

        } catch (err) {
            console.log(err.message)
            dispatchIfNotCanaelled({type:'ERROR',payload : 'could not delete'})
        }
    }

    // update a document
    const updateDocument = async (id, updates) => {
        dispatch({type:'IS_PENDING'})
        try {
            ref = doc(ref,id)
            // 回傳的deleteDocument就寫undefined,所以上面payload設null就好
            const updateDocument = await updateDoc(ref, updates)
            dispatchIfNotCanaelled({type:'UPDATE_DOCUMENT',payload:updateDocument})
        } catch (err) {
            dispatchIfNotCanaelled({type:'ERROR',payload : 'could not delete'})
        }
    }
    // cleanup function
    useEffect(() =>{
        setIsCancelled(false)
        return() => setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, updateDocument, cancelTracking, response }
}