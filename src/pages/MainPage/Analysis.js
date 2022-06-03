import { useState, useEffect } from "react"
import { Outlet, useParams } from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from "../../hooks/useCollection"
import { useFirestore } from "../../hooks/useFirestore"

// components
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import Sidebar from '../../components/sidebar/Sidebar'
import check from '../../components/img/check_icon.png'
// import checkGif from "../../components/img/check.gif"

// sytles
import styles from './Analysis.module.css'

const Analysis = () => {
    const [tracking, setTracking] = useState(false)
    const { authIsReady, user } = useAuthContext()
    const uid = user.uid
    const { stockId } = useParams()
    const { addDocument, deleteDocument, response } = useFirestore('trackingList')
    const { documents:trackingList } = useCollection(
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
    //console.log('open',open,'high',high,'low',low,'close',close,'change',change,'tradeValue',tradeValue,'transaction',transaction)
    
    const { documents:basicInfo } = useCollection(
        'basicInfo',
        stockId
    ) 
    const date = basicInfo? basicInfo[0].date:null
    const sname = basicInfo? basicInfo[0].sname:null
    const listed = basicInfo? basicInfo[0].listed:null

    useEffect(() => {
        if(trackingList? trackingList.length!==0:null){
            setTracking(true)
        }else{
            setTracking(false)
        }
    },[trackingList])

    const clickToTrack = async(e) => {
        e.preventDefault()
        if (date && sname && listed && open && high && low && close && change && tradeValue && transaction){
            const addlist = {
                uid,
                date,
                id:stockId,
                sname,
                listed,
                open,
                high,
                low,
                close,
                change,
                tradeValue,
                transaction
            }
            const res = addDocument(addlist)
            console.log(res)
            res.then(() => {
                console.log('success')
                setTracking(true)
            },(error) => {
                console.log(error)
                alert('加入清單失敗，請再次點擊')
            });
        }
       
    }
    const clickTounTrack = async(e) => {
        e.preventDefault()
        console.log('deleting')
        console.log(trackingList)
        console.log(trackingList.id)
        // 這裡要解bug , 要找出要的檔案來刪除(用query? where? 還是id?)
        // deleteDocument('8JMpWgj1qMmHU4pXXt6O')
        console.log('deleted')
        setTracking(false)
        console.log(response)
    }

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
                    {tracking ? 
                    <form onSubmit={clickTounTrack}>
                        <button className={styles.tracked}>
                            <img className={styles.check} src={check} alt="check add tracking list" />
                            <span>已追蹤</span>
                        </button>
                    </form>:
                    <form onSubmit={clickToTrack}>  
                        <button className={styles.untracked} type="submit">+ 追蹤</button>
                    </form>}
                    {/* <img src={checkGif} alt="check add tracking list" /> */}
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