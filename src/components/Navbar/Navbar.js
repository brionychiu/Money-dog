import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

// components
import logoIcon from '../img/logo_icon.jpg'
import trackingIcon from '../img/tracking_icon.png'
import hoverTrackingIcon from '../img/tracking_icon_blue.png'
import searchIcon from '../img/search_icon.png'
import logoutIcon from '../img/logout_icon.png'
import logoutIconHover from '../img/logout_icon_blue.png'

// styles
import styles from './Navbar.module.css'

const Navbar = () => {
    const { user } = useAuthContext()
    const [ stockName , setStockName ] = useState('')
    const [ tracking , setTracking ] = useState(false)
    const navigate = useNavigate() 
    const { logout } = useLogout()  

    const handleSubmit = (e) => {
        e.preventDefault()
        // 找網址去篩字串-->做前一頁
        navigate(`/analysis/${stockName}/basicInfo`)
        setStockName('')
    }
    return ( 
        <div className={styles.navbar}>
            <div className={styles['navi-wrapper']}>
                <ul className={styles.leftBar}>
                    <li><Link to="/"><img className={styles.logo} src={logoIcon} alt='logo'/></Link></li> 
                    <li><Link to="/analysis/2330">最新動態</Link></li> 
                    <li><Link to="/analysis/2330/PEratio">個股分析</Link></li>
                    <li><Link to="/taiex">大盤產業</Link></li>
                </ul>
                {user && (
                    <form className={styles.searchBar} onSubmit={handleSubmit}>
                        <input
                            className={styles.searchInput} 
                            type='text' 
                            value={stockName}
                            onChange={(e) => setStockName(e.target.value)}
                        />
                        <button>
                            <img className={styles.searchIcon}  src={searchIcon} alt='search'/>
                        </button>
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
                        <li className={styles.tracking}
                            onMouseOver={()=>setTracking(true)}
                            onMouseOut={()=>setTracking(false)}
                            >
                            <Link to="/trckingList">
                                {tracking? <img className={styles.trackingIcon} src={hoverTrackingIcon} alt='logo'/>
                                :<img className={styles.trackingIcon} src={trackingIcon} alt='logo'/>}
                                <span>我的追蹤</span>
                            </Link>
                        </li>
                        <li className={styles.logout}>
                            <img 
                                src={logoutIcon} 
                                alt='settings'
                                onClick={logout}
                                onMouseOver={e => e.currentTarget.src = logoutIconHover}
                                onMouseOut={e => e.currentTarget.src = logoutIcon}/>
                        </li>
                    </ul>
                )}
            </div>
        </div>
     );
}
 
export default Navbar;