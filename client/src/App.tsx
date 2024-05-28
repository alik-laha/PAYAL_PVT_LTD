import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/login'

import { Dashboard } from './components/dashboard/Dashboard'
import RcnPrimaryEntry from './components/RcnPrimaryEntry/RcnPrimaryEntry'
function App() {

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/dashboard/rcnprimaryentry' element={<RcnPrimaryEntry />} />
      </Routes>
    </>
  )
}

export default App
