import icon from '../../assets/Static_Images/OIP.jpeg'
import icon2 from '../../assets/Static_Images/OIP-2.webp'
import { useState } from "react"
import "./dashboard.css"
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'

const DashboardHeader = () => {
  const navigate = useNavigate()

  const [dashbvisi, setdashBVisi] = useState('none');
  const logoutVisiblity = () => {

    if (dashbvisi === "none") {
      setdashBVisi("block");
    } else {
      setdashBVisi("none");
    }
  }
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
  const image = localStorage.getItem('image')
  return (
    <>
      <div className='dashoboard-main-header'>
        <span className="logo-lg dashboard-text" ></span>

        <span className='operator-hide' onClick={logoutVisiblity}><p className="logo-lg"> {(localStorage.getItem('user'))?.toUpperCase()}</p>{image != null ? <img
          src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`}
        /> : <img src={icon} />}</span>
        <div className='navbar-custom-menu'>
          <ul className="dropdown-menu" style={{ display: dashbvisi, background: 'white', position: 'fixed' }}>
            <li className="user-header mx-1 my-1">
              <NavLink to={"/dashboard/userprofile"}><span className="flex flex-col items-center justify-center items-center">{image != null ? <img src={`/api/cleaning/view?filename=${localStorage.getItem('image')}`} alt='Operator Icon' className="img-header" /> : <img src={icon2} className="img-header" />}</span></NavLink>
              <p className="text-logout">Welcome, {localStorage.getItem('user')}</p>
              <p className="text-logout-2"> Dept: {localStorage.getItem('dept')}</p>
              <p className="text-logout-2"> Role: {localStorage.getItem('role')}</p>
            </li>

            <li className="user-footer">
              <button className='dashboard-btn dashboard-btn-default' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>


      </div>
    </>


  )



}
export default DashboardHeader
