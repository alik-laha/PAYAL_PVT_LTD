import { useRef, useState, useContext, useEffect } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import Context from "../context/context"
import Captcha from "./Captcha"
import img from "../../assets/Static_Images/Company Logo.jpeg"
import "./login.css"

export const Login = () => {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [errMsg, setErrMsg] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { typedCaptcha, generateCaptcha, setTypedCaptcha, setRole, setDept } =
    useContext(Context)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = usernameRef.current?.value?.trim()
    const password = passwordRef.current?.value?.trim()

    if (!username || !password) {
      setErrMsg("Please enter both username and password.")
      return
    }
    if (typedCaptcha !== generateCaptcha) {
      setErrMsg("Captcha did not match.")
      setTypedCaptcha("")
      return
    }

    setErrMsg("")
    setLoading(true)
    const countdownStartTime = localStorage.getItem('countdownStartTime');

    try {
      const res = await axios.post("/api/user/login", { userName: username, password })
      const { role, dept, user, image } = res.data

      setRole(role)
      setDept(dept)

      localStorage.setItem("role", role)
      localStorage.setItem("dept", dept)
      localStorage.setItem("user", user)
      if (image) localStorage.setItem("image", image)
    if (!countdownStartTime) {
                    localStorage.setItem('countdownStartTime', String(new Date().getTime()));
    }

      navigate("/dashboard")
    } catch (err: any) {
      setErrMsg(err.response?.data?.error || "Invalid credentials.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const role = localStorage.getItem("role")
    const dept = localStorage.getItem("dept")
    if (role && dept) navigate("/dashboard")
  }, [navigate])

  return (
    <div className="login-container bg-fixed bg-center bg-cover flex items-center justify-center md:justify-start pl-4 md:pl-[12vw] min-h-[125vh]  to-orange-100 p-4">
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 transition-all hover:shadow-gray-100/40">
        {/* Logo + Header */}
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username" className="text-sm font-bold text-gray-700">
              Username
            </Label>
            <Input
              id="username"
              ref={usernameRef}
              type="text"
              className="mt-1 bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-300"
              placeholder="Username"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm  text-gray-700 font-bold">
              Password
            </Label>
            <Input
              id="password"
              ref={passwordRef}
              type="password"
              className="mt-1 bg-white border-gray-300 focus:border-orange-400 focus:ring-orange-300"
              placeholder="Password"
            />
          </div>

          <div className="pt-2">
            <Label className="text-sm font-medium text-gray-700">
              Captcha Verification
            </Label>
            <Captcha />
          </div>

          {errMsg && (
            <p className="text-xs text-center text-red-600 font-semibold mt-2">
              {errMsg}
            </p>
          )}

          <div className="flex items-center justify-between text-xs mt-1">
            <NavLink
              to="/forgotpass"
              className="text-blue-600 hover:text-blue-800 font-semibold transition"
            >
              Forgot Password?
            </NavLink>

            <Dialog>
              <DialogTrigger className="text-gray-600 hover:text-gray-900 underline">
                Terms of Use
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-center font-semibold text-lg">
                    Terms of Use
                  </DialogTitle>
                </DialogHeader>
                <div className="text-xs text-gray-700 space-y-3 h-80 overflow-y-auto">
                  <p>
                    By using this system, you agree to our operational and data
                    protection policies. Unauthorized access or misuse of this
                    platform is strictly prohibited.
                  </p>
                  <p>
                    Data collected during authentication will only be used for
                    legitimate business purposes of Payal Dealers Pvt. Ltd.
                  </p>
                  <p>
                    For support, contact{" "}
                    <a
                      href="mailto:payaldealerspvtltdofficial@gmail.com"
                      className="text-blue-500 underline"
                    >
                      payaldealerspvtltdofficial@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className={`w-full mt-4 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold tracking-wide hover:from-orange-600 hover:to-orange-700 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-[11px] text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} Payal Dealers Pvt. Ltd. — All rights reserved.
        </p>
      </div>
    </div>
  )
}
