import { useEffect, useState } from 'react'
import { Rezervasyon } from '../types'
import { getRezervasyonlar } from '../services/api'

const Rezervasyonlar = () => {
  const [rezervasyonlar, setRezervasyonlar] = useState<Rezervasyon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRezervasyonlar()
        setRezervasyonlar(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="text-center py-8">Yükleniyor...</div>

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rezervasyonlar</h1>
      
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mb-6">
        + Yeni Rezervasyon
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {rezervasyonlar.length === 0 ? (
          <p className="text-gray-500">Henüz rezervasyon yok</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Kourt</th>
                  <th className="text-left py-3 px-4">Tarih</th>
                  <th className="text-left py-3 px-4">Saat</th>
                  <th className="text-left py-3 px-4">Fiyat</th>
                  <th className="text-left py-3 px-4">Durum</th>
                  <th className="text-left py-3 px-4">Ödeme</th>
                </tr>
              </thead>
              <tbody>
                {rezervasyonlar.map((rez) => (
                  <tr key={rez.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">#{rez.id}</td>
                    <td className="py-3 px-4">Kourt {rez.kourtId}</td>
                    <td className="py-3 px-4">{new Date(rez.tarih).toLocaleDateString('tr-TR')}</td>
                    <td className="py-3 px-4">{rez.baslangicSaati} - {rez.bitisSaati}</td>
                    <td className="py-3 px-4">₺{rez.fiyat}</td>
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
    </div>
  )
}

export default Rezervasyonlar
