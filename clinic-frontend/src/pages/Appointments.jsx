import { useEffect, useState } from 'react'
import { AppointmentsAPI } from '../services/api'


export default function Appointments() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ user_id: '', doctor_id: '', appointment_date: '' })
  const [editingId, setEditingId] = useState(null)
  const [editDate, setEditDate] = useState('')

  async function load() {
    const data = await AppointmentsAPI.listActive()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  async function create(e) {
    e.preventDefault()
    await AppointmentsAPI.create({ ...form, createdBy: 'frontend' })
    setForm({ user_id: '', doctor_id: '', appointment_date: '' })
    load()
  }

  async function update(id) {
    const current = items.find(i => i.id === id)
    await AppointmentsAPI.update(id, {
      user_id: current?.user_id,
      doctor_id: current?.doctor_id,
      appointment_date: editDate,
      updatedBy: 'frontend'
    })
    setEditingId(null)
    setEditDate('')
    load()
  }

  async function softDelete(id) {
    await AppointmentsAPI.softDelete(id, { deletedBy: 'frontend' })
    load()
  }

  return (
    <div className="space-y-6">
      <section className="bg-white p-5 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-3">Create Appointment</h2>
        <form onSubmit={create} className="grid sm:grid-cols-4 gap-3">
          <input className="border rounded-xl p-2" placeholder="User ID" value={form.user_id} onChange={e=>setForm(f=>({...f, user_id:e.target.value}))} required />
          <input className="border rounded-xl p-2" placeholder="Doctor ID" value={form.doctor_id} onChange={e=>setForm(f=>({...f, doctor_id:e.target.value}))} required />
          <input className="border rounded-xl p-2" placeholder="YYYY-MM-DD HH:mm:ss" value={form.appointment_date} onChange={e=>setForm(f=>({...f, appointment_date:e.target.value}))} required />
          <button className="bg-blue-600 text-white rounded-xl px-4 py-2">Save</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded-2xl shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Active Appointments</h2>
          <button onClick={load} className="text-sm underline">Refresh</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">ID</th>
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Doctor</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} className="border-b hover:bg-slate-50">
                  <td className="py-2 pr-4">{a.id}</td>
                  <td className="py-2 pr-4">{a.user_id}</td>
                  <td className="py-2 pr-4">{a.doctor_id}</td>
                  <td className="py-2 pr-4">{a.appointment_date ? new Date(a.appointment_date).toLocaleString() : '—'}</td>
                  <td className="py-2 pr-4 flex gap-2">
                    {editingId === a.id ? (
                      <>
                        <input className="border rounded-xl p-1" placeholder="YYYY-MM-DD HH:mm:ss" value={editDate} onChange={e=>setEditDate(e.target.value)} />
                        <button onClick={() => update(a.id)} className="px-3 py-1 rounded-xl bg-green-600 text-white">Save</button>
                        <button onClick={() => { setEditingId(null); setEditDate('') }} className="px-3 py-1 rounded-xl bg-slate-200">Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(a.id); setEditDate('') }} className="px-3 py-1 rounded-xl bg-blue-600 text-white">Edit</button>
                        <button onClick={() => softDelete(a.id)} className="px-3 py-1 rounded-xl bg-red-600 text-white">Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
