import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
// import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import { useState } from "react"
import icon from '../../assets/Static_Images/operater_icon.png'


const DashboardSidebar = () => {
    // const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
 const [dashbvisi,setdashBVisi]=useState('none');

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const logoutVisiblity = () => {
  
        if (dashbvisi === "none") {
          setdashBVisi("block");
        } else {
          setdashBVisi("none");
        }
      }
    return (
        <> 
        <div>
        <div className='dashoboard-main-header'>
        <span className="logo-lg dashboard-text" ></span>
        
        <span className='operator-hide' onClick={logoutVisiblity}><p className="logo-lg"></p><img src={icon}></img></span>
        <span  className='navbar-custom-menu'>
          <ul className="dropdown-menu" style={{ display: 'block'}}>
            <li className="user-header">
              <span style={{textAlign:'center'}}><img src={icon} alt='Operator Icon' className="img-header"></img></span>
              <p className="text-logout">Welcome </p>
                <p className="text-logout"></p>
            </li>
            
            <li className="user-footer"> 
              <button className='dashboard-btn dashboard-btn-default'>Logout</button>
            </li>
          </ul>
        </span>

        
        </div>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>
                    <Collapsible >
                        <CollapsibleTrigger >Admin & HR</CollapsibleTrigger>
                        <CollapsibleContent >
                            Create Employee
                        </CollapsibleContent>
                        <CollapsibleContent >
                            Modify/Export Employee
                        </CollapsibleContent>
                        <CollapsibleContent >
                            Create Dashboard User
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible >
                        <CollapsibleTrigger >Receiving</CollapsibleTrigger>
                        <CollapsibleContent >
                            Create User
                        </CollapsibleContent>
                        <CollapsibleContent >
                            Create Employee
                        </CollapsibleContent>
                    </Collapsible>
                </a>
            </div>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776;</span>
            </div>
            
            </div>     
        
            
            
        </>
    )
}
export default DashboardSidebar