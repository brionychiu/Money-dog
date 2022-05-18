
//components

// styles
import styles from './StockPrice.module.css'

const StockPrice = () => {
    return ( 
    <div className={styles['price-container']}>
       <div className={styles['k-SVG']}>股價趨勢圖</div>
       <div className={styles['volume-SVG']}>每日成交量</div>
    </div> 
    );
}
 
export default StockPrice;