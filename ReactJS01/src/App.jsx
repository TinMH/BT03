import { Outlet, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/user">User Management</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        © 2026 My Application
      </footer>
    </div>
  )
}

export default App
