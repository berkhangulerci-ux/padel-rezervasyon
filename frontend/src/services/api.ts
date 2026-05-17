import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

// Kourtlar
export const getKourtlar = () => api.get('/kourtlar')
export const createKourt = (data: any) => api.post('/kourtlar', data)
export const updateKourt = (id: number, data: any) => api.put(`/kourtlar/${id}`, data)
export const deleteKourt = (id: number) => api.delete(`/kourtlar/${id}`)

// Sporcular
export const getSporcular = () => api.get('/sporcular')
export const createSporcu = (data: any) => api.post('/sporcular', data)
export const updateSporcu = (id: number, data: any) => api.put(`/sporcular/${id}`, data)
export const deleteSporcu = (id: number) => api.delete(`/sporcular/${id}`)

// Rezervasyonlar
export const getRezervasyonlar = () => api.get('/rezervasyonlar')
export const createRezervasyonu = (data: any) => api.post('/rezervasyonlar', data)
export const updateRezervasyonu = (id: number, data: any) => api.put(`/rezervasyonlar/${id}`, data)
export const deleteRezervasyonu = (id: number) => api.delete(`/rezervasyonlar/${id}`)

// Ödemeler
export const getOdemeler = () => api.get('/odemeler')
export const createOdeme = (data: any) => api.post('/odemeler', data)
export const updateOdeme = (id: number, data: any) => api.put(`/odemeler/${id}`, data)
export const deleteOdeme = (id: number) => api.delete(`/odemeler/${id}`)

export default api
