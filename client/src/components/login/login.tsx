import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '../../assets/Static_Images/Company Logo.jpeg'
import './login.css'
import Captcha from './Captcha.tsx';
import { NavLink, useNavigate } from "react-router-dom";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import { useRef, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Context from '../context/context';
//import { hashPassword } from "@/Utils/hashPassword.ts";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label.tsx";


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
        <div className="flex flex-col items-center justify-center login-container " style={{height:'125vh'}}>
            <div className="p-6 border-2 flex justify-center items-center flex-col rounded-xl login">
                <img src={img} width={"80"} height={120}></img>
                <h1 className="text-1xl font-cursive font-bold mb-3 pb-2 mt-2 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>

                {/* <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Cashew" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">Cashew</SelectItem>
                            <SelectItem value="2">Almond</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select> */}
                <h3 className="text-xs font-cursive mb-3 font-semibold pb-1 pt-2 text-cyan-700">Provide Username & Password</h3>
                <form className="flex flex-col gap-3 w-64" onSubmit={handleSubmit}>

                    <Input type="text" placeholder="Username" ref={usernameRef} className="bg-yellow-100"/>
                    <Input type="password" placeholder="Password" ref={passwordRef} className="bg-yellow-100"/>
                    <Label className="w-full flex justify-center font-semibold text-xs text-cyan-700">Enter Captcha</Label>
                    <Captcha />
                    <p><NavLink to="/forgotpass" className='text-xs mt-1 font-cursive font-semibold text-purple-700 float-right '>Forgot/Reset Password</NavLink></p>
                    <span style={{ display: errView }} className="text-red-600 text-xs font-sans font-semibold w-100 text-center">{errMsg}</span>
                    <Button className="bg-orange-500 text-sm h-8 mt-3 mb-7 mx-8 font-sans" type="submit">Login</Button>

                </form>

                <Dialog>
                    <DialogTrigger className="text-xs ">
                        Terms of Use</DialogTrigger>
                    <DialogContent className='max-w-7xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-center mt-1 '>Terms Of Use</p></DialogTitle>

                        </DialogHeader>

                        <div className="mx-5 terms-use h-96 overflow-scroll text-xs">
                            <h2>1. Introduction</h2>
                            <p>Welcome to Payal Dealers Pvt. Ltd. (“we,” “our,” or “us”). By accessing or using our website and services (collectively, the “Services”), you agree to be bound by the following Terms of Use. Please read them carefully. If you do not agree to these Terms, do not use the Services.</p>

                            <h2>2. Acceptance of Terms</h2>
                            <p>By accessing or using the Services, you represent that you are of legal age to form a binding contract with us and that you agree to comply with these Terms of Use. If you are using the Services on behalf of a company, you represent that you are authorized to bind that company to these Terms.</p>

                            <h2>3. User Account</h2>
                            <p>To use certain features of the Services, We may need to create an account. You agree to provide physical document copyies containing accurate, current, and complete information during the registration process and to update your information to keep it accurate. You are responsible for maintaining the confidentiality of your account information.</p>

                            <h2>4. Prohibited Activities</h2>
                            <p>You agree not to:</p>
                            <ul>
                                <li>i. Engage in any activity that violates any laws or regulations.</li>
                                <li>ii. Attempt to reverse-engineer, decompile, or hack the Services.</li>
                                <li>iii. Use the Services to distribute harmful software or engage in fraudulent activities.</li>
                                <li>iv. Harass, defame, or harm other users of the Services.</li>
                            </ul>

                            <h2>5. Intellectual Property</h2>
                            <p>All content, features, and functionality on the Services, including but not limited to text, graphics, logos, and code, are owned by [Your Company Name] or its licensors and are protected by intellectual property laws. You may not copy, modify, or distribute any content without our permission.</p>

                            <h2>6. Privacy Policy</h2>
                            <p>By using our Services, you consent to the collection and use of your data as described in our Privacy Policy.</p>

                            <h2>7. Limitation of Liability</h2>
                            <p>We will not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, or business, arising from the use or inability to use the Services.</p>

                            <h2>8. Modifications to Terms</h2>
                            <p>We reserve the right to modify or update these Terms at any time. When we do, we will post the updated Terms on this page with a new effective date. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.</p>

                            <h2>9. Termination</h2>
                            <p>We reserve the right to suspend or terminate your account and access to the Services at our sole discretion if you violate these Terms.</p>

                            <h2>10. Governing Law</h2>
                            <p>These Terms shall be governed by and construed in accordance with the laws of Government, without regard to its conflict of law principles.</p>

                            <h2>11. Contact Information</h2>
                            <p>For any questions or concerns regarding these Terms of Use, please contact us at payaldealerspvtltdofficial@gmail.com.</p>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}