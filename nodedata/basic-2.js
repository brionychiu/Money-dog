//  上櫃股票基本資料
//  交易所:台灣上櫃、公司代號:9960、公司名稱: 邁達康網路事業股份有限公司、公司簡稱: 邁達康、產業別: 18
const request = require("request");

const getBasicListedInfo = function () {
  request({
    url: "https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O", 
    method: "GET"},
    function (error, response, body) {
      if (error || !body) {
        return;
    }
      try {
        const user = JSON.parse(response.body)
        console.log(user)
      } catch(err) {
        console.error(err)
      }
  });
};
getBasicListedInfo();