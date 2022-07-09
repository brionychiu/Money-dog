import { useCollection } from "../../hooks/useCollection"

// components
import Navbar from "../../components/navbar/Navbar"
import Footer from '../../components/footer/Footer'
import { TaiexSVG } from "./TaiexSVG"
import loadingGif from '../../assets/loading.gif'

// styles
import styles from './Taiex.module.css'

const Taiex = () => {
    const { documents:taiex } = useCollection(
        'taiex','0000'
    ) 
    const { documents:otc } = useCollection(
        'taiex','0001'
    )
    
    return ( 
        <div className={styles['taiex-bk']}>
            <div className={styles['taiex-container']}>
                <Navbar />
                <div className={styles.background}></div>
                <ul className={styles.slogan}>
                    <h1>台股大盤與類股表現</h1>
                    <li>統計台股加權指數與產業類股最新表現。最後更新：2022/05/30</li>
                </ul>
                <div className={styles['market-container']}>
                    <div className={styles['market-info']}>
                        <div className={styles.summary}>
                            <ul>
                                <li>上市指數收盤</li>
                                <li className={styles.givecolor}>166610.62</li>
                                <li className={styles.givecolor}>+344.4(+2.03%)</li>
                            </ul>
                            <ul>
                                <li>櫃買指數收盤</li>
                                <li className={styles.givecolor}>201.2</li>
                                <li className={styles.givecolor}>+4.21(+2.05%)</li>
                            </ul>
                            <ul>
                                <li>台股成交金額</li>
                                <li>2584.48億</li>
                                <li>昨日2212.61億</li>
                            </ul>
                            <ul>
                                <li>台股淨值比</li>
                                <li>2.06倍</li>
                                <li>昨日2.02倍</li>
                            </ul>
                            <ul>
                                <li>台股本益比</li>
                                <li>12.57倍</li>
                                <li>昨日12.31倍</li>
                            </ul>
                        </div> 
                        <div className={styles['index-area']}>
                            {!taiex && (
                                <div className={styles.ispending}>
                                    <img src={loadingGif} alt='loading...'/>
                                    <span>趕緊處理資料中</span>
                                    <img src={loadingGif} alt='加載中...'/>
                                </div>
                            )}
                            {taiex && <TaiexSVG 
                                taiex={taiex}
                                otc={otc}>
                            </TaiexSVG>
                            }
                            <div className={styles['index-describe']}>
                                <h2>什麼是大盤指數</h2>
                                <div>台灣大盤指數（加權股價指數、TAIEX）是證交所編製的股價指數，用所有上市股票的市值加權計算，市值高的股票加權比較高，像台積電、鴻海、國泰金、中鋼和台塑等市值較高的權值股，其股價變化就會對大盤指數有比較大的影響。</div>
                                <h2>怎麼判斷大盤指數高低</h2>
                                <div>大盤會隨通貨膨脹和 GDP 成長不斷墊高，所以沒辦法藉由絕對數字判斷高低點。想要判斷大盤指數高低，股價淨值比（P/B）是一個很好的指標。以過去 8 年來看，大盤股價淨值比接近或超過 1.8，股市下跌機率大，我們可以適當減碼；大盤股價淨值比接近或低於 1.4，股市上漲機率高，我們可以較有信心加碼。</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            
        </div> 
    );
}
 
export default Taiex;