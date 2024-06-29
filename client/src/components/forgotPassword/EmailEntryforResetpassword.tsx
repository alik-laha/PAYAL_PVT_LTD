import { useRef } from "react";
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
        <div>
            <h1>Enter your email to reset your password</h1>
            <form onSubmit={handleSubmit}>
                <Input type="email" placeholder="Email" ref={emailRef} />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default EmailEntryforResetpassword;