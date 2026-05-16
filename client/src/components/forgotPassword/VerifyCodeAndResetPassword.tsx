import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png';
import cross from '../../assets/Static_Images/error_img.png';
import { Label } from "../ui/label";

const VerifyCodeAndResetPassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errView, setErrView] = useState<string>("none");
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();
    const [errortext, setErrorText] = useState<string>("");
    const successdialog = document.getElementById('userscsverify') as HTMLInputElement;
    const errordialog = document.getElementById('usererrorverify') as HTMLInputElement;
    const closeDialogButton = document.getElementById('userscsbtnverify') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('usererrorbtnverify') as HTMLInputElement;
    const [btnDisable, setBtnDisable] = useState<boolean>(false);
    useEffect(() => {
        if (closeDialogButton) {
            closeDialogButton.addEventListener('click', () => {
                if (successdialog != null) {
                    (successdialog as any).close();
                    navigate('/login');
                }
            });
        }

        if (errorcloseDialogButton) {
            errorcloseDialogButton.addEventListener('click', () => {
                if (errordialog != null) {
                    (errordialog as any).close();
                }
            });
        }
    }, [closeDialogButton, successdialog, errorcloseDialogButton, errordialog]);

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         if (!btnDisable) {
            setBtnDisable(true)
        }
        try {
            const res = await axios.post('/api/resetPassword/verifyCode', { verificationCode: code });
            console.log(res.data);
            setIsVerified(true);
            setBtnDisable(false)
        } catch (err:any) {
            console.error(err);
            setErrView('block');
            setBtnDisable(false)
            setErrMsg(err.response.data.error)
           

        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        
        try {
            const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
            if (newPassword !== confirmPassword) {
                setErrorText('Password and Confirm Password does not Match');
                (errordialog as any).showModal();
                return
            }
            if (!specialCharRegex.test(newPassword)) {
                setErrorText('Password Should Contain One special Character');
                (errordialog as any).showModal();
                return
            }
            if (newPassword.length < 6){
                setErrorText('Password Length should Be greater than 6 Characters');
                (errordialog as any).showModal();
                return
    
            }

            if (!btnDisable) {
                setBtnDisable(true)
            }
            await axios.post('/api/resetPassword/passwordupdate', { password: newPassword })
            .then((res) => {

                console.log(res.data);
            if (successdialog != null) {
                (successdialog as any).showModal();
            }
            })
            .catch((err) => {
                console.log(err.response.data.message);
                setBtnDisable(false)
                setErrorText(err.response.data.message);
                if (errordialog != null) {
                    (errordialog as any).showModal();
                }
            });
            
           
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!isVerified ? (
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
                                    KOLKATA UNIT 
                                </p>
                            </div>

                            <form className="space-y-4" onSubmit={handleVerify}>

                                <div className="my-20">

                                    <Label className="text-xs font-semibold text-cyan-700">
                                        Enter the Code Received in Email
                                    </Label>
                                    <Input type="text" placeholder="OTP Code" className="mt-1 h-10 rounded-md border-gray-300 focus:ring-2 focus:ring-orange-400" value={code}
                                        onChange={(e) => setCode(e.target.value)} required />



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
                                <Button className="w-full h-11 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition" type="submit" disabled={btnDisable}>Verify</Button>

                            </form> 
                            
                        </div>
                    </div>

                </>
            ) : (
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
                                            Update Password
                                        </Label>
                                        <Input type="password" placeholder="Create Password" className="mt-1 h-10 rounded-md border-gray-300 focus:ring-2 focus:ring-orange-400" value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)} required />


                                        <Input type="password" placeholder="Confirm Password" className="mt-5 h-10 rounded-md border-gray-300 focus:ring-2 focus:ring-orange-400" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />


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
                
                
                        <dialog id="userscsverify" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                            <button id="userscsbtnverify" className="dashboard-modal-close-btn">X</button>
                            <span className="flex">
                                <img src={tick} height={2} width={35} alt='tick_image' />
                                <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-green-500">Password Has Been Reset Successfully</p>
                            </span>
                        </dialog>
                        <dialog id="usererrorverify" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                            <button id="usererrorbtnverify" className="dashboard-modal-close-btn">X</button>
                            <span className="flex">
                                <img src={cross} height={25} width={25} alt='cross_image' />
                                <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{errortext}</p>
                            </span>
                        </dialog>

            </>
                
            )}
        </div>
    );
};

export default VerifyCodeAndResetPassword;