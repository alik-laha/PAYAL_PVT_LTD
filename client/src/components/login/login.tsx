import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '../../assets/Static_Images/Company Logo.jpeg'
import './login.css'
import Captcha from './Captcha.tsx';



export const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen items-center w-screen login-container">
            <div className="p-9 border-2 flex justify-center items-center flex-col rounded-xl login">
                <img src={img} width={100} height={200}></img>
                <h1 className="text-2xl font-bold mb-3 pt-1 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>
                
                <select>
                        <option value="1">Cashew</option>
                        <option value="1">
                            Almond
                        </option>
                    </select>
                <h3 className="text-sm font-sans mb-3 font-semibold pb-1 pt-4 text-cyan-700">Provide Username & Password</h3>
                <form className="flex flex-col gap-4 w-64">

                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    
                    <Captcha  />
                    <Button className="bg-orange-500 mb-7" type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}