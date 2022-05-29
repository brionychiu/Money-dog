import { useState } from 'react';

// styles
import styles from './StockPrice.module.css'

export const StockPriceSVG = ({HY_price}) => {
    // data
    const name = HY_price.name
    const open = HY_price.open
    const high = HY_price.high
    const low = HY_price.low
    const close = HY_price.close
    const date = HY_price.date
    const trancision = HY_price.Transaction

    // console.log('open:',open)
    // console.log('high:',high)
    // console.log('low:',low)
    // console.log('close:',close)
    // console.log('date:',date)
    // console.log('trancision:',trancision)
    

    // ----------- Candlestick chart -------------
    let roundDecimal = (val, precision) => {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
        }
    let candleAndIndex = (high,low,open,close) => {
        const mm = Math.floor(Math.min(...low))
        const MM = Math.ceil(Math.max(...high))
        const difference = Math.abs(MM - mm)
        const btw = roundDecimal(difference/8,1)
        //  price index
        const priceIndex = []
        for (let i = 0 ; i < 9 ; i++){
            let a = mm + btw*i
            a = a.toFixed(0)
            priceIndex.push(a)
        }
        //  candle rectangle 
        const rectX = []
        const rectY = []
        const rectHeight = []
        const fillColor = []
        const lineX = []
        const lineY_1 = []
        const lineY_2 =[]
        let height, numy 
        for(let i=0 ; i<94 ; i++){
            // rect X 
            const recx = 60+(i*20)
            rectX.push(recx)
            // line X
            const linex = 67+(i*20)
            lineX.push(linex)
            if (open[i]>=close[i]){
                // rect Y
                numy = 10+(MM - open[i])*56
                numy = numy.toFixed(0)
                rectY.push(numy)
                // rect height
                height = ((open[i]-close[i])/btw)*56
                height = height.toFixed(1)
                rectHeight.push(height)
                // color
                fillColor.push("rgb(21,111,27)")

            }else if (open[i]<close[i]){
                // rect Y
                numy = 10+(MM - close[i])*56
                numy = numy.toFixed(0)
                rectY.push(numy)
                // rect height
                height = ((close[i]-open[i])/btw)*56
                height = height.toFixed(1)
                rectHeight.push(height)
                // color
                fillColor.push("rgb(202,8,19)")
            }else{
                // rect Y
                numy = 10+(MM - close[i])*56
                numy = numy.toFixed(0)
                rectY.push(numy)
                // rect height
                rectHeight.push(1)
                 // color
                fillColor.push("0")

            }
            // line Y-1
            let y1 = 10+(MM-high[i])*56
            y1 = y1.toFixed(0)
            lineY_1.push(y1)
            // line Y-2
            let y2 = 10+(MM-low[i])*56
            y2 = y2.toFixed(0)
            lineY_2.push(y2)
        }

        return [{priceIndex,rectX,rectY,rectHeight,fillColor,lineX,lineY_1,lineY_2,MM}]
    }
    const priceIndex = candleAndIndex(high,low,open,close)[0].priceIndex
    const rectX = candleAndIndex(high,low,open,close)[0].rectX
    const rectY = candleAndIndex(high,low,open,close)[0].rectY
    const fillColor = candleAndIndex(high,low,open,close)[0].fillColor
    const rectHeight = candleAndIndex(high,low,open,close)[0].rectHeight
    const lineX = candleAndIndex(high,low,open,close)[0].lineX
    const lineY_1 = candleAndIndex(high,low,open,close)[0].lineY_1
    const lineY_2 = candleAndIndex(high,low,open,close)[0].lineY_2
    const MM = candleAndIndex(high,low,open,close)[0].MM

    //  --------------- 5MA -----------------
    let MA_5array = (close,MM,lineX) => {
        let MA_5pathY = []
        let MA_5pathX = []
        let b = close.map((e,i,arr) => {
            return ((arr[i]+arr[i+1]+arr[i+2]+arr[i+3]+arr[i+4])/5).toFixed(1)
        })
        b = b.filter(e =>e !== 'NaN')
        b.map((e,i,arr) => {
            // 5MA line-y
            let pathy = 10+(MM - e)*56
            pathy = pathy.toFixed(1)
            MA_5pathY.push(pathy)
            // 5MA line-x
            let pathx = lineX[4]+(20*i)
            MA_5pathX.push(pathx)
            return MA_5pathY
        })
        // 讓5MA line-y 能stop
        let length = MA_5pathY.length
        MA_5pathY.push(MA_5pathY[length-1])
        return [{MA_5pathY,MA_5pathX}]
    }
   
    const MA_5pathY = MA_5array(close,MM,lineX)[0].MA_5pathY
    const MA_5pathX = MA_5array(close,MM,lineX)[0].MA_5pathX

    //  --------------- 10MA -----------------
    let MA_10array = (close,MM,lineX) => {
        let MA_10pathY = []
        let MA_10pathX = []
        let b = close.map((e,i,arr) => {
            return ((arr[i]+arr[i+1]+arr[i+2]+arr[i+3]+arr[i+4]+arr[i+5]+arr[i+6]
                +arr[i+7]+arr[i+8]+arr[i+9])/10).toFixed(1)
        })
        b = b.filter(e =>e !== 'NaN')
        b.map((e,i,arr) => {
            // 10MA line-y
            let pathy = 10+(MM - e)*56
            pathy = pathy.toFixed(1)
            MA_10pathY.push(pathy)
            // 10MA line-x
            let pathx = lineX[9]+(20*i)
            MA_10pathX.push(pathx)
            return MA_10pathY
        })
        // 讓10MA line-y 能stop
        let length = MA_10pathY.length
        MA_10pathY.push(MA_10pathY[length-1])
        return [{MA_10pathY,MA_10pathX}]
    }
   
    const MA_10pathY = MA_10array(close,MM,lineX)[0].MA_10pathY
    const MA_10pathX = MA_10array(close,MM,lineX)[0].MA_10pathX

    //  --------------- 20MA -----------------
    let MA_20array = (close,MM,lineX) => {
        let MA_20pathY = []
        let MA_20pathX = []
        let b = close.map((e,i,arr) => {
            return ((arr[i]+arr[i+1]+arr[i+2]+arr[i+3]+arr[i+4]+arr[i+5]+arr[i+6]
                +arr[i+7]+arr[i+8]+arr[i+9]+arr[i+10]+arr[i+11]+arr[i+12]
                +arr[i+13]+arr[i+14]+arr[i+15]+arr[i+16]+arr[i+17]+arr[i+18]
                +arr[i+19])/20).toFixed(1)
        })
        b = b.filter(e =>e !== 'NaN')
        b.map((e,i,arr) => {
            // 20MA line-y
            let pathy = 10+(MM - e)*56
            pathy = pathy.toFixed(1)
            MA_20pathY.push(pathy)
            // 20MA line-x
            let pathx = lineX[19]+(20*i)
            MA_20pathX.push(pathx)
            return MA_20pathY
        })
        // 讓20MA line-y 能stop
        let length = MA_20pathY.length
        MA_20pathY.push(MA_20pathY[length-1])
        return [{MA_20pathY,MA_20pathX}]
    }
   
    const MA_20pathY = MA_20array(close,MM,lineX)[0].MA_20pathY
    const MA_20pathX = MA_20array(close,MM,lineX)[0].MA_20pathX
    console.log(MA_20pathY)
    console.log(MA_20pathX)

        //  --------------- 30MA -----------------
        let MA_30array = (close,MM,lineX) => {
            let MA_30pathY = []
            let MA_30pathX = []
            let b = close.map((e,i,arr) => {
                return ((arr[i]+arr[i+1]+arr[i+2]+arr[i+3]+arr[i+4]+arr[i+5]+arr[i+6]
                    +arr[i+7]+arr[i+8]+arr[i+9]+arr[i+10]+arr[i+11]+arr[i+12]
                    +arr[i+13]+arr[i+14]+arr[i+15]+arr[i+16]+arr[i+17]+arr[i+18]
                    +arr[i+19]+arr[i+20]+arr[i+21]+arr[i+22]+arr[i+23]+arr[i+24]+arr[i+25]
                    +arr[i+26]+arr[i+27]+arr[i+28]+arr[i+29]+arr[i+30])/30).toFixed(1)
            })
            b = b.filter(e =>e !== 'NaN')
            b.map((e,i,arr) => {
                // 30MA line-y
                let pathy = 10+(MM - e)*56
                pathy = pathy.toFixed(1)
                MA_30pathY.push(pathy)
                // 20MA line-x
                let pathx = lineX[29]+(20*i)
                MA_30pathX.push(pathx)
                return MA_30pathY
            })
            // 讓30MA line-y 能stop
            let length = MA_30pathY.length
            MA_30pathY.push(MA_30pathY[length-1])
            return [{MA_30pathY,MA_30pathX}]
        }
       
        const MA_30pathY = MA_30array(close,MM,lineX)[0].MA_30pathY
        const MA_30pathX = MA_30array(close,MM,lineX)[0].MA_30pathX
        console.log(MA_30pathY)
        console.log(MA_30pathX)

    // ------- checkbox ----------
    const [fiveMA,setFiveMA] = useState(true)
    const [tenMA,setTenMA] = useState(true)
    const [twentyMA,setTwentyMA] = useState(true)
    const [monthMA,setMonthMA] = useState(true)

    const handleClick = (e) => {
        e.target.style.fill = "pink"
    }
    
    console.log(HY_price)
    return(
        <div className={styles['price-container']}>
            <div className={styles['k-SVG']}>
                <div className={styles.title}>
                    <span>2022年{name}股價走勢</span>
                    <div className={styles.orange}></div>
                    <span>5日線</span>
                    <div className={styles.blue}></div>
                    <span>10日線</span>
                    <div className={styles.yellow}></div>
                    <span>20日線</span>
                    <div className={styles.purple}></div>
                    <span>月線</span>
                </div>
                <div className={styles['price-detail']}>
                    <span>日期：</span>
                    <div>{name}</div>
                    <span>開盤價：</span>
                    <div>{name}</div>
                    <span>最高價：</span>
                    <div>{name}</div>
                    <span>最低價：</span>
                    <div>{name}</div>
                    <span>收盤價：</span>
                    <div>{name}</div>
                </div>
                <div className={styles.kChart}>
                    <svg 
                        id='svg'
                        width="2000" height="510"
                        viewBox="0 0 2000 510"
                        xmlns="<http://www.w3.org/2000/svg>"
                        overflow="visisble"> 
                        {/* daily price index */}
                        <line x1="50" y1="10" x2="1950" y2="10" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="66" x2="1950" y2="66" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="122" x2="1950" y2="122" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="178" x2="1950" y2="178" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="234" x2="1950" y2="234" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="290" x2="1950" y2="290" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="346" x2="1950" y2="346" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="402" x2="1950" y2="402" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="458" x2="1950" y2="458" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="50" y1="10" x2="50" y2="458" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <line x1="1950" y1="10" x2="1950" y2="458" stroke='rgb(226,226,226)' strokeWidth='1' />
                        <text x="15" y="15" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[8]}</text>
                        <text x="15" y="71" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[7]}</text>
                        <text x="15" y="127" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[6]}</text>
                        <text x="15" y="183" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[5]}</text>
                        <text x="15" y="239" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[4]}</text>
                        <text x="15" y="295" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[3]}</text>
                        <text x="15" y="351" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[2]}</text>
                        <text x="15" y="407" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[1]}</text>
                        <text x="15" y="463" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[0]}</text>
                        <text x="1970" y="15" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[8]}</text>
                        <text x="1970" y="71" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[7]}</text>
                        <text x="1970" y="127" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[6]}</text>
                        <text x="1970" y="183" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[5]}</text>
                        <text x="1970" y="239" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[4]}</text>
                        <text x="1970" y="295" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[3]}</text>
                        <text x="1970" y="351" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[2]}</text>
                        <text x="1970" y="407" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[1]}</text>
                        <text x="1970" y="463" fill="rgb(106,106,106)" fontSize='13'>{priceIndex[0]}</text>
                        <line x1="67" y1="310" x2="67" y2="360" stroke='rgb(93, 93, 93)' strokeWidth='2'/>
                        <line x1="87" y1="310" x2="87" y2="360" stroke='rgb(93, 93, 93)' strokeWidth='2' />
                        {/* <path d="M 147 357.2 l 20 5.6 M 167 362.8 l 20 -5.6 M 187 357.2 l 20 -5.6 M 207 351.6 l 20 -5.6 M 227 346.0" stroke='rgb(255, 109, 0)' strokeWidth='2'/> */}
                        {monthMA && (
                            <>
                            {MA_30pathX.map((item,index) => (
                                <line key={index}
                                x1={item} y1={MA_30pathY[index]} x2={item+20} y2={MA_30pathY[index+1]} stroke='rgb(103,58,183)' strokeWidth='2'/>
                            ))}
                            </>
                        )}
                        {twentyMA && (
                            <>
                            {MA_20pathX.map((item,index) => (
                                <line key={index}
                                x1={item} y1={MA_20pathY[index]} x2={item+20} y2={MA_20pathY[index+1]} stroke='rgb(251,192,45)' strokeWidth='2'/>
                            ))}
                            </>
                        )}
                        {tenMA && (
                            <>
                            {MA_10pathX.map((item,index) => (
                                <line key={index}
                                x1={item} y1={MA_10pathY[index]} x2={item+20} y2={MA_10pathY[index+1]} stroke='rgb(38,198,218)' strokeWidth='2'/>
                            ))}
                            </>
                        )}
                        {fiveMA && (
                            <>
                            {MA_5pathX.map((item,index) => (
                                <line key={index}
                                x1={item} y1={MA_5pathY[index]} x2={item+20} y2={MA_5pathY[index+1]} stroke='rgb(255,109,0)' strokeWidth='2'/>
                            ))}
                            </>
                        )}
                        
                        {lineX.map((item,index) => (
                            <line key={index}
                            x1={item} y1={lineY_1[index]} x2={item} y2={lineY_2[index]} stroke='rgb(93, 93, 93)' strokeWidth='2'/>
                        ))}
                        {rectX.map((item,index) => (
                            <rect key={index} 
                                x={item} y={rectY[index]} onClick={handleClick}
                                width="13" height={rectHeight[index]} fill={fillColor[index]}/>
                        ))}
                        {/* <rect  
                            x='60' y="10" onClick={handleClick}
                            width="13" height="1" fill="0" stroke='rgb(93,93,93)'/> */}
                        
                    </svg>
                </div>
                <span className={styles.checkbox}>
                    <input id='fiveMA' type='checkbox' vaule='5日線'onChange={() => setFiveMA(!fiveMA)} defaultChecked={fiveMA}/>
                    <label htmlFor='fiveMA'>5日線</label>
                    <input id='tenMA' type='checkbox' vaule='10日線' onChange={() => setTenMA(!tenMA)} defaultChecked={tenMA} />
                    <label htmlFor='tenMA'>10日線</label>
                    <input id='twentyMA' type='checkbox' vaule='20日線'onChange={() => setTwentyMA(!twentyMA)} defaultChecked={twentyMA}/>
                    <label htmlFor='twentyMA'>20日線</label>
                    <input id='monthMA' type='checkbox' vaule='月線' onChange={() => setMonthMA(!monthMA)} defaultChecked={monthMA} />
                    <label htmlFor='monthMA'>月線</label>
                </span>
            

            </div>

            <div className={styles['volume-SVG']}>uhohio</div>
    
        </div>
        )
}