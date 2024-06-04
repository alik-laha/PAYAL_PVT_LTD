import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '../../assets/Static_Images/Company Logo.jpeg'
import './login.css'
import Captcha from './Captcha.tsx';
import { useNavigate } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Context from '../context/context';


export const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [errView, setErrView] = useState<string>("none");
    const { typedCaptcha, generateCaptcha, setTypedCaptcha, setRole, setDept } = useContext(Context);




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        if (typedCaptcha !== generateCaptcha) {
            setErrMsg('Captcha is incorrect');
            setTypedCaptcha('');
            setErrView('block');
            return;
        }
        setErrView('none');
        axios.post('/api/user/login', { userName: username, password })
            .then(res => {
                console.log(res.data);
                navigate('/dashboard');
                setRole(res.data.role);
                setDept(res.data.dept);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('dept', res.data.dept);
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.message);
                setErrView('block');
            })
    }
    useEffect(() => {
        const role = localStorage.getItem('role');
        const dept = localStorage.getItem('dept');
        if (role && dept) {
            navigate('/dashboard');
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen items-center w-screen login-container">
            <div className="p-8 border-2 flex justify-center items-center flex-col rounded-xl login">
                <img src={img} width={60} height={100}></img>
                <h1 className="text-2xl font-bold mb-3 pb-7 mt-2 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Cashew" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">Cashew</SelectItem>
                            <SelectItem value="2">Almond</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
                <h3 className="text-sm font-sans mb-3 font-semibold pb-1 pt-2 text-cyan-700">Provide Username & Password</h3>
                <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>

                    <Input type="text" placeholder="Username" ref={usernameRef} />
                    <Input type="password" placeholder="Password" ref={passwordRef} />

                    <Captcha />
                    <Button className="bg-orange-500 mb-5 mt-5" type="submit">Login</Button>
                    <p style={{ display: errView }}>{errMsg}</p>
                </form>
            </div>
        </div>
    )
}