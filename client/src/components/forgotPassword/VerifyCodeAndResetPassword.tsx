import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";

const VerifyCodeAndResetPassword = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/resetPassword/verifyCode', { verificationCode: code });
            console.log(res.data);
            setIsVerified(true);
        } catch (error) {
            console.error(error);
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
                <div>
                    <h1>Enter the code you received in your email to reset your password</h1>
                    <form style={{ display: "flex" }} onSubmit={handleVerify}>
                        <Input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <button type="submit">Verify</button>
                    </form>
                </div>
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