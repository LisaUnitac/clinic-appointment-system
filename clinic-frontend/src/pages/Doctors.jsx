import { useEffect, useState } from 'react'
import { DoctorsAPI } from '../services/api'

export default function Doctors() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', specialization: '' })

  async function load() {
    const data = await DoctorsAPI.list()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    await DoctorsAPI.create({ ...form, createdBy: 'frontend' })
    setForm({ name: '', specialization: '' })
    load()
  }

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">Create Doctor</h2>
        <form onSubmit={submit} className="grid sm:grid-cols-3 gap-3">
          <input className="border rounded-xl p-2" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} required />
          <input className="border rounded-xl p-2" placeholder="Specialization" value={form.specialization} onChange={e=>setForm(f=>({...f, specialization:e.target.value}))} required />
          <button className="bg-blue-600 text-white rounded-xl px-4 py-2">Save</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Doctors</h2>
          <button onClick={load} className="text-sm underline">Refresh</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Specialization</th>
              </tr>
            </thead>
            <tbody>
              {items.map(d => (
                <tr key={d.id} className="border-b hover:bg-slate-50">
                  <td className="py-2 pr-4">{d.id}</td>
                  <td className="py-2 pr-4">{d.name}</td>
                  <td className="py-2 pr-4">{d.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
