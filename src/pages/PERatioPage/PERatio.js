
// styles
import styles from './PERatio.module.css'

const PERatio = () => {
    return ( 
    <div className={styles['PERatio-container']}>
        <div className={styles['PERatio-SVG']}>每月本益比折線圖</div>
        <div className={styles['PERatio-report']}>每季數據/指標解釋</div>
    </div> 
    );
}
 
export default PERatio;