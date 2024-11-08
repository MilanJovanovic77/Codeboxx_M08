import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Welcome to RE Admin Dashboard</h1>
      <p className="mt-4">Select an option below to get started.</p>
      <div className="mt-8">
        <Link to="/agents" className="text-blue-500 mr-4">Manage Agents</Link>
        <Link to="/transactions" className="text-blue-500">View Transactions</Link>
      </div>
    </div>
  );
};

export default Home;
