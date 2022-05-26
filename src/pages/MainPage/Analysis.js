import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from "../../hooks/useCollection"
import { useFirestore } from "../../hooks/useFirestore"

// components
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import Sidebar from '../../components/sidebar/Sidebar'

// sytles
import styles from './Analysis.module.css'

const Analysis = () => {
    const [tracking, setTracking] = useState(false)
    const [addTrackingList, setAddTrackingList] = useState(false)
    const [listName, setListName] = useState('')
    const { authIsReady, user } = useAuthContext()
    const uid = user.uid
    const { stockId } = useParams()
    const { addDocument , response } = useFirestore('stockList')

    const { documents:stockData } = useCollection(
        'dailyPrice',
        stockId
    ) 
    const { documents:basicInfo } = useCollection(
        'basicInfo',
        stockId
    ) 
    const addlist = {
        uid,
        stockId
    }
    const clickTrackBtn = async(e) => {
        e.preventDefault()
        await addDocument(addlist)
        console.log(response)
        if(!response.error){
            setTracking(true)  
        }
        // setAddTrackingList(true)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        await addDocument(addlist)
        if(!response.error){
            setTracking(true)  
        }
        console.log(response)
    }
    // 待 fix -- 回傳response = pending的response,不是成addDoc的
    // useEffect(() => { 
    //     if(response.success){
    //         setTracking(true)  
    //     }
    // },[response.success])

    return ( 
        <div className={styles['analysis-container']}>
            <Navbar className={styles.navbar}/>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                {stockData && basicInfo && (
                    <div className={styles.stockInfo}>    
                    <ul>
                        <li>{basicInfo[0].sname}{stockData[0].id}</li>
                        <li>台灣{basicInfo[0].date.slice(3,5)}/{basicInfo[0].date.slice(5,8)}收盤價</li>
                        <li>{stockData[0].Close}元</li>
                    </ul>
                    {tracking ? <button className={styles.tracked}>已追蹤</button>:
                    <form onSubmit={clickTrackBtn}>  
                        <button className={styles.untracked} type="submit">+ 追蹤</button>
                    </form>}
                        {/* {addTrackingList && (
                        <div>
                            <input type="checkbox" value="" ></input>
                            <label>Default checkbox</label>
                            <form onSubmit={handleSubmit}>
                                <label>
                                <span>建立個人專屬清單</span>
                                <input
                                    type='text'
                                    required
                                    onChange={(e) => setListName(e.target.value)}
                                    value={listName}
                                />
                                </label>
                                <button>建立</button>
                            </form>
                        </div>)} */}
            </div>
            )}
                <div className={styles.mainContent}>
                    {authIsReady && (
                    <Outlet />  
                    )}
                </div>
            </div>
            <Footer className={styles.footer}/>
        </div>
     );
}
 
export default Analysis;