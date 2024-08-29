import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useAuthContext } from './context/authContext.jsx';

function App() {

  const {authUser} = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={"/"} /> : <Signup />} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
