import { useParams, Link } from "react-router-dom"
import { useState } from 'react'
import { useCollection } from "../../hooks/useCollection"
import { motion } from 'framer-motion'

// components
import { PEdrawSVG } from './PEdrawSVG'
import nodataDogIcon from '../../components/img/no_data_icon.svg'
import dogBoneIcon from '../../components/img/dog_bone.png'
import loadingGif from '../../components/img/loading.gif'

// styles
import styles from './PERatio.module.css'

const PERatio = () => {
    const [show, setShow] = useState(false)
    const { stockId } = useParams()
    const { documents:longPEratio } = useCollection(
        'longPEratio',stockId
    ) 
    const { documents:monthPrice } = useCollection(
        'monthPrice',stockId
    ) 
    return ( 
    <div className={styles['PERatio-container']}>
        {longPEratio ===null && monthPrice===null && 
            <div className={styles.ispending}>
                <img src={loadingGif} alt='loading...'/>
                <span>趕緊處理資料中</span>
                <img src={loadingGif} alt='加載中...'/>
            </div>
        }
         {longPEratio && monthPrice ? 
            (longPEratio.length===0 && monthPrice.length===0 ? 
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
            <PEdrawSVG 
                longPEratio={longPEratio[0].PEratio}
                M_Price={monthPrice[0].monthPrice}
                M_Date={monthPrice[0].month}>
            </PEdrawSVG>)
        :null}
        <div className={styles['PERatio-report']}>
            <ul className={styles.toggleMenu}>
                <li onClick={()=>setShow(false)}>詳細數據</li>
                <li onClick={()=>setShow(true)}>指標解釋</li>
            </ul>
            {show? null:
            <div className={styles.detail}>
                {longPEratio ? (longPEratio.length===0 ?
                <div className={styles.none}>
                    <span></span>
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