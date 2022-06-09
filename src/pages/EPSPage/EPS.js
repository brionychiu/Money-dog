import { useParams, Link } from "react-router-dom"
import { useState } from 'react';
import { useCollection } from "../../hooks/useCollection"
import { motion } from 'framer-motion'

// components
import { EPSdrawSVG } from './EPSdrawSVG'
import nodataDogIcon from '../../components/img/no_data_icon.svg'
import dogBoneIcon from '../../components/img/dog_bone.png'
import loadingGif from '../../components/img/loading.gif'

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
        {Q_EPS ===null && monthPrice===null && 
            <div className={styles.ispending}>
                <img src={loadingGif} alt='loading...'/>
                <span>趕緊處理資料中</span>
                <img src={loadingGif} alt='加載中...'/>
            </div>
        }
            {Q_EPS && monthPrice ? 
            (Q_EPS.length===0 && monthPrice.length===0 ? 
                <div className={styles['nodata-container']}>
                <h2>目前尚未有資料</h2>
                {/* <img src={sorryIcon} alt='sorry'/> */}
                <div>
                    <img className={styles.dog} src={nodataDogIcon} alt='cute dog icon'/>
                    <motion.img 
                        drag
                        dragConstraints={{ left:200, top:20, right:100, bottom:200}}
                        dragElastic={2}
                    className={styles.bone}src={dogBoneIcon} alt='dog bone'/>
                </div>
                <h4>請試試以下連結喔...</h4>
                <ul className={styles.items}>
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}>
                            <Link to="/analysis/2330">台積電</Link>
                    </motion.li>   
                    <motion.li
                         whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}>
                            <Link to="/analysis/2317">鴻海</Link>
                    </motion.li>   
                    <motion.li
                         whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}>
                            <Link to="/analysis/2002">中鋼</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2308">台達電</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2603">長榮</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2303">聯電</Link>
                    </motion.li>   
                    <motion.li 
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2454">聯發科</Link>
                    </motion.li>   
                    <motion.li 
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2881">富邦金</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2409">友達</Link> 
                    </motion.li>  
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2610">華航</Link>
                    </motion.li>    
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/1605">華新</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/2354">鴻準</Link>
                    </motion.li>   
                    <motion.li  
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/3707">漢磊</Link>
                    </motion.li>   
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/4919">新唐</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            y:3,
                            boxShadow:"0px 0px 10px rgb(237,237,233)"
                        }}><Link to="/analysis/8261">富鼎</Link>
                    </motion.li>
                </ul>
            </div>:
            <EPSdrawSVG 
                Q_EPS={Q_EPS[0].EPS}
                Q_Date={Q_EPS[0].quarter}
                M_Price={monthPrice[0].monthPrice}
                M_Date={monthPrice[0].month}>
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
                        {/* <span>資料未取得，請再試試別隻股票喔</span> */}
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