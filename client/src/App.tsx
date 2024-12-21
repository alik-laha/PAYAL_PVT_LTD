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
import PackagingMetirialReceiving from './components/packagingMetirialReceiving/packagingMetirialReceiving'
import Cleaning from './components/Cleaning/Cleaning'
import ViewProfile from './components/ViewProfile/ViewProfile'
import RCNBorma from './components/RCN Borma/RCNBorma'
import GatepassIn from './components/gatepass In/GatePassIn'
import VendorSKU from './components/VendorSKU/VendorSku'
import StorePrimary from './components/store Primary/StorePrimary'
import GeneralStore from './components/General Store/General'
import Almond from './components/Almond/Almond'
import PackagingMetirialQuality from './components/PM QC/PMQC'
import RcvVillage from './components/Rcv Village/RcvVillage'
import Humidifier from './components/Humidifier/Humidifier'
import Peeling from './components/Peeling/Peeling'
import Agarbati from './components/Agarbati/Agarbati'
import IssueItem from './components/IssueItem/IssueItem'
import OilMill from './components/OilMill/OilMill'
import QCWater from './components/QCWater/QCwater'




function App() {
  const navigate = useNavigate()

  const handleLogout = () => {
    axios.get('/api/user/logout').then(() => {
      localStorage.removeItem('role')
      localStorage.removeItem('dept')
      localStorage.removeItem('countdownStartTime')
      localStorage.removeItem('user')
      localStorage.removeItem('timeLeft');
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
          'ReceivingSupervisor', 'ReceivingPMSupervisor', 'ReceivingManager', 'ReceivingAlmondSupervisor', 'ReceivingStoreSupervisor',
          'ReceivingAgarbatiSupervisor', 'ReceivingGeneralSupervisor', 'ReceivingOilMillSupervisor',
          'Security', 'GatePassManager',
          'MaintainanceSupervisor', 'MaintainanceManager',
          'QCSupervisor', 'QCManager',
          'GradingSupervisor', 'BoilingSupervisor', 'ScoopingSupervisor', 'ProductionManager', 'BormaSupervisor',
          'PeelingSupervisor', 'MayurSupervisor','VillageSupervisor']} />}>

          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* User */}
        <Route element={<Private allowedRoles={['Director']} />}>
          <Route path="/dashboard/user" element={<DashboardUser />} />
        </Route>

        {/* Employee */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager']} />}>
          <Route path="/dashboard/employee" element={<Employee />} />
        </Route>

        {/* Asset */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager']} />}>
          <Route path="/dashboard/machine" element={<Machine />} />
        </Route>

        {/* GatePass*/}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'Security', 'GatePassManager']} />}>
          <Route path='/dashboard/gatepassIn' element={<GatepassIn />} />
        </Route>

        {/* Vendor SKU*/}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingManager']} />}>
          <Route path="/dashboard/vendorSKU" element={<VendorSKU />} />
        </Route>

        {/* Store Issue*/}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingManager','ReceivingStoreSupervisor']} />}>
          <Route path="/dashboard/StoreIssue" element={<IssueItem />} />
        </Route>

        {/* Receiving RCN */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/rcnprimaryentry" element={<RcnPrimaryEntry />} />
        </Route>

        {/* Receiving Store */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingStoreSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/storePrimary" element={<StorePrimary />} />
        </Route>

        {/* Receiving General */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingGeneralSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/GeneralStore" element={<GeneralStore />} />
        </Route>

        {/* Receiving Almond */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingAlmondSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/AlmondPrimary" element={<Almond />} />
        </Route>

        {/* Receiving Agarbati */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingAgarbatiSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/AgarbatiPrimary" element={<Agarbati />} />
        </Route>

        {/* Receiving Village */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'VillageSupervisor', 'GatePassManager', 'ProductionManager']} />}>
          <Route path="/dashboard/RcvVillage" element={<RcvVillage />} />
        </Route>

        {/* Receiving OilMill */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingOilMillSupervisor', 'GatePassManager', 'ReceivingManager']} />}>
          <Route path="/dashboard/OilMill" element={<OilMill />} />
        </Route>

        {/* Receiving PM */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'ReceivingPMSupervisor', 'ReceivingManager', 'GatePassManager']} />}>
          <Route path="/dashboard/recevingpackagingMaterial" element={<PackagingMetirialReceiving />} />
        </Route>

        {/* Quality RCN */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'QCSupervisor', 'QCManager']} />}>
          <Route path="/dashboard/qcRCN" element={<QCRcn />} />
        </Route>

        {/* Quality PM */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'QCSupervisor', 'QCManager']} />}>
          <Route path="/dashboard/qc_packaging_metirial" element={<PackagingMetirialQuality />} />
        </Route>


        {/* Quality Water */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'QCSupervisor', 'QCManager']} />}>
          <Route path="/dashboard/qc_water" element={<QCWater />} />
        </Route>

        {/* Production Grading */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager', 'GradingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnGrading' element={<RcnGrading />} />
        </Route>

        {/* Production Boiling */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'BoilingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnBoiling' element={<RCNBoiling />} />
        </Route>

        {/* Production Scooping */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'ScoopingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/rcnScooping' element={<RCNScooping />} />
        </Route>

        {/* Production Borma */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'BormaSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/RcnBorma' element={<RCNBorma />} />

        </Route>

        {/* Production Humidifier */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'PeelingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/Humidifier' element={<Humidifier />} />

        </Route>

        {/* Peeling Humidifier */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'PeelingSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/Peeling' element={<Peeling />} />

        </Route>

        {/* Mayur Humidifier */}
        <Route element={<Private allowedRoles={['Director', 'FactoryManager',
          'MayurSupervisor', 'ProductionManager']} />}>
          <Route path='/dashboard/Mayur' element={<Peeling />} />

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
