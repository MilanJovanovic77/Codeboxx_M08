import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenValidation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/agents/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
        const data = await response.json();
        
        if (!data.data.valid) {
          localStorage.removeItem("token"); // Clear invalid token
          navigate("/agents/login"); // Redirect if token is invalid
        }
      } catch (error) {
        console.error("Error validating session:", error);
        navigate("/agents/login"); // Redirect if an error occurs
      }
    };

    validateSession();
  }, [navigate]);
};

export default useTokenValidation;
