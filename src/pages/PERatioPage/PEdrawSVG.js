import { useState } from 'react';

// styles
import styles from './PERatio.module.css'

export const PEdrawSVG = ({longPEratio,M_Price}) => {
    // ------------checkbox
    const [PEratio, setPEratio] = useState(true)
    const [monthPrice, setmonthPrice] = useState(true)
    // console.log(longPEratio)
    // console.log(M_Price)

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
    return {leftIndexValue,circleCy,strokeWidth,circleR}
    
}
    const leftIndexValue = leftIndex(newPEratio).leftIndexValue
    const circleCy = leftIndex(newPEratio).circleCy
    const strokeWidth = leftIndex(newPEratio).strokeWidth
    const circleR = leftIndex(newPEratio).circleR

    return(
        <div className={styles['PERatio-SVG']}>
             <div>
                <span>近三年每月本益比</span>
                <div className={styles.orange}></div>
                <span>本益比</span>
                <div className={styles.red}></div>
                <span>月均價</span>
            </div>
            <svg
                id='svg'
                width="912" height="480"
                viewBox="0 0 912 480"
                xmlns="<http://www.w3.org/2000/svg>">

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
                 {/* 這邊要加 stroke-linecap="round" 讓line不會有斷點*/}
                 {monthPrice && (
                <>  {lineY1.map((item,index) => (
                    <line  key={index} x1={62+(19*index)} y1={item} x2={81+(19*index)} y2={lineY2[index]} stroke="rgb(203,75,75)" strokeWidth="3" stroke-linecap="round"/>
                ))}
                </>)
                }
                {/* long PERatio */}
                {PEratio && (<>
                    {circleCy.map((item,index) => (
                        <circle key={index} cx={62+(19*index)} cy={item} r={circleR[index]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/> 
                   ))}
                   
                    <line x1="62" y1={circleCy[0]} x2="79" y2={circleCy[1]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[0]} />
                    <line x1="79" y1={circleCy[1]} x2="98" y2={circleCy[2]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[1]} />
                    <line x1="98" y1={circleCy[2]} x2="117" y2={circleCy[3]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[2]} />                    
                    <line x1="117" y1={circleCy[3]} x2="136" y2={circleCy[4]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[3]} />                    
                    <line x1="136" y1={circleCy[4]} x2="155" y2={circleCy[5]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[4]} />
                    <line x1="155" y1={circleCy[5]} x2="174" y2={circleCy[6]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[5]} />                    
                    <line x1="174" y1={circleCy[6]} x2="193" y2={circleCy[7]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[6]} />                  
                    <line x1="193" y1={circleCy[7]} x2="212" y2={circleCy[8]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[7]} />                  
                    <line x1="212" y1={circleCy[8]} x2="231" y2={circleCy[9]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[8]} />                   
                    <line x1="231" y1={circleCy[9]} x2="250" y2={circleCy[10]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[9]} />                   
                    <line x1="250" y1={circleCy[10]} x2="269" y2={circleCy[11]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[10]} />                  
                    <line x1="269" y1={circleCy[11]} x2="288" y2={circleCy[12]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[11]} />                    
                    <line x1="288" y1={circleCy[12]} x2="307" y2={circleCy[13]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[12]} />                  
                    <line x1="307" y1={circleCy[13]} x2="326" y2={circleCy[14]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[13]} />                   
                    <line x1="326" y1={circleCy[14]} x2="345" y2={circleCy[15]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[14]} />                    
                    <line x1="345" y1={circleCy[15]} x2="364" y2={circleCy[16]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[15]} />                  
                    <line x1="364" y1={circleCy[16]} x2="383" y2={circleCy[17]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[16]} />                   
                    <line x1="383" y1={circleCy[17]} x2="402" y2={circleCy[18]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[17]} />                   
                    <line x1="402" y1={circleCy[18]} x2="421" y2={circleCy[19]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[18]} />                  
                    <line x1="421" y1={circleCy[19]} x2="440" y2={circleCy[20]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[19]} />
                    <line x1="440" y1={circleCy[20]} x2="459" y2={circleCy[21]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[20]} />                    
                    <line x1="459" y1={circleCy[21]} x2="478" y2={circleCy[22]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[21]} />                   
                    <line x1="478" y1={circleCy[22]} x2="497" y2={circleCy[23]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[22]} />                  
                    <line x1="497" y1={circleCy[23]} x2="516" y2={circleCy[24]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[23]} />                    
                    <line x1="516" y1={circleCy[24]} x2="535" y2={circleCy[25]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[24]} />                   
                    <line x1="535" y1={circleCy[25]} x2="554" y2={circleCy[26]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[25]} />                   
                    <line x1="554" y1={circleCy[26]} x2="573" y2={circleCy[27]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[26]} />                    
                    <line x1="573" y1={circleCy[27]} x2="592" y2={circleCy[28]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[27]} />                  
                    <line x1="592" y1={circleCy[28]} x2="611" y2={circleCy[29]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[28]} />                  
                    <line x1="611" y1={circleCy[29]} x2="630" y2={circleCy[30]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[29]} />                
                    <line x1="630" y1={circleCy[30]} x2="649" y2={circleCy[31]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[30]} />                  
                    <line x1="649" y1={circleCy[31]} x2="668" y2={circleCy[32]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[31]} />                    
                    <line x1="668" y1={circleCy[32]} x2="687" y2={circleCy[33]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[32]} />                  
                    <line x1="687" y1={circleCy[33]} x2="706" y2={circleCy[34]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[33]} />                   
                    <line x1="706" y1={circleCy[34]} x2="725" y2={circleCy[35]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[34]} />                    
                    <line x1="725" y1={circleCy[35]} x2="744" y2={circleCy[36]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[35]} />                    
                    <line x1="744" y1={circleCy[36]} x2="763" y2={circleCy[37]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[36]} />                    
                    <line x1="763" y1={circleCy[37]} x2="782" y2={circleCy[38]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[37]} />
                    <line x1="782" y1={circleCy[38]} x2="801" y2={circleCy[39]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[38]} />
                    <line x1="801" y1={circleCy[39]} x2="820" y2={circleCy[40]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[39]} /> 
            </>)}


            </svg>
            <span className={styles.checkbox}>
                <input id='mPEratio' type='checkbox' vaule='每月本益比'onChange={() => setPEratio(!PEratio)} defaultChecked={PEratio}/>
                <label htmlFor='mPEratio'>每月本益比</label>
                <input id='monthPrice' type='checkbox' vaule='月均價' onChange={() => setmonthPrice(!monthPrice)} defaultChecked={monthPrice} />
                <label htmlFor='monthPrice'>月均價</label>
            </span>

        </div>
    )
}