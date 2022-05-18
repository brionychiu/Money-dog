// styles
import styles from './EPS.module.css'

const EPS = () => {
    return ( 
        <div className={styles['EPS-container']}>
             <div className={styles['EPS-SVG']}>每月EPS直條圖/折線圖看月均價</div>
            <div className={styles['EPS-report']}>每季數據/指標解釋</div>
        </div> 
    );
}
 
export default EPS;