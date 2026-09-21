export const API = "http://localhost:8000";

export function normalizePatients(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return Object.entries(data).map(([id, p]) => ({ id, ...p }));
}

export async function fetchAllPatients() {
  const res = await fetch(`${API}/view`);
  const data = await res.json();
  if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail));
  return normalizePatients(data);
}

export async function fetchPatient(id) {
  const res = await fetch(`${API}/patients/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Patient not found");
  return { id, ...data };
}
