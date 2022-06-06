import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// components
import newestIcon from '../img/newest-1.svg'
import PEratioIcon from '../img/PEratio-2.svg'
import YoYiIcon from '../img/YoY-3.svg'
import EPSIcon from '../img/EPS-4.svg'
import infoIcon from '../img/basicInfo-5.svg'

// styles
import styles from './Sidebar.module.css'

const Sidebar = () => {
    return ( 
        <ul className={styles['sidebar-container']}>
            <motion.li
                whileHover={{ scale:1.03, originX:0 }}>
                <Link to="">
                    <img src={newestIcon} alt='最新動態'/>
                    <p>最新動態</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ scale:1.03, originX:0 }}>
                <Link to="PEratio">
                    <img src={PEratioIcon} alt='價值評估'/>
                    <p>價值評估</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ scale:1.03, originX:0 }}>
                <Link to="YoY">
                    <img src={YoYiIcon} alt='成長力分析'/>
                    <p>成長力分析</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ scale:1.03, originX:0 }}>
                <Link to="EPS">
                    <img src={EPSIcon} alt='財務報表'/>
                    <p>財務報表</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ scale:1.03, originX:0 }}>
                <Link to="basicInfo">
                    <img src={infoIcon} alt='基本資料'/>
                    <p>基本資料</p>
                </Link>
            </motion.li>
        </ul>
    );
}
    
export default Sidebar;
