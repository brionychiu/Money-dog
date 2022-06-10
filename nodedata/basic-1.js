// 基本資料
//  交易所:台灣上市、1101、台灣水泥股份有限公司、台泥、01
const request = require("request");

const getBasicListedInfo = function () {
  request({
    url: "https://openapi.twse.com.tw/v1/opendata/t187ap03_L", 
    method: "GET"},
    function (error, response, body) {
      if (error || !body) {
        return;
    }
      try {
        const json = JSON.parse(response.body)
        const ListedBasicInfo = []
        json.forEach(obj => {
            ListedBasicInfo.push({"id":obj["公司代號"],"listed":"台灣上市",
            "name":obj["公司名稱"],"sname":obj["公司簡稱"],
            "industry":obj["產業別"],"date":obj["出表日期"]})
        })

      } catch(err) {
        console.error(err)
      }
  });
};
getBasicListedInfo();