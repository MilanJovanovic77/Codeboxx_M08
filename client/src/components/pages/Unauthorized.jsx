import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Unauthorized Access</h1>
      <p className="mt-4">You do not have permission to view this page.</p>
      <Link to="/login" className="text-blue-500 mt-4 block">Go to Login</Link>
    </div>
  );
};

export default Unauthorized;
