import Slider from "react-slick"

// styles
import styles from '../../pages/HomePage/Home.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// components
import thumbsUpIcon from '../img/thumbs_up_icon.png'
import thumbsUpYellowIcon from '../img/thumbs_up_icon_yellow.png'
import recommedIcon1 from '../img/recommend_icon_1.png'
import recommedIcon2 from '../img/recommend_icon_2.png'

const AutoSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 8000,
        pauseOnHover: true,
        arrows:false
      };
    return ( 
      <div className={styles.slider}>
            <img className={styles.magazine} src={recommedIcon1} alt='商業周刊v2.0'/>  
            <img
                  src={thumbsUpIcon} alt='thumbs up!'
                  onMouseOver={e => (e.currentTarget.src = thumbsUpYellowIcon)} 
                  onMouseOut={e => (e.currentTarget.src = thumbsUpIcon)}
                  />
            <img className={styles.magazine} src={recommedIcon2} alt='今天周刊'/> 
        <Slider {...settings} className={styles.recommend}>
          <div>
                招財狗幫使用者整理詳盡的財報資料，而且大多數功能都免費，<br/>
                讓不少使用者直呼「這麼佛心來著的網站不推不行」，<br/>
                很適合入門不久的初階和中階投資人。<br/>
                <h5>________今天周刊________</h5>
          </div>
          <div>
                拆解財務數據，轉化為可搜尋分析的資料庫，並以視覺圖表呈現。<br/>
                作者也因為創立了這項投資工具，因而找到好股存下不少錢，<br/>
                證明其實用價值。
                <h5>________賺不停日報________</h5>
          </div>
          <div>
                團隊成員雖然非理工背景出身，但善於分析財報，並將資料數據化、圖表化，<br/>
                放在網站供投資人參考，協助投資人挑選穩健成長的股票。
                <h5>________商業周刊v2.0________</h5>
          </div>
          <div>
                網路上擁有不少免費的搜股網站，利用如招財狗，只要按幾個鍵，<br/>
                就能依照各項存股的條件，快速找出好股票。
                <h5>________很Smart致富________</h5>
          </div>
        </Slider>
      </div>
     );
}
 
export default AutoSlider;