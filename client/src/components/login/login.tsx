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



export const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/dashboard');
        console.log('Form submitted');
    }

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

                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />

                    <Captcha />
                    <Button className="bg-orange-500 mb-5 mt-5" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}