# 招財狗 Money dog   

<h3 align="center">
 Dig for treasure in the stock market,<br/>
    and find a new way to get RICH.
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173223066-31b830af-39ba-4a8e-801f-592b624c7472.jpg" width = "50"    height = "50" alt="logo" />
</p>

# Demo
+ Website URL：[招財狗 Money dog](https://truffle-dog-56562.web.app/)
+ Test account：`123@mail.com`  Password：`123123`
+ Test account：`123123@mail.com`  Password：`123123`
+ [README(Chinese).md](https://github.com/brionychiu/Money-dog/blob/main/README.zh-CN.md)
+ The UI of Money dog was inspired by [財報狗 Statement dog](https://statementdog.com/).

<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173377484-06248fe4-1f93-49d3-937b-f95392f25ce5.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>
  <img src="https://user-images.githubusercontent.com/94620926/173358699-016b0cba-2fbc-49b2-ae9a-1319541914c6.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>
</p>


Money dog is a website which can **visualize data by using listed corporations financial statement, let easily distinguished its patterns, trends and correlations**.<br/>
<p></p>
Users search stock id or company's name, to browse stock's price in half a year, PE ratio, Revenue Growth Rate (YoY) in each month, EPS in each quarter and basic company information.<br/>
With bar chart, line chart to observe corporation business management in the long term.

## Table of Content ##
+ [Main Features](#main-features)
+ [Frontend Technique](#frontend)
    + [React](#react)
    + [SVG-without third party libraries](#svg)
    + [Framer Motion](#framer-motion)
    + [React Slick](#React-slick)
    + [RWD](#rwd)
+ [Backend Technique (Firebase Cloud Services)](#backend)
    + [Firebase(version 9)](#firebase)
    + [Social Login](#social-login)
    + [Web Crawler](#web-Crawler)
    + [FireKit](#FireKit)
+ [Contact](#contact)

<a name="main-features"></a>
## Main Features
+  **Realtime search**：Users search company by stock Id or company's name.
+  **Build charts with SVG from scratch without third party libraries.**
     - Candlestick chart：Show stock price in half a year, 5MA(moving average), 10MA, 20MA, trading volume and transaction.
     - Bar chart：Show each quarter EPS in the past three years. 
     - Line chart with dots：Show each month PE Ratio and YoY in the past three years.
     - Line chart：Show each month averge price in the past three years.
     - Basic information：Compony and industry introduction.
     - Stock market：Includes TAIEX and OTC general trend. 
+  Tracking list：Users can add stock in tracking list, when login-users check My List, it will show all information of stock price.
<a name="frontend"></a>
## Frontend Technique
<a name="react"></a>
### React
 + Handle the SPA with React Router (version 6)
      - `Outlet`, `useParams`, `useLocation`, `Navigate`, `useNavigate`, `Link`, `Navigate`, `Routes`, `Route`
 + Hooks API：`useContext`, `useReducer`, `useState`, `useEffect`
 + Extracting a Custom Hook
      - `useAuthContext`：user state
      - `useLogin`：login
      - `useLogout`：logout
      - `useSignup`：signup
      - `useCollection`：get data from firestore database
      - `useFirestore`：add/delete data from firestore database
      - `useTrackingList`：add/delete users tracking items from firestore database
+ Context：`AuthContext`
+ Structure
<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173884655-298aa8c2-ac48-4a24-8d05-14761a1f45da.png" alt="2610-react structure" width = "600" height = "430"/>
<p/>


<a name="svg"></a>
### SVG-without third party libraries
  + Candlestick chart、TradingView chart
      - svg-rect, svg-line
  <p align="center">
     <img src="https://user-images.githubusercontent.com/94620926/173484362-409e4c3f-e775-4ba9-bb41-effb9bd35150.gif" alt="2330-stockPrice" width = "400" height = "250"/>
     <img src="https://user-images.githubusercontent.com/94620926/173485145-955a1b1c-1661-44bc-b519-5795edee9da7.gif"
 alt="2610-stockPrice" width = "400" height = "250"/>
    <p/>

  + Bar chart
      - svg-rect, svg-line, svg-text
  <p align="center">
     <img src="https://user-images.githubusercontent.com/94620926/173485487-bdb4379c-fb85-4774-a320-512ca26e48f3.gif" alt="2610-eps" width = "400" height = "250"/>
     <img src="https://user-images.githubusercontent.com/94620926/173485897-a635357a-f1a1-437a-8bef-f1cbf55fa36b.gif"
 alt="2308-eps" width = "400" height = "250"/>
 <p/>

  + Line chart
      - svg-path, svg-line, svg-circle, svg-text
  <p align="center">
      <img src="https://user-images.githubusercontent.com/94620926/173233873-9ee125ad-bc44-48e0-b3cd-25620f543acb.png" alt="taiex" width = "400" height = "250"/>
      <img src="https://user-images.githubusercontent.com/94620926/173486046-6f25dfad-87cc-4054-953d-09cd03418ef9.gif" alt="2308-m-price" width = "400" height = "250"/>
 <p/>

  + Line chart with dots
      - svg-circle, svg-line, svg-text
  <p align="center">
 <img src="https://user-images.githubusercontent.com/94620926/173486709-84478566-ab61-4704-b637-eb061b67ac79.gif" alt="2610-yoy" width = "400" height = "250"/>
   <img src="https://user-images.githubusercontent.com/94620926/173486725-c885b6fa-a377-4ace-ae5a-4579142593b5.gif" alt="2610-pe" width = "400" height = "250"/>
   <p/>

<a name="framer-motion"></a>
### Framer-motion
  + Enmerge
 <p>
    <img src="https://user-images.githubusercontent.com/94620926/173374421-b17d6b55-5b68-4fd3-a604-60969813f2be.gif" width = "250" height = "200" alt="emerge" />
 </p>
 
  + Enlarge
  <p>
     <img src="https://user-images.githubusercontent.com/94620926/173373669-f933009f-7e1c-45ab-82bf-6e56786209a1.gif" width = "300" height = "80" alt="enlarge" />
      <img src="https://user-images.githubusercontent.com/94620926/173372769-d6038b2b-42d5-47d7-849e-bf5211dce46c.gif" width
= "80" height = "70" alt="enlarge-check" />
 </p>
 
  + Moving
  <p>
      <img src="https://user-images.githubusercontent.com/94620926/173371316-03495e90-9451-40d9-b5b6-af5cd56a1b52.gif" width = "70" height = "290" alt="moving1" />
 </p>
 
  + Drag
  <p>
      <img src="https://user-images.githubusercontent.com/94620926/173370011-a5489f85-0379-402b-9d8c-4e941c9c3058.gif" width = "400" height = "200" alt="drag" />
 </p>
 
  + SVG Animation
  <p>
      <img src="https://user-images.githubusercontent.com/94620926/173375214-43819478-c066-4dcb-bebe-bdf92e485760.gif" width = "400" height = "266" alt="svg animation" />
 </p>

<a name="React-slick"></a>
### React Slick
  + Auto slider
 <p>
      <img src="https://user-images.githubusercontent.com/94620926/173367835-3a5029af-8a4a-48b8-8bdc-c0e617e4b792.gif" width = "300" height = "200" alt="svg animation" />
 </p>
 
<a name="rwd"></a>
### RWD
  + Desktop 
  + Tablet 
  + Mobile phone 
  <img src="https://user-images.githubusercontent.com/94620926/173488721-c8e95efc-00c6-4509-9562-0ad0f0d5d1a7.png" width = "300" height = "200" alt="tablet" />

<a name="backend"></a>
## Backend Technique (Firebase Cloud Services)
<a name="firebase"></a>
### Firebase (version 9)
  + Authentication
  + Firestore Database
  + Hoisting
  + Functions
    - [basicInfoAPI](https://us-central1-truffle-dog-56562.cloudfunctions.net/basicInfoAPI)
    - [dailyPriceAPI](https://us-central1-truffle-dog-56562.cloudfunctions.net/dailyPriceAPI)
    - [dailyPEratioAPI](https://us-central1-truffle-dog-56562.cloudfunctions.net/dailyPEratioAPI)
<a name="social-login"></a>
### Social login
  + Support Google sign in.
  + Support Facebook sign in.
  
<a name="web-Crawler"></a>   
### Web Crawler
  + Source
    - 台灣證券交易所(TWSE)
    - 櫃檯買賣中心(TPEx)
    - 財報狗(Statement Dog)
  + Code
    - node.js
    - python
    - express
<a name="FireKit"></a>
### FireKit
  + more than 2000 data bulk import files
    <img src="https://user-images.githubusercontent.com/94620926/173235178-4007de3d-d7cd-4859-b179-44dd4a60eb9b.png" width = "150" height = "60" alt="phone"/>
<a name="contact"></a>
## Contact
  + Yu-Chien,Chiu
  + mail：yuikuta0618@gmail.com
