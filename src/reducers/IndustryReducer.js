export const IndustyReducer = (state,action) => {
    switch(action.type){
        case '1':
            return { industry: '水泥工業'}
        case '2':
            return { industry: '食品工業'}
        case '3':
            return { industry: '塑膠工業'}
        case '4':
            return { industry: '紡織纖維'}
        case '5':
            return { industry: '電機機械'}
        case '6':
            return { industry: '電器電纜'}
        case '8':
            return { industry: '玻璃陶瓷'}
        case '9':
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
        default:
            return state
    }
}