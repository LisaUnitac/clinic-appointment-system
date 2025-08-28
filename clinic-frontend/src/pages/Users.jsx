import { useEffect, useState } from 'react'
import { UsersAPI } from '../services/api'

export default function Users() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', email: '', role: 'patient' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await UsersAPI.list()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    try {
      await UsersAPI.create({ ...form, createdBy: 'frontend' })
      setForm({ name: '', email: '', role: 'patient' })
      load()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">Create User</h2>
        <form onSubmit={submit} className="grid sm:grid-cols-4 gap-3">
          <input className="border rounded-xl p-2" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} required />
          <input className="border rounded-xl p-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} required />
          <select className="border rounded-xl p-2" value={form.role} onChange={e=>setForm(f=>({...f, role:e.target.value}))}>
            <option value="patient">patient</option>
            <option value="staff">staff</option>
          </select>
          <button className="bg-blue-600 text-white rounded-xl px-4 py-2">Save</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Users</h2>
          <button onClick={load} className="text-sm underline">Refresh</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id} className="border-b hover:bg-slate-50">
                  <td className="py-2 pr-4">{u.id}</td>
                  <td className="py-2 pr-4">{u.name}</td>
                  <td className="py-2 pr-4">{u.email}</td>
                  <td className="py-2 pr-4">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
