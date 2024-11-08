

import config from "../../config";

const useTokenValidation = () => {
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValidSession(false);
      return;
    }

    fetch(`${config.API_URL}/validate_token?token=${token}`)
      .then((response) => response.json())
      .then((data) => setIsValidSession(data.valid))
      .catch(() => setIsValidSession(false));
  }, []);

  return isValidSession;
};

export default useTokenValidation;