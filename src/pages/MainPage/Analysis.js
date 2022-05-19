import { Outlet } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import Sidebar from '../../components/sidebar/Sidebar'

// sytles
import styles from './Analysis.module.css'


const Analysis = () => {
    const { authIsReady } = useAuthContext()

    return ( 
        <div className={styles['analysis-container']}>
            <Navbar className={styles.navbar}/>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <div className={styles.stockInfo}>    
                    <ul>
                        <li>台積電(2330)</li>
                        <li>台灣5/18收盤價</li>
                        <li>538.0元</li>
                    </ul>
                    <button>+ 追蹤</button>
                </div>
                <div className={styles.mainContent}>
                    {authIsReady && (
                        // 這邊要怎麼寫才會有analysis/{id}/EPS的效果
                        // 現在這樣寫只有/anayisis/EPS網址才會顯示
                    <Outlet />  
                    )}
                </div>
            </div>
            <Footer className={styles.footer}/>
        </div>
     );
}
 
export default Analysis;