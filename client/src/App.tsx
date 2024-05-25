import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/login/login'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
