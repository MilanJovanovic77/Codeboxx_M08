import { NavLink, useNavigate } from "react-router-dom";
import rocketLogo from "../assets/images/rocketElevators/rocketLogo.png"; // Import the logo

export default function Navbar() {
  const navigate = useNavigate();  // Use the navigate function for navigation

  // Back button handler
  const handleBack = () => {
    // Instead of using history.back(), let's navigate to a safe route directly
    navigate("/agents");  // Always navigate back to the agents list page
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Rocket Elevators logo" className="h-20 inline" src={rocketLogo} />
        </NavLink>

        <NavLink
          className="button-custom inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to="/agents/create"
        >
          Create Agent
        </NavLink>

        <button
          className="button-custom inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          onClick={handleBack}  // Use the handleBack function here
        >
          Back
        </button>
      </nav>
    </div>
  );
}