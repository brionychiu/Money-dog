import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Home from './pages/HomePage/Home'
import StockPrice from './pages/StockPricePage/StockPrice'
import PERatio from './pages/PERatioPage/PERatio'
import EPS from './pages/EPSPage/EPS'
import YoY from './pages/YoYPage/YoY'
import BasicInfo from './pages/BasicInfoPage/BasicInfo'
import StockIndex from './pages/StockIndexPage/StockIndex'
import Login from './pages/LoginPage/Login'
import Signup from './pages/SignupPage/Signup'
import TrackingList from './components/trackingList/TrackingList'
// 之後要刪掉
import Navbar from './components/Navbar/Navbar'



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
            <Route path='/stockPrice' element={ <StockPrice /> } />
            <Route 
              path='/PEratio' 
              element={ user ? <PERatio /> : <Navigate to="/login"/> } 
            />
            <Route
              path='/EPS' 
              element={ user ? <EPS />  : <Navigate to="/login"/> } 
            />
            <Route 
              path='/YoY' 
              element={ user ? <YoY /> : <Navigate to="/login"/> } 
            />
            <Route path='/basicInfo' element={ <BasicInfo /> } />
            <Route path='/stockIndex' element={ <StockIndex /> }  />  
            <Route 
              path='/trckingList' 
              element={ user ? <TrackingList /> : <Navigate to="/login"/> } 
            />
            {/* 之後要刪掉 */}
            <Route path='/navbar' element={ <Navbar /> }  />  
        </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
