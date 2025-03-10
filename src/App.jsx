import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import UserManagement from "./pages/userManagement";
import Dashboard from "./pages/dashboard";
import Surgery from "./pages/surgery";
import EditDischarge from "./pages/editDischarge";
import { FormProvider } from "./pages/formContext";
import ReprintCard from "./pages/repirntCard";



function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/usrmgmt" element={<UserManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/surgery" element={<Surgery />} />
          <Route path="/editdischarge" element={<EditDischarge />} />
          <Route path="/reprintcard" element={<ReprintCard />} />
          
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
