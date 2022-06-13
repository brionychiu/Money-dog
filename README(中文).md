# 招財狗 Money dog   

<h3 align="center">
  挖掘股票價值，創造超額報酬
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173223066-31b830af-39ba-4a8e-801f-592b624c7472.jpg" width = "50"    height = "50" alt="logo" />
</p>

+ 網站連結：[招財狗 Money dog](https://truffle-dog-56562.web.app/)
+ 測試帳號：`123@mail.com`  密碼：`123123`
+ 測試帳號：`123123@mail.com`  密碼：`123123`

<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173377484-06248fe4-1f93-49d3-937b-f95392f25ce5.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>
  <img src="https://user-images.githubusercontent.com/94620926/173358699-016b0cba-2fbc-49b2-ae9a-1319541914c6.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>
</p>


招財狗是一個**將上市上櫃公司財務數據，以視覺圖表呈現**的股票網站。<br/>
使用者搜尋有興趣的股票代碼/名稱，瀏覽「近半年股價走勢」、「每月本益比」、「營收年增率」、「每季EPS」及「公司簡介」等資訊，且用長條圖、折線圖將數據圖形化，觀察公司經營概況長線趨勢。
## 內容列表 ##
+ [核心功能](#核心功能)
+ [前端技術](#前端技術)
    + [React](#react)
    + [SVG](#svg)
    + [Framer-motion](#framer-motion)
    + [React Slick](#React-slick)
    + [RWD](#rwd)
+ [後端技術](#後端技術)
    + [Firebase(version 9)](#Firebase)
    + [第三方登入](#第三方登入)
    + [網路爬蟲](#網路爬蟲)
    + [FireKit](#FireKit)
+ [聯絡我](#聯絡我)

## 核心功能
+ 使用者以中/數字搜尋股票名稱/代號
+ 「最新動態」：以k線圖、直條圖表示該公司近半年股價走勢、5日均線、雙週線(10日線)、月線(20日線)、成交金額(百萬)及成交筆數
+ 「價值評估」：以圓點折線圖表示該公司近三年每月本益比及月均價
+ 「成長力分析」：以圓點折線圖表示該公司近三年單月營收年增率及月均價
+ 「財務報表」：以直條圖表示該公司近三年單月營收年增率及月均價
+ 「基本資料」：公司基本簡介及產業類別介紹
+ 「大盤趨勢」：包含上市加權指數、櫃買指數近半年趨勢
+ 使用者將股票加入追蹤清單，登入會員點選「我的清單」能瀏覽所有加入追蹤的股票每日動態。

## 前端技術
### React
 + 使用 react-router 實現 SPA（Single Page Application）架構
 + React Router (version 6)
      - Outlet, useParams, useLocation, Navigate, useNavigate, Link, Navigate, Routes, Route
 + Hooks API：useContext, useReducer, useState, useEffect
 + 自定義的 Hooks
      - useAuthContext：使用者登入狀態
      - useLogin：登入
      - useLogout：登出
      - useSignup：註冊
      - useCollection：串接firestore資料
      - useFirestore：增加/刪除firestore資料
      - useTrackingList：串接會員追蹤清單資料
+ Context：AuthContext

### SVG
  + 股市 k 線圖、成交量圖 
      - rect, line
      - <img src="https://user-images.githubusercontent.com/94620926/173233555-81ebd22f-3129-42d0-8a09-ecb1cacae14d.png" alt="stockPrice" width = "400" height = "250"/>
  + 直條圖
      - line, ,circle, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233838-cad9b089-5227-4d44-a19a-c61449df13ed.png" alt="histogram" width = "400" height = "250"/>
      
  + 折線圖
      - path, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233773-f97ab08d-175d-4490-8227-61f4801f5cc3.png" alt="line chart" width = "400" height = "250"/>
      - <img src="https://user-images.githubusercontent.com/94620926/173233873-9ee125ad-bc44-48e0-b3cd-25620f543acb.png" alt="PEratio" width = "400" height = "250"/>

  + 圓點折線圖
      - circle, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233810-2326a310-ba11-4f7f-8a23-69eafd43a4e1.png" alt="dots line chart" width = "400" height = "250"/>

      
### Framer-motion
  + 浮出
      - <img src="https://user-images.githubusercontent.com/94620926/173374421-b17d6b55-5b68-4fd3-a604-60969813f2be.gif" width = "250" height = "200" alt="emerge" />
  + 放大
      - <img src="https://user-images.githubusercontent.com/94620926/173373669-f933009f-7e1c-45ab-82bf-6e56786209a1.gif" width = "150" height = "60" alt="enlarge" />
      - <img src="https://user-images.githubusercontent.com/94620926/173372769-d6038b2b-42d5-47d7-849e-bf5211dce46c.gif" width = "80" height = "70" alt="enlarge-check" />
  + 位移
      - <img src="https://user-images.githubusercontent.com/94620926/173371316-03495e90-9451-40d9-b5b6-af5cd56a1b52.gif" width = "70" height = "220" alt="moving" />
  + 拖曳
      - <img src="https://user-images.githubusercontent.com/94620926/173370011-a5489f85-0379-402b-9d8c-4e941c9c3058.gif" width = "300" height = "150" alt="drag" />
  + SVG動畫
      - <img src="https://user-images.githubusercontent.com/94620926/173375214-43819478-c066-4dcb-bebe-bdf92e485760.gif" width = "400" height = "250" alt="svg animation" />
<a name="React-slick"></a>
### React Slick
  + 自動輪播
      - <img src="https://user-images.githubusercontent.com/94620926/173367835-3a5029af-8a4a-48b8-8bdc-c0e617e4b792.gif" width = "300" height = "200" alt="svg animation" />
  
### RWD
  + 桌機、筆電 
      - <img src="https://user-images.githubusercontent.com/94620926/173221116-c95ef7fb-d993-490e-96e6-04c9e1b93314.png" width = "300" height = "180" alt="laptop" />
  + 平板 
      - <img src="https://user-images.githubusercontent.com/94620926/173221276-5f8e6011-4c83-4d4f-9aae-5688199ceb28.png" width = "100" height = "150" alt="tablet" />
  + 智慧型手機 
      - <img src="https://user-images.githubusercontent.com/94620926/173221296-c813f019-aa64-4ad5-8939-40717966eed6.png" width = "80" height = "150" alt="phone"/>
  
## 後端技術
<a name="Firebase"></a>
### Firebase (version 9)
  + Authentication
  + Firestore Database
  + Hoisting
  + Functions
<a name="第三方登入"></a> 
### 整合Firebase Authentication第三方登入
  + Google 快速登入
  + Facebook 快速登入
    - <img src="https://user-images.githubusercontent.com/94620926/173235044-40fa9e57-e0bd-4686-8135-fedcded4339e.png" width = "150" height = "250" alt="phone"/>
      
### 網路爬蟲
  + 資料來源
    - 台灣證券交易所
    - 櫃檯買賣中心
    - 財報狗
  + 使用語言
    - node.js
    - python
    - express
<a name="FireKit"></a>
### FireKit
  + 超過2000筆資料大量匯入
     - <img src="https://user-images.githubusercontent.com/94620926/173235178-4007de3d-d7cd-4859-b179-44dd4a60eb9b.png" width = "120" height = "60" alt="phone"/>

## 聯絡我
  + Yu-Chien,Chiu
  + mail：yuikuta0618@gmail.com
