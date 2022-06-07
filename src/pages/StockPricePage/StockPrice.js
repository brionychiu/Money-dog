import { useParams, Link } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection"
import { motion } from 'framer-motion'

//components
import { StockPriceSVG } from './StockPriceSVG';
// import sorryIcon from '../../components/img/sorry_icon.png'
import nodataDogIcon from '../../components/img/no_data_icon.svg'
import dogBoneIcon from '../../components/img/dog_bone.png'

// styles
import styles from './StockPrice.module.css'

const StockPrice = () => {
    const { stockId } = useParams()
    const { documents:HY_price } = useCollection(
        'HY-price',stockId
    ) 
    console.log(HY_price)
    return ( 
    <div>
        {HY_price? (
            HY_price.length===0 ? 
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
            </div>
            :
            <StockPriceSVG HY_price={HY_price[0]}></StockPriceSVG>
        ):null}
    </div> 
    );
}
 
export default StockPrice;