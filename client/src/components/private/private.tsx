import React, { useContext, useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Context from "../context/context";
import axios from "axios";

interface PrivateProps {
    allowedRoles: string[];
}

const Private: React.FC<PrivateProps> = ({ allowedRoles }) => {
    const { setRole, setDept } = useContext(Context);
    const location = useLocation();
    const ROLE = localStorage.getItem('role');
    useEffect(() => {
        axios.get('/api/user/verify')
            .then(res => {
                console.log(res.data);
                setRole(res.data.role);
                setDept(res.data.dept);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('dept', res.data.dept);
            }
            ).catch(err => {
                console.log(err)
            })

    }, [])

    if (allowedRoles.includes(ROLE!)) {
        return <Outlet />;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default Private;