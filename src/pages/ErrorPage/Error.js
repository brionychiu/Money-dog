import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

// styles 
import styles from './Error.module.css'

const Error = () => {
    return ( 
        <div className={styles.body}>
            <Navbar className={styles.navi}/>
            <div className={styles.Error}>
                <h1>沒有這個頁面喔</h1>
                <h2>很抱歉，您要尋找的頁面不存在</h2>
                <h3>下一步...</h3>
                <ul>
                    <li>▷ 請檢查您輸入的網址是否正確</li>
                    <li>▷ 回到招財狗首頁，找找您想要功能</li>
                </ul>
                <Link  to="/" className={styles.home}><button>回首頁</button></Link>
            </div>
            <Footer className={styles.footer}/>
        </div> 
     );
}
 
export default Error;