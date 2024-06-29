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
import QCRcn from './components/qcRCN/QCRcn'
import RCNBoiling from './components/RCN Boiling/RCNBoiling'
import RCNScooping from './components/RCN Scooping/RCNScooping'
import { Time } from './components/common/exportData'

import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EmailEntryforResetpassword from './components/forgotPassword/EmailEntryforResetpassword'

function App() {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('/api/user/logout').then(() => {
      localStorage.removeItem('role')
      localStorage.removeItem('dept')
      localStorage.removeItem('countdownStartTime')
      localStorage.removeItem('user')
      navigate('/login')
    }).catch((err) => {
      console.log(err)
    })
  }
  const countdownStartTime = localStorage.getItem('countdownStartTime');
  let elapsedTime = 0;
  const durationInMillis = Time * 60 * 60 * 1000;
  if (countdownStartTime) {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - parseInt(countdownStartTime);
  }
  const remainingTime = durationInMillis - elapsedTime;
  setTimeout(function () {
    handleLogout()
  }, remainingTime);

  return (
    <>

      <Routes>
        <Route path='/forgotpass' element={<EmailEntryforResetpassword />} />
        <Route path='/' element={<Navigate to={"/dashboard"} replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'ReceivingSupervisor', 'ReceivingManager',
          'MaintainanceSupervisor',
          'GradingSupervisor', 'QCManager', 'ProductionManager', 'QCSupervisor']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<Private allowedRoles={['Director']} />}>
          <Route path="/dashboard/user" element={<DashboardUser />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager']} />}>
          <Route path="/dashboard/employee" element={<Employee />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager']} />}>
          <Route path="/dashboard/machine" element={<Machine />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'ReceivingSupervisor', 'ReceivingManager']} />}>
          <Route path="/dashboard/rcnprimaryentry" element={<RcnPrimaryEntry />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'QCSupervisor', 'QCManager']} />}>
          <Route path="/dashboard/qcRCN" element={<QCRcn />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'GradingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnGrading' element={<RcnGrading />} />
        </Route>


        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'BoilingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnBoiling' element={<RCNBoiling />} />
        </Route>
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'ScoopingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnScooping' element={<RCNScooping />} />
        </Route>




      </Routes>
    </>
  )
}

export default App
