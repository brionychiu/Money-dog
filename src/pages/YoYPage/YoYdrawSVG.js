import { useState } from 'react'

// styles
import styles from './YoY.module.css'

export const YoYdrawSVG = ({longYoY,M_Price}) => {
    // ------------checkbox
    const [YoY, setYoY] = useState(true)
    const [monthPrice, setmonthPrice] = useState(true)

    // ------------ M_Price --------------
    let nn = Math.floor(Math.min(...M_Price))
    let NN = Math.ceil(Math.max(...M_Price))
    let roundDecimal = (val, precision) => {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
    }
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

    // ---------- long YoY -----------
    let mm = Math.floor(Math.min(...longYoY))
    let MM = Math.ceil(Math.max(...longYoY))
     let leftIndex = (mm,MM,longYoY) => {
        const leftIndexValue = []
        const circleCy = []
        const minusValue = []
        let cyNum, difference, btw, minusHeight, minusStrokeWidth
        if (mm<0 && MM>0){
            const topDifference = Math.abs(MM - 0)
            const downDifference = Math.abs(mm - 0)
            const topbtw = roundDecimal(topDifference/4,1)
            const downbtw = roundDecimal(downDifference/4,1)
            for (let i = 1 ; i < 5 ; i++){
                let a = 0 - downbtw*i
                a = a.toFixed(0);
                leftIndexValue.unshift(a)
            }
            leftIndexValue.push(0)
            for (let i = 1 ; i < 5 ; i++){
                let b = 0 + topbtw*i
                b = b.toFixed(0);
                leftIndexValue.push(b)
            }

            // ---------- create circle of YoY
            for (let i = 0 ; i < 40 ; i++){
                if(longYoY[i]> 0){
                    cyNum = Math.abs(((longYoY[i])/topbtw)*50)
                    cyNum= (210-cyNum).toFixed(1)
                    circleCy.push(cyNum)
                }else{
                    cyNum = Math.abs(((longYoY[i])/downbtw)*50)
                    cyNum= (210+cyNum).toFixed(1)
                    circleCy.push(cyNum)
                }
            }
            // ----------minus zero line 
            minusHeight = '200'
            minusStrokeWidth = '3'
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,circleCy,minusValue}
        }else if(mm<0 && MM<0){
            difference = Math.abs(mm - 0)
            btw = roundDecimal(difference/8,1)
            for (let i = 1 ; i < 9 ; i++){
                let a = 0 + btw*i
                a = a.toFixed(0);
                leftIndexValue.push(a)
            }
            leftIndexValue.push(0)
             // ---------- create circle of YoY
            for (let i = 0 ; i < 40 ; i++){
                cyNum = Math.abs(((longYoY[i])/btw)*50)
                cyNum= (10+cyNum).toFixed(1)
                circleCy.push(cyNum)
             }

            // ----------minus zero line 
            minusHeight = "400"
            minusStrokeWidth ="3"
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,circleCy,minusValue}
        }else{
            difference = Math.abs(MM - 0)
            btw = roundDecimal(difference/8,1)
            leftIndexValue.push(0)
            for (let i = 1 ; i < 9 ; i++){
                let a = 0 + btw*i
                a = a.toFixed(0)
                leftIndexValue.push(a)
            }
            // ---------- create circle of YoY
            for (let i = 0 ; i < 42 ; i++){
                cyNum = Math.abs(((longYoY[i])/btw)*50)
                cyNum= (450-cyNum).toFixed(1)
                circleCy.push(cyNum)
            }
            // ----------minus zero line 
            minusHeight = "0"
            minusStrokeWidth ="0"
            minusValue.push(minusHeight,minusStrokeWidth)
             
            return {leftIndexValue,circleCy,minusValue}
        }
    }
    const leftIndexValue = leftIndex(mm,MM,longYoY).leftIndexValue
    const circleCy = leftIndex(mm,MM,longYoY).circleCy
    const minusValue = leftIndex(mm,MM,longYoY).minusValue
    // console.log(circleCy)


    return(
        <div className={styles['YoY-SVG']}>
            <div>
                <span>近三年單月營收年增率</span>
                <div className={styles.orange}></div>
                <span>單月營收年增率</span>
                <div className={styles.red}></div>
                <span>月均價</span>
            </div>
            <svg
                id='svg'
                width="912" height="500"
                viewBox="0 0 912 500"
                xmlns="<http://www.w3.org/2000/svg>"
            >
                {/* YoY index (%)*/}
                <line x1="60" y1="50" x2="840" y2="50" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="100" x2="840" y2="100" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="150" x2="840" y2="150" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="200" x2="840" y2="200" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="250" x2="840" y2="250" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="300" x2="840" y2="300" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="350" x2="840" y2="350" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="400" x2="840" y2="400" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="450" x2="840" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="70" y="25" fill="rgb(106,106,106)" fontSize='13'>年增率:%</text>
                {leftIndexValue.map((item,index) => (
                    <text  key={index} x="35" y={450-(50*index)} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}

                {/* year index */}
                <line x1="289" y1="10" x2="289" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="517" y1="10" x2="517" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="746" y1="10" x2="746" y2="450" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="55" y="470" fill="rgb(106,106,106)" fontSize='14'>2019</text>
                <text x="280" y="470" fill="rgb(106,106,106)" fontSize='14'>2020</text>
                <text x="510" y="470" fill="rgb(106,106,106)" fontSize='14'>2021</text>
                <text x="740" y="470" fill="rgb(106,106,106)" fontSize='14'>2022</text>
                
                {/* month price index */}
                <text x="800" y="25" fill="rgb(106,106,106)" fontSize='13'>股價:元</text>
                {rightIndexValue.map((item,index) => (
                    <text key={index} x="850" y={450-(50*index)} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}

                {/* minus rectangle */}
                <rect x="60" y={450-minusValue[0]} width="780" height={minusValue[0]} fill="rgb(239,203,203)" 
                    strokeWidth='2' fillOpacity='0.2'/>
                <line x1="60" y1={450-minusValue[0]} x2="840" y2={450-minusValue[0]} stroke='rgb(239,203,203)' strokeWidth={minusValue[1]} />
                
                {/* month price */}
                {monthPrice && (
                    <>
                    {lineY1.map((item,index) => (
                        <line  key={index} x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={lineY2[index]} stroke="rgb(203,75,75)" strokeWidth="3" strokeLinecap="round"/>
                    ))}
                    </>
                )}

                {/* long YoY */}
                {YoY && (<>
                    <circle cx="62" cy={circleCy[0]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/> 
                    <line x1="62" y1={circleCy[0]} x2="79" y2={circleCy[1]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="79" cy={circleCy[1]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="79" y1={circleCy[1]} x2="98" y2={circleCy[2]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="98" cy={circleCy[2]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="98" y1={circleCy[2]} x2="117" y2={circleCy[3]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="117" cy={circleCy[3]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="117" y1={circleCy[3]} x2="136" y2={circleCy[4]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="136" cy={circleCy[4]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="136" y1={circleCy[4]} x2="155" y2={circleCy[5]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="155" cy={circleCy[5]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="155" y1={circleCy[5]} x2="174" y2={circleCy[6]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="174" cy={circleCy[6]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="174" y1={circleCy[6]} x2="193" y2={circleCy[7]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="193" cy={circleCy[7]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="193" y1={circleCy[7]} x2="212" y2={circleCy[8]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="212" cy={circleCy[8]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="212" y1={circleCy[8]} x2="231" y2={circleCy[9]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="231" cy={circleCy[9]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="231" y1={circleCy[9]} x2="250" y2={circleCy[10]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="250" cy={circleCy[10]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="250" y1={circleCy[10]} x2="269" y2={circleCy[11]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="269" cy={circleCy[11]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="269" y1={circleCy[11]} x2="288" y2={circleCy[12]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="288" cy={circleCy[12]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="288" y1={circleCy[12]} x2="307" y2={circleCy[13]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="307" cy={circleCy[13]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="307" y1={circleCy[13]} x2="326" y2={circleCy[14]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="326" cy={circleCy[14]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="326" y1={circleCy[14]} x2="345" y2={circleCy[15]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="345" cy={circleCy[15]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="345" y1={circleCy[15]} x2="364" y2={circleCy[16]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="364" cy={circleCy[16]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="364" y1={circleCy[16]} x2="383" y2={circleCy[17]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="383" cy={circleCy[17]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="383" y1={circleCy[17]} x2="402" y2={circleCy[18]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="402" cy={circleCy[18]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="402" y1={circleCy[18]} x2="421" y2={circleCy[19]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="421" cy={circleCy[19]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="421" y1={circleCy[19]} x2="440" y2={circleCy[20]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="440" cy={circleCy[20]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="440" y1={circleCy[20]} x2="459" y2={circleCy[21]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="459" cy={circleCy[21]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="459" y1={circleCy[21]} x2="478" y2={circleCy[22]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="478" cy={circleCy[22]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="478" y1={circleCy[22]} x2="497" y2={circleCy[23]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="497" cy={circleCy[23]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="497" y1={circleCy[23]} x2="516" y2={circleCy[24]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="516" cy={circleCy[24]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="516" y1={circleCy[24]} x2="535" y2={circleCy[25]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="535" cy={circleCy[25]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="535" y1={circleCy[25]} x2="554" y2={circleCy[26]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="554" cy={circleCy[26]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="554" y1={circleCy[26]} x2="573" y2={circleCy[27]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="573" cy={circleCy[27]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="573" y1={circleCy[27]} x2="592" y2={circleCy[28]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="592" cy={circleCy[28]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="592" y1={circleCy[28]} x2="611" y2={circleCy[29]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="611" cy={circleCy[29]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="611" y1={circleCy[29]} x2="630" y2={circleCy[30]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="630" cy={circleCy[30]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="630" y1={circleCy[30]} x2="649" y2={circleCy[31]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="649" cy={circleCy[31]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="649" y1={circleCy[31]} x2="668" y2={circleCy[32]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="668" cy={circleCy[32]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="668" y1={circleCy[32]} x2="687" y2={circleCy[33]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="687" cy={circleCy[33]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="687" y1={circleCy[33]} x2="706" y2={circleCy[34]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="706" cy={circleCy[34]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="706" y1={circleCy[34]} x2="725" y2={circleCy[35]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="725" cy={circleCy[35]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="725" y1={circleCy[35]} x2="744" y2={circleCy[36]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="744" cy={circleCy[36]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="744" y1={circleCy[36]} x2="763" y2={circleCy[37]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="763" cy={circleCy[37]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="763" y1={circleCy[37]} x2="782" y2={circleCy[38]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="782" cy={circleCy[38]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="782" y1={circleCy[38]} x2="801" y2={circleCy[39]} stroke="rgb(232,194,0)" strokeWidth="3" />
                    <circle cx="801" cy={circleCy[39]} r="3" strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                </>)}
            </svg>
            <span className={styles.checkbox}>
                <input id='mYoY' type='checkbox' vaule='營收年增率'onChange={() => setYoY(!YoY)} defaultChecked={YoY}/>
                <label htmlFor='mYoY'>單月營收年增率</label>
                <input id='monthPrice' type='checkbox' vaule='月均價' onChange={() => setmonthPrice(!monthPrice)} defaultChecked={monthPrice} />
                <label htmlFor='monthPrice'>月均價</label>
            </span>
        </div>
    )
}