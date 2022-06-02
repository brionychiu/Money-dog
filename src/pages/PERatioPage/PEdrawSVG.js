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
        const lineY = []
        const lineX = []
        const btw = roundDecimal(((NN-nn)/8),1)
        let yNum, xNum
        for (let i = 0 ; i < 9 ; i++){
            let a = nn + btw*i
            a = a.toFixed(0)
            rightIndexValue.push(a)
        }
        for (let i = 0 ; i < M_Price.length ; i++){
            yNum = Math.abs(((M_Price[i]-nn)/btw)*50)
            yNum= (410-yNum).toFixed(1)
            lineY.push(yNum)
            xNum = 62+(1*i)
            lineX.push(xNum)
        }
        return{rightIndexValue,lineY,lineX}
    }
    const rightIndexValue = rightIndex(nn,NN,M_Price).rightIndexValue
    const lineY = rightIndex(nn,NN,M_Price).lineY
    const lineX = rightIndex(nn,NN,M_Price).lineX
    // console.log(lineX) 這個數值沒有用到，但是第一個line btw是17，要保留

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
            cyNum = 410
            circleCy.push(cyNum)
            strokeWidth.pop()
            strokeWidth.push(0)
            strokeWidth.push(0)
            circleR.push(0)
        }else{
            cyNum = newPEratio[i]-mm
            cyNum = Math.abs((cyNum/btw)*50)
            cyNum = (410-cyNum).toFixed(0)
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
                width="912" height="450"
                viewBox="0 0 912 450"
                xmlns="<http://www.w3.org/2000/svg>">

                {/* PERatio index (倍)*/}
                <line x1="60" y1="10" x2="840" y2="10" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="60" x2="840" y2="60" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="110" x2="840" y2="110" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="160" x2="840" y2="160" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="210" x2="840" y2="210" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="260" x2="840" y2="260" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="310" x2="840" y2="310" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="360" x2="840" y2="360" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="410" x2="840" y2="410" stroke='rgb(234,182,182)' strokeWidth='2' />
                <text x="70" y="15" fill="rgb(106,106,106)" fontSize='13'>本益比:倍</text>
                {leftIndexValue.map((item,index) => (
                    <text key={index} x="35" y={415-(50*index)} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}

                {/* year index */}
                <line x1="289" y1="10" x2="289" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="517" y1="10" x2="517" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="746" y1="10" x2="746" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="55" y="430" fill="rgb(106,106,106)" fontSize='14'>2019</text>
                <text x="280" y="430" fill="rgb(106,106,106)" fontSize='14'>2020</text>
                <text x="510" y="430" fill="rgb(106,106,106)" fontSize='14'>2021</text>
                <text x="740" y="430" fill="rgb(106,106,106)" fontSize='14'>2022</text>

                {/* month price index */}
                <text x="800" y="15" fill="rgb(106,106,106)" fontSize='13'>股價:元</text>
                {rightIndexValue.map((item,index) => (
                    <text key={index} x="850" y={415-(50*index)} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}

                 {/* month price */}
                 {monthPrice && (
                <>
                    <line x1="62" y1={lineY[0]} x2="79" y2={lineY[1]} stroke="rgb(203,75,75)" strokeWidth="3" />                 
                    <line x1="79" y1={lineY[1]} x2="98" y2={lineY[2]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="98" y1={lineY[2]} x2="117" y2={lineY[3]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="117" y1={lineY[3]} x2="136" y2={lineY[4]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="136" y1={lineY[4]} x2="155" y2={lineY[5]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="155" y1={lineY[5]} x2="174" y2={lineY[6]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="174" y1={lineY[6]} x2="193" y2={lineY[7]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="193" y1={lineY[7]} x2="212" y2={lineY[8]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="212" y1={lineY[8]} x2="231" y2={lineY[9]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="231" y1={lineY[9]} x2="250" y2={lineY[10]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="250" y1={lineY[10]} x2="269" y2={lineY[11]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="269" y1={lineY[11]} x2="288" y2={lineY[12]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="288" y1={lineY[12]} x2="307" y2={lineY[13]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="307" y1={lineY[13]} x2="326" y2={lineY[14]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="326" y1={lineY[14]} x2="345" y2={lineY[15]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="345" y1={lineY[15]} x2="364" y2={lineY[16]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="364" y1={lineY[16]} x2="383" y2={lineY[17]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="383" y1={lineY[17]} x2="402" y2={lineY[18]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="401" y1={lineY[18]} x2="421" y2={lineY[19]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="421" y1={lineY[19]} x2="440" y2={lineY[20]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="440" y1={lineY[20]} x2="459" y2={lineY[21]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="459" y1={lineY[21]} x2="478" y2={lineY[22]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="478" y1={lineY[22]} x2="497" y2={lineY[23]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="497" y1={lineY[23]} x2="516" y2={lineY[24]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="516" y1={lineY[24]} x2="535" y2={lineY[25]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="535" y1={lineY[25]} x2="554" y2={lineY[26]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="554" y1={lineY[26]} x2="573" y2={lineY[27]} stroke="rgb(203,75,75)" strokeWidth="3" />                 
                    <line x1="573" y1={lineY[27]} x2="592" y2={lineY[28]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="592" y1={lineY[28]} x2="611" y2={lineY[29]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="611" y1={lineY[29]} x2="630" y2={lineY[30]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="630" y1={lineY[30]} x2="649" y2={lineY[31]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="649" y1={lineY[31]} x2="668" y2={lineY[32]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="668" y1={lineY[32]} x2="687" y2={lineY[33]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="687" y1={lineY[33]} x2="706" y2={lineY[34]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="706" y1={lineY[34]} x2="725" y2={lineY[35]} stroke="rgb(203,75,75)" strokeWidth="3" />                  
                    <line x1="725" y1={lineY[35]} x2="744" y2={lineY[36]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="744" y1={lineY[36]} x2="763" y2={lineY[37]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="763" y1={lineY[37]} x2="782" y2={lineY[38]} stroke="rgb(203,75,75)" strokeWidth="3" />                   
                    <line x1="782" y1={lineY[38]} x2="801" y2={lineY[39]} stroke="rgb(203,75,75)" strokeWidth="3" />                    
                    <line x1="801" y1={lineY[39]} x2="820" y2={lineY[40]} stroke="rgb(203,75,75)" strokeWidth="3" />
                </>)
                }
                {/* long PERatio */}
                {PEratio && (<>
                    <circle cx="62" cy={circleCy[0]} r={circleR[0]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/> 
                    <line x1="62" y1={circleCy[0]} x2="79" y2={circleCy[1]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[0]} />
                    <circle cx="79" cy={circleCy[1]} r={circleR[1]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="79" y1={circleCy[1]} x2="98" y2={circleCy[2]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[1]} />
                    <circle cx="98" cy={circleCy[2]} r={circleR[2]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="98" y1={circleCy[2]} x2="117" y2={circleCy[3]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[2]} />
                    <circle cx="117" cy={circleCy[3]} r={circleR[3]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="117" y1={circleCy[3]} x2="136" y2={circleCy[4]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[3]} />
                    <circle cx="136" cy={circleCy[4]} r={circleR[4]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="136" y1={circleCy[4]} x2="155" y2={circleCy[5]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[4]} />
                    <circle cx="155" cy={circleCy[5]} r={circleR[5]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="155" y1={circleCy[5]} x2="174" y2={circleCy[6]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[5]} />
                    <circle cx="174" cy={circleCy[6]} r={circleR[6]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="174" y1={circleCy[6]} x2="193" y2={circleCy[7]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[6]} />
                    <circle cx="193" cy={circleCy[7]} r={circleR[7]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="193" y1={circleCy[7]} x2="212" y2={circleCy[8]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[7]} />
                    <circle cx="212" cy={circleCy[8]} r={circleR[8]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="212" y1={circleCy[8]} x2="231" y2={circleCy[9]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[8]} />
                    <circle cx="231" cy={circleCy[9]} r={circleR[9]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="231" y1={circleCy[9]} x2="250" y2={circleCy[10]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[9]} />
                    <circle cx="250" cy={circleCy[10]} r={circleR[10]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="250" y1={circleCy[10]} x2="269" y2={circleCy[11]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[10]} />
                    <circle cx="269" cy={circleCy[11]} r={circleR[11]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="269" y1={circleCy[11]} x2="288" y2={circleCy[12]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[11]} />
                    <circle cx="288" cy={circleCy[12]} r={circleR[12]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="288" y1={circleCy[12]} x2="307" y2={circleCy[13]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[12]} />
                    <circle cx="307" cy={circleCy[13]} r={circleR[13]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="307" y1={circleCy[13]} x2="326" y2={circleCy[14]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[13]} />
                    <circle cx="326" cy={circleCy[14]} r={circleR[14]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="326" y1={circleCy[14]} x2="345" y2={circleCy[15]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[14]} />
                    <circle cx="345" cy={circleCy[15]} r={circleR[15]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="345" y1={circleCy[15]} x2="364" y2={circleCy[16]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[15]} />
                    <circle cx="364" cy={circleCy[16]} r={circleR[16]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="364" y1={circleCy[16]} x2="383" y2={circleCy[17]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[16]} />
                    <circle cx="383" cy={circleCy[17]} r={circleR[17]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="383" y1={circleCy[17]} x2="402" y2={circleCy[18]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[17]} />
                    <circle cx="402" cy={circleCy[18]} r={circleR[18]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="402" y1={circleCy[18]} x2="421" y2={circleCy[19]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[18]} />
                    <circle cx="421" cy={circleCy[19]} r={circleR[19]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="421" y1={circleCy[19]} x2="440" y2={circleCy[20]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[19]} />
                    <circle cx="440" cy={circleCy[20]} r={circleR[20]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="440" y1={circleCy[20]} x2="459" y2={circleCy[21]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[20]}/>
                    <circle cx="459" cy={circleCy[21]} r={circleR[21]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="459" y1={circleCy[21]} x2="478" y2={circleCy[22]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[21]} />
                    <circle cx="478" cy={circleCy[22]} r={circleR[22]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="478" y1={circleCy[22]} x2="497" y2={circleCy[23]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[22]} />
                    <circle cx="497" cy={circleCy[23]} r={circleR[23]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="497" y1={circleCy[23]} x2="516" y2={circleCy[24]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[23]} />
                    <circle cx="516" cy={circleCy[24]} r={circleR[24]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="516" y1={circleCy[24]} x2="535" y2={circleCy[25]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[24]} />
                    <circle cx="535" cy={circleCy[25]} r={circleR[25]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="535" y1={circleCy[25]} x2="554" y2={circleCy[26]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[25]} />
                    <circle cx="554" cy={circleCy[26]} r={circleR[26]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="554" y1={circleCy[26]} x2="573" y2={circleCy[27]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[26]} />
                    <circle cx="573" cy={circleCy[27]} r={circleR[27]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="573" y1={circleCy[27]} x2="592" y2={circleCy[28]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[27]} />
                    <circle cx="592" cy={circleCy[28]} r={circleR[28]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="592" y1={circleCy[28]} x2="611" y2={circleCy[29]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[28]} />
                    <circle cx="611" cy={circleCy[29]} r={circleR[29]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="611" y1={circleCy[29]} x2="630" y2={circleCy[30]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[29]} />
                    <circle cx="630" cy={circleCy[30]} r={circleR[30]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="630" y1={circleCy[30]} x2="649" y2={circleCy[31]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[30]} />
                    <circle cx="649" cy={circleCy[31]} r={circleR[31]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="649" y1={circleCy[31]} x2="668" y2={circleCy[32]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[31]} />
                    <circle cx="668" cy={circleCy[32]} r={circleR[32]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="668" y1={circleCy[32]} x2="687" y2={circleCy[33]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[32]} />
                    <circle cx="687" cy={circleCy[33]} r={circleR[33]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="687" y1={circleCy[33]} x2="706" y2={circleCy[34]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[33]} />
                    <circle cx="706" cy={circleCy[34]} r={circleR[34]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="706" y1={circleCy[34]} x2="725" y2={circleCy[35]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[34]} />
                    <circle cx="725" cy={circleCy[35]} r={circleR[35]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="725" y1={circleCy[35]} x2="744" y2={circleCy[36]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[35]} />
                    <circle cx="744" cy={circleCy[36]} r={circleR[36]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="744" y1={circleCy[36]} x2="763" y2={circleCy[37]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[36]} />
                    <circle cx="763" cy={circleCy[37]} r={circleR[37]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="763" y1={circleCy[37]} x2="782" y2={circleCy[38]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[37]} />
                    <circle cx="782" cy={circleCy[38]} r={circleR[38]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/>
                    <line x1="782" y1={circleCy[38]} x2="801" y2={circleCy[39]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[38]} />
                    <circle cx="801" cy={circleCy[39]} r={circleR[39]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/> 
                    <line x1="801" y1={circleCy[39]} x2="820" y2={circleCy[40]} stroke="rgb(232,194,0)" strokeWidth={strokeWidth[39]} />
                    <circle cx="820" cy={circleCy[40]} r={circleR[40]} strokeWidth="4" stroke="rgb(232,194,0)" fill="rgb(232,194,0)"/> 
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