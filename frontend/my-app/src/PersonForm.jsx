import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

const initialForm = {
  id: "", name: "", city: "", age: "",
  gender: "female", height: "", weight: ""
};

const verdictStyles = {
  Underweight: "bg-yellow-100 text-yellow-800",
  Normal: "bg-green-100 text-green-800",
  Overweight: "bg-orange-100 text-orange-800",
  Obese: "bg-red-100 text-red-800",
};

export default function PersonForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [list, setList] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showError = (data) => {
    const msg = typeof data?.detail === "string" ? data.detail : JSON.stringify(data?.detail ?? data);
    alert(msg);
  };

  // CREATE: POST /create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          city: form.city,
          age: Number(form.age),
          gender: form.gender,
          height: Number(form.height),
          weight: Number(form.weight),
        }),
      });
      const data = await res.json();
      if (!res.ok) return showError(data);
      navigate(`/patients/${form.id}`);
    } catch (err) {
      alert(String(err));
    }
  };

  // UPDATE: PUT /edit/{id} — PatientUpdate has no id, all fields optional
  const updatePatient = async () => {
    if (!form.id) return alert("Enter Id to update");
    const payload = {};
    if (form.name) payload.name = form.name;
    if (form.city) payload.city = form.city;
    if (form.age !== "") payload.age = Number(form.age);
    if (form.gender) payload.gender = form.gender;
    if (form.height !== "") payload.height = Number(form.height);
    if (form.weight !== "") payload.weight = Number(form.weight);
    try {
      const res = await fetch(`${API}/edit/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return showError(data);
      const p = await fetch(`${API}/patients/${form.id}`).then((r) => r.json());
      setResult(p);
      setList(null);
    } catch (err) {
      alert(String(err));
    }
  };

  // VIEW: single if id given, else all
  const viewPatient = async () => {
    try {
      if (form.id) {
        const p = await fetch(`${API}/patients/${form.id}`).then((r) => r.json());
        if (p.detail) return showError(p);
        setResult(p);
        setList(null);
      } else {
        const all = await fetch(`${API}/view`).then((r) => r.json());
        setList(all);
        setResult(null);
      }
    } catch (err) {
      alert(String(err));
    }
  };

  // DELETE: DELETE /delete/{id}
  const deletePatient = async () => {
    if (!form.id) return alert("Enter Id to delete");
    try {
      const res = await fetch(`${API}/delete/${form.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) return showError(data);
      alert(data.message);
      setResult(null);
      setForm(initialForm);
    } catch (err) {
      alert(String(err));
    }
  };

  const inputCls = "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelCls = "block text-sm font-medium text-gray-600";
  const verdict = result?.validate ?? result?.verdict;

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Person Details Form</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={labelCls}>Id</label>
          <input name="id" value={form.id} onChange={handleChange} required className={inputCls} placeholder="P001" />
        </div>
        <div>
          <label className={labelCls}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>City</label>
          <input name="city" value={form.city} onChange={handleChange} required className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputCls}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Height (m)</label>
            <input type="number" step="0.01" name="height" value={form.height} onChange={handleChange} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Weight (kg)</label>
            <input type="number" step="0.1" name="weight" value={form.weight} onChange={handleChange} required className={inputCls} />
          </div>
        </div>
        <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">
          Insert
        </button>
        <button type="button" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold" onClick={updatePatient}>
          Update
        </button>
        <button type="button" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold" onClick={viewPatient}>
          View
        </button>
        <button type="button" className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold" onClick={deletePatient}>
          Delete
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-3 rounded-lg text-center font-medium ${verdictStyles[verdict] ?? "bg-gray-100"}`}>
          <p>BMI: {result.bmi}</p>
          <p>Verdict: {verdict}</p>
        </div>
      )}

      {list && (
        <pre className="mt-4 p-3 bg-gray-50 rounded-lg text-xs overflow-auto max-h-64">
          {JSON.stringify(list, null, 2)}
        </pre>
      )}
    </div>
  );
}
