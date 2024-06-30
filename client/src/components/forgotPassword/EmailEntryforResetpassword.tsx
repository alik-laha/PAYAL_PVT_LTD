import { useRef } from "react";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";

const EmailEntryforResetpassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        axios.post('/api/resetPassword/forgotPassword', { email }).then(res => {
            console.log(res.data)
            navigate('/changePassword')
            localStorage.setItem('autherized', 'true')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
      <div className="flex flex-col items-center justify-center h-screen  w-screen login-container">
        <div className="p-8 border-2 flex justify-center items-center flex-col rounded-xl login">
        <img src={img} width={"60"} height={100}></img>
        <h1 className="text-2xl font-bold mb-3 pb-2 mt-5 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>

        <h3 className="text-sm font-sans mb-8 font-semibold pb-1 pt-2 text-cyan-700">Enter Email ID to Reset your Password</h3>
            <form  className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>
                <Input type="email" placeholder="Email" ref={emailRef} />

                <Button className="bg-orange-500 mb-1 mt-7 mb-4" type="submit">Submit</Button>
                
            </form>
            </div>
            </div>



       
            
        
        
        </>
        
    )
}
export default EmailEntryforResetpassword;