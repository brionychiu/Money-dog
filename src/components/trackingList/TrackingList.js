import { useTrackingList } from '../../hooks/useTrackingList'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// components
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import rightArrow from '../img/right_arrow_icon.png'
import blueRightArrow from '../img/right_arrow_icon_blue.png'

// styles
import styles from './TrackingList.module.css'

const TrackingList = () => {
    const { user } = useAuthContext()
    const uid = user.uid
    const { deleteDocument , response } = useFirestore('trackingList')

    const { documents:trackingList , error} = useTrackingList(
        'trackingList',
        uid
    )
    console.log(trackingList)
    console.log(uid)

    return ( 
    <div className={styles['trackingList-container']}>
        <Navbar />
        <div className={styles['root-content']}>
            <div className={styles['main-content']}>
                {trackingList && (
                    <div className={styles['right-box']}>
                        <div className={styles.togglemenu}>
                            <img className={styles.arrow} src={rightArrow} alt='read more'/>
                            <span>我的股票追蹤清單</span>
                        </div>
                        <ul>
                            {error && <p>{error}</p>}
                            {trackingList.map((item) => (
                                    <li key={item.id}>
                                        <p className={styles.name}>{item.id}</p>
                                        <button onClick={() => deleteDocument(item)}>x</button>
                                    </li>
                                ))}
                        </ul>
                    </div>)
                }
            </div>
        </div>
        <Footer />
    </div> );
}
 
export default TrackingList;