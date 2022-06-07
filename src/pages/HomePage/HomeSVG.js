import { motion } from 'framer-motion'

// styles
import styles from './Home.module.css'

const pathVariants = {
    hidden:{
        opacity:0,
        pathLength:0
    },
    visible:{
        opacity:1,
        pathLength:1,
        transition:{
            duration:10,
            ease:'easeInOut'
        }
    }
}
const circleVariants = {
    hidden:{opacity:0},
    visible:{
        opacity:1,
        transition:{duration:15}
    }
}
const textVariants = {
    hidden: {opacity: 0},
    visible: { 
        opacity: 1,
        transition: { duration:15 }
        },
}

const HomeSVG = () => {
    return ( 
        <div className={styles.gif}>
            <motion.div 
                variants={textVariants}
                initial='hidden'
                animate='visible'
                className={styles.giftext_1}>
                <span>
                    <strong>2330台積電的投資亮點</strong><br/>
                    1.股價淨值比來到歷史低點區間<br/>
                    2.毛利率連續三季上升
                </span>
            </motion.div>
            <motion.div 
                variants={textVariants}
                initial='hidden'
                animate='visible'
                className={styles.giftext_2}>
                <span>
                    <strong>2330台積電的投資風險</strong><br/>
                    1.月營收年增率連續三個月下滑<br/>
                    2.本益比來到歷史高點區間
                </span>
            </motion.div>
            <motion.svg 
                width="700" height="360"
                viewBox="0 0 700 360"
                xmlns="<http://www.w3.org/2000/svg>"
                >
                    <motion.path d='M 2 50 L 10 10 L 13 9 L 18 30 L 25 30 L 30 40 L 40 30 L 50 30 L 55 10 L 60 50
                        L 70 30 L 80 90 L 90 40 L 100 60 L 110 100 L 120 80 L 125 90 L 130 120 L 130 140 
                        L 150 240 L 160 160 L 180 130 L 200 140 L 220 120 L 230 120 L 280 170 L 300 140 
                        L 330 200 L 370 230 L 400 240 L 410 210 L 420 200 L 430 190 L 440 195 L 450 215
                        L 460 200 L 470 185 L 480 172 L 490 150 L 500 135 L 510 146 L 520 130 L 530 120
                        L 540 90 L 550 85 L 560 72 L 570 80 L 580 95 L 590 100 L 600 120 L 610 110
                        L 620 120 L 630 115 L 640 112 L 650 123 L 660 112 L 670 100 L 680 95 L 690 65
                        L 700 70 '
                        fill='none'     
                        visibility= 'visible'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        stroke='rgb(234,94,91)'
                        strokeWidth='2'
                        variants={pathVariants}
                        initial='hidden'
                        animate='visible'/>

                    <motion.path d='M 4 160 L 10 170 L 13 130 L 18 143 L 25 169 L 30 170 L 40 180 L 50 160 L 55 140 
                        L 60 180 L 70 120 L 80 130 L 90 80 L 100 110 L 110 110 L 120 120 L 125 130 L 130 170 
                        L 130 170 L 150 240 L 160 200 L 180 170 L 200 180 L 220 170 L 230 160 L 280 180 
                        L 300 190 
                        L 330 170 L 370 220 L 400 240 L 410 250 L 420 255 L 430 265 L 440 280 L 450 275
                        L 460 260 L 470 215 L 480 212 L 490 200 L 500 195 L 510 220 L 520 180 L 530 170
                        L 540 180 L 550 215 L 560 212 L 570 200 L 580 195 L 590 220 L 600 200 L 610 170
                        L 620 160 L 630 155 L 640 142 L 650 140 L 660 122 L 670 110 L 680 115 L 690 115
                        L 700 160'
                        fill='none'     
                        visibility= 'visible'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        stroke='rgb(3,134,244)'
                        strokeWidth='3'
                        variants={pathVariants}
                        initial='hidden'
                        animate='visible'/>
                    <motion.circle 
                        cx="150" cy="235" r="10" strokeWidth="4" stroke="rgb(86,86,86)" 
                        stroke-opacity="50%" fill-opacity="0%" 
                        variants={circleVariants}
                        initial='hidden'
                        animate='visible'/>
                    <motion.circle cx="560" cy="75" r="10" strokeWidth="4" 
                        stroke="rgb(86,86,86)" stroke-opacity="50%" fill-opacity="0%" 
                        variants={circleVariants}
                        initial='hidden'
                        animate='visible'/>
            </motion.svg>
        </div> 
    );
}
 
export default HomeSVG;