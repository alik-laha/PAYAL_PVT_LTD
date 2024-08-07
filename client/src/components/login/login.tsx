import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '../../assets/Static_Images/Company Logo.jpeg'
import './login.css'
import Captcha from './Captcha.tsx';
import { NavLink, useNavigate } from "react-router-dom";
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
//import { hashPassword } from "@/Utils/hashPassword.ts";


export const Login = () => {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    //const [pssword,SetPssword]=useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [errView, setErrView] = useState<string>("none");
    const { typedCaptcha, generateCaptcha, setTypedCaptcha, setRole, setDept } = useContext(Context);




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        //const password = await hashPassword(pssword)
        //console.log(password)
        if (username === '' || password === '') {
            setErrMsg('Username or Password Not Given');
            setErrView('block');
            return
        }
        if (typedCaptcha !== generateCaptcha) {
            setErrMsg('Incorrect Captcha');
            setTypedCaptcha('');
            setErrView('block');
            return;
        }
        const countdownStartTime = localStorage.getItem('countdownStartTime');

        setErrView('none');
        axios.post('/api/user/login', { userName: username, password })
            .then(res => {
                console.log(res.data);
                navigate('/dashboard');
                setRole(res.data.role);
                setDept(res.data.dept);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('dept', res.data.dept);
                localStorage.setItem('user', res.data.user);
                if (res.data.image) {
                    localStorage.setItem('image', res.data.image);
                }
                if (!countdownStartTime) {
                    localStorage.setItem('countdownStartTime', String(new Date().getTime()));
                }
            }).catch(err => {
                console.log(err)
                setErrMsg(err.response.data.error);
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
        <div className="flex flex-col items-center justify-center h-screen  w-screen login-container">
            <div className="p-8 border-2 flex justify-center items-center flex-col rounded-xl login">
                <img src={img} width={"60"} height={100}></img>
                <h1 className="text-2xl font-bold mb-3 pb-2 mt-2 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>

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
                    <p><NavLink to="/forgotpass" className='text-sm font-semibold text-purple-500 float-right underline'>Forgot/Reset password</NavLink></p>
                    <span style={{ display: errView }} className="text-red-600 text-sm font-sans font-semibold w-100 text-center">{errMsg}</span>
                    <Button className="bg-orange-500 mb-1 mt-3 mb-4" type="submit">Login</Button>

                </form>

            </div>
        </div>
    )
}