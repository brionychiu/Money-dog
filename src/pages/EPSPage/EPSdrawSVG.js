    import { useState } from 'react';

    // styles
    import styles from './EPS.module.css'

    export const EPSdrawSVG = ({Q_EPS}) => {
        console.log(Q_EPS)
        
        // -------- left index value ---------- 
        let mm = Math.floor(Math.min(...Q_EPS))
        let MM = Math.ceil(Math.max(...Q_EPS))
        let roundDecimal = (val, precision) => {
            return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0))
        }

        let leftIndex = (mm,MM,Q_EPS) => {
            const indexValue = []
            const y1 = []
            const height = []
            let num1, y1Num, heightNum, difference, btw
            if (mm<0 && MM>0){
                const topDifference = Math.abs(MM - 0)
                const downDifference = Math.abs(mm - 0)
                const topbtw = roundDecimal(topDifference/4,1)
                const downbtw = roundDecimal(downDifference/4,1)
                for (let i = 1 ; i < 5 ; i++){
                    let a = 0 - downbtw*i
                    a = a.toFixed(1);
                    indexValue.unshift(a)
                }
                indexValue.push(0)
                for (let i = 1 ; i < 5 ; i++){
                    let b = 0 + topbtw*i
                    b = b.toFixed(1);
                    indexValue.push(b)
                }
                for(let i=0; i<13; i++){
                    if (Q_EPS[i]> 0){
                        num1 = Math.abs(Q_EPS[i] - mm)
                        heightNum = Math.abs((num1/topbtw)*40)
                        y1Num= 210-heightNum
                        y1.push(y1Num)
                        height.push(heightNum)
                    }else if(Q_EPS[i]<= 0){
                        num1 = Math.abs(Q_EPS[i] - mm)
                        heightNum = Math.abs((num1/downbtw)*40)
                        y1Num= 210
                        y1.push(y1Num)
                        height.push(heightNum)
                    }
                }
                return [{indexValue,height,y1}]
            }else if(mm<0 && MM<0){
                difference = Math.abs(mm - 0)
                btw = roundDecimal(difference/7,1)
                for (let i = 1 ; i < 9 ; i++){
                    let a = 0 + btw*i
                    a = a.toFixed(1);
                    indexValue.push(a)
                }
                indexValue.push(0)
                return [{indexValue,pattern:'allNegi'}]
            }else{
                difference = Math.abs(MM - 0)
                btw = roundDecimal(difference/7,1)
                indexValue.push(0)
                for (let i = 1 ; i < 9 ; i++){
                    let a = 0 + btw*i
                    a = a.toFixed(1)
                    indexValue.push(a)
                }
                for(let i=0; i<13; i++){
                    heightNum = Math.abs((Q_EPS[i]/btw)*50)
                    let y1Num= 410-heightNum
                    heightNum = heightNum.toFixed(1)
                    y1Num = y1Num.toFixed(1)
                    y1.push(y1Num)
                    height.push(heightNum)
                    console.log(height,y1)
                }
                return [{indexValue,height,y1}]
            }
        }
        console.log('最小整數:',mm)
        console.log('最大整數:',MM)
        // console.log('最大最小距離',difference);
        // console.log('每段距離除8四捨五入:',btw);
        console.log(leftIndex(mm,MM,Q_EPS))
        let cc = leftIndex(mm,MM,Q_EPS)[0].indexValue[0]
        console.log('cc:',cc)
        console.log(typeof(cc))
        let ccnum = Number(cc) 
        console.log('ccnum:',ccnum)
        console.log(typeof(ccnum))
        const index = leftIndex(mm,MM,Q_EPS)[0].indexValue
        const height = leftIndex(mm,MM,Q_EPS)[0].height
        const y1 = leftIndex(mm,MM,Q_EPS)[0].y1
        // console.log(index)

        // -------- rec eps value ---------- 

        // let rectangle = (Q_EPS,pattern) => {

        //     if(pattern === 'posiNeg'){
                
        //     }else if(pattern === 'allNegi'){

        //     }else{

        //     }
        // }
        const num1 = Q_EPS[4]
        console.log('num1第一個數值:',num1)
        let num2 = Math.abs(num1 - 0)
        console.log('與num1的距離:',num2)
        let num3 = Math.abs((num2/0.3)*50)
        let y2= 210
        let height1 = num3
        console.log('座標跑距離:',num3)

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
                    <line x1="100" y1="10" x2="800" y2="10" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="60" x2="800" y2="60" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="110" x2="800" y2="110" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="160" x2="800" y2="160" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="210" x2="800" y2="210" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="260" x2="800" y2="260" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="310" x2="800" y2="310" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="360" x2="800" y2="360" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="100" y1="410" x2="800" y2="410" stroke='rgb(232,175,0)' strokeWidth='1.5' />
                    <text x="65" y="15" fill="rgb(106,106,106)" fontWeight="bold">元</text>
                    <text x="65" y="415" fill="rgb(106,106,106)" fontSize='14'>{index[0]}</text>
                    <text x="65" y="365" fill="rgb(106,106,106)" fontSize='14'>{index[1]}</text>
                    <text x="65" y="315" fill="rgb(106,106,106)" fontSize='14'>{index[2]}</text>
                    <text x="65" y="265" fill="rgb(106,106,106)" fontSize='14'>{index[3]}</text>
                    <text x="65" y="215" fill="rgb(106,106,106)" fontSize='14'>{index[4]}</text>
                    <text x="65" y="165" fill="rgb(106,106,106)" fontSize='14'>{index[5]}</text>
                    <text x="65" y="115" fill="rgb(106,106,106)" fontSize='14'>{index[6]}</text>
                    <text x="65" y="65" fill="rgb(106,106,106)" fontSize='14'>{index[7]}</text>

                    {/* year index */}
                    <line x1="320" y1="10" x2="320" y2="410" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="540" y1="10" x2="540" y2="410" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <line x1="760" y1="10" x2="760" y2="410" stroke='rgb(226,226,226)' strokeWidth='1.5' />
                    <text x="90" y="430" fill="rgb(106,106,106)" fontSize='14'>2019</text>
                    <text x="320" y="430" fill="rgb(106,106,106)" fontSize='14'>2020</text>
                    <text x="540" y="430" fill="rgb(106,106,106)" fontSize='14'>2021</text>
                    <text x="760" y="430" fill="rgb(106,106,106)" fontSize='14'>2022</text>

                    <text x="820" y="35" fill="rgb(106,106,106)" fontWeight="bold">股價</text>

                    {/* eps value */}
                        <rect  x="100" y={y2} width="30" height={height1} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="155" y={y1[1]} width="30" height={height[1]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="210" y={y1[2]} width="30" height={height[2]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="265" y={y1[3]} width="30" height={height[3]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="320" y={y1[4]} width="30" height={height[4]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="375" y={y1[5]} width="30" height={height[5]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="430" y={y1[6]} width="30" height={height[6]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="485" y={y1[7]} width="30" height={height[7]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="540" y={y1[8]} width="30" height={height[8]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="595" y={y1[9]} width="30" height={height[9]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="650" y={y1[10]} width="30" height={height[10]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="705" y={y1[11]} width="30" height={height[11]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                        <rect  x="760" y={y1[12]} width="30" height={height[12]} 
                            fill="rgb(255,193,2)" strokeWidth='2' stroke='rgb(232,194,0)' 
                            fillOpacity='0.5' strokeOpacity='0.9'  />
                    {/* <circle
                        cx="20" cy="20" r="8"
                        strokeWidth="4" stroke="tomato"
                        fill="none"
                    /> */}

                    

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