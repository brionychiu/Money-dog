const functions = require("firebase-functions");
const axios = require("axios")

exports.basicInfoAPI = functions.https.onRequest( async (req, res) => {
    try{
        const response = await axios.get("https://openapi.twse.com.tw/v1/opendata/t187ap03_L")
        const json = JSON.parse(JSON.stringify(response.data))
        // //  基本資料
        // // 交易所:台灣上市、1101、台灣水泥股份有限公司、台泥、01
        const ListedBasicInfo = []
        json.forEach(obj => {
            ListedBasicInfo.push({"id":obj["公司代號"],"listed":"台灣上市",
            "name":obj["公司名稱"],"sname":obj["公司簡稱"],
            "industry":obj["產業別"],"date":obj["出表日期"]})
        });
        // 交易所:台灣上櫃、公司代號:9960、公司名稱: 邁達康網路事業股份有限公司、公司簡稱: 邁達康、產業別: 18
        const response_otc = await axios.get("https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O")
        const json_otc = JSON.parse(JSON.stringify(response_otc.data))
        json_otc.forEach(obj => {
            ListedBasicInfo.push({"id":obj["SecuritiesCompanyCode"],"listed":"台灣上櫃",
            "name":obj["CompanyName"],"sname":obj["公司簡稱"],
            "industry":obj["SecuritiesIndustryCode"],"date":obj["Date"]})
        });
        res.send(ListedBasicInfo)

    }catch(err) {
        res.send(err)
    }
    }
)
exports.dailyPriceAPI = functions.https.onRequest( async (req, res) => {
    try{
        const response = await axios.get("https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL")
        const json = JSON.parse(JSON.stringify(response.data))
        // 上市個股日成交資訊 //12點更新
    // 9955、(日)交易量/成交股數: 1318770、(日)成交金額: 31205468、(日)成交筆數: 715、
    //  開盤價: 24.00、最高: 24.35、最低: 23.30、收盤價: 23.55、漲跌價差(元): -0.6500
        const dailyPrice = []
        json.forEach(obj => {
            if (obj['Code'].length <5){
                dailyPrice.push({"id":obj["Code"],
                "TradeValue":obj["TradeValue"],"Transaction":obj["Transaction"],
                "Open":obj["OpeningPrice"],"High":obj["HighestPrice"],
                "Low":obj["LowestPrice"],"Close":obj["ClosingPrice"],
                "Change":obj["Change"]})
            }
            
    });
    //上櫃(每檔)股票行情
// 資料日期:111/05/09
// Date:1110509、股票代碼:8933、公司名稱:愛地雅、收盤:11.50、漲跌:-0.35 、開盤:11.85、
// 最高:11.85、最低:11.50、 均價:11.65、成交股數:403634、成交金額:4703512、成交筆數:346
        const response_otc = await axios.get("https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes")
        const json_otc = JSON.parse(JSON.stringify(response_otc.data))
        json_otc.forEach(obj => {
            if (obj['SecuritiesCompanyCode'].length <5){
                dailyPrice.push({"Date":obj["Date"],"id":obj["SecuritiesCompanyCode"],
                "TradeValue":obj["TransactionAmount"],"Transaction":obj["TransactionNumber"],
                "Open":obj["Open"],"High":obj["High"],
                "Low":obj["Low"],"Close":obj["Close"],
                "Change":obj["Change"]})  
            }
        });
        res.send(dailyPrice) 
    }catch(err) {
        res.send(err)
    }   
})

exports.dailyPEratioAPI = functions.https.onRequest( async (req, res) => {
    try{
        const response = await axios.get("https://openapi.twse.com.tw/v1/exchangeReport/BWIBBU_ALL")
        const json = JSON.parse(JSON.stringify(response.data))
        //  上市個股 日本益比(PEratio) 殖利率及股價淨值比
//  股票代碼9946殖利率(%):6.50當日本益比(倍):17.57股價淨值比:0.61
        const dailyPEratio = []
        json.forEach(obj => {
            dailyPEratio.push({"id":obj["Code"],
            "DYield":obj["DividendYield"],"PEratio":obj["PEratio"],
            "PBratio":obj["PBratio"]})
        });
        //  上櫃個股 日本益比(PEratio) 殖利率及股價淨值比
// 股票代碼3093殖利率(%):7.39當日本益比(倍):11.51股價淨值比:2.97
        const response_otc = await axios.get("https://www.tpex.org.tw/openapi/v1/tpex_mainboard_peratio_analysis")
        const json_otc = JSON.parse(JSON.stringify(response_otc.data))
        json_otc.forEach(obj => {
            dailyPEratio.push({"id":obj["SecuritiesCompanyCode"],
            "DYield":obj["YieldRatio"],"PEratio":obj["PriceEarningRatio"],
            "PBratio":obj["PriceBookRatio"]})
        });
        res.send(dailyPEratio)
    }catch(err) {
        res.send(err)
    }   
})