// styles
import styles from './Footer.module.css'

// components
import footerIcon from '../../assets/footer_icon.png'
const Footer = () => {
    return ( 
        <div className={styles.footer}>
            <h3>網站資料來源</h3>
            <div>資料來源参考：公開資訊觀測站，台灣證券交易所，櫃檯買賣中心，財報狗。<br/>
                本站提供之分析資料、選股工具僅供參考，不暗示買賣建議，本站對資訊正確、更新延誤或傳輸中斷不負任何責任，
                依本站資訊交易發生損失需自行負責，請謹慎評估風險。
                (招財狗免責聲明)
                <img src={footerIcon} alt='smile face:)'/>
            </div>
            
        </div> 
    );
}
 
export default Footer;