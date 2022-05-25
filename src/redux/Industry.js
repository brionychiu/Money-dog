import { createSlice } from "@reduxjs/toolkit"

export const IndustrySlice = createSlice({
    name:"Industry",
    initialState:{
        industry:null
    },
    reducer:{
        1: (state) =>{
            state.industry = '水泥工業'
        },
        2: (state) =>{
            state.industry = '食品工業'
        },
        3: (state) =>{
            state.industry = '塑膠工業'
        },
        4: (state) =>{
            state.industry = '紡織纖維'
        },
        5: (state) =>{
            state.industry = '電機機械'
        },
        6: (state) =>{
            state.industry = '電器電纜'
        },
        8: (state) =>{
            state.industry = '玻璃陶瓷'
        },
        9: (state) =>{
            state.industry = '造紙工業'
        },
        10: (state) =>{
            state.industry = '鋼鐵工業'
        },
        11: (state) =>{
            state.industry = '橡膠工業'
        },
        12: (state) =>{
            state.industry = '汽車工業'
        },
        14: (state) =>{
            state.industry = '建材營造'
        },
        15: (state) =>{
            state.industry = '航運業'
        },
        16: (state) =>{
            state.industry = '觀光事業'
        },
        17: (state) =>{
            state.industry = '金融保險業'
        },
        18: (state) =>{
            state.industry = '貿易百貨業'
        },
        19: (state) =>{
            state.industry = '綜合'
        },
        20: (state) =>{
            state.industry = '其他'
        },
        21: (state) =>{
            state.industry = '化學工業'
        },
        22: (state) =>{
            state.industry = '生技醫療業'
        },
        23: (state) =>{
            state.industry = '油電燃氣業'
        },
        24: (state) =>{
            state.industry = '半導體業'
        },
        25: (state) =>{
            state.industry = '電腦及週邊設備業'
        },
        26: (state) =>{
            state.industry = '光電業'
        },
        27: (state) =>{
            state.industry = '通信網路業'
        },
        28: (state) =>{
            state.industry = '電子零組件業'
        },
        29: (state) =>{
            state.industry = '電子通路業'
        },
        30: (state) =>{
            state.industry = '資訊服務業'
        },
        31: (state) =>{
            state.industry = '其他電子業'
        },
        32: (state) =>{
            state.industry = '文化創意業'
        },
        33: (state) =>{
            state.industry = '農業科技業'
        },
        34: (state) =>{
            state.industry = '電子商務'
        }
    }
})  

export const { increment, decrement } = IndustrySlice.actions
export default IndustrySlice.reducer

export const IndustyReducer = (state,action) => {
    switch(action.type){
        case '01':
            return { industry: '水泥工業', 
            describe:'水泥是國家基礎工業之一，也是建築業與各項大型建設不可或缺的材料。水泥笨重、密度高，易受潮而硬化變質，故無法久存，不適合長途運輸，且故以內銷為主，屬於傳統內需導向型工業，一般國家水泥的自給率約為85%，其榮枯與否主要繫於國內公共工程與建築業的景氣狀況而定。不過，由於水泥業衍生的環保節能、生態保育問題甚多，故大多先進國家逐漸將水泥業轉移至開發中國家，於是亞洲成為國際水泥業的兵家必爭之地。再者，水泥業的技術障礙雖然不大，但需要投入龐大的資本、機器設備、採礦權、土地成本及運輸費用等，屬於資本密集產業，進入門檻甚高，形成典型的寡佔市場，箇中「玩家」不多，於是整體產業變動不大，相對穩定。台灣水泥產業國內兩大龍頭廠為台泥及亞泥，其在國內水泥市佔率已達8成，產業趨近於飽和，故價格變化相對不受供需所影響，反而是必須看政策的變化。'}
        case '02':
            return { industry: '食品工業'}
        case '03':
            return { industry: '塑膠工業'}
        case '04':
            return { industry: '紡織纖維'}
        case '05':
            return { industry: '電機機械'}
        case '06':
            return { industry: '電器電纜'}
        case '08':
            return { industry: '玻璃陶瓷'}
        case '09':
            return { industry: '造紙工業'}
        case '10':
            return { industry: '鋼鐵工業'}
        case '11':
            return { industry: '橡膠工業'}
        case '12':
            return { industry: '汽車工業'}
        case '14':
            return { industry: '建材營造'}
        case '15':
            return { industry: '航運業'}
        case '16':
            return { industry: '觀光事業'}
        case '17':
            return { industry: '金融保險業'}
        case '18':
            return { industry: '貿易百貨業'}
        case '19':
            return { industry: '綜合'}
        case '20':
            return { industry: '其他'}
        case '21':
            return { industry: '化學工業'}
        case '22':
            return { industry: '生技醫療業'}
        case '23':
            return { industry: '油電燃氣業'}
        case '24':
            return { industry: '半導體業'}
        case '25':
            return { industry: '電腦及週邊設備業'}
        case '26':
            return { industry: '光電業'}
        case '27':
            return { industry: '通信網路業'}
        case '28':
            return { industry: '電子零組件業'}
        case '29':
            return { industry: '電子通路業'}
        case '30':
            return { industry: '資訊服務業'}
        case '31':
            return { industry: '其他電子業'}
        case '32':
            return { industry: '文化創意業'}
        case '33':
            return { industry: '農業科技業'}
        case '34':
            return { industry: '電子商務'}
        default :
            return state
    }
}