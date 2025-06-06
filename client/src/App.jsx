import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './pages/AuthPage/SignIn'
import SignUp from './pages/AuthPage/SignUp'
import ForgetPass from './pages/AuthPage/ForgetPass'
import VerifyOTP from './pages/AuthPage/VerifyOTP'
import VerifyEmail from './pages/AuthPage/VerifyEmail'
import UpdateNewPass from './pages/AuthPage/UpdateNewPass'
import PrivateRoute from './Auth/PrivateRoute'


import Dashboard from './components/Dashboard/Dashboard'
import DashHome from './pages/DashHome/DashHome'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<SignIn />} />
                    <Route path='/register' element={<SignUp />} />
                    <Route path='/Forgetpassword' element={<ForgetPass />} />
                    <Route path='/verify-otp' element={<VerifyOTP />} />
                    <Route path='/update-new-pass' element={<UpdateNewPass />} />
                    <Route path='/verify-email' element={<VerifyEmail />} />

                    <Route path='/Dashboard/' element={<PrivateRoute element={<Dashboard /> }/> } >
                        <Route path='Home' element={<PrivateRoute element={<DashHome /> } /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
