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

import RolePermissions from './pages/Permissions/RolePermissions'
import CreateRolePermissions from './pages/Permissions/CreateRolePermissions'
import ViewOneRole from './pages/Permissions/ViewOneRole'
import UserManage from './pages/Users/UserManage'
import ViewUser from './pages/Users/ViewUser'
import Profile from './pages/Profile/Profile'

import Dashboard from './components/Dashboard/Dashboard'
import DashHome from './pages/DashHome/DashHome'
import DashError from './components/Errors/DashError'
import ManageProjects from './pages/Projects/ManageProjects'
import CreateProject from './pages/Projects/CreateProject'
import ViewOneProject from './pages/Projects/ViewOneProject'
import ManageInterns from './pages/Interns/ManageInterns'
import ViewIntern from './pages/Interns/ViewIntern'
import ManageSupervisors from './pages/Supervisors/ManageSupervisors'
import MyAttendance from './pages/MyAttendance/MyAttendance'
import Attendance from './pages/Attendance/Attendance'
import MyProjects from './pages/MyProjects/MyProjects'
import MyInterns from './pages/MyInterns/MyInterns'
import GithubStatusProject from './pages/Projects/GithubStatusProject'

function App() {    
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

                    <Route path='/Dashboard/' element={<PrivateRoute element={<Dashboard />} />} >
                        <Route path='*' element={<DashError />} />
                        <Route path='Home' element={<PrivateRoute element={<DashHome />} />} />

                        <Route path='Permissions' element={<PrivateRoute element={<RolePermissions />} />} />
                        <Route path='Create-Permissions' element={<PrivateRoute element={<CreateRolePermissions />} />} />
                        <Route path='View-One-Role/:id' element={<PrivateRoute element={<ViewOneRole />} />} />

                        <Route path='Users' element={<PrivateRoute element={<UserManage />} />} />
                        <Route path='View-user/:id' element={<PrivateRoute element={<ViewUser />} />} />

                        <Route path='Profile' element={<PrivateRoute element={<Profile />} />} />

                        <Route path='ManageInterns' element={<PrivateRoute element={<ManageInterns /> } /> } />
                        <Route path='View-intern/:id' element={<PrivateRoute element={<ViewIntern /> } /> } />

                        <Route path='Projects' element={<PrivateRoute element={<ManageProjects /> } /> } />
                        <Route path='Create-project' element={<PrivateRoute element={<CreateProject /> } /> } />
                        <Route path='View-one-project/:id' element={<PrivateRoute element={<ViewOneProject /> } /> } />
                        <Route path='Github-status-project/:name' element={<PrivateRoute element={<GithubStatusProject /> } /> } />

                        <Route path='ManageSupervisor' element={<PrivateRoute element={<ManageSupervisors /> } /> } />

                        <Route path='Attendance' element={<PrivateRoute element={<Attendance /> } /> } />


                        {/* supervisor */}

                        <Route path='MyInterns' element={<PrivateRoute element={<MyInterns /> } /> } />

                        {/* Intern */}

                        <Route path='MyAttendance' element={<PrivateRoute element={<MyAttendance /> } /> } />

                        <Route path='MyProjects' element={<PrivateRoute element={<MyProjects /> } /> } />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
