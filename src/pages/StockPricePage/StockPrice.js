import { useParams } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection"

//components
import { StockPriceSVG } from './StockPriceSVG'
import loadingGif from '../../components/img/loading.gif'
import NoDataPage from "../NoDataPage/NoDataPage"

// styles
import styles from './StockPrice.module.css'

const StockPrice = () => {
    const { stockId } = useParams()
    const { documents:HY_price } = useCollection(
        'HY-price',stockId
    ) 
    return ( 
    <div>
        {!HY_price && 
            <div className={styles.ispending}>
                <img src={loadingGif} alt='loading...'/>
                <span>趕緊處理資料中</span>
                <img src={loadingGif} alt='加載中...'/>
            </div>
        }
        {HY_price? (
            HY_price.length===0 ? 
            <NoDataPage></NoDataPage>
            :
            <StockPriceSVG HY_price={HY_price[0]}></StockPriceSVG>
        ):null}
    </div> 
    );
}
 
export default StockPrice;