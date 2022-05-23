import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import Settings from './Settings'
import logoIcon from '../img/logo_icon.jpg'
import trackingIcon from '../img/tracking_icon.svg'
import searchIcon from '../img/search_icon.png'

// styles
import styles from './Navbar.module.css'

const Navbar = () => {
    const { user } = useAuthContext()
    const [ stockName , setStockName ] = useState('')
    const navigate = useNavigate()   

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/analysis/${stockName}`)
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