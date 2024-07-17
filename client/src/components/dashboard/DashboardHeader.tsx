import icon from '../../assets/Static_Images/OIP.jpeg'
import icon2 from '../../assets/Static_Images/OIP-2.webp'
import { useEffect, useState } from "react"
import "./dashboard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { timerLogout } from '../common/exportData'

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
      
      localStorage.removeItem('timeLeft');
      localStorage.removeItem('role')
      localStorage.removeItem('dept')
      navigate('/login')
    }).catch((err) => {
      console.log(err)
    })
  }
  const sessionDuration = timerLogout; // 2 hours in seconds
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : sessionDuration;
  });
  useEffect(() => {
    const endTime = Date.now() + timeLeft * 1000;
    const timerId = setInterval(() => {
      const newTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(newTimeLeft);
      localStorage.setItem('timeLeft', newTimeLeft.toString());

      if (newTimeLeft === 0) {
        clearInterval(timerId);
        localStorage.removeItem('timeLeft');
        // Add any session end logic here
        handleLogout();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const duration = moment.duration(seconds, 'seconds');
    const time_left=String(duration.hours()).padStart(2, '0')+':'+String(duration.minutes()).padStart(2, '0')+':'+String(duration.seconds()).padStart(2, '0')
    return time_left
  };

  return (
    <>
      <div className='dashoboard-main-header'>
        <span className="logo-lg dashboard-text" ></span>

        <span className='operator-hide' onClick={logoutVisiblity}><p className="logo-lg"> <p style={{fontSize:'16px'}}>Session Left : {formatTime(timeLeft)}</p> </p><img src={icon}></img></span>
        <div className='navbar-custom-menu'>
          <ul className="dropdown-menu" style={{ display: dashbvisi, background: 'white', position: 'fixed' }}>
            <li className="user-header mx-1 my-1">
           
              <span className="flex flex-col items-center justify-center items-center"><img src={icon2} alt='Operator Icon' className="img-header"></img></span>
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
