import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// components
import newestIcon from '../../assets/newest-1.svg'
import PEratioIcon from '../../assets/PEratio-2.svg'
import YoYiIcon from '../../assets/YoY-3.svg'
import EPSIcon from '../../assets/EPS-4.svg'
import infoIcon from '../../assets/basicInfo-5.svg'

// styles
import styles from './Sidebar.module.css'

const Sidebar = () => {
    return ( 
        <ul className={styles['sidebar-container']}>
            <motion.li
                whileHover={{ y:5 }}>
                <Link to="">
                    <img src={newestIcon} alt='最新動態'/>
                    <p>最新動態</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ y:5 }}>
                <Link to="PEratio">
                    <img src={PEratioIcon} alt='價值評估'/>
                    <p>價值評估</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ y:5 }}>
                <Link to="YoY">
                    <img src={YoYiIcon} alt='成長力分析'/>
                    <p>成長力分析</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ y:5 }}>
                <Link to="EPS">
                    <img src={EPSIcon} alt='財務報表'/>
                    <p>財務報表</p>
                </Link>
            </motion.li>
            <motion.li
                whileHover={{ y:5 }}>
                <Link to="basicInfo">
                    <img src={infoIcon} alt='基本資料'/>
                    <p>基本資料</p>
                </Link>
            </motion.li>
        </ul>
    );
}
    
export default Sidebar;
