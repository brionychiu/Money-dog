import { motion } from 'framer-motion'
import { Link } from "react-router-dom"

// components
import nodataDogIcon from '../../components/img/no_data_icon.svg'
import dogBoneIcon from '../../components/img/dog_bone.png'

// styles
import styles from './NoDataPage.module.css'


const NoDataPage = () => {
    return ( 
        <div className={styles['nodata-container']}>
            <h2>目前尚未有資料</h2>
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
                    <li>
                    <Link to="/analysis/2330">台積電</Link>
                    </li>   
                    <li
                         >
                            <Link to="/analysis/2317">鴻海</Link>
                    </li>   
                    <li
                         >
                            <Link to="/analysis/2002">中鋼</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/2308">台達電</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/2603">長榮</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/2303">聯電</Link>
                    </li>   
                    <li 
                        ><Link to="/analysis/2454">聯發科</Link>
                    </li>   
                    <li 
                        ><Link to="/analysis/2881">富邦金</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/2409">友達</Link> 
                    </li>  
                    <li
                        ><Link to="/analysis/2610">華航</Link>
                    </li>    
                    <li
                        ><Link to="/analysis/1605">華新</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/2354">鴻準</Link>
                    </li>   
                    <li  
                        ><Link to="/analysis/3707">漢磊</Link>
                    </li>   
                    <li
                        ><Link to="/analysis/4919">新唐</Link>
                    </li>
                    <li
                        ><Link to="/analysis/8261">富鼎</Link>
                    </li>
                </ul>
        </div>
     );
}
 
export default NoDataPage;