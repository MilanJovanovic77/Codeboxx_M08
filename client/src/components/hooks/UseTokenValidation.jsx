import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useTokenValidation = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await fetch(`http://localhost:5050/session/validate_token?token=${token}`);
      const data = await response.json();
      setIsValid(data.data.valid);
      if (!data.data.valid) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    validateSession();
  }, [navigate]);

  return isValid;
};

export default useTokenValidation;
