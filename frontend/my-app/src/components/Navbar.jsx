import { NavLink } from "react-router-dom";

export default function Navbar() {
  const link = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium ${isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">Patient App</span>
        <div className="flex gap-2">
          <NavLink to="/" className={link}>Add Patient</NavLink>
          <NavLink to="/patients" className={link}>All Patients</NavLink>
        </div>
      </div>
    </nav>
  );
}
