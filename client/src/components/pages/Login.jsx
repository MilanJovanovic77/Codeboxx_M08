import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import rocketLogo from "../assets/images/rocketElevators/rocketLogo.png"; // Import the logo

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Control for showing the modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/agents/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 404) {
        setError("Access Denied: Agent not found");
      } else if (response.status === 401) {
        setError("Wrong password, please try again.");
      } else if (!response.ok) {
        setError(data.error);
      } else {
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);
        navigate("/agents"); // Successful login, redirect to /agents
      }

      setShowModal(true); // Show the modal with the error message
    } catch (err) {
      console.error("Error logging in", err);
      setError("Server error");
      setShowModal(true); // Show the modal for the server error
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(""); 
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <img alt="Rocket Elevators logo" className="h-20" src={rocketLogo} />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
          <h3 className="text-lg font-semibold text-center">Login</h3>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 p-2 border w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="mt-2 p-2 border w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.304.964-.804 1.867-1.458 2.683M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0012 19c-4.478 0-8.268-2.944-9.542-7a10.05 10.05 0 00.661-1.97m3.272-5.172A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7" />
                  </svg>
                )}
              </span>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button className="absolute top-1 right-1 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
              X
            </button>
            <p className="text-red-500 text-center">{error}</p>
          </div>
        </div>
      )}
    </>
  );
}