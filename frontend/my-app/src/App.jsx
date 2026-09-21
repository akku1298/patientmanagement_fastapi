import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PersonForm from './PersonForm'
import Navbar from './components/Navbar'
import PatientsList from './pages/PatientsList'
import PatientDetail from './pages/PatientDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<PersonForm />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
