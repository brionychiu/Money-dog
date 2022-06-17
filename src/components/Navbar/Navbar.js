import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { useCollection } from '../../hooks/useCollection'
import { motion } from 'framer-motion'

// components
import logoIcon from '../img/logo_icon.jpg'
import trackingIcon from '../img/tracking_icon.png'
import hoverTrackingIcon from '../img/tracking_icon_blue.png'
import searchIcon from '../img/search_icon.png'
import logoutIcon from '../img/logout_icon.png'
import logoutIconHover from '../img/logout_icon_blue.png'
import menuIcon from '../img/menu_icon_blue.png'
import menuIconHover from '../img/menu_icon_blue.png'
import crossIcon from '../img/cross_icon_blue.png'

// styles
import styles from './Navbar.module.css'

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate() 
    const {authIsReady, user } = useAuthContext()
    const { logout } = useLogout()  
    const { documents:stockInfo } = useCollection('basicInfo')
    const [stockName, setStockName] = useState('')
    const [stockId, setStockId] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [tracking, setTracking] = useState(false)
    const [menu, setMenu] = useState(false)

    const handleFilter = (e) => {
        let searchWord = e.target.value
        setStockName(searchWord)
        let newFilter
        let filterId
        const searchId = Number(searchWord)
        if(searchId){
            newFilter = stockInfo.filter((stock) => {
                return stock.id.includes(searchWord)
            })
            filterId = newFilter[0].id
            
        }else if(typeof(searchWord)==='string'){
            newFilter = stockInfo.filter((stock) => {
                return stock.sname.includes(searchWord)
            })
            filterId = newFilter[0].id
        }
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
        setStockId(filterId)
    }
    const clearInput = () => {
        setFilteredData([])
        setStockName('')
        }
    //用location找前一頁
    const sidebarLink = location.pathname.split('/')
    const handleSubmit = (e) => {
        e.preventDefault()
        clearInput()
        // 找網址去篩字串-->做前一頁(ok!)
        if(sidebarLink[3]===undefined){
            navigate(`/analysis/${stockId}/`)
        }else{
            navigate(`/analysis/${stockId}/${sidebarLink[3]}`)
        }   
    }
    const handleClick = () => {
        clearInput()
        navigate(`/analysis/${stockId}/basicInfo`)
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
                            type='search' 
                            value={stockName}
                            onChange={handleFilter}
                            placeholder="輸入台股名稱/代號"
                        />
                        <button>
                            <img className={styles.searchIcon}  src={searchIcon} alt='search'/>
                        </button>
                        {user && filteredData.length !== 0 && (
                        <div className={styles['search-data-box']}>
                            <ul>
                                <li>查詢個股</li>
                            {filteredData.slice(0, 5).map((data,index) => {
                                return (
                                    <li key={index} 
                                        className={styles.searchitem} 
                                        onClick={handleClick}>
                                        <span>{data.id}</span>
                                        <span>{data.sname}</span>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    )}
                    </form> 
                )}
               
                {authIsReady&&!user && (
                    <ul className={styles.loginBar}>
                        <li className={styles.login}><Link to="/login">登入</Link></li>
                        <li className={styles.signup}><Link to="/signup">立即註冊</Link></li>
                    </ul>
                )}
                {authIsReady&&user && (
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
            <div className={styles['menu-wrapper']}>
                    <img src={menuIcon} alt='menu'onClick={()=>setMenu(true)}
                        onMouseOver={e => e.currentTarget.src = menuIconHover}
                        onMouseOut={e => e.currentTarget.src = menuIcon}/>
                    {user && (
                    <form className={styles.searchBar} onSubmit={handleSubmit}>
                        <input
                            className={styles.searchInput} 
                            type='search' 
                            value={stockName}
                            onChange={handleFilter}
                            placeholder="輸入台股名稱/代號"
                        />
                        <button>
                            <img className={styles.searchIcon}  src={searchIcon} alt='search'/>
                        </button>
                        {user && filteredData.length !== 0 && (
                        <div className={styles['search-data-box']}>
                            <ul>
                                <li>查詢個股</li>
                            {filteredData.slice(0, 5).map((data,index) => {
                                return (
                                    <li key={index} 
                                        className={styles.searchitem} 
                                        onClick={handleClick}>
                                        <span>{data.id}</span>
                                        <span>{data.sname}</span>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                    )}
                    </form> 
                )}
                    {menu &&(
                        <div className={styles['menu-box']}>
                            <motion.img className={styles.cross}
                                initial={{ x: "-100vw"}}
                                animate={{ x: 0}}
                                transition={{ duration:0.6 }}
                                onClick={()=>setMenu(false)}
                                src={crossIcon} alt='cross'></motion.img>
                            <motion.ul className={styles['menu-detail']}
                                initial={{ x: "-100vw"}}
                                animate={{ x: 0}}
                                transition={{ duration:0.6 }}>
                                {user && (
                                    <li ><Link to="/trckingList">我的追蹤</Link></li>  
                                )}
                                <li><Link to="/">招財狗首頁</Link></li>
                                {user?(
                                    <>
                                        <li><Link to="/analysis/2330">最新動態</Link></li>
                                        <li><Link to="/analysis/2330/PEratio">個股分析</Link></li>
                                    </>
                                ):(
                                    <>
                                    <li><Link to="/login">最新動態</Link></li>
                                    <li><Link to="/login">個股分析</Link></li>
                                </>
                                )}
                                <li><Link to="/taiex">大盤產業</Link></li>
                                {!user && (
                                    <>
                                        <li><Link to="/login">登入</Link></li>
                                        <li ><Link to="/signup">立即註冊</Link></li>
                                    </>
                                )}
                                {user && (
                                    <li onClick={logout}><Link to="/signup">登出</Link></li>
                                )}
                            </motion.ul>
                        </div>
                    )}
            </div>
           
        </div>
     );
}
 
export default Navbar;