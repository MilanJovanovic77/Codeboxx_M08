import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
        const data = await response.json();
        if (data.data.valid) {
          setUserName(`${data.data.user.first_name} ${data.data.user.last_name}`);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center mb-6">
      <NavLink to="/" className="text-lg font-bold">RE Admin</NavLink>
      <div>
        <NavLink to="/agents" className="mr-4">Agents</NavLink>
        <NavLink to="/transactions" className="mr-4">Transactions</NavLink>
        {userName && <span className="mr-4">Welcome, {userName}</span>}
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;