import { useEffect, useState } from "react";

const Report = () => {
  const [agentSummary, setAgentSummary] = useState({ totalAgents: 0, avgRating: 0 });
  const [transactionSummary, setTransactionSummary] = useState({ totalTransactions: 0, totalAmount: 0 });

  useEffect(() => {
    // Fetch agent summary data
    const fetchAgentSummary = async () => {
      try {
        const response = await fetch("http://localhost:5050/agents");
        const agents = await response.json();
        const totalAgents = agents.length;
        const avgRating = agents.reduce((acc, agent) => acc + agent.rating, 0) / totalAgents || 0;
        setAgentSummary({ totalAgents, avgRating });
      } catch (error) {
        console.error("Error fetching agent summary:", error);
      }
    };

    // Fetch transaction summary data
    const fetchTransactionSummary = async () => {
      try {
        const response = await fetch("http://localhost:5050/transaction/transaction-data");
        const data = await response.json();
        const transactions = data.data.transactions;
        const totalTransactions = transactions.length;
        const totalAmount = transactions.reduce((acc, txn) => acc + txn.amount, 0);
        setTransactionSummary({ totalTransactions, totalAmount });
      } catch (error) {
        console.error("Error fetching transaction summary:", error);
      }
    };

    fetchAgentSummary();
    fetchTransactionSummary();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Reports Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Agent Summary */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Agent Summary</h2>
          <p>Total Agents: <span className="font-bold">{agentSummary.totalAgents}</span></p>
          <p>Average Rating: <span className="font-bold">{agentSummary.avgRating.toFixed(2)}</span></p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Summary</h2>
          <p>Total Transactions: <span className="font-bold">{transactionSummary.totalTransactions}</span></p>
          <p>Total Amount: <span className="font-bold">${transactionSummary.totalAmount.toFixed(2)}</span></p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {transactionSummary.totalTransactions === 0 ? (
          <p>No recent transactions to display.</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Amount (USD)</th>
                <th className="py-2 px-4">Agent</th>
              </tr>
            </thead>
            <tbody>
              {transactionSummary.totalTransactions > 0 && transactionSummary.transactions?.map((txn, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{new Date(txn.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">${txn.amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{txn.agent_id?.name || "Unknown Agent"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Report;