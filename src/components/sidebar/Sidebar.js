import { Link } from 'react-router-dom';

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
            <li>
                <Link to="">
                    <img src={newestIcon} alt='紅喇叭'/>
                    <p>最新動態</p>
                </Link>
            </li>
            <li>
                <Link to="PEratio">
                    <img src={PEratioIcon} alt='藍天平'/>
                    <p>價值評估</p>
                </Link>
            </li>
            <li>
                <Link to="YoY">
                    <img src={YoYiIcon} alt='橘格子'/>
                    <p>成長力分析</p>
                </Link>
            </li>
            <li>
                <Link to="EPS">
                    <img src={EPSIcon} alt='綠文件'/>
                    <p>財務報表</p>
                </Link>
            </li>
            <li>
                <Link to="basicInfo">
                    <img src={infoIcon} alt='紫基本資料'/>
                    <p>基本資料</p>
                </Link>
            </li>
        </ul>
    );
}
    
export default Sidebar;
