import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useCollection } from "../../hooks/useCollection";

// components
import { EPSdrawSVG } from '../../components/SVG/EPSdrawSVG'
// styles
import styles from './EPS.module.css'

const EPS = () => {
    const [show, setShow] = useState(false)
    const { stockId } = useParams()
    const { documents:Q_EPS } = useCollection(
        'Q-EPS',stockId
    ) 
    return ( 
        <div className={styles['EPS-container']}>
            <EPSdrawSVG className={styles['EPS-SVG']}></EPSdrawSVG>
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