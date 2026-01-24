import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import LandingPage from './pages/LandingPage/LandingPage.jsx'
import Login from './pages/Auth/Login.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import ResetPassword from './pages/Auth/ResetPassword.jsx'

import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Income from './pages/Dashboard/Income.jsx'
import Expense from './pages/Dashboard/Expense.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Toaster } from 'react-hot-toast'
import UserProvider from './context/UserContext.jsx'

function App() {

  // const navigate = useNavigate();

  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>

            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/income" element={<Income />}></Route>
            <Route path="/expense" element={<Expense />}></Route>
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;

// const Root = () =>{
//   const isAuthenticated = !!localStorage.getItem('token');
//   return isAuthenticated ?
//   <Navigate to = "/dashboard" /> : <Navigate to = "/" />
// }
