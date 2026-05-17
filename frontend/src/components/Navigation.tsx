import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-100">
            🎾 Padel Rezervasyon
          </Link>
          <div className="flex gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/')
                  ? 'bg-blue-900 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/rezervasyonlar"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/rezervasyonlar')
                  ? 'bg-blue-900 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              📅 Rezervasyonlar
            </Link>
            <Link
              to="/sporcular"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/sporcular')
                  ? 'bg-blue-900 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              👥 Sporcular
            </Link>
            <Link
              to="/odemeler"
              className={`px-4 py-2 rounded-lg transition ${
                isActive('/odemeler')
                  ? 'bg-blue-900 font-semibold'
                  : 'hover:bg-blue-700'
              }`}
            >
              💰 Ödemeler
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
