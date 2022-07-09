import { useState } from 'react'
import { useTrackingList } from '../../hooks/useTrackingList'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import rightArrow from '../../assets/right_arrow_icon.png'
import dollarIcon from '../../assets/dollar_icon.png'
import dollarGif from '../../assets/dollar_hover.gif'
import loadingGif from '../../assets/loading.gif'

// styles
import styles from './TrackingList.module.css'

const TrackingList = () => {
    const [hoverGif, setHoverGif] = useState(false)
    const [daily, setDaily] = useState(true)
    const { user } = useAuthContext()
    const uid = user?  user.uid: <Navigate to="/login"/> 
    const { deleteDocument } = useFirestore('trackingList')
    const { documents:trackingList, error} = useTrackingList(
        'trackingList',
        uid
    )
    let priceChange = (trackingList) => {
        const change = []
        const changePercetage = []
        const changeColor = []
        let changeNum, perNum, millNum
        if(trackingList.length!==0){
            for(let i = 0 ; i < trackingList.length; i++){
                changeNum = trackingList[i].change
                changeNum = Number(changeNum)
                if(changeNum<0){
                    // green
                    changeColor.push('#008000')
                }else{
                    changeColor.push('#C8280B')
                }
                changeNum = changeNum.toFixed(1)
                change.push(changeNum)
                perNum = Number(trackingList[i].change)/Number(trackingList[i].close)*100
                perNum = perNum.toFixed(1)
                changePercetage.push(perNum)
            } 
            // 把成交金額轉為百萬單位
            if(trackingList!==[]){
                millNum = Number(trackingList[0].tradeValue)/1000000
                millNum = millNum.toFixed(1)
                return {change,changePercetage,millNum,changeColor}
            }
        }else{
            return null
        }
    }

    const change = trackingList&&(trackingList.length===0?null:priceChange(trackingList).change)
    const changePercetage = trackingList&&(trackingList.length===0?null:priceChange(trackingList).changePercetage)
    const millNum = trackingList&&(trackingList.length===0?null:priceChange(trackingList).millNum)
    const changeColor = trackingList&&(trackingList.length===0?null:priceChange(trackingList).changeColor)

    return ( 
    <div className={styles['trackingList-container']}>
        <Navbar />
        <div className={styles['root-content']}>
            <div className={styles['main-content']}>
                {!trackingList  && (
                    <div className={styles.ispending}>
                        <img src={loadingGif} alt='loading...'/>
                        <span>趕緊處理資料中</span>
                        <img src={loadingGif} alt='加載中...'/>
                    </div>
                )}
                {trackingList && (
                    <div className={styles['left-box']}>
                        <ul className={styles.category}>
                            {/* 待解決:要把頁面選取做fix color */}
                                <li onClick={()=>setDaily(true)}>今日動態</li>
                                <li onClick={()=>setDaily(false)}>成交資訊</li>
                        </ul>
                        {trackingList.length===0 ? (
                            <div></div>
                        ):(<>
                                <ul className={styles.stockid}>
                                {trackingList.map((item,index) => (
                                    <li key={index}>{item.stockId}</li>
                                ))}
                                </ul>
                                {daily? 
                                    <div className={styles.daily}>
                                        {trackingList.map((item,index) => (
                                            <ul key={index}>
                                                <motion.li whileHover={{ y:-2 }}>
                                                    <Link to={{pathname:`/analysis/${item.stockId}/basicInfo`}}>
                                                        {item.stockId} {item.sname}
                                                    </Link>
                                                </motion.li>
                                                <li>開盤價：<span>{item.open}元</span></li>
                                                <li>收盤價：<span>{item.close}元</span></li>
                                                <li>最高價：<span>{item.high}元</span></li>
                                                <li>最低價：<span>{item.low}元</span></li>
                                            </ul>
                                        ))}
                                    </div>
                                    :
                                    <div className={styles.daily}>
                                        {trackingList.map((item,index) => (
                                        <ul key={index}>
                                            <motion.li 
                                                whileHover={{ y:-2 }}><Link 
                                                to={{pathname:`/analysis/${item.stockId}/basicInfo`}}>
                                                    {item.stockId} {item.sname}
                                                </Link></motion.li>
                                            <li>成交金額：<span>{millNum}百萬</span></li>
                                            <li>成交筆數：<span>{item.transaction}筆</span></li>
                                        </ul>
                                        ))}
                                    </div>}
                            </>)}
                    </div>
                )}
                {trackingList && (
                    <div className={styles['right-box']}>
                        <div className={styles.togglemenu}>
                            <img className={styles.arrow} src={rightArrow} alt='read more'/>
                            <span>我的股票追蹤清單<span className={styles.fontsize}>(今日收盤、今日漲跌)</span></span>
                        </div>
                        {trackingList.length===0?(
                            <div></div>
                        ):(
                        <ul className={styles['stock-list']}>
                            {error && <p>{error}</p>}
                            {trackingList.map((item,index) => (
                                    <li className={styles['stock-item']} key={item.id}
                                    onMouseOver={()=>setHoverGif(true)}
                                    onMouseOut={()=>setHoverGif(false)}>
                                        {hoverGif? <img src={dollarGif} alt='dollar icon hover'/>
                                        :<img src={dollarIcon} alt='dollar icon'/>}
                                        <Link to={{pathname:`/analysis/${item.stockId}/basicInfo`}}>{item.stockId} {item.sname}</Link>
                                        <p>{item.close}</p>
                                        <p style={{ color:changeColor[index]}}>{change[index]}</p>
                                        <p style={{ color:changeColor[index]}}>{changePercetage[index]}%</p>
                                        {/* green */}
                                       
                                        <button onClick={() => deleteDocument(item.id)}>x</button>
                                    </li>
                                ))}
                        </ul>
                        )}
                        
                    </div>)
                }
            </div>
        </div>
        <Footer />
    </div> );
}
 
export default TrackingList;