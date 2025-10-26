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
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
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
        if (!btnDisable) {
            setBtnDisable(true)
        }

        axios.post('/api/resetPassword/forgotPassword', { email }).then(res => {
            console.log(res.data);
            (successdialog as any).showModal();

        }).catch(err => {
            console.log(err)
            setBtnDisable(false)
            setErrView('block');
            setErrMsg(err.response.data.error)

        })
    }
    return (
        <>
            <div className="login-container bg-fixed bg-center bg-cover flex items-center justify-center md:justify-start pl-4 md:pl-[12vw] min-h-[125vh]  to-orange-100 p-4">
                <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 transition-all hover:shadow-gray-100/40">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={img}
                            alt="Logo"
                            className="w-16 h-16 rounded-full border border-gray-300 shadow-md mb-3"
                        />
                        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
                            PAYAL DEALERS PVT. LTD
                        </h1>
                        <p className="text-sm text-orange-600 font-semibold mt-2">KOLKATA UNIT</p>
                    </div>

                    <h3 className="text-sm font-sans mb-8 font-semibold pb-1 pt-2 text-cyan-700">Enter Email ID to Reset your Password</h3>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>


         

                        <Input type="email" placeholder="Enter your Email" ref={emailRef} className="mt-1 bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-300"/>
                        <span style={{ display: errView }} className="text-red-600 text-sm font-sans font-semibold w-100 text-center">{errMsg}</span>
                        <Button className="bg-orange-500  mt-7 mb-4" type="submit" disabled={btnDisable}>Submit</Button>

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