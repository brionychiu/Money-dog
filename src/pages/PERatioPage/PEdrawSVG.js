import { useState } from 'react';

// styles
import styles from './PERatio.module.css'

export const PEdrawSVG = ({longPEratio,M_Price,M_Date}) => {
    // ------------checkbox --------------
    const [PEratio, setPEratio] = useState(true)
    const [monthPrice, setmonthPrice] = useState(true)

    // ---------- set text (hover) -------------
    const [monthPriceText, setMonthPriceText] = useState('')
    const [monthDateText, setMonthDateText] = useState('')
    const [monthText_X, setMonthText_X] = useState(null)
    const [monthText_Y, setMonthText_Y] = useState(null)
    const [monthCircle_X, setMonthCircle_X] = useState(null)
    const [monthCircle_Y, setMonthCircle_Y] = useState(null)
    const [monthCircleStrokeWidth, setMonthCircleStrokeWidth] = useState('0')
    const [peText, setPEText] = useState('')
    const [peDateText, setPEDateText] = useState('')
    const [peText_X, setPEText_X] = useState(null)
    const [peText_Y, setPEText_Y] = useState(null)
    const [peCircle_X, setPECircle_X] = useState(false)
    const [peCircle_Y, setPECircle_Y] = useState(false)
    const [peCircleStrokeWidth, setPECircleStrokeWidth] = useState('0')

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
        for (let i = 0 ; i < M_Price.length ; i++){
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

    // ---------- long PERatio -----------
    let newPEratio = longPEratio.map(e => {
        if(e === '無'){
            e=0
        }
        return e 
    });
    let leftIndex = (newPEratio) => {
    let mm = Math.floor(Math.min(...newPEratio))
    mm = mm - (mm*0.01)
    let MM = Math.ceil(Math.max(...newPEratio))
    MM = MM + (MM*0.01)
    const leftIndexValue = []
    const circleCy = []
    const strokeWidth = []
    const circleR = []
    const difference = Math.abs(MM - mm)
    const btw = roundDecimal(difference/8,1)
    for (let i = 0 ; i < 9 ; i++){
        let a = mm + btw*i
        a = a.toFixed(0)
        leftIndexValue.push(a)
    }

    // ---------- create circle & line of PERatio
    for (let i = 0 ; i < newPEratio.length ; i++){
        let cyNum
        if (newPEratio[i] === 0){
            cyNum = 450
            circleCy.push(cyNum)
            strokeWidth.pop()
            strokeWidth.push(0)
            strokeWidth.push(0)
            circleR.push(0)
        }else{
            cyNum = newPEratio[i]-mm
            cyNum = Math.abs((cyNum/btw)*50)
            cyNum = (450-cyNum).toFixed(0)
            circleCy.push(cyNum)
            strokeWidth.push(3)
            circleR.push(3)
        }
    }   
        const circleCy1 = circleCy.slice(0,-1)

    return {leftIndexValue,circleCy, circleCy1, strokeWidth,circleR}
    
}
    const leftIndexValue = leftIndex(newPEratio).leftIndexValue
    const circleCy = leftIndex(newPEratio).circleCy
    const circleCy1 = leftIndex(newPEratio).circleCy1
    const strokeWidth = leftIndex(newPEratio).strokeWidth
    const circleR = leftIndex(newPEratio).circleR
    
    return(
        <div className={styles['PERatio-SVG']}>
             <div className={styles.topbar}>
                <span>近三年每月本益比</span>
                <div className={styles.orange}></div>
                <span>本益比</span>
                <div className={styles.red}></div>
                <span>月均價</span>
            </div>
            <div className={styles['pe-chart']}>
                <svg
                    id='svg'
                    width="912" height="480"
                    viewBox="0 0 912 480"
                    xmlns="<http://www.w3.org/2000/svg>"
                    cursor="pointer"
                    overflow="visisble">


                    {/* PERatio index (倍)*/}
                    <line x1="60" y1="50" x2="840" y2="50" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="100" x2="840" y2="100" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="150" x2="840" y2="150" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="200" x2="840" y2="200" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="250" x2="840" y2="250" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="300" x2="840" y2="300" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="350" x2="840" y2="350" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="400" x2="840" y2="400" stroke='rgb(226,226,226)' strokeWidth='1' />
                    <line x1="60" y1="450" x2="840" y2="450" stroke='rgb(234,182,182)' strokeWidth='2' />
                    <text x="70" y="25" fill="rgb(106,106,106)" fontSize='13'>本益比:倍</text>
                    {leftIndexValue.map((item,index) => (
                        <text key={index} x="35" y={450-(50*index)} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
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

                    {/* month price */}
                    {monthPrice && (
                    <>
                        {lineY1.map((item,index) => (
                            <line  
                            key={index}
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
                            x1={62+(19*index)} y1={item} x2={81+(19*index)} 
                            y2={lineY2[index]} stroke="rgb(203,75,75)" strokeWidth="3" 
                            strokeLinecap="round"/>
                        ))}
                    </>)}
                    {/* long PERatio */}
                    {PEratio && (
                    <>
                        {/* line */}
                        {circleCy1.map((item,index) => (
                            <line key={index} 
                            x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={circleCy[index+1]} 
                            stroke="rgb(232,194,0)" strokeWidth={strokeWidth[index]} />
                        ))}
                        {circleCy.map((item,index) => (
                            <circle 
                            onMouseMove={() => {
                                setPEText(longPEratio[index])
                                setPEDateText(M_Date[index]+'的本益比')
                                setPEText_X(62+(19*index))
                                setPEText_Y(item-20)
                                setPECircle_X(62+(19*index))
                                setPECircle_Y(item)
                                setPECircleStrokeWidth("4")

                            }}  
                            onMouseOut={() => {
                                setPEText('')
                                setPEDateText('')
                                setPECircleStrokeWidth("0")
                            }}
                            onClick={(e) => {
                                e.target.style.fill="rgb(71, 170, 253)"
                                e.target.style.stroke="rgb(71, 170, 253)"
                                setPEText(longPEratio[index])
                                setPEDateText(M_Date[index]+'的本益比')
                                setPEText_X(62+(19*index))
                                setPEText_Y(item-20)
                                setPECircle_X(62+(19*index))
                                setPECircle_Y(item)
                                setPECircleStrokeWidth("4")
                            }}
                            key={index} cx={62+(19*index)} cy={item} 
                            r={circleR[index]} strokeWidth="4" stroke="rgb(232,194,0)" 
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
                {PEratio && (
                    <>
                        <text x={peText_X} y={peText_Y}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{peText}
                        </text>
                        <text x={peText_X-25} y={peText_Y-15}  fill="rgb(106,106,106)" 
                            fontWeight="600" fontSize='13'>{peDateText}
                        </text>
                        <circle cx={peCircle_X} cy={peCircle_Y} r="7" strokeWidth={peCircleStrokeWidth}
                            stroke="rgb(255,214,3)" strokeOpacity="50%" fill="none"/>
                    </>)}
                </svg>
            </div>
            <span className={styles.checkbox}>
                <input id='mPEratio' type='checkbox' vaule='每月本益比'onChange={() => setPEratio(!PEratio)} defaultChecked={PEratio}/>
                <label htmlFor='mPEratio'>每月本益比</label>
                <input id='monthPrice' type='checkbox' vaule='月均價' onChange={() => setmonthPrice(!monthPrice)} defaultChecked={monthPrice} />
                <label htmlFor='monthPrice'>月均價</label>
            </span>

        </div>
    )
}