import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Agent = () => {
  const [form, setForm] = useState({ name: "", position: "", region: "", rating: 0, fees: 0, sales: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      async function fetchAgent() {
        const response = await fetch(`http://localhost:5050/agents/${id}`);
        const agent = await response.json();
        setForm(agent);
      }
      fetchAgent();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PATCH" : "POST";
    await fetch(`http://localhost:5050/agents/${id || ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/agents");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
      <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} placeholder="Position" required />
      <input type="text" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="Region" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default Agent;