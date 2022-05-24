import { useParams } from "react-router-dom"
import { useState } from 'react';
import { useCollection } from "../../hooks/useCollection";
// styles
import styles from './PERatio.module.css'

const PERatio = () => {
    const [show, setShow] = useState(false)
    const { stockId } = useParams()
    const { documents:longPEratio } = useCollection(
        'longPEratio',stockId
    ) 
    return ( 
    <div className={styles['PERatio-container']}>
        <div className={styles['PERatio-SVG']}>每月本益比折線圖</div>
        <div className={styles['PERatio-report']}>
            <ul className={styles.toggleMenu}>
                <li onClick={()=>setShow(false)}>詳細數據</li>
                <li onClick={()=>setShow(true)}>指標解釋</li>
            </ul>
            {show? null:
            <div className={styles.detail}>
                {longPEratio ? (longPEratio.length===0 ?
                <div className={styles.none}>
                    <span>資料未取得，請再試試別隻股票喔</span>
                </div>:
                <>
                    <ul>
                    <li>年度月份</li>
                    <li>本益比(倍)</li>
                    </ul>                        
                    <div className={styles['PE-table']}>
                        <table>
                            <thead>
                                <tr>
                                    {longPEratio[0].month.map(m =><th key={m}>{m}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {longPEratio[0].PEratio.map((p,index) =><td key={index}>{p}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>)
                :null}
            </div>}
            {show? 
            <div className={styles.explain}>
                <div>每月本益比</div>
                <strong>公式：本益比 = 月均價 / 近4季EPS總和</strong>
                <span>本益比衡量：股價相對於EPS獲利的高低。 
                    本益比越高，代表股價越不便宜，潛在報酬率越低； 
                    本益比越低，代表股價越便宜，潛在報酬率越高。 
                    當產業或個股獲利成長性越高，市場願意給予的本益比也越高， 
                    因此本益比應配合產業、獲利成長性做觀察。</span>
            </div>
            :null}
        </div>
    </div> 
    );
}
 
export default PERatio;