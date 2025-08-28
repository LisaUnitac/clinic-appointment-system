const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

//Users
export const UsersAPI = {
  list: async () => {
    const res = await request('/users')
    if (Array.isArray(res)) return res
    if (res?.data && Array.isArray(res.data)) return res.data
    return []
  },
  create: (payload) => request('/users', { method: 'POST', body: JSON.stringify(payload) }),
}

//Doctors
export const DoctorsAPI = {
  list: async () => {
    const res = await request('/doctors')
    if (Array.isArray(res)) return res
    if (res?.data && Array.isArray(res.data)) return res.data
    return []
  },
  create: (payload) => request('/doctors', { method: 'POST', body: JSON.stringify(payload) }),
}

//Appointments
export const AppointmentsAPI = {
  listActive: async () => {
    const res = await request('/appointments')
    if (Array.isArray(res)) return res
    if (res?.data && Array.isArray(res.data)) return res.data
    return []
  },
  create: (payload) => request('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/appointments/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  softDelete: (id, payload) => request(`/appointments/soft-delete/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
}
