import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPatient, API } from "../api";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPatient(id).then(setPatient).catch((e) => setError(String(e.message)));
  }, [id]);

  const onDelete = async () => {
    if (!confirm(`Delete ${id}?`)) return;
    await fetch(`${API}/delete/${id}`, { method: "DELETE" });
    navigate("/patients");
  };

  if (error) return <p className="text-center mt-10 text-red-600">{error} <Link to="/patients" className="underline">Back</Link></p>;
  if (!patient) return <p className="text-center mt-10 text-gray-500">Loading…</p>;

  const verdict = patient.validate ?? patient.verdict;

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <Link to="/patients" className="text-sm text-indigo-600 hover:underline">← All patients</Link>
      <h2 className="text-2xl font-bold mt-2">{patient.name} <span className="font-mono text-sm text-gray-400">{patient.id}</span></h2>
      <div className="mt-4 space-y-1 text-gray-600">
        <p>City: {patient.city}</p>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
        <p>Height: {patient.height}m</p>
        <p>Weight: {patient.weight}kg</p>
        <p>BMI: <strong>{patient.bmi}</strong></p>
        <p>Verdict: <strong>{verdict}</strong></p>
      </div>
      <button onClick={onDelete} className="w-full mt-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
    </div>
  );
}
