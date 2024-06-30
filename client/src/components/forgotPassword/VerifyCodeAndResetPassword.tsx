import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png';
import cross from '../../assets/Static_Images/error_img.png';

const VerifyCodeAndResetPassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errView, setErrView] = useState<string>("none");
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();
    const [errortext, setErrorText] = useState<string>("");
    const successdialog = document.getElementById('userscs') as HTMLInputElement;
    const errordialog = document.getElementById('usererror') as HTMLInputElement;
    const closeDialogButton = document.getElementById('userscsbtn') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('usererrorbtn') as HTMLInputElement;
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
        try {
            const res = await axios.post('/api/resetPassword/verifyCode', { verificationCode: code });
            console.log(res.data);
            setIsVerified(true);
        } catch (err:any) {
            console.error(err);
           
            if(err.response.data.error==='Invalid Token'){
                setErrView('block');
                setErrMsg('Incorrect Code Entered')
            }
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
            await axios.post('/api/resetPassword/passwordupdate', { password: newPassword })
            .then((res) => {

                console.log(res.data);
            if (successdialog != null) {
                (successdialog as any).showModal();
            }
            })
            .catch((err) => {
                console.log(err.response.data.message);
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
                    <div className="flex flex-col items-center justify-center h-screen  w-screen login-container">
                        <div className="p-8 border-2 flex justify-center items-center flex-col rounded-xl login">
                            <img src={img} width={"60"} height={100}></img>
                            <h1 className="text-2xl font-bold mb-3 pb-2 mt-5 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>
                            <h3 className="text-sm font-sans mb-8 font-semibold pb-1 pt-2 text-cyan-700">Enter the Code Received in Email</h3>


                            <form className="flex flex-col gap-4 w-64" onSubmit={handleVerify}>
                                <Input type="text" className='text-center' placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                                <span style={{ display: errView }} className="text-red-600 text-sm font-sans font-semibold w-100 text-center">{errMsg}</span>
                                
                                <Button className="bg-orange-500 mb-1 mt-7 mb-4" type="submit">Verify</Button>
                            </form>
                        </div>
                    </div>

                </>
               
                   
             
            ) : (


                <>
                <div className="flex flex-col items-center justify-center h-screen  w-screen login-container">
                    <div className="p-8 border-2 flex justify-center items-center flex-col rounded-xl login">
                        <img src={img} width={"60"} height={100}></img>
                        <h1 className="text-2xl font-bold mb-3 pb-2 mt-5 text-center text-blue-950 drop-shadow-md ">PAYAL DEALERS PVT. LTD</h1>
                        <h3 className="text-sm font-sans mb-8 font-semibold pb-1 pt-2 text-cyan-700">Create New Password</h3>


                        <form className="flex flex-col gap-4 w-64"onSubmit={handleSubmit}>
                        <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <Input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                    </div>
                </div>
                <dialog id="userscs" className="dashboard-modal">
                <button id="userscsbtn" className="dashboard-modal-close-btn">X</button>
                <span className="flex">
                    <img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Password Has Been Reset Successfully</p>
                </span>
            </dialog>
            <dialog id="usererror" className="dashboard-modal">
                <button id="usererrorbtn" className="dashboard-modal-close-btn">X</button>
                <span className="flex">
                    <img src={cross} height={25} width={25} alt='cross_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p>
                </span>
            </dialog>

            </>
                
            )}
        </div>
    );
};

export default VerifyCodeAndResetPassword;