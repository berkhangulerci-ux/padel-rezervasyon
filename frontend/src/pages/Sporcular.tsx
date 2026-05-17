import { useEffect, useState } from 'react'
import { Sporcu } from '../types'
import { getSporcular } from '../services/api'

const Sporcular = () => {
  const [sporcular, setSporcular] = useState<Sporcu[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    adi: '',
    soyadi: '',
    email: '',
    telefon: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSporcular()
        setSporcular(res.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API'ye POST isteği gönder
    console.log('Yeni sporcu:', formData)
    setFormData({ adi: '', soyadi: '', email: '', telefon: '' })
    setShowForm(false)
  }

  if (loading) return <div className="text-center py-8">Yükleniyor...</div>

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sporcular</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? '✕ İptal' : '+ Yeni Sporcu'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Ad"
                value={formData.adi}
                onChange={(e) => setFormData({ ...formData, adi: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Soyadı"
                value={formData.soyadi}
                onChange={(e) => setFormData({ ...formData, soyadi: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="E-posta"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Telefon"
                value={formData.telefon}
                onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Sporcu Ekle
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {sporcular.length === 0 ? (
          <p className="text-gray-500">Henüz sporcu yok</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-300">
                <tr>
                  <th className="text-left py-3 px-4">Ad Soyad</th>
                  <th className="text-left py-3 px-4">E-posta</th>
                  <th className="text-left py-3 px-4">Telefon</th>
                  <th className="text-left py-3 px-4">Kayıt Tarihi</th>
                  <th className="text-left py-3 px-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {sporcular.map((sporcu) => (
                  <tr key={sporcu.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">
                      {sporcu.adi} {sporcu.soyadi}
                    </td>
                    <td className="py-3 px-4">{sporcu.email}</td>
                    <td className="py-3 px-4">{sporcu.telefon}</td>
                    <td className="py-3 px-4">
                      {new Date(sporcu.kayitTarihi).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-3">Düzenle</button>
                      <button className="text-red-600 hover:text-red-800">Sil</button>
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

export default Sporcular
