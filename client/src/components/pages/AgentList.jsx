import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Record = (props) => {
  console.log("Fee:", props.record.fee);  // Log fee value
  console.log("Sales:", props.record.sales);  // Log sales value

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.first_name}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.last_name}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.position} 
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.region}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.rating}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.fee} {/* Fee formatted */}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        {props.record.sales} {/* Sales formatted */}
      </td>
      <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/agents/edit/${props.record._id}`} // Correct path to navigate
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={() => {
              props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default function RecordListAgents() {
  const location = useLocation();
  const [records, setRecords] = useState([]);

  // Fetch the records from the database
  useEffect(() => {
    async function getRecords() {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await fetch(`http://localhost:5050/agents/`, {
        headers: {
          "Authorization": `Bearer ${token}`  // Include the token in the headers
        },
      });
      
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
  }, [location]);

  // Delete a record
  async function deleteRecord(id) {
    const token = localStorage.getItem("token"); // Retrieve token again
    await fetch(`http://localhost:5050/agents/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`  // Include the token in the headers for deletion
      }
    });
    
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Map out the records for the table
  function recordList() {
    return records.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
      />
    ));
  }

  // Display the table with the records of agents
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Agents List</h3> {/* Updated title */}
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  First Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Last Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Position 
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Region {/* New column */}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Rating {/* New column */}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Fee (USD) {/* New column */}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Sales (USD) {/* Changed from Level to Sales */}
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}