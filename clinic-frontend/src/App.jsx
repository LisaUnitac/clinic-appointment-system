import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-100'}`
    }
    end
  >
    {children}
  </NavLink>
)

export default function App() {
  return (
    <BrowserRouter>
      <header className="bg-white border-b">
        <div className="container py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold">Clinic Admin</h1>
          <nav className="flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/appointments">Appointments</NavItem>
            <NavItem to="/users">Users</NavItem>
            <NavItem to="/doctors">Doctors</NavItem>
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
