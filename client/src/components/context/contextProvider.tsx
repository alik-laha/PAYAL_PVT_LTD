import Context from "./context.ts";
import { ReactNode } from "react";
import { useState } from "react";
import { EditPendingData } from "../../type/type";

interface ContextProviderProps {
    children: ReactNode;
}
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [editPendingData, setEditPendingData] = useState<EditPendingData[]>([])
    const [count, setCount] = useState<number>(0)
    const [generateCaptcha, setGenerateCaptcha] = useState<string>('')
    const [typedCaptcha, setTypedCaptcha] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [dept, setDept] = useState<string>('')

    return (
        <Context.Provider value={{ editPendingData, setEditPendingData, count, setCount, generateCaptcha, setGenerateCaptcha, typedCaptcha, setTypedCaptcha, role, setRole, dept, setDept }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider