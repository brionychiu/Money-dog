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
    const handleSubmit = async(e) => {
        e.preventDefault()
        await addDocument(addlist)
        // setTracking(true)
    }
    
    useEffect(() => { 
        if(response.success){
            setTracking(true)  
        }
    },[response.success])

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
                    <form onSubmit={handleSubmit}>  
                        <button type="submit">+ 追蹤</button>
                    </form>}
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