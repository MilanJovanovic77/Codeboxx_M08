import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      const response = await fetch("http://localhost:5050/agents");
      const data = await response.json();
      setAgents(data);
    }
    fetchAgents();
  }, []);

  const deleteAgent = async (id) => {
    await fetch(`http://localhost:5050/agents/${id}`, { method: "DELETE" });
    setAgents(agents.filter(agent => agent._id !== id));
  };

  return (
    <div>
      <h1>Agents</h1>
      <Link to="/agents/create">Create Agent</Link>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - {agent.region}
            <Link to={`/agents/edit/${agent._id}`}>Edit</Link>
            <button onClick={() => deleteAgent(agent._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;