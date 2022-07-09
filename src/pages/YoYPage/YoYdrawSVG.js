import { useState } from 'react'

// styles
import styles from './YoY.module.css'

export const YoYdrawSVG = ({longYoY,M_Price,M_Date}) => {
    // ------------checkbox
    const [YoY, setYoY] = useState(true)
    const [monthPrice, setmonthPrice] = useState(true)

     // ---------- set text (hover) -------------
     const [monthPriceText, setMonthPriceText] = useState('')
     const [monthDateText, setMonthDateText] = useState('')
     const [monthText_X, setMonthText_X] = useState(null)
     const [monthText_Y, setMonthText_Y] = useState(null)
     const [monthCircle_X, setMonthCircle_X] = useState(null)
     const [monthCircle_Y, setMonthCircle_Y] = useState(null)
     const [monthCircleStrokeWidth, setMonthCircleStrokeWidth] = useState('0')
     const [yoyText, setYoYText] = useState('')
     const [yoyDateText, setYoYDateText] = useState('')
     const [yoyText_X, setYoYText_X] = useState(null)
     const [yoyText_Y, setYoYText_Y] = useState(null)
     const [yoyCircle_X, setYoYCircle_X] = useState(false)
     const [yoyCircle_Y, setYoYCircle_Y] = useState(false)
     const [yoyCircleStrokeWidth, setYoYCircleStrokeWidth] = useState('0') 

    // ------------ M_Price --------------
    let price_min = Math.floor(Math.min(...M_Price))
    let price_max = Math.ceil(Math.max(...M_Price))
    let roundDecimal = (val, precision) => {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
    }
    let rightIndex = (price_min,price_max,M_Price) => {
        const rightIndexValue = []
        const lineY1 = []
        const lineY2 = []
        const btw = roundDecimal(((price_max-price_min)/8),1)
        let yNum
        for (let i = 0 ; i < 9 ; i++){
            let a = price_min + btw*i
            a = a.toFixed(0)
            rightIndexValue.push(a)
        }
        for (let i = 0 ; i < 42 ; i++){
            if(i<M_Price.length-1){
                // lineY1移除最後一個元素
                yNum = Math.abs(((M_Price[i]-price_min)/btw)*50)
                yNum= (450-yNum).toFixed(1)
                lineY1.push(yNum)
            }
            if(i!==0){
                //  lineY2移除第一個元素
                yNum = Math.abs(((M_Price[i]-price_min)/btw)*50)
                yNum= (450-yNum).toFixed(1)
                lineY2.push(yNum)
            }
        }
        return{rightIndexValue,lineY1,lineY2}
    }
    const rightIndexValue = rightIndex(price_min,price_max,M_Price).rightIndexValue
    const lineY1 = rightIndex(price_min,price_max,M_Price).lineY1
    const lineY2 = rightIndex(price_min,price_max,M_Price).lineY2

    // ---------- long YoY -----------
    let yoy_min = Math.floor(Math.min(...longYoY))
    let yoy_max = Math.ceil(Math.max(...longYoY))
     let leftIndex = (yoy_min,yoy_max,longYoY) => {
        const leftIndexValue = []
        const circleCy = []
        const minusValue = []
        let cyNum, difference, btw, minusHeight, minusStrokeWidth
        if (yoy_min<0 && yoy_max>0){
            const topDifference = Math.abs(yoy_max - 0)
            const downDifference = Math.abs(yoy_min - 0)
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
                    cyNum= (250-cyNum).toFixed(1)
                    circleCy.push(cyNum)
                }else{
                    cyNum = Math.abs(((longYoY[i])/downbtw)*50)
                    cyNum= (250+cyNum).toFixed(1)
                    circleCy.push(cyNum)
                }
            }
            // ----------minus zero line 
            minusHeight = '200'
            minusStrokeWidth = '3'
            minusValue.push(minusHeight,minusStrokeWidth)

            return {leftIndexValue,circleCy,minusValue}
        }else if(yoy_min<0 && yoy_max<0){
            difference = Math.abs(yoy_min - 0)
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
            difference = Math.abs(yoy_max - 0)
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
             
            return {leftIndexValue, circleCy, circleCy1, minusValue}
        }
    }
    const leftIndexValue = leftIndex(yoy_min,yoy_max,longYoY).leftIndexValue
    const circleCy = leftIndex(yoy_min,yoy_max,longYoY).circleCy
    const circleCy1 = circleCy.slice(0,-1)
    const minusValue = leftIndex(yoy_min,yoy_max,longYoY).minusValue

    return(
        <div className={styles['YoY-SVG']}>
            <div className={styles.topbar}>
                <span>近三年單月營收年增率</span>
                <div className={styles.orange}></div>
                <span>單月營收年增率</span>
                <div className={styles.red}></div>
                <span>月均價</span>
            </div>
            <div className={styles['yoy-chart']}>
                <svg
                    id='svg'
                    cursor="pointer"
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
                            <line  key={index} 
                            onMouseOver={() => {
                                setMonthPriceText(M_Price[index])
                                setMonthDateText(M_Date[index]+'的月均價')
                                setMonthText_X(62+(19*index))
                                setMonthText_Y(item-20)
                                setMonthCircle_X(62+(19*index))
                                setMonthCircle_Y(item)
                                setMonthCircleStrokeWidth('3')
                            }}  
                            onMouseOut={() => {
                                setMonthPriceText('')
                                setMonthDateText('')
                                setMonthCircleStrokeWidth('0')
                            }}
                                x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={lineY2[index]} stroke="rgb(203,75,75)" strokeWidth="3" strokeLinecap="round"/>
                        ))}
                        </>
                    )}

                    {/* long YoY */}
                    {YoY && (<>
                        {/* line */}
                        {circleCy1.map((item,index) => (
                                <line key={index} x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={circleCy[index+1]} stroke="rgb(232,194,0)" strokeWidth="3" />
                        ))}
                        {/* circle */}
                        {circleCy.map((item,index) => (
                            <circle key={index} 
                            onMouseMove={() => {
                                setYoYText(longYoY[index])
                                setYoYDateText(M_Date[index]+'的營收年增率')
                                setYoYText_X(62+(19*index))
                                setYoYText_Y(item-20)
                                setYoYCircle_X(62+(19*index))
                                setYoYCircle_Y(item)
                                setYoYCircleStrokeWidth("4")

                            }}  
                            onMouseOut={() => {
                                setYoYText('')
                                setYoYDateText('')
                                setYoYCircleStrokeWidth("0")
                            }}
                            onClick={(e) => {
                                e.target.style.fill="rgb(138,166,246)"
                                e.target.style.stroke="rgb(138,166,246)"
                                setYoYText(longYoY[index])
                                setYoYDateText(M_Date[index]+'的營收年增率')
                                setYoYText_X(62+(19*index))
                                setYoYText_Y(item-20)
                                setYoYCircle_X(62+(19*index))
                                setYoYCircle_Y(item)
                                setYoYCircleStrokeWidth("4")
                            }}
                            cx={62+(19*index)} cy={item} r="3" strokeWidth="4" stroke="rgb(232,194,0)" 
                            fill="rgb(232,194,0)"/>
                        ))}
                    </>)}
                    {/* month price up text & circle */}
                    {monthPrice && (
                    <>
                        <text x={monthText_X} y={monthText_Y}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{monthPriceText}
                        </text>
                        <text x={monthText_X-25} y={monthText_Y-15}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{monthDateText}
                        </text>
                        <circle cx={monthCircle_X} cy={monthCircle_Y} r="6" 
                            strokeWidth={monthCircleStrokeWidth}
                            stroke="rgb(209,95,95)" strokeOpacity="50%" fill="none"/>
                    </>)}
                    {/* long PERatio text & circle*/}
                {YoY && (
                    <>
                        <text x={yoyText_X} y={yoyText_Y}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{yoyText}
                        </text>
                        <text x={yoyText_X-25} y={yoyText_Y-15}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{yoyDateText}
                        </text>
                        <circle cx={yoyCircle_X} cy={yoyCircle_Y} r="7" strokeWidth={yoyCircleStrokeWidth}
                            stroke="rgb(255,214,3)" strokeOpacity="50%" fill="none"/>
                    </>)}
                </svg>
            </div>
            <span className={styles.checkbox}>
                <input id='mYoY' type='checkbox' vaule='營收年增率'onChange={() => setYoY(!YoY)} defaultChecked={YoY}/>
                <label htmlFor='mYoY'>單月營收年增率</label>
                <input id='monthPrice' type='checkbox' vaule='月均價' onChange={() => setmonthPrice(!monthPrice)} defaultChecked={monthPrice} />
                <label htmlFor='monthPrice'>月均價</label>
            </span>
        </div>
    )
}