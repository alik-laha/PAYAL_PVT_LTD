import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/login'

import { Dashboard } from './components/dashboard/Dashboard'
import RcnPrimaryEntry from './components/RcnPrimaryEntry/RcnPrimaryEntry'
import RcnGrading from './components/Rcn Grading/RCNGrading'
import Employee from './components/employee/Employee'
import DashboardUser from './components/dashboard user/DashboardUser'
import Machine from './components/Machine/Machine'
import Private from './components/private/private'

function App() {

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Private allowedRoles={['Director', 'Factory_Manager', 'Receiving_Supervisor', 'Receiving_Manager']} />}>
          
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/dashboard/rcnprimaryentry' element={<RcnPrimaryEntry />} />
        <Route path='/dashboard/employee' element={<Employee />} />
        <Route path='/dashboard/user' element={<DashboardUser />} />
        <Route path='/dashboard/rcnGrading' element={<RcnGrading />} />
        <Route path='/dashboard/machine' element={<Machine />} />
      </Routes>
    </>
  )
}

export default App
