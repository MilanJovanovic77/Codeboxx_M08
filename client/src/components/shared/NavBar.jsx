import { NavLink, useNavigate } from "react-router-dom";
import rocketLogo from "../assets/images/rocketElevators/rocketLogo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/agents");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/agents/login"); // Redirect to login page
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Rocket Elevators logo" className="h-20 inline" src={rocketLogo} />
        </NavLink>

        <NavLink
          className="button-custom inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/agents/create"
        >
          Create Agent
        </NavLink>

        <button
          className="button-custom inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          onClick={handleBack}
        >
          Back
        </button>

        <button
          className="button-custom inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          onClick={handleLogout}  // Logout button handler
        >
          Logout
        </button>
      </nav>
    </div>
  );
}