import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import img from '../../assets/Static Images/Company Logo.jpeg'

export const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen items-center w-screen login">
            <div className="p-12 border-2 border-black flex justify-center items-center flex-col rounded-xl">
                <img src={img} width={100} height={150}></img>
                <h1 className="text-3xl font-bold mb-4">PAYAL DEALERS PVT. LTD</h1>
                <form className="flex flex-col gap-4 w-64">
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    )
}