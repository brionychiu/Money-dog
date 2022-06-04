import { useParams } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection";

//components
import { StockPriceSVG } from './StockPriceSVG';

const StockPrice = () => {
    const { stockId } = useParams()
    const { documents:HY_price } = useCollection(
        'HY-price',stockId
    ) 
    return ( 
    <div>
        {HY_price && (
            <StockPriceSVG
                HY_price={HY_price[0]}>
            </StockPriceSVG> 
        )}
    </div> 
    );
}
 
export default StockPrice;