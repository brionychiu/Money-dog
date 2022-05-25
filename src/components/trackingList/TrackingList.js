import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// components
import Navbar from '../navbar/Navbar';

// styles
import styles from './TrackingList.module.css'
const TrackingList = () => {
    const { user } = useAuthContext()

    const { documents:stockList } = useCollection(
        'stockList',
        user.uid
        // ['createdAt' , 'desc']    
    )

    // const { deleteDocument , response } = useFirestore('stockList')
    console.log(stockList)
    return ( 
    <div className={styles}>
        <Navbar />
        tracking
        {/* {error && <p>{error}</p>} */}
        {/* <ul>
            {stockList.map((item) => (
                    <li key={stockList.id}>
                        <p className={styles.name}>{stockList.stockId}</p>
                        <button onClick={() => deleteDocument(transaction.id)}>x</button>
                    </li>
                ))}
        </ul> */}
    </div> );
}
 
export default TrackingList;