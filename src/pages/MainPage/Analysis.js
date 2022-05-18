import { Route, Routes ,Navigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import StockPrice from '../StockPricePage/StockPrice'
import PERatio from '../PERatioPage/PERatio'
import EPS from '../EPSPage/EPS'
import YoY from '../YoYPage/YoY'
import BasicInfo from '../BasicInfoPage/BasicInfo'
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import Sidebar from '../../components/sidebar/Sidebar'

// sytles
import styles from './Analysis.module.css'


const Analysis = () => {
    const { authIsReady, user } = useAuthContext()

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
                    <Routes>
                        <Route path='' element={ <StockPrice /> } />
                        <Route 
                        path='PEratio' 
                        element={ user ? <PERatio /> : <Navigate to="/login"/> } 
                        />
                        <Route
                        path='EPS' 
                        element={ user ? <EPS />  : <Navigate to="/login"/> } 
                        />
                        <Route 
                        path='YoY' 
                        element={ user ? <YoY /> : <Navigate to="/login"/> } 
                        />
                        <Route path='/basicInfo' element={ <BasicInfo /> } />
                    </Routes>
                    )}
                </div>
            </div>
            <Footer className={styles.footer}/>
        </div>
     );
}
 
export default Analysis;