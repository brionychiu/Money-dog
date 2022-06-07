import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { useCollection } from '../../hooks/useCollection';
import { motion } from 'framer-motion'

// components
import Footer from '../../components/footer/Footer'
import logoIcon from '../../components/img/logo_icon.jpg'
import searchIcon from '../../components/img/search_icon.png'
import trackingIcon from '../../components/img/tracking_icon.png'
import AutoSlider from '../../components/autoSlider/AutoSlider'
import HomeSVG from './HomeSVG'

//styles
import styles from './Home.module.css' 

const Home = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { documents:stockInfo } = useCollection('basicInfo')
    const [ stockId , setStockId ] = useState('')
    const [stockName, setStockName] = useState('')
    const [filteredData, setFilteredData] = useState([])

    
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

    const handleSubmit = (e) => {
        e.preventDefault()
        clearInput()
        // 找網址去篩字串-->做前一頁
        navigate(`/analysis/${stockId}`)
    }
    const handleClick = () => {
        clearInput()
        // 找網址去篩字串-->做前一頁
        navigate(`/analysis/${stockId}`)
    }
    console.log('filteredData',filteredData)
    return ( 
        <div className={styles.container}>
            <motion.div 
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                // transition={{ delay:1.5,duration:5 }}
                className={styles['homePage-1']}>
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
                            <li onClick={logout} className={styles.logout}>登出</li>
                    </ul>
                    )}
                </div>
                <motion.img 
                    initial={{ y:60 }}
                    animate={{ y:0 }} 
                    className={styles.logo} src={logoIcon} alt='logo'/>
                <motion.div animate={{ y:-60 }} className={styles.slogan}>
                    挖掘股票價值，創造超額報酬
                </motion.div>
                <motion.form animate={{ y:-60 }} onSubmit={handleSubmit}>
                    <input 
                        className={styles.searchBar} 
                        type='search'
                        value={stockName}
                        onChange={handleFilter}
                        placeholder="輸入台股名稱/代號"
                        />
                    <motion.button 
                        whileHover={{ scale:1.02 }}
                        className={styles.searchBtn}>
                        <img className={styles.searchImg} src={searchIcon} alt='search'/>
                    </motion.button>
                </motion.form>
                {filteredData.length !== 0 && (
                    <div className={styles['search-data-box']}>
                        <ul>
                            <li>查詢個股</li>
                        {filteredData.slice(0,5).map((data) => {
                             return (
                                 <li key={data.id} 
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
                <motion.ul animate={{ y:-60 }} className={styles.stockItems}>
                    <motion.li
                        whileHover={{
                            scale:1.1,
                            textShadow:"0px 0px 4px rgb(255,255,255)",
                            boxShadow:"0px 0px 4px rgb(255,255,255)"
                        }}>
                        <Link to="/analysis/2330">台積電</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale:1.1,
                            textShadow:"0px 0px 4px rgb(255,255,255)",
                            boxShadow:"0px 0px 4px rgb(255,255,255)"
                        }}>
                        <Link to="/analysis/2317">鴻海</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale:1.1,
                            textShadow:"0px 0px 4px rgb(255,255,255)",
                            boxShadow:"0px 0px 4px rgb(255,255,255)"
                        }}>
                        <Link to="/analysis/2454">聯發科</Link>    
                    </motion.li>
                </motion.ul>
            </motion.div>
            
            <div className={styles['homePage-2']}>
                <HomeSVG></HomeSVG>
                <motion.div className={styles.text_1}>即時追蹤股市資訊<br/>幫你找出最有價值的潛力股</motion.div>
                <div className={styles.linkToStock}><Link to="/analysis/2330">查看更多資訊</Link></div>
            </div>
            {user? (
                <div div className={styles['homePage-3-user']}>
                    <h3>眾多媒體報導推薦</h3>
                    <AutoSlider></AutoSlider>
                </div>
            ):(
            <div className={styles['homePage-3']}>
                <img className={styles.logo_2} src={logoIcon} alt='logo'/>
                <div className={styles.text_2}>馬上註冊招財狗，使用強大的免費功能 !</div>
                <div className={styles.linkToSignup}><Link to="/signup">馬上免費註冊</Link></div>
            </div>
            )
            
            }

            <Footer/>
        </div>
     );
}
 
export default Home;