
// styles
import styles from './Taiex.module.css'

export const TaiexSVG = ({taiex,otc}) => {

    const close = taiex[0].taiexClose
    const otcClose = otc[0].otcClose
    // const date = taiex[0].taiexDate
    // const high = taiex[0].taiexHigh
    // const low = taiex[0].taiexLow
    // const open = taiex[0].taiexOpen

    // right price index    
    const mm = Math.floor(Math.min(...close))-100
    const MM = Math.ceil(Math.max(...close))+100

    let rightIndex = (mm,MM,close) => {
        const btw = ((MM-mm)/10).toFixed(0)
        const rightIndexValue = []
        const closeY = []
        let a, numY
        for(let i = 0 ; i < 9 ; i++){
            a = mm + btw*i
            a = a.toFixed(0)
            rightIndexValue.push(a)
        }
        for(let i = 0 ; i < close.length ; i++){
            numY = ((close[i]-rightIndexValue[0])/btw)*40
            numY = numY.toFixed(0)
            closeY.push(numY)
        }
        return {rightIndexValue,closeY}
    }
    const rightIndexValue = rightIndex(mm,MM,close).rightIndexValue
    const closeY = rightIndex(mm,MM,close).closeY

    // left price index    
    const nn = Math.floor(Math.min(...otcClose))
    const NN = Math.ceil(Math.max(...otcClose))

    let leftIndex = (nn,NN,otcClose) => {
        const btw = ((NN-nn)/10).toFixed(0)
        const leftIndexValue = []
        const otcCloseY = []
        let b, numY
        for(let i = 0 ; i < 9 ; i++){
            b = nn + btw*i
            b = b.toFixed(0)
            leftIndexValue.push(b)
        }
        for(let i = 0 ; i < otcClose.length ; i++){
            numY = ((otcClose[i]-leftIndexValue[0])/btw)*40
            numY = numY.toFixed(0)
            otcCloseY.push(numY)
        }
        return {leftIndexValue,otcCloseY}
    }
    const leftIndexValue = leftIndex(nn,NN,otcClose).leftIndexValue
    const otcCloseY = leftIndex(nn,NN,otcClose).otcCloseY

    return(
        <div  className={styles['index-svg']}>
            <div className={styles.color}>
                <div className={styles.blue}></div>
                <span>櫃買指數</span>
                <div className={styles.red}></div>
                <span>上市加權指數</span>
            </div>
            <svg
                width="670" height="480"
                viewBox="0 0 670 480"
                xmlns="<http://www.w3.org/2000/svg>">
                {/* horizon line */}
                <line x1="60" y1="90" x2="600" y2="90" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="130" x2="600" y2="130" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="170" x2="600" y2="170" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="210" x2="600" y2="210" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="250" x2="600" y2="250" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="290" x2="600" y2="290" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="330" x2="600" y2="330" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="370" x2="600" y2="370" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="60" y1="410" x2="600" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                
                {/* straight line */}
                <line x1="200" y1="50" x2="200" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="340" y1="50" x2="340" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <line x1="480" y1="50" x2="480" y2="410" stroke='rgb(226,226,226)' strokeWidth='1' />
                <text x="180" y="440" fill="rgb(106,106,106)" fontSize='13'>2022/3</text>
                <text x="320" y="440" fill="rgb(106,106,106)" fontSize='13'>2022/4</text>
                <text x="460" y="440" fill="rgb(106,106,106)" fontSize='13'>2022/5</text>

                {/* taiex price */}
                {rightIndexValue.map((item,index) => (
                    <text key={index} x="610" y={410-40*index} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}
                <text x="610" y="440" fill="rgb(106,106,106)" fontSize='13'>加權指數</text>
                
                {/* taiex_otc price */}
                {leftIndexValue.map((item,index) => (
                    <text key={index} x="25" y={410-40*index} fill="rgb(106,106,106)" fontSize='14'>{item}</text>
                ))}
                <text x="20" y="440" fill="rgb(106,106,106)" fontSize='13'>櫃買指數</text>
                
                {/* taiex */}
                {closeY.map((item,index) => (
                    <line x1={595-index*6.6} y1={item} x2={588.4-index*6.6} y2={closeY[index+1]} stroke='rgb(220,57,18)' strokeWidth='3'/>
                ))}

                {/* taiex_otc */}
                {otcCloseY.map((item,index) => (
                    <line x1={595-index*6.6} y1={item} x2={588.4-index*6.6} y2={otcCloseY[index+1]} stroke='rgb(3,143,244)' strokeWidth='3'/>
                ))}

            </svg>
        </div>
    )
}