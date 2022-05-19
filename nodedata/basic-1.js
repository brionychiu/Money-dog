// 基本資料
//  交易所:台灣上市、1101、台灣水泥股份有限公司、台泥、01
const request = require("request");

const getSkillInfo = function () {
  request({
    url: "https://openapi.twse.com.tw/v1/opendata/t187ap03_L", 
    method: "GET"},
    function (error, response, body) {
      if (error || !body) {
      return;
    }
    console.log(response.body)
    JSON.parse(response.body)
  });
};
getSkillInfo();