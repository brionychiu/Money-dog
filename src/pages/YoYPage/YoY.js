
// styles
import styles from './YoY.module.css'

const YoY = () => {
    return ( 
    <div className={styles['YoY-container']}>
        <div className={styles['YoY-SVG']}>單月營收年增率/單月營收月增率</div>
        <div className={styles['YoY-report']}>每月數據/指標解釋</div>
    </div>
    );
}
 
export default YoY;