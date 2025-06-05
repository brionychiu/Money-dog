import { useState, useEffect } from "react"
import { Outlet, useParams, Navigate } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from "../../hooks/useCollection"
import { useTrackingList } from "../../hooks/useTrackingList"
import { useFirestore } from "../../hooks/useFirestore"
import { motion } from 'framer-motion'

// components
import Navbar from "../../components/layout/Navbar"
import Footer from '../../components/layout/Footer'
import Sidebar from '../../components/sidebar/Sidebar'
import check from '../../assets/check_icon.png'
import loadingGif from '../../assets/loading.gif'

// sytles
import styles from './Analysis.module.css'

const Analysis = () => {
    const [tracking, setTracking] = useState(false)
    const { authIsReady, user } = useAuthContext()
    const uid = user?  user.uid: <Navigate to="/login"/> 
    const { stockId } = useParams()
    const { addDocument, cancelTracking } = useFirestore('trackingList')
    const { documents:trackingList } = useTrackingList(
        'trackingList',
        uid,stockId
    ) 
    const { documents:stockData } = useCollection(
        'dailyPrice',
        stockId
    ) 
    const open = stockData? stockData[0].Open: null
    const high = stockData? stockData[0].High: null
    const low = stockData? stockData[0].Low: null
    const close = stockData? stockData[0].Close: null
    const change = stockData? stockData[0].Change: null
    const tradeValue = stockData? stockData[0].TradeValue: null
    const transaction = stockData? stockData[0].Transaction: null
    
    const { documents:basicInfo } = useCollection(
        'basicInfo',
        stockId
    ) 
    const date = basicInfo? basicInfo[0].date:null
    const sname = basicInfo? basicInfo[0].sname:null
    const listed = basicInfo? basicInfo[0].listed:null

    useEffect(() => {
        if(trackingList&& trackingList.length!==0){
            setTracking(true)
        }else if(trackingList&& trackingList.length===0){
            setTracking(false)
        }
    },[trackingList])

    const clickToTrack = async(e) => {
        e.preventDefault()
        if (date && sname && listed && open && high && low && close && change && tradeValue && transaction){
            const addlist = ({
                uid,
                date,
                'stockId':stockId,
                sname,
                listed,
                open,
                high,
                low,
                close,
                change,
                tradeValue,
                transaction
            })
            const res = addDocument(addlist)
            res.then(() => {
                setTracking(true)
            },(error) => {
                alert('加入清單失敗，請再次點擊')
            });
        }
       
    }
    const clickTounTrack = async(e) => {
        e.preventDefault()
        cancelTracking(uid,stockId)
        setTracking(false)
    }

    return ( 
        <div className={styles['analysis-container']}>
            <Navbar className={styles.navbar}/>
            <div className={styles.wrapper}>
                <Sidebar />
                {stockData && basicInfo && (
                    <div className={styles.stockInfo}>    
                        <ul>
                            <li>{basicInfo[0].sname}{stockData[0].id}</li>
                            <li className={styles.dateli}>台灣{basicInfo[0].date.slice(3,5)}/{basicInfo[0].date.slice(5,8)}收盤價</li>
                            <li>{stockData[0].Close}元</li>
                            <li className={styles.rwdli}>台灣{basicInfo[0].date.slice(3,5)}/{basicInfo[0].date.slice(5,8)}收盤價</li>
                        </ul>
                {tracking ? 
                <motion.form 
                    whileHover={{ scale:1.02 }} 
                    onSubmit={clickTounTrack}>
                    <button className={styles.tracked}>
                        <motion.img 
                            initial={{ scale: 0.1}}
                            animate={{ scale: 1}}
                            className={styles.check} 
                            src={check} 
                            alt="check add tracking list" />
                        <span>已追蹤</span>
                    </button>
                </motion.form>:
                <motion.form 
                    whileHover={{ scale:1.02 }}
                    onSubmit={clickToTrack}>  
                    <button className={styles.untracked} type="submit">+ 追蹤</button>
                </motion.form>}
                       
            </div>
            )}
                <div className={styles.mainContent}>
                    {authIsReady && (
                    <Outlet />  
                    )}
                    {!basicInfo && (
                    <div className={styles.ispending}>
                        <img src={loadingGif} alt='loading...'/>
                        <span>趕緊處理資料中</span>
                        <img src={loadingGif} alt='加載中...'/>
                    </div>
                )}
                </div>
            </div>
            <Footer className={styles.footer}/>
        </div>
     );
}
 
export default Analysis;