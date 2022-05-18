import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import Footer from '../../components/footer/Footer'
import logoIcon from '../../components/img/logo_icon.jpg'
import searchIcon from '../../components/img/search_icon.png'
import trackingIcon from '../../components/img/tracking_icon.svg'
import Settings from '../../components/navbar/Settings';

//styles
import styles from './Home.module.css' 

const Home = () => {
    const [ stockId , setStockId ] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return ( 
        <div className={styles.container}>

            <div className={styles['homePage-1']}>
                <div className={styles.navbar}>
                    <ul className={styles.leftBar}>
                        <li><Link to="/analysis/2330">最新動態</Link></li>
                        {user ? 
                            <li><Link to="/analysis/2330/PEratio">個股分析</Link></li>
                            :<li><Link to="/login">個股分析</Link></li>
                        }
                        <li><Link to="/taiex">大盤產業</Link></li>
                    </ul>
                    {!user && (
                        <ul className={styles.loginBar}> 
                            <li className={styles.login} ><Link to="/login">登入</Link></li>
                            <li className={styles.signup} ><Link to="/signup">立即註冊</Link></li>
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
                <img className={styles.logo} src={logoIcon} alt='logo'/>
                <div className={styles.slogan}>挖掘股票價值，創造財富</div>
                <form onSubmit={handleSubmit}>
                    <input 
                        className={styles.searchBar} 
                        type='text'
                        value={stockId}
                        onChange={(e) => setStockId(e.target.value)}
                        />
                    <button className={styles.searchBtn}>
                        <img className={styles.searchImg} src={searchIcon} alt='search'/>
                    </button>
                </form>
                <div className={styles.stockItems}>
                    <span className={styles.Item}>台積電</span>
                    <span className={styles.Item}>長榮</span>
                    <span className={styles.Item}>聯發科</span>
                </div>
            </div>
            
            <div className={styles['homePage-2']}>
                <div className={styles.gif}>----gif----</div>
                <div className={styles.text_1}>即時追蹤股市資訊<br/>幫你找出最有價值的潛力股</div>
                <div className={styles.linkToStock}><Link to="/stockPrice">查看更多資訊</Link></div>
            </div>
            <div className={styles['homePage-3']}>
                <img className={styles.logo_2} src={logoIcon} alt='logo'/>
                <div className={styles.text_2}>馬上註冊招財狗，使用強大的免費功能 !</div>
                <div className={styles.linkToSignup}><Link to="/signup">馬上免費註冊</Link></div>
            </div>
            <Footer/>
        </div>
     );
}
 
export default Home;