import { useParams, Link } from "react-router-dom"
import { useState } from 'react'
import { useCollection } from "../../hooks/useCollection"

// components
import { YoYdrawSVG } from "./YoYdrawSVG"
import sorryIcon from '../../components/img/sorry_icon.png'

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
        {longYoY && monthPrice? 
            (longYoY.length===0 && monthPrice.length===0 ? 
            <div className={styles.nodata}>
                <div>目前尚未有資料</div>
                <img src={sorryIcon} alt='sorry'/>
                <div>請試試以下連結喔!</div>
                <div>
                <Link to="/analysis/2330">台積電</Link>   
                <Link to="/analysis/2317">鴻海</Link>   
                <Link to="/analysis/2002">中鋼</Link>   
                <Link to="/analysis/2308">台達電</Link>   
                <Link to="/analysis/2603">長榮</Link>   
                <Link to="/analysis/2303">聯電</Link>   
                <Link to="/analysis/2454">聯發科</Link>   
                <Link to="/analysis/2881">富邦金</Link>   
                <Link to="/analysis/2409">友達</Link>   
                <Link to="/analysis/2610">華航</Link>    
                <Link to="/analysis/1605">華新</Link>   
                <Link to="/analysis/2354">鴻準</Link>   
                <Link to="/analysis/3707">漢磊</Link>   
                <Link to="/analysis/4919">新唐</Link>
                <Link to="/analysis/8261">富鼎</Link>
                </div>
            </div>:
            <YoYdrawSVG 
            longYoY={longYoY[0].YoY}
            M_Price={monthPrice[0].monthPrice}>
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
                <div className={styles.none}>
                    <span>資料未取得，請再試試別隻股票喔</span>
                </div>:
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