import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/login'
import DashboardSidebar from './components/dashboard/DashboardSidebar'

function App() {

  return (
    <>
      <DashboardSidebar />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
