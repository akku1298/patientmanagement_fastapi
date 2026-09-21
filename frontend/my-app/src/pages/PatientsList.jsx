import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllPatients, API } from "../api";

const badge = {
  Underweight: "bg-yellow-100 text-yellow-800",
  Normal: "bg-green-100 text-green-800",
  Overweight: "bg-orange-100 text-orange-800",
  Obese: "bg-red-100 text-red-800",
};

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setPatients(await fetchAllPatients());
    } catch (e) {
      setError(String(e.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm(`Delete ${id}?`)) return;
    const res = await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    if (!res.ok) return alert("Delete failed");
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading patients…</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Patients ({patients.length})</h2>
        <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Add</Link>
      </div>
      {patients.length === 0 ? (
        <p className="text-center text-gray-500">No patients yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((p) => {
            const verdict = p.validate ?? p.verdict;
            return (
              <div key={p.id} className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-400">{p.id}</span>
                  {verdict && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge[verdict] ?? "bg-gray-100"}`}>
                      {verdict} • {p.bmi}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.city} • {p.age}y • {p.gender}</p>
                <p className="text-sm text-gray-500 mt-1">H: {p.height}m W: {p.weight}kg</p>
                <div className="flex gap-2 mt-4">
                  <Link to={`/patients/${p.id}`} className="flex-1 text-center px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 text-sm font-medium">View</Link>
                  <button onClick={() => onDelete(p.id)} className="flex-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
