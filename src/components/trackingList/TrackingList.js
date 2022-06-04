import { useState } from 'react'
import { useTrackingList } from '../../hooks/useTrackingList'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { Link } from 'react-router-dom'

// components
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import rightArrow from '../img/right_arrow_icon.png'
import dollarIcon from '../img/dollar_icon.png'
import dollarGif from '../img/dollar_hover.gif'


// import blueRightArrow from '../img/right_arrow_icon_blue.png'

// styles
import styles from './TrackingList.module.css'

const TrackingList = () => {
    const [hoverGif, setHoverGif] = useState(false)
    const [daily, setDaily] = useState(true)
    // 待解決:設定最後的+/-是紅色還是綠色
    // const [color, setColor] = useState(false)
    const { user } = useAuthContext()
    const uid = user.uid
    const { deleteDocument , response } = useFirestore('trackingList')

    const { documents:trackingList, error, isPending} = useTrackingList(
        'trackingList',
        uid
    )
    console.log(trackingList)
    let priceChange = (trackingList) => {
        const change = []
        const changePercetage = []
        // const tradeMill =[]
        let changeNum, perNum, millNum
        for(let i = 0 ; i < trackingList.length; i++){
            changeNum = trackingList[i].change
            changeNum = Number(changeNum)
            changeNum = changeNum.toFixed(1)
            change.push(changeNum)
            perNum = Number(trackingList[i].change)/Number(trackingList[i].close)*100
            perNum = perNum.toFixed(1)
            changePercetage.push(perNum)
            // 待解決:把金額縮小至百萬  
            // millNum = trackingList[i][-1:-6]
        }
        return {change,changePercetage}
    }
    const change = trackingList? priceChange(trackingList).change:isPending
    const changePercetage = trackingList? priceChange(trackingList).changePercetage:isPending
    

    return ( 
    <div className={styles['trackingList-container']}>
        <Navbar />
        <div className={styles['root-content']}>
            <div className={styles['main-content']}>
                {isPending && (<div>加載中...</div>)}
                {trackingList && (
                    <div className={styles['left-box']}>
                        <ul className={styles.category}>
                            {/* 待做:要把頁面選取做fix color */}
                            <li onClick={()=>setDaily(true)}>今日動態</li>
                            <li onClick={()=>setDaily(false)}>成交資訊</li>
                        </ul>
                        <ul className={styles.stockid}>
                        {trackingList.map((item,index) => (
                            <li key={index}>{item.id}</li>
                        ))}
                        </ul>
                        {daily? 
                        <div className={styles.daily}>
                            {trackingList.map((item,index) => (
                                <ul key={index}>
                                    <li><Link to={{pathname:`/analysis/${item.id}/basicInfo`}}>{item.id} {item.sname}</Link></li>
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
                                <li><Link to={{pathname:`/analysis/${item.id}/basicInfo`}}>{item.id} {item.sname}</Link></li>
                                <li>成交金額：<span>{item.tradeValue}元</span></li>
                                <li>成交筆數：<span>{item.transaction}筆</span></li>
                            </ul>
                        ))}
                    </div>}
                    </div>
                )}
                {trackingList && (
                    <div className={styles['right-box']}>
                        <div className={styles.togglemenu}>
                            <img className={styles.arrow} src={rightArrow} alt='read more'/>
                            <span>我的股票追蹤清單</span>
                        </div>
                        <ul className={styles['stock-list']}>
                            {error && <p>{error}</p>}
                            {trackingList.map((item,index) => (
                                    <li className={styles['stock-item']} key={item.id}
                                    onMouseOver={()=>setHoverGif(true)}
                                    onMouseOut={()=>setHoverGif(false)}>
                                        {hoverGif? <img src={dollarGif} alt='dollar icon hover'/>
                                        :<img src={dollarIcon} alt='dollar icon'/>}
                                        <Link to={{pathname:`/analysis/${item.id}/basicInfo`}}>{item.id} {item.sname}</Link>
                                        <p>{item.close}</p>
                                        <p>{change[index]}</p>
                                        <p>{changePercetage[index]}%</p>
                                        <button onClick={() => deleteDocument(item)}>x</button>
                                    </li>
                                ))}
                        </ul>
                    </div>)
                }
            </div>
        </div>
        <Footer />
    </div> );
}
 
export default TrackingList;