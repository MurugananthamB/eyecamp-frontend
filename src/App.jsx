import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/Home";
import UserManagement from "./pages/userManagement";
import Dashboard from "./pages/dashboard";
import Surgery from "./pages/surgery";
import EditDischarge from "./pages/editDischarge";
import { FormProvider } from "./pages/formContext";
import ProtectedRoute from "./pages/protectedRoutes";



function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          {/* Public Route: Login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/register"
            element={<ProtectedRoute element={<Register />} />}
          />
          <Route
            path="/usrmgmt"
            element={<ProtectedRoute element={<UserManagement />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/surgery"
            element={<ProtectedRoute element={<Surgery />} />}
          />
          <Route
            path="/editdischarge"
            element={<ProtectedRoute element={<EditDischarge />} />}
          />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
