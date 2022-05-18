import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Home from './pages/HomePage/Home'
import Taiex from './pages/TaiexPage/Taiex'
import Login from './pages/LoginPage/Login'
import Signup from './pages/SignupPage/Signup'
import Analysis from './pages/MainPage/Analysis'
import TrackingList from './components/trackingList/TrackingList'




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
            <Route 
              path='/analysis/:id' 
              element={ <Analysis /> } 
            />
            <Route path='/taiex' element={ <Taiex /> }  />  
            <Route 
              path='/trckingList' 
              element={ user ? <TrackingList /> : <Navigate to="/login"/> } 
            /> 
        </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
