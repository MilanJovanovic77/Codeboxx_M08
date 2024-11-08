import { useEffect, useState } from "react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [amount, setAmount] = useState("");
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5050/transaction/transaction-data");
      const data = await response.json();
      setTransactions(data.data.transactions);
      setAgents(data.data.agents);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5050/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: parseFloat(amount), agent_id: agentId }),
    });
    setAmount("");
    setAgentId("");
  };

  return (
    <div>
      <h1>Transactions</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <select value={agentId} onChange={(e) => setAgentId(e.target.value)} required>
          <option value="">Select Agent</option>
          {agents.map(agent => <option key={agent._id} value={agent._id}>{agent.name}</option>)}
        </select>
        <button type="submit">Submit Transaction</button>
      </form>
      <ul>
        {transactions.map(txn => (
          <li key={txn._id}>
            {txn.date} - ${txn.amount} - {txn.agent_id?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
