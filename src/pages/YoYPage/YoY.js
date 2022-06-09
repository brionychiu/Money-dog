import { useParams } from "react-router-dom"
import { useState } from 'react'
import { useCollection } from "../../hooks/useCollection"

// components
import { YoYdrawSVG } from "./YoYdrawSVG"
import loadingGif from '../../components/img/loading.gif'
import NoDataPage from "../NoDataPage/NoDataPage"

// styles
import styles from './YoY.module.css'

const YoY = () => {
    const [show, setShow] = useState(false)
    const { stockId } = useParams()
    const { documents:longYoY } = useCollection(
        'longYoY',stockId
    ) 
    const { documents:monthPrice } = useCollection(
        'monthPrice',stockId
    ) 
    return ( 
    <div className={styles['YoY-container']}>
        {longYoY ===null && monthPrice===null && 
            <div className={styles.ispending}>
                <img src={loadingGif} alt='loading...'/>
                <span>趕緊處理資料中</span>
                <img src={loadingGif} alt='加載中...'/>
            </div>
        }
        {longYoY && monthPrice? 
            (longYoY.length===0 && monthPrice.length===0 ? 
                <NoDataPage></NoDataPage>:
            <YoYdrawSVG 
            longYoY={longYoY[0].YoY}
            M_Price={monthPrice[0].monthPrice}
            M_Date={monthPrice[0].month}>
            </YoYdrawSVG>)
        :null}
        <div className={styles['YoY-report']}>
            <ul className={styles.toggleMenu}>
                <li onClick={()=>setShow(false)}>詳細數據</li>
                <li onClick={()=>setShow(true)}>指標解釋</li>
            </ul>
            {show? null:
            <div className={styles.detail}>
                {longYoY ? (longYoY.length===0 ?
                <div></div>:
                <>
                    <ul>
                    <li>年度月份</li>
                    <li>單月營收年增率</li>
                    </ul>                        
                    <div className={styles['YoY-table']}>
                        <table>
                            <thead>
                                <tr>
                                    {longYoY[0].month.map(m =><th key={m}>{m}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {longYoY[0].YoY.map((y,index) =><td key={index}>{y}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>)
                :null}
            </div>}
            {show? 
            <div className={styles.explain}>
                <div>單月營收年增率</div>
                <strong>公式：(單月營收總和 / 去年同期單月營收總和 - 1) * 100%</strong>
                <span>由於公司業績高低容易受淡旺季影響， 因此透過和去年同期比較可避開淡旺季影響
                    ，才能看出營收真正的成長趨勢。
                    在實務經驗上，股價對於營收、獲利年增率敏感，因此是重要的觀察數據。 
                    但通常單月營收年增率的波動較大，改以多個月份營收年增率觀察趨勢更為適合。</span>
            </div>
            :null}
        </div>
    </div>
    );
}
 
export default YoY;