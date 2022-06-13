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

<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173377484-06248fe4-1f93-49d3-937b-f95392f25ce5.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>

  <img src="https://user-images.githubusercontent.com/94620926/173358699-016b0cba-2fbc-49b2-ae9a-1319541914c6.gif" alt="money-dog-film-open" width= "337.5" height = "225"/>
</p>


Money dog is a website which can **visualize data by using listed corporations financial statement, let easily distinguished its patterns, trends and correlations**.<br/>
Users search stock id or company's name, to browse stock's price in half a year, PE ratio, Revenue Growth Rate (YoY) in each month, EPS in each quarter and basic company infomation.<br/>
With Bar chart, Line chart to observe the long term situation of corporate business management.

## Table of Content ##
+ [Main Features](#main-features)
+ [Front-end Technique](#frontend)
    + [React](#react)
    + [SVG](#svg)
    + [Framer Motion](#framer-motion)
    + [React Slick](#React-slick)
    + [RWD](#rwd)
+ [Back-end Technique](#backend)
    + [Firebase(version 9)](#firebase)
    + [Social Login](#social-login)
    + [Web Crawler](#web-Crawler)
    + [FireKit](#FireKit)
+ [Contact](#contact)

<a name="main-features"></a>
## Main Features
+  **Realtime search**：Users search company by stock Id or company's name.
+  **Candlestick chart**：Show stock price in half a year, 5MA(moving average), 10MA, 20MA, trading volume and Transaction.
+  **Bar chart**：Show each quarter EPS in the past three years. 
+  **Line chart with dots**：Show each month PE Ratio and YoY in the past three years.
+  **Line chart**：Show each month averge price in the past three years.
+  **Basic information**：Compony and industry introduction.
+  **Stock market**：Includes TAIEX and OTC general trend. 
+  **Tracking list**：Users can add stock in tracking list, when login-users check My List, it will show all information of stock price.
<a name="frontend"></a>
## Front-end Technique
<a name="react"></a>
### React
 + Handle the SPA（Single Page Application) routing
 + React Router (version 6)
      - Outlet, useParams, useLocation, Navigate, useNavigate, Link, Navigate, Routes, Route
 + Hooks API：useContext, useReducer, useState, useEffect
 + Extracting a Custom Hook
      - useAuthContext：user state
      - useLogin：login
      - useLogout：logout
      - useSignup：signup
      - useCollection：get data from firestore database
      - useFirestore：add/delete data from firestore database
      - useTrackingList：add/delete users tracking items from firestore database
+ Context：AuthContext

<a name="svg"></a>
### SVG
  + Candlestick chart、TradingView chart
      - rect, line
      - <img src="https://user-images.githubusercontent.com/94620926/173233555-81ebd22f-3129-42d0-8a09-ecb1cacae14d.png" alt="stockPrice" width = "400" height = "250"/>
  + Bar chart
      - reac, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233838-cad9b089-5227-4d44-a19a-c61449df13ed.png" alt="histogram" width = "400" height = "250"/>  
  + Line chart
      - path, line, circle, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233773-f97ab08d-175d-4490-8227-61f4801f5cc3.png" alt="line chart" width = "400" height = "250"/>
      - <img src="https://user-images.githubusercontent.com/94620926/173233873-9ee125ad-bc44-48e0-b3cd-25620f543acb.png" alt="PEratio" width = "400" height = "250"/>

  + Line chart with dots
      - circle, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233810-2326a310-ba11-4f7f-8a23-69eafd43a4e1.png" alt="dots line chart" width = "400" height = "250"/>

<a name="framer-motion"></a>
### Framer-motion
  + Enmerge
      - <img src="https://user-images.githubusercontent.com/94620926/173374421-b17d6b55-5b68-4fd3-a604-60969813f2be.gif" width = "250" height = "200" alt="emerge" />
  + Enlarge
      - <img src="https://user-images.githubusercontent.com/94620926/173373669-f933009f-7e1c-45ab-82bf-6e56786209a1.gif" width = "300" height = "120" alt="enlarge" />
      - <img src="https://user-images.githubusercontent.com/94620926/173372769-d6038b2b-42d5-47d7-849e-bf5211dce46c.gif" width
= "80" height = "70" alt="enlarge-check" />
  + Moving
      - <img src="https://user-images.githubusercontent.com/94620926/173371316-03495e90-9451-40d9-b5b6-af5cd56a1b52.gif" width = "70" height = "290" alt="moving1" />
  + Drag
      - <img src="https://user-images.githubusercontent.com/94620926/173370011-a5489f85-0379-402b-9d8c-4e941c9c3058.gif" width = "400" height = "200" alt="drag" />
  + SVG Animation
      - <img src="https://user-images.githubusercontent.com/94620926/173375214-43819478-c066-4dcb-bebe-bdf92e485760.gif" width = "400" height = "266" alt="svg animation" />

<a name="React-slick"></a>
### React Slick
  + Auto slider
      - <img src="https://user-images.githubusercontent.com/94620926/173367835-3a5029af-8a4a-48b8-8bdc-c0e617e4b792.gif" width = "300" height = "200" alt="svg animation" />
<a name="rwd"></a>
### RWD
  + Desktop 
      - <img src="https://user-images.githubusercontent.com/94620926/173221116-c95ef7fb-d993-490e-96e6-04c9e1b93314.png" width = "300" height = "180" alt="laptop" />
  + Tablet 
      - <img src="https://user-images.githubusercontent.com/94620926/173221276-5f8e6011-4c83-4d4f-9aae-5688199ceb28.png" width = "100" height = "150" alt="tablet" />
  + Mobile phone 
      - <img src="https://user-images.githubusercontent.com/94620926/173221296-c813f019-aa64-4ad5-8939-40717966eed6.png" width = "80" height = "150" alt="phone"/>
<a name="backend"></a>
## Back-end Technique (Firebase Cloud Services)
<a name="firebase"></a>
### Firebase (version 9)
  + Authentication
  + Firestore Database
  + Hoisting
  + Functions
<a name="social-login"></a>
### Social login
  + Support Google sign in.
  + Support Facebook sign in.
    - <img src="https://user-images.githubusercontent.com/94620926/173235044-40fa9e57-e0bd-4686-8135-fedcded4339e.png" width = "150" height = "250" alt="phone"/>
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
     - <img src="https://user-images.githubusercontent.com/94620926/173235178-4007de3d-d7cd-4859-b179-44dd4a60eb9b.png" width = "150" height = "60" alt="phone"/>
<a name="contact"></a>
## Contact
  + Yu-Chien,Chiu
  + mail：yuikuta0618@gmail.com
