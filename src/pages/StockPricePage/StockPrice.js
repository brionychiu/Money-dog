import { useParams, Link } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection";

//components
import { StockPriceSVG } from './StockPriceSVG';
import sorryIcon from '../../components/img/sorry_icon.png'

// styles
import styles from './StockPrice.module.css'

const StockPrice = () => {
    const { stockId } = useParams()
    const { documents:HY_price } = useCollection(
        'HY-price',stockId
    ) 
    console.log(HY_price)
    return ( 
    <div>
        {HY_price? (
            HY_price.length===0 ? 
            <div className={styles.nodata}>
                <div>目前尚未有資料</div>
                <img src={sorryIcon} alt='sorry'/>
                <div>請試試以下連結喔!</div>
                <div>
                <Link to="/analysis/2330">台積電</Link>   
                <Link to="/analysis/2317">鴻海</Link>   
                <Link to="/analysis/2002">中鋼</Link>   
                <Link to="/analysis/2308">台達電</Link>   
                <Link to="/analysis/2603">長榮</Link>   
                <Link to="/analysis/2303">聯電</Link>   
                <Link to="/analysis/2454">聯發科</Link>   
                <Link to="/analysis/2881">富邦金</Link>   
                <Link to="/analysis/2409">友達</Link>   
                <Link to="/analysis/2610">華航</Link>    
                <Link to="/analysis/1605">華新</Link>   
                <Link to="/analysis/2354">鴻準</Link>   
                <Link to="/analysis/3707">漢磊</Link>   
                <Link to="/analysis/4919">新唐</Link>
                <Link to="/analysis/8261">富鼎</Link>
                </div>
            </div>
            :
            <StockPriceSVG HY_price={HY_price[0]}></StockPriceSVG>
        ):null}
    </div> 
    );
}
 
export default StockPrice;