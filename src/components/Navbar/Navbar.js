import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import Settings from './Settings'
import logoIcon from '../Img/logo_icon.jpg'
import trackingIcon from '../Img/tracking_icon.svg'
import searchIcon from '../Img/search_icon.png'

// styles
import styles from './Navbar.module.css'

const Navbar = () => {
    const { user } = useAuthContext()
    const [ stockNumber , setStockNumber ] = useState('')
    return ( 
        <div className={styles.navbar}>
            <div className={styles['navi-wrapper']}>
                <ul className={styles.leftBar}>
                    <li><Link to="/"><img className={styles.logo} src={logoIcon} alt='logo'/></Link></li> 
                    <li><Link to="/stockPrice">每日動態</Link></li> 
                    <li><Link to="/PEratio">個股分析</Link></li>
                    <li><Link to="/stockIndex">大盤產業</Link></li>
                </ul>
                {user && (
                    <form className={styles.searchBar}>
                        <input  
                            className={styles.searchInput} 
                            type="search" 
                            value={stockNumber}
                            onChange={(e) => setStockNumber(e.target.value)}
                        />
                        <img className={styles.searchIcon}  src={searchIcon} alt='search'/>
                    </form>
                    
                )}
                {!user && (
                    <ul className={styles.loginBar}>
                        <li className={styles.login}><Link to="/login">登入</Link></li>
                        <li className={styles.signup}><Link to="/signup">立即註冊</Link></li>
                    </ul>
                )}
                {user && (
                    <ul className={styles.rightBar}>
                        <li>
                            <Link to="/trckingList">
                                <img className={styles.trackingIcon} src={trackingIcon} alt='logo'/>
                                我的追蹤
                            </Link>
                        </li>
                        <li><Settings /></li>
                    </ul>
                )}
            </div>
        </div>
     );
}
 
export default Navbar;