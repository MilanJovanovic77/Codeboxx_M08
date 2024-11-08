import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/shared/NavBar";
import useTokenValidation from "./components/hooks/UseTokenValidation";

const App = () => {
  const navigate = useNavigate();
  const isValidSession = useTokenValidation();

  useEffect(() => {
    if (!isValidSession) {
      navigate("/login");
    }
  }, [isValidSession, navigate]);

  return (
    <div className="w-full p-6">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
