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
import { Session_LogoutTime_Hr } from './components/common/exportData'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import EmailEntryforResetpassword from './components/forgotPassword/EmailEntryforResetpassword'
import VerifyCodeAndResetPassword from './components/forgotPassword/VerifyCodeAndResetPassword'
import Cleaning from './components/Cleaning/Cleaning'
import ViewProfile from './components/ViewProfile/ViewProfile'

function App() {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('/api/user/logout').then(() => {
      localStorage.removeItem('role')
      localStorage.removeItem('dept')
      localStorage.removeItem('countdownStartTime')
      localStorage.removeItem('user')
      localStorage.removeItem('image')
      navigate('/login')
    }).catch((err) => {
      console.log(err)
    })
  }
  const countdownStartTime = localStorage.getItem('countdownStartTime');
  let elapsedTime = 0;
  const durationInMillis = Session_LogoutTime_Hr * 60 * 60 * 1000;
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
        <Route path='/changePassword' element={<VerifyCodeAndResetPassword />} />
        <Route path='/' element={<Navigate to={"/dashboard"} replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'ReceivingSupervisor', 'ReceivingManager', 'QCManager', 'QCSupervisor',
          'ProductionManager', 'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor',
          'CleaningSupervisor', 'MaintainanceManager']} />}>
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

        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager']} />}>
          <Route path="/dashboard/rcnprimaryentry" element={<RcnPrimaryEntry />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'QCSupervisor', 'QCManager']} />}>
          <Route path="/dashboard/qcRCN" element={<QCRcn />} />
        </Route>

        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'GradingSupervisor', 'ProductionManager']} />}>
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

        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'CleaningSupervisor', 'MaintainanceManager']} />}>
          <Route path='/dashboard/cleaning' element={<Cleaning />} />
        </Route>

        <Route path="/dashboard/userprofile" element={<ViewProfile />} />
      </Routes>
    </>
  )
}

export default App
