import { useRef, useState } from "react";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png';


const EmailEntryforResetpassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [errView, setErrView] = useState<string>("none");
    const [errMsg, setErrMsg] = useState<string>('');
    const successdialog = document.getElementById('userscs') as HTMLInputElement;
    const closeDialogButton = document.getElementById('userscsbtn') as HTMLInputElement;

    if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
            if (successdialog != null) {
                (successdialog as any).close();
                navigate('/changePassword')
                localStorage.setItem('autherized', 'true')
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        axios.post('/api/resetPassword/forgotPassword', { email }).then(res => {
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }
            // navigate('/changePassword')
            // localStorage.setItem('autherized', 'true')
        }).catch(err => {
            console.log(err)
            if(err.response.data.error==='No User Found with Email ID'){
                setErrView('block');
                setErrMsg(err.response.data.error)
                return
            }
            if(err.response.data.error==='Employee is Not Registered as a User'){
                setErrView('block');
                setErrMsg(err.response.data.error)
            }
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
                <span style={{ display: errView }} className="text-red-600 text-sm font-sans font-semibold w-100 text-center">{errMsg}</span>
                <Button className="bg-orange-500 mb-1 mt-7 mb-4" type="submit">Submit</Button>
                
            </form>
            </div>
            </div>

            <dialog id="userscs" className="dashboard-modal">
                <button id="userscsbtn" className="dashboard-modal-close-btn">X</button>
                <span className="flex">
                    <img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Verification Code has been sent to Email</p>
                </span>
            </dialog>

       
            
        
        
        </>
        
    )
}
export default EmailEntryforResetpassword;