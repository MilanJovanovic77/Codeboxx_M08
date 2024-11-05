import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/shared/Navbar";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/agents/login");  // Redirect to login if no token
    }
  }, [navigate]);

  return (
    <div className="w-full p-6">
      <Navbar /> {/* Keep the Navbar available across pages */}
      <Outlet />
    </div>
  );
};

export default App;
