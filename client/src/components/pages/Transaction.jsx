import { useEffect, useState } from "react";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  // Fetch transactions and agent list
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5050/transaction/transaction-data", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      setTransactions(data.data.transactions);
      setAgents(data.data.agents);
    }
    fetchData();
  }, []);

  // Handle transaction submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !selectedAgent) return alert("Please fill out all fields");

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5050/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ amount: parseFloat(amount), agent_id: selectedAgent }),
    });
    if (response.ok) {
      alert("Transaction created successfully!");
      setAmount("");
      setSelectedAgent("");
      const newTransaction = await response.json();
      setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]);
    } else {
      alert("Failed to create transaction.");
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Transactions</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2 border border-gray-300 p-2 rounded"
          required
        />
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="mb-2 border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Select Agent</option>
          {agents.map(agent => (
            <option key={agent._id} value={agent._id}>{agent.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
          Submit Transaction
        </button>
      </form>
      <h4 className="text-md font-semibold">Last 10 Transactions</h4>
      <ul>
        {transactions.map(txn => (
          <li key={txn._id} className="mb-2">
            {txn.date} - ${txn.amount} - {txn.agent_id?.name}
          </li>
        ))}
      </ul>
    </>
  );
}
