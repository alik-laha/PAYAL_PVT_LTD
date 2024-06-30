import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";
import img from '../../assets/Static_Images/Company Logo.jpeg'
import { Button } from "../ui/button";

const VerifyCodeAndResetPassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [errView, setErrView] = useState<string>("none");
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

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
            if (newPassword !== confirmPassword) {
                console.log('Password and Confirm Password should be the same');
                return;
            }
            const res = await axios.post('/api/resetPassword/passwordupdate', { password: newPassword });
            console.log(res.data);
            navigate('/login');
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
                <div>
                    <h1>Enter your new password</h1>
                    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                        <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VerifyCodeAndResetPassword;