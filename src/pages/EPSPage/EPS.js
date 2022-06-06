import { useParams, Link } from "react-router-dom"
import { useState } from 'react';
import { useCollection } from "../../hooks/useCollection";

// components
import { EPSdrawSVG } from './EPSdrawSVG'
import sorryIcon from '../../components/img/sorry_icon.png'

// styles
import styles from './EPS.module.css'

const EPS = () => {
    const [show, setShow] = useState(false)
    const { stockId } = useParams()
    const { documents:Q_EPS } = useCollection(
        'Q-EPS',stockId
    ) 
    const { documents:monthPrice } = useCollection(
        'monthPrice',stockId
    ) 
    console.log(monthPrice)
    return ( 
        <div className={styles['EPS-container']}>
             {Q_EPS && monthPrice ? 
            (Q_EPS.length===0 && monthPrice.length===0 ? 
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
            <EPSdrawSVG 
                Q_EPS={Q_EPS[0].EPS}
                M_Price={monthPrice[0].monthPrice}>
            </EPSdrawSVG>)
        :null}
            <div className={styles['EPS-report']}>
                <ul className={styles.toggleMenu}>
                    <li onClick={()=>setShow(false)}>詳細數據</li>
                    <li onClick={()=>setShow(true)}>指標解釋</li>
                </ul>
                {show? null:
                <div className={styles.detail}>
                    {Q_EPS ? (Q_EPS.length===0 ?
                    <div className={styles.none}>
                        <span>資料未取得，請再試試別隻股票喔</span>
                    </div>:
                    <>
                        <ul>
                            <li>年度/季度</li>
                            <li>單季EPS</li>
                        </ul>                        
                        <div className={styles['EPS-table']}>
                            <table>
                                <thead>
                                    <tr>
                                        {Q_EPS[0].quarter.map(q =><th key={q}>{q}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {Q_EPS[0].EPS.map((e,index) =><td key={index}>{e}</td>)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>)
                    :null}    
                </div>}
                {show? 
                <div className={styles.explain}>
                    <div>單季EPS</div>
                    <strong>公式：單季EPS = 單季稅後淨利 / 已發行股數</strong>
                    <span>代表著每單位資本額的獲利能力，越高每單資本額報酬率越高。 
                        EPS著重長期趨勢的觀察，股價對於EPS複合年成長率更為敏感； 
                        通常EPS複合年成長率高的公司，享有的股價/本益比也越高。</span>
                </div>
                :null}
            </div>
        </div> 
    );
}
 
export default EPS;