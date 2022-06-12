# 招財狗 Money dog   

<h3 align="center">
  Digging for treasure in stock market,<br/>
    and get the new way to RICH.
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173223066-31b830af-39ba-4a8e-801f-592b624c7472.jpg" width = "50"    height = "50" alt="logo" />
</p>

+ Website URL：[招財狗 Money dog](https://truffle-dog-56562.web.app/)
+ Test account：`123@mail.com`  Password：`123123`
+ Test account：`123123@mail.com`  Password：`123123`

<p align="center">
  <img src="https://user-images.githubusercontent.com/94620926/173226725-9ce99604-a6c2-4b19-bf9c-3c5edac49116.gif" alt="money-dog-film-open" width = "450" height = "300"/>
</p>


Money dog is a website which can **visualize data by using listed corporations financial statement ,let easily distinguished its patterns, trends and correlations**。<br/>
Users search stock id or company's name, to browse stock's price in half a year, PE ratio,Revenue Growth Rate (YoY) in each month、EPS in each quarter and basic company infomation.<br/>
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
+  **Realtime search**：User search company by stock Id or name.
+  **Candlestick chart**：show stock price in half a year, 5MA(moving average), 10MA, 20MA, trading volume and Transaction.
+  **Bar chart**：show every quarter EPS in the past three years. 
+  **Line chart with dots**：show every month PE Ratio and YoY in the past three years.
+  **Line chart**：show every month averge price in the past three years.
+  **Basic information**：compony's name, industry introduction.
+  **Stock market**：include TAIEX and OTC general trend. 
+  **Tracking list**：users can add stock in tracking list, when login-users check My List, it will show all information of stock price.
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
  + Candlestick chart、tradingView chart
      - rect, line
      - <img src="https://user-images.githubusercontent.com/94620926/173233555-81ebd22f-3129-42d0-8a09-ecb1cacae14d.png" alt="stockPrice" width = "400" height = "250"/>
  + Bar chart
      - path, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233838-cad9b089-5227-4d44-a19a-c61449df13ed.png" alt="histogram" width = "400" height = "250"/>
      
  + Line chart
      - line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233773-f97ab08d-175d-4490-8227-61f4801f5cc3.png" alt="line chart" width = "400" height = "250"/>
      - <img src="https://user-images.githubusercontent.com/94620926/173233873-9ee125ad-bc44-48e0-b3cd-25620f543acb.png" alt="PEratio" width = "400" height = "250"/>

  + Line chart with dots
      - circle, line, text
      - <img src="https://user-images.githubusercontent.com/94620926/173233810-2326a310-ba11-4f7f-8a23-69eafd43a4e1.png" alt="dots line chart" width = "400" height = "250"/>

<a name="framer-motion"></a>
### Framer-motion
  + Enmerge
      - <img src="https://user-images.githubusercontent.com/94620926/173234164-1293e50c-0bcb-4652-83de-f7676ebbe1dc.gif" width = "250" height = "200" alt="emerge" />
  + Enlarge
      - <img src="https://user-images.githubusercontent.com/94620926/173234465-a4204483-3ec2-4b4a-82f5-ec5151c614bc.gif" width = "150" height = "60" alt="enlarge" />
      - <img src="https://user-images.githubusercontent.com/94620926/173234696-a7845839-8ae3-44a3-8ce9-53fa8c4bfa0d.gif" width = "80" height = "70" alt="enlarge" />
  + Moving
      - <img src="https://user-images.githubusercontent.com/94620926/173234677-1b4c5dbc-7d03-4fdc-b0ce-04a4c50d1705.gif" width = "70" height = "220" alt="moving" />
  + Drag
      - <img src="https://user-images.githubusercontent.com/94620926/173234783-2179c67c-9fc0-473d-a922-b9a6862328e9.gif" width = "300" height = "150" alt="drag" />
  + SVG Animation
      - <img src="https://user-images.githubusercontent.com/94620926/173234511-31fa79bd-2539-4149-bef0-3fb12e0a069b.gif" width = "300" height = "200" alt="svg animation" />
<a name="React-slick"></a>
<a name="React-slick"></a>
### React Slick
  + Auto slider
      - <img src="https://user-images.githubusercontent.com/94620926/173234952-8bd2ae85-a115-4e96-b3ab-10931a13caa9.gif" width = "300" height = "200" alt="svg animation" />
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
    - 財報狗(statement dog)
  + Code
    - node.js
    - python
    - express
<a name="FireKit"></a>
### FireKit
  + more than 2000 data bulk import files
     - <img src="https://user-images.githubusercontent.com/94620926/173235178-4007de3d-d7cd-4859-b179-44dd4a60eb9b.png" width = "150" height = "60" alt="phone"/>
<a name="contact"></a>
## 聯絡我
  + Yu-Chien,Chiu
  + mail：yuikuta0618@gmail.com
