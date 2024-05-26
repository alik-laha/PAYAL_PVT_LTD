import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/login'
import DashboardSidebar from './components/dashboard/DashboardSidebar'

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardSidebar />} />
      </Routes>
    </>
  )
}

export default App
