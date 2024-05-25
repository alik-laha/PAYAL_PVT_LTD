import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen items-center w-screen login">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="flex flex-col gap-4 w-72">
                <Input type="text" placeholder="Username" />
                <Input type="password" placeholder="Password" />
                <Button type="submit">Login</Button>
            </form>
        </div>
    )
}