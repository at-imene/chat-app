
import { Navigate, Outlet, Route, Routes } from 'react-router'
import './App.css'
import Navbar  from './components/Navbar.jsx'
import { useEffect } from 'react'
import {useAuthStore} from './store/useAuthStore.js'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
function App() {
  const {authUser, checkAuth} = useAuthStore();

  useEffect(()=>{}, [])
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser !== null?  <HomePage />: <Navigate to="/login"/>} />
        <Route path='/login' element={authUser === null? <LoginPage /> : <Navigate to="/"/>} />
        <Route path='/signup' element={authUser === null? <SignupPage /> : <Navigate to="/"/>} />
        <Route path='/profile' element={authUser !== null?  <ProfilePages />: <Navigate to="/login"/>} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App
