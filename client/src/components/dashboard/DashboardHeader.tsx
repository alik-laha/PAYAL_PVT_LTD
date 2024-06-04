import icon from '../../assets/Static_Images/OIP.jpeg'
import icon2 from '../../assets/Static_Images/OIP-2.webp'
import { useState } from "react"
import "./dashboard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
      navigate('/login')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <div className='dashoboard-main-header'>
        <span className="logo-lg dashboard-text" ></span>

        <span className='operator-hide' onClick={logoutVisiblity}><p className="logo-lg"> USERNAME</p><img src={icon}></img></span>
        <span className='navbar-custom-menu'>
          <ul className="dropdown-menu" style={{ display: dashbvisi }}>
            <li className="user-header">
              <span className="flex flex-col items-center justify-center items-center"><img src={icon2} alt='Operator Icon' className="img-header"></img></span>
              <p className="text-logout">Welcome, Name</p>
              <p className="text-logout-2"> Dept: Store</p>
              <p className="text-logout-2"> Role: Operator</p>
            </li>

            <li className="user-footer">
              <button className='dashboard-btn dashboard-btn-default' onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </span>


      </div>
    </>


  )



}
export default DashboardHeader
