import { useReducer } from "react";
import { useParams } from "react-router-dom"
import { useCollection } from "../../hooks/useCollection";
import { IndustyReducer } from "../../reducers/IndustryReducer";
import { useSelector } from 'react-redux'
import { Provider } from 'react-redux';

// components
import dogList from '../../components/img/dog_list.png'
// styles
import styles from './BasicInfo.module.css'

const BasicInfo = () => { 
    const { stockId } = useParams()
    const { documents:basicInfo } = useCollection(
        'basicInfo',stockId
    ) 
    console.log(basicInfo)
    const { documents:dailyPE } = useCollection(
        'dailyPE',stockId
    ) 
    const [state, dispatch] = useReducer(IndustyReducer,{industry:""})
    const industyInfo = () => { dispatch({type:basicInfo[0].industry})}
    const industry = useSelector(state => state.industry)
    return ( 
        <Provider industry={industry}>
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
                        {/* <button onClick={industyInfo}></button> */}
                        <li>產業類別：{basicInfo[0].industry}{industry}</li>
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
            </div> 
        </Provider>
    );
}
 
export default BasicInfo;