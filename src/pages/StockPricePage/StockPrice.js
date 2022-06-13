import { useParams } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection"

//components
import { StockPriceSVG } from './StockPriceSVG'
import NoDataPage from "../NoDataPage/NoDataPage"

const StockPrice = () => {
    const { stockId } = useParams()
    const { documents:HY_price } = useCollection(
        'HY-price',stockId
    ) 
    return ( 
    <div>
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