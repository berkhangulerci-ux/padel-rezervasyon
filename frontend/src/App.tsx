import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rezervasyonlar from './pages/Rezervasyonlar'
import Sporcular from './pages/Sporcular'
import Odemeler from './pages/Odemeler'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rezervasyonlar" element={<Rezervasyonlar />} />
            <Route path="/sporcular" element={<Sporcular />} />
            <Route path="/odemeler" element={<Odemeler />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
