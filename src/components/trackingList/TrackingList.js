import { useTrackingList } from '../../hooks/useTrackingList'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// components
import Navbar from '../navbar/Navbar';

// styles
import styles from './TrackingList.module.css'
const TrackingList = () => {
    const { user } = useAuthContext()
    const { deleteDocument , response } = useFirestore('stockList')

    const { documents:stockList , error} = useTrackingList(
        'stockList',
        user.uid
    )
    console.log(stockList)

    return ( 
    <div className={styles}>
        <Navbar />
        tracking
        {stockList && (
        <ul>
            {error && <p>{error}</p>}
            {stockList.map((item) => (
                    <li key={item.id}>
                        <p className={styles.name}>{item.stockId}</p>
                        <button onClick={() => deleteDocument(item)}>x</button>
                    </li>
                ))}
        </ul>)}
    </div> );
}
 
export default TrackingList;