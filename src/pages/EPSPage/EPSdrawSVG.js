import { useState } from 'react';

// styles
import styles from './EPS.module.css'

export const EPSdrawSVG = ({Q_EPS,M_Price}) => {
    // console.log(Q_EPS)
    // console.log(M_Price)

    // -------- left index (eps) ---------- 
    let mm = Math.floor(Math.min(...Q_EPS))
    let MM = Math.ceil(Math.max(...Q_EPS))
    let roundDecimal = (val, precision) => {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
    }

    let leftIndex = (mm,MM,Q_EPS) => {
        const leftIndexValue = []
        const rectangleY1 = []
        const rectangleHeight = []
        const minusValue = []
        let num1, y1Num, heightNum, difference, btw, minusHeight, minusStrokeWidth

        if (mm<0 && MM>0){
            const topDifference = Math.abs(MM)
            const downDifference = Math.abs(mm)
            const topbtw = roundDecimal(topDifference/4,1)
            const downbtw = roundDecimal(downDifference/4,1)
            for (let i = 1 ; i < 5 ; i++){
                let a = 0 - downbtw*i
                a = a.toFixed(1);
                leftIndexValue.unshift(a)
            }
            leftIndexValue.push(0)
            for (let i = 1 ; i < 5 ; i++){
                let b = 0 + topbtw*i
                b = b.toFixed(1);
                leftIndexValue.push(b)
            }
            // ----------create rectangle (have positive & negative)
            for(let i=0; i<13; i++){
                if (Q_EPS[i]> 0){
                    heightNum = Math.abs((Q_EPS[i]/topbtw)*50)
                    y1Num= 210-heightNum
                    rectangleY1.push(y1Num)
                    rectangleHeight.push(heightNum)
                }else if(Q_EPS[i]<= 0){
                    num1 = Math.abs(Q_EPS[i])
                    heightNum = Math.abs((num1/downbtw)*50)
                    y1Num= 210
                    rectangleY1.push(y1Num)
                    rectangleHeight.push(heightNum)
                }
            }
            // ----------minus zero line 
            minusHeight = '200'
            minusStrokeWidth = '3'
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,rectangleHeight,rectangleY1,minusValue}

        }else if(mm<0 && MM<0){
            difference = Math.abs(mm - 0)
            btw = roundDecimal(difference/8,1)
            for (let i = 1 ; i < 9 ; i++){
                let a = 0 + btw*i
                a = a.toFixed(1);
                leftIndexValue.push(a)
            }
            leftIndexValue.push(0)
            // ----------create rectangle (all negative)
            for(let i=0; i<13; i++){
                num1 = Math.abs(Q_EPS[i])
                heightNum = Math.abs((num1/btw)*50)
                y1Num= 210
                rectangleY1.push(y1Num)
                rectangleHeight.push(heightNum)
            }
            // ----------minus zero line 
            minusHeight = "400"
            minusStrokeWidth ="3"
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,rectangleHeight,rectangleY1,minusValue}

        }else{
            difference = Math.abs(MM - 0)
            btw = roundDecimal(difference/8,1)
            leftIndexValue.push(0)
            for (let i = 1 ; i < 9 ; i++){
                let a = 0 + btw*i
                a = a.toFixed(1)
                leftIndexValue.push(a)
            }
            // ----------create rectangle (all positive)
            for(let i=0; i<13; i++){
                heightNum = Math.abs((Q_EPS[i]/btw)*50)
                y1Num= 450-heightNum
                heightNum = heightNum.toFixed(1)
                y1Num = y1Num.toFixed(1)
                rectangleY1.push(y1Num)
                rectangleHeight.push(heightNum)
            }
            // ----------minus zero line 
            minusHeight = "0"
            minusStrokeWidth ="0"
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,rectangleHeight,rectangleY1,minusValue}
        }
    }
    const leftIndexValue = leftIndex(mm,MM,Q_EPS).leftIndexValue
    const rectangleHeight = leftIndex(mm,MM,Q_EPS).rectangleHeight
    const rectangleY1 = leftIndex(mm,MM,Q_EPS).rectangleY1
    const minusValue = leftIndex(mm,MM,Q_EPS).minusValue
    console.log(minusValue)

    // ------------ M_Price & right index --------------
    let nn = Math.floor(Math.min(...M_Price))
    let NN = Math.ceil(Math.max(...M_Price))
    let rightIndex = (nn,NN,M_Price) => {
        const rightIndexValue = []
        const lineY1 = []
        const lineY2 = []
        const btw = roundDecimal(((NN-nn)/8),1)
        let yNum
        for (let i = 0 ; i < 9 ; i++){
            let a = nn + btw*i
            a = a.toFixed(0)
            rightIndexValue.push(a)
        }
        for (let i = 0 ; i < 42 ; i++){
            if(i<M_Price.length-1){
                // lineY1移除最後一個元素
                yNum = Math.abs(((M_Price[i]-nn)/btw)*50)
                yNum= (450-yNum).toFixed(1)
                lineY1.push(yNum)
            }
            if(i!==0){
                //  lineY2移除第一個元素
                yNum = Math.abs(((M_Price[i]-nn)/btw)*50)
                yNum= (450-yNum).toFixed(1)
                lineY2.push(yNum)
            }
        }
        return{rightIndexValue,lineY1,lineY2}
    }
    const rightIndexValue = rightIndex(nn,NN,M_Price).rightIndexValue
    const lineY1 = rightIndex(nn,NN,M_Price).lineY1
    const lineY2 = rightIndex(nn,NN,M_Price).lineY2

    // ------- checkbox -----------
    const [qEPS, setqEPS] = useState(true)
    const [monthPrice, setmonthPrice] = useState(true)
    return(
        <div className={styles['EPS-SVG']}>
            <div>
                <span>近三年EPS/季</span>
                <div className={styles.orange}></div>
                <span>單季EPS</span>
                <div className={styles.red}></div>
                <span>月均價</span>
            </div>
            <svg 
                id='svg'
                width="912" height="500"
                viewBox="0 0 912 500"
                xmlns="<http://www.w3.org/2000/svg>"
            >
                {/* eps index */}
                <line x1="60" y1="50" x2="840" y2="50" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="100" x2="840" y2="100" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="150" x2="840" y2="150" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="200" x2="840" y2="200" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="250" x2="840" y2="250" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="300" x2="840" y2="300" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="350" x2="840" y2="350" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="400" x2="840" y2="400" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="450" x2="840" y2="450" stroke='rgb(232,175,0)' strokeWidth='1' />
                <text x="70" y="25" fill="rgb(106,106,106)" fontSize='13'>EPS單位:元</text>
                {leftIndexValue.map((item,index) => (
                    <text key={index} x="35" y={450-index*50} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}
                

                {/* month price index */}
                <text x="800" y="25" fill="rgb(106,106,106)" fontSize='13'>股價:元</text>
                {rightIndexValue.map((item,index) => (
                     <text key={index} x="850" y={450-index*50} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}

                {/* year index */}
                <line x1="289" y1="10" x2="289" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="517" y1="10" x2="517" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="746" y1="10" x2="746" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="55" y="470" fill="rgb(106,106,106)" fontSize='14'>2019</text>
                <text x="280" y="470" fill="rgb(106,106,106)" fontSize='14'>2020</text>
                <text x="510" y="470" fill="rgb(106,106,106)" fontSize='14'>2021</text>
                <text x="740" y="470" fill="rgb(106,106,106)" fontSize='14'>2022</text>
                
                {/* minus rectangle */}
                <rect x="60" y={450-minusValue[0]} width="780" height={minusValue[0]} fill="rgb(239,203,203)" 
                    strokeWidth='2' fillOpacity='0.2'/>
                <line x1="60" y1={450-minusValue[0]} x2="840" y2={450-minusValue[0]} stroke='rgb(239,203,203)' strokeWidth={minusValue[1]} />

                {/* eps value */}
                {qEPS && (
                    <>
                    {rectangleY1.map((item,index) => (
                        <rect  key={index} x={75+57*index} y={item} width="30" height={rectangleHeight[index]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    ))}
                    </>
                )}
                {monthPrice && (
                      <>
                      {lineY1.map((item,index) => (
                          <line  key={index} x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={lineY2[index]} stroke="rgb(203,75,75)" strokeWidth="3" stroke-linecap="round"/>
                      ))}
                      </>
                )}
            </svg>
            <span className={styles.checkbox}>
                <input id='qEPS' type='checkbox' vaule='單季EPS'onChange={() => setqEPS(!qEPS)} defaultChecked={qEPS}/>
                <label htmlFor='qEPS'>單季EPS</label>
                <input id='monthPrice' type='checkbox' vaule='月均價' onChange={() => setmonthPrice(!monthPrice)} defaultChecked={monthPrice} />
                <label htmlFor='monthPrice'>月均價</label>
            </span>
        </div>
    )
    
}