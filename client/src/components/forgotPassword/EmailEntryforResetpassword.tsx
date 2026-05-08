import { useRef, useState } from "react";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png';
import { Label } from "../ui/label";


const EmailEntryforResetpassword = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const [errView, setErrView] = useState<string>("none");
    const [errMsg, setErrMsg] = useState<string>('');
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
   
      const handleCloseDialog = () => {
        dialogRef.current?.close();

        navigate("/changePassword");

        localStorage.setItem("autherized", "true");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        if (!btnDisable) {
            setBtnDisable(true)
        }

        axios.post('/api/resetPassword/forgotPassword', { email }).then(res => {
            console.log(res.data);
            dialogRef.current?.showModal();
        

        }).catch(err => {
            console.log(err);

                setBtnDisable(false);

                setErrView("block");

                setErrMsg(err.response?.data?.error || "Something went wrong");

        })
    }
    return (
        <>
            <div className="login-container bg-fixed bg-center bg-cover flex items-center justify-center md:justify-start pl-4 md:pl-[12vw] min-h-[125vh]  to-orange-100 p-4">
                <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src={img}
                            alt="Logo"
                            className="w-20 h-20 rounded-full shadow-md border"
                        />
                        <h1 className="mt-3 text-lg sm:text-xl font-bold text-gray-800 text-center">
                            PAYAL DEALERS PVT. LTD
                        </h1>
                        <p className="text-xs text-orange-600 font-semibold tracking-wide">
                             AFRICA UNIT (QUALITY MANAGEMENT)
                        </p>
                    </div>

                   
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div className="my-20">

                            <Label className="text-xs font-semibold text-cyan-700">
                                Enter Email ID to Reset your Password
                            </Label>
                            <Input type="email" placeholder="Enter Email" ref={emailRef} className="mt-1 h-10 rounded-md border-gray-300 focus:ring-2 focus:ring-orange-400" />

                            <div className="flex justify-end text-xs mt-5">
                                <NavLink
                                    to="/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Back to login
                                </NavLink>
                            </div>
                        </div>
         

                      
                        <span style={{ display: errView }} className="text-red-600 text-sm font-sans font-semibold w-100 text-center">{errMsg}</span>
                        <Button className="w-full h-11 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition" type="submit" disabled={btnDisable}>Submit</Button>

                    </form>
                </div>
            </div>

            <dialog
                ref={dialogRef}
                className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center"
            >
                <button
                    onClick={handleCloseDialog}
                    className="dashboard-modal-close-btn"
                >
                    X
                </button>

                <span className="flex items-center">
                    <img
                        src={tick}
                        height={35}
                        width={35}
                        alt="tick_image"
                    />

                    <p className="pl-3 mt-1 text-base font-medium text-green-500">
                        Verification Code has been sent to Email
                    </p>
                </span>
            </dialog>





        </>

    )
}
export default EmailEntryforResetpassword;