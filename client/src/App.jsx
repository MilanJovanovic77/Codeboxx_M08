import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import useTokenValidation from "./components/hooks/UseTokenValidation";

const App = () => {
  useTokenValidation(); // Call the hook to validate session

  return (
    <div className="w-full p-6">
      <Navbar /> {/* Keep the Navbar available across pages */}
      <Outlet />
    </div>
  );
};

export default App;
