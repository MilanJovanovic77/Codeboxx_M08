import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecordAgents() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "", // Keep fee as a number input
    position: "",
    sales: "", // Keep sales as a number input
  });
  const params = useParams();
  const navigate = useNavigate();

  // Fetch the agent data for editing if an ID is provided in the URL
  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return; // No ID means we're creating a new agent
      const token = localStorage.getItem("token");  // Get token from localStorage
      const response = await fetch(`http://localhost:5050/agents/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Include JWT token in headers
        },
      });
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const record = await response.json();
      setForm(record);  // Populate the form with the fetched agent data
    }
    fetchData();
  }, [params.id, navigate]);

  // Function to update form state when input fields change
  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  // Function to handle form submission (for both creating and updating)
  async function onSubmit(e) {
    e.preventDefault();

    // Prepare the form data for submission (converting string inputs to numbers if necessary)
    const agentData = {
      ...form,
      fee: parseFloat(form.fee) || 0,  // Convert fee input to a number
      sales: parseFloat(form.sales) || 0,  // Convert sales input to a number
    };

    const method = params.id ? "PATCH" : "POST";  // Determine whether to update or create
    const url = `http://localhost:5050/agents/${params.id || ""}`;
    const token = localStorage.getItem("token");  // Retrieve JWT token from localStorage

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Include the JWT token in headers
        },
        body: JSON.stringify(agentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        region: "",
        rating: "",
        fee: "",
        position: "",
        sales: "",
      });
      navigate("/agents");  // Navigate back to the agents list after saving
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Agents Information</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        
        {/* First Row - Agents Info */}
        <div className="col-span-2">
          <h2 className="text-base font-semibold leading-7 text-slate-900">Agents Info</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        {/* Second Row - First Name, Last Name, Email, Position, Region */}
        <div className="grid grid-cols-5 gap-x-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-slate-900">First Name</label>
            <div className="mt-2">
              <input
                type="text"
                name="first_name"
                id="first_name"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="First Name"
                value={form.first_name || ""}
                onChange={(e) => updateForm({ first_name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-slate-900">Last Name</label>
            <div className="mt-2">
              <input
                type="text"
                name="last_name"
                id="last_name"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Last Name"
                value={form.last_name || ""}
                onChange={(e) => updateForm({ last_name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Email</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder={!params.id ? "Ex.: email@email.com" : ""}
                value={form.email || ""}
                onChange={(e) => updateForm({ email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium leading-6 text-slate-900">Position</label>
            <div className="mt-2">
              <input
                type="text"
                name="position"
                id="position"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Manager, Top Agent or Agent"
                value={form.position || ""}
                onChange={(e) => updateForm({ position: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium leading-6 text-slate-900">Region</label>
            <div className="mt-2">
              <input
                type="text"
                name="region"
                id="region"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="North, East, West or South"
                value={form.region || ""}
                onChange={(e) => updateForm({ region: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Third Row - Rating, Fee (USD), Sales (USD) */}
        <div className="grid grid-cols-3 gap-x-6">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium leading-6 text-slate-900">Rating</label>
            <div className="mt-2">
              <input
                type="number"
                name="rating"
                id="rating"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Rating"
                value={form.rating || ""}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="fee" className="block text-sm font-medium leading-6 text-slate-900">Fee (USD)</label>
            <div className="mt-2">
              <input
                type="number"  // Input type number to allow raw number entry
                name="fee"
                id="fee"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter fee"
                value={form.fee || ""}
                onChange={(e) => updateForm({ fee: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sales" className="block text-sm font-medium leading-6 text-slate-900">Sales (USD)</label>
            <div className="mt-2">
              <input
                type="number"  // Input type number to allow raw number entry
                name="sales"
                id="sales"
                className="block w-full border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Enter sales"
                value={form.sales || ""}
                onChange={(e) => updateForm({ sales: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Fourth Row - Save Agents Information button */}
        <input
          type="submit"
          value="Save Agents Information"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}