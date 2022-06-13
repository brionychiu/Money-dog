import { useParams } from "react-router-dom"
import { useReducer, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { IndustyReducer } from '../../redux/Industry'

// components
import dogList from '../../components/img/dog_list.png'
// styles
import styles from './BasicInfo.module.css'

const BasicInfo = () => { 
    const { stockId } = useParams()
    const [show, setShow] = useState(false)
    const { documents:basicInfo } = useCollection(
        'basicInfo',stockId
    ) 
    const { documents:dailyPE } = useCollection(
        'dailyPE',stockId
    ) 
    const [state, dispatch] = useReducer(IndustyReducer,{industry:""})
    const industyInfo = () => { dispatch({type:basicInfo[0].industry})}
    const handleClick = () => {
        industyInfo()
        setShow(true)
    }
    return ( 
        <div className={styles['info-container']}>
            {basicInfo && (
                <ul className={styles['info-box']}>
                    <div>公司簡介</div>
                    <li>
                        <img src={dogList} alt='dog_list'/>
                        公司名稱：{basicInfo[0].name}
                    </li>  
                    <li>
                        <img src={dogList} alt='dog_list'/>
                        公司簡稱：{basicInfo[0].sname}
                    </li>
                    <li>
                        <img src={dogList} alt='dog_list'/>
                        交易代號：{basicInfo[0].id}
                    </li>
                    <li>
                        <img src={dogList} alt='dog_list'/>
                        交易所：{basicInfo[0].listed}
                    </li>
                    <button onClick={handleClick}>查看產業類別</button>
                </ul>
            )}
            {dailyPE &&
                <ul className={styles['daily-box']}>
                    <li>殖利率(%)<br/><span>{dailyPE[0].DYield}</span></li>
                    <li>股價淨值比<br/><span>{dailyPE[0].PBratio}</span></li>
                    <li>當日本益比(倍)<br/><span>{dailyPE[0].PEratio}</span></li>
                    <div>上次更新日期:{basicInfo[0].date.slice(0,3)}/
                    {basicInfo[0].date.slice(3,5)}/
                    {basicInfo[0].date.slice(5,8)}</div>
                </ul>
            }
            {basicInfo && show && (
                <div className={styles['industry-box']}>
                    <h3>{state.industry}概觀</h3>
                    <div>{state.describe}</div>
                </div>
            )}
            
        </div> 
    );
}
 
export default BasicInfo;