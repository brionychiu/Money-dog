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
        let num1, y1Num, heightNum, difference, btw
        if (mm<0 && MM>0){
            const topDifference = Math.abs(MM - 0)
            const downDifference = Math.abs(mm - 0)
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
            return [{leftIndexValue,rectangleHeight,rectangleY1}]
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
            return [{leftIndexValue,rectangleHeight,rectangleY1}]
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
                y1Num= 410-heightNum
                heightNum = heightNum.toFixed(1)
                y1Num = y1Num.toFixed(1)
                rectangleY1.push(y1Num)
                rectangleHeight.push(heightNum)
            }
            return [{leftIndexValue,rectangleHeight,rectangleY1}]
        }
    }
    const leftIndexValue = leftIndex(mm,MM,Q_EPS)[0].leftIndexValue
    const rectangleHeight = leftIndex(mm,MM,Q_EPS)[0].rectangleHeight
    const rectangleY1 = leftIndex(mm,MM,Q_EPS)[0].rectangleY1

    // ------------ M_Price & right index --------------
    let nn = Math.floor(Math.min(...M_Price))
    let NN = Math.ceil(Math.max(...M_Price))
    let rightIndex = (nn,NN,M_Price) => {
        const rightIndexValue = []
        const circleCy = []
        const btw = roundDecimal(((NN-nn)/8),1)
        let cyNum
        for (let i = 0 ; i < 9 ; i++){
            let a = nn + btw*i
            a = a.toFixed(0)
            rightIndexValue.push(a)
        }
        for (let i = 0 ; i < 42 ; i++){
            cyNum = Math.abs(((M_Price[i]-nn)/btw)*50)
            cyNum= (410-cyNum).toFixed(1)
            circleCy.push(cyNum)
        }
        return({rightIndexValue,circleCy})
    }
    const rightIndexValue = rightIndex(nn,NN,M_Price).rightIndexValue
    const circleCy = rightIndex(nn,NN,M_Price).circleCy

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
                width="912" height="450"
                viewBox="0 0 912 450"
                xmlns="<http://www.w3.org/2000/svg>"
            >
                {/* eps index */}
                <line x1="60" y1="10" x2="840" y2="10" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="60" x2="840" y2="60" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="110" x2="840" y2="110" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="160" x2="840" y2="160" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="210" x2="840" y2="210" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="260" x2="840" y2="260" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="310" x2="840" y2="310" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="360" x2="840" y2="360" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="410" x2="840" y2="410" stroke='rgb(232,175,0)' strokeWidth='1' />
                <text x="35" y="15" fill="rgb(106,106,106)" fontWeight="bold">元</text>
                <text x="35" y="415" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[0]}</text>
                <text x="35" y="365" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[1]}</text>
                <text x="35" y="315" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[2]}</text>
                <text x="35" y="265" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[3]}</text>
                <text x="35" y="215" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[4]}</text>
                <text x="35" y="165" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[5]}</text>
                <text x="35" y="115" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[6]}</text>
                <text x="35" y="65" fill="rgb(106,106,106)" fontSize='14'>{leftIndexValue[7]}</text>

                {/* month price index */}
                <text x="850" y="15" fill="rgb(106,106,106)" fontWeight="bold">股價</text>
                <text x="850" y="415" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[0]}</text>
                <text x="850" y="365" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[1]}</text>
                <text x="850" y="315" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[2]}</text>
                <text x="850" y="265" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[3]}</text>
                <text x="850" y="215" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[4]}</text>
                <text x="850" y="165" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[5]}</text>
                <text x="850" y="115" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[6]}</text>
                <text x="850" y="65" fill="rgb(106,106,106)" fontSize='14'>{rightIndexValue[7]}</text>

                {/* year index */}
                <line x1="289" y1="10" x2="289" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="517" y1="10" x2="517" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="746" y1="10" x2="746" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="55" y="430" fill="rgb(106,106,106)" fontSize='14'>2019</text>
                <text x="280" y="430" fill="rgb(106,106,106)" fontSize='14'>2020</text>
                <text x="510" y="430" fill="rgb(106,106,106)" fontSize='14'>2021</text>
                <text x="740" y="430" fill="rgb(106,106,106)" fontSize='14'>2022</text>

                {/* eps value */}
                {qEPS && (
                <>
                    <rect  x="75" y={rectangleY1[0]} width="30" height={rectangleHeight[0]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="132" y={rectangleY1[1]} width="30" height={rectangleHeight[1]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="189" y={rectangleY1[2]} width="30" height={rectangleHeight[2]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="246" y={rectangleY1[3]} width="30" height={rectangleHeight[3]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="303" y={rectangleY1[4]} width="30" height={rectangleHeight[4]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="360" y={rectangleY1[5]} width="30" height={rectangleHeight[5]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="417" y={rectangleY1[6]} width="30" height={rectangleHeight[6]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="474" y={rectangleY1[7]} width="30" height={rectangleHeight[7]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="531" y={rectangleY1[8]} width="30" height={rectangleHeight[8]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="588" y={rectangleY1[9]} width="30" height={rectangleHeight[9]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="645" y={rectangleY1[10]} width="30" height={rectangleHeight[10]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="702" y={rectangleY1[11]} width="30" height={rectangleHeight[11]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                    <rect  x="760" y={rectangleY1[12]} width="30" height={rectangleHeight[12]} 
                        fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                        fillOpacity='0.3' strokeOpacity='0.9'  />
                </>
                )}
                {monthPrice && (
                <>
                    {/* <circle cx="62" cy={circleCy[0]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="62" y1={circleCy[0]} x2="79" y2={circleCy[1]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="79" cy={circleCy[1]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="79" y1={circleCy[1]} x2="98" y2={circleCy[2]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="98" cy={circleCy[2]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="98" y1={circleCy[2]} x2="117" y2={circleCy[3]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="117" cy={circleCy[3]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="117" y1={circleCy[3]} x2="136" y2={circleCy[4]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="136" cy={circleCy[4]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="136" y1={circleCy[4]} x2="155" y2={circleCy[5]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="155" cy={circleCy[5]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="155" y1={circleCy[5]} x2="174" y2={circleCy[6]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="174" cy={circleCy[6]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="174" y1={circleCy[6]} x2="193" y2={circleCy[7]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="193" cy={circleCy[7]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="193" y1={circleCy[7]} x2="212" y2={circleCy[8]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="212" cy={circleCy[8]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="212" y1={circleCy[8]} x2="231" y2={circleCy[9]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="231" cy={circleCy[9]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="231" y1={circleCy[9]} x2="250" y2={circleCy[10]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="250" cy={circleCy[10]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="250" y1={circleCy[10]} x2="269" y2={circleCy[11]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="269" cy={circleCy[11]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="269" y1={circleCy[11]} x2="288" y2={circleCy[12]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="288" cy={circleCy[12]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="288" y1={circleCy[12]} x2="307" y2={circleCy[13]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="307" cy={circleCy[13]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="307" y1={circleCy[13]} x2="326" y2={circleCy[14]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="326" cy={circleCy[14]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="326" y1={circleCy[14]} x2="345" y2={circleCy[15]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="345" cy={circleCy[15]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="345" y1={circleCy[15]} x2="364" y2={circleCy[16]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="364" cy={circleCy[16]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="364" y1={circleCy[16]} x2="383" y2={circleCy[17]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="383" cy={circleCy[17]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="383" y1={circleCy[17]} x2="402" y2={circleCy[18]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="402" cy={circleCy[18]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="401" y1={circleCy[18]} x2="421" y2={circleCy[19]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="421" cy={circleCy[19]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="421" y1={circleCy[19]} x2="440" y2={circleCy[20]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="440" cy={circleCy[20]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="440" y1={circleCy[20]} x2="459" y2={circleCy[21]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="459" cy={circleCy[21]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="459" y1={circleCy[21]} x2="478" y2={circleCy[22]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="478" cy={circleCy[22]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="478" y1={circleCy[22]} x2="497" y2={circleCy[23]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="497" cy={circleCy[23]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="497" y1={circleCy[23]} x2="516" y2={circleCy[24]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="516" cy={circleCy[24]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="516" y1={circleCy[24]} x2="535" y2={circleCy[25]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="535" cy={circleCy[25]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="535" y1={circleCy[25]} x2="554" y2={circleCy[26]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="554" cy={circleCy[26]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="554" y1={circleCy[26]} x2="573" y2={circleCy[27]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="573" cy={circleCy[27]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="573" y1={circleCy[27]} x2="592" y2={circleCy[28]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="592" cy={circleCy[28]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="592" y1={circleCy[28]} x2="611" y2={circleCy[29]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="611" cy={circleCy[29]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="611" y1={circleCy[29]} x2="630" y2={circleCy[30]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="630" cy={circleCy[30]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="630" y1={circleCy[30]} x2="649" y2={circleCy[31]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="649" cy={circleCy[31]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="649" y1={circleCy[31]} x2="668" y2={circleCy[32]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="668" cy={circleCy[32]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="668" y1={circleCy[32]} x2="687" y2={circleCy[33]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="687" cy={circleCy[33]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="687" y1={circleCy[33]} x2="706" y2={circleCy[34]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="706" cy={circleCy[34]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="706" y1={circleCy[34]} x2="725" y2={circleCy[35]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="725" cy={circleCy[35]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="725" y1={circleCy[35]} x2="744" y2={circleCy[36]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="744" cy={circleCy[36]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="744" y1={circleCy[36]} x2="763" y2={circleCy[37]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="763" cy={circleCy[37]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="763" y1={circleCy[37]} x2="782" y2={circleCy[38]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="782" cy={circleCy[38]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="782" y1={circleCy[38]} x2="801" y2={circleCy[39]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="801" cy={circleCy[39]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                    <line x1="801" y1={circleCy[39]} x2="820" y2={circleCy[40]} stroke="rgb(203,75,75)" strokeWidth="3" />
                    {/* <circle cx="820" cy={circleCy[40]} r="1" strokeWidth="4" stroke="rgb(203,75,75)" fill="rgb(203,75,75)"/> */}
                </>)}
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