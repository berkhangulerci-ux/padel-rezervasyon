import { useEffect, useState } from 'react'
import { Kourt, Rezervasyon } from '../types'
import { getKourtlar, getRezervasyonlar } from '../services/api'

const Dashboard = () => {
  const [kourtlar, setKourtlar] = useState<Kourt[]>([])
  const [rezervasyonlar, setRezervasyonlar] = useState<Rezervasyon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kourtRes, rezRes] = await Promise.all([
          getKourtlar(),
          getRezervasyonlar(),
        ])
        setKourtlar(kourtRes.data)
        setRezervasyonlar(rezRes.data)
      } catch (error) {
        console.error('Veri çekme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="text-center py-8">Yükleniyor...</div>

  const bugunRezervasyonlari = rezervasyonlar.filter((rez) => {
    const rezTarih = new Date(rez.tarih).toDateString()
    const bugun = new Date().toDateString()
    return rezTarih === bugun
  })

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kourtlar.map((kourt) => (
          <div
            key={kourt.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">{kourt.adi}</h3>
            <p className="text-gray-600 mb-4">{kourt.konum}</p>
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                kourt.durum === 'aktif' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {kourt.durum === 'aktif' ? '✓ Aktif' : '✗ Pasif'}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">📅 Bugünün Rezervasyonları</h2>
        {bugunRezervasyonlari.length === 0 ? (
          <p className="text-gray-500">Bugün için rezervasyon yok</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4">Kourt</th>
                  <th className="text-left py-3 px-4">Saat</th>
                  <th className="text-left py-3 px-4">Fiyat</th>
                  <th className="text-left py-3 px-4">Durum</th>
                  <th className="text-left py-3 px-4">Ödeme</th>
                </tr>
              </thead>
              <tbody>
                {bugunRezervasyonlari.map((rez) => (
                  <tr key={rez.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">Kourt {rez.kourtId}</td>
                    <td className="py-3 px-4">
                      {rez.baslangicSaati} - {rez.bitisSaati}
                    </td>
                    <td className="py-3 px-4 font-bold text-green-600">₺{rez.fiyat}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                        {rez.durum}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          rez.odeme === 'odendi'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {rez.odeme}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-blue-100 text-sm mb-2">Toplam Kourtlar</p>
          <p className="text-4xl font-bold">{kourtlar.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-green-100 text-sm mb-2">Bugün Rezervasyonlar</p>
          <p className="text-4xl font-bold">{bugunRezervasyonlari.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <p className="text-purple-100 text-sm mb-2">Toplam Rezervasyonlar</p>
          <p className="text-4xl font-bold">{rezervasyonlar.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
