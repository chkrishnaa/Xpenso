import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Logout from "./pages/Auth/Logout.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import OAuthSuccess from "./pages/Auth/OAuthSuccess.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Income from "./pages/Dashboard/Income.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/UserContext.jsx";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ✅ GOOGLE OAUTH CALLBACK */}
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            style: { fontSize: "13px" },
          }}
        />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
