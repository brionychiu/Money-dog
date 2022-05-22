import { useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from "../../hooks/useCollection"

// components
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import Sidebar from '../../components/sidebar/Sidebar'

// sytles
import styles from './Analysis.module.css'


const Analysis = () => {
    const { authIsReady } = useAuthContext()
    const { stockId } = useParams()
    const { documents:stockData } = useCollection(
        'test',
        ['id', '==', stockId]
    ) 
    const { documents:basicInfo } = useCollection(
        'basicInfo',
        ['id', '==', stockId]
    ) 
    console.log(basicInfo)
    useEffect(() => {
       
    },[stockId])
    
    return ( 
        <div className={styles['analysis-container']}>
            <Navbar className={styles.navbar}/>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                {stockData & basicInfo && (
                    <div className={styles.stockInfo}>    
                    <ul>
                        <li>{basicInfo[0].sname}{stockData[0].id}</li>
                        <li>台灣5/20收盤價</li>
                        <li>{stockData[0].Close}元</li>
                    </ul>
                    <button>+ 追蹤</button>
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