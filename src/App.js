import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Home from './pages/HomePage/Home'
import Taiex from './pages/TaiexPage/Taiex'
import Login from './pages/LoginPage/Login'
import Signup from './pages/SignupPage/Signup'
import Analysis from './pages/MainPage/Analysis'
import TrackingList from './pages/trackingList/TrackingList'
import Error from './pages/ErrorPage/Error'
import PERatio from './pages/PERatioPage/PERatio'
import EPS from './pages/EPSPage/EPS'
import YoY from './pages/YoYPage/YoY'
import BasicInfo from './pages/BasicInfoPage/BasicInfo'
import StockPrice from './pages/StockPricePage/StockPrice'

// styles
import './App.css';


function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route 
              path='/login' 
              element={ user ? <Navigate to="/"/> : <Login /> } 
            />
            <Route 
              path='/signup' 
              element={ user ? <Navigate to="/"/> : <Signup /> } 
            />
            <Route path='/analysis/:stockId' element={user ?   <Analysis />: <Navigate to="/login"/>  }>
                <Route 
                  path='' 
                  element={user ?  <StockPrice /> : <Navigate to="/login"/> } 
                />
                <Route 
                  path='PEratio' 
                  element={ user ? <PERatio /> : <Navigate to="/login"/> } 
                />
                <Route
                  path='EPS' 
                  element={ user ? <EPS />  : <Navigate to="/login"/> } 
                />
                <Route 
                  path='YoY' 
                  element={ user ? <YoY /> : <Navigate to="/login"/> } 
                />
                <Route path='basicInfo' element={ <BasicInfo /> } />
            </Route>
            <Route path='/taiex' element={ <Taiex /> }  />  
            <Route 
              path='/trckingList' 
              element={ user ? <TrackingList /> : <Navigate to="/login"/> } 
            /> 
            <Route path='*' element={ <Error /> }  />  
        </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
