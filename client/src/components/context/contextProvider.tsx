import Context from "./context.ts";
import { ReactNode } from "react";
import { useState } from "react";
import { AssetData, EditPendingData, GradingData } from "../../type/type";

interface ContextProviderProps {
    children: ReactNode;
}
const ContextProvider = ({ children }: ContextProviderProps) => {
    const [editPendingData, setEditPendingData] = useState<EditPendingData[]>([])
    const [count, setCount] = useState<number>(0)
    const [generateCaptcha, setGenerateCaptcha] = useState<string>('')
    const [typedCaptcha, setTypedCaptcha] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [AllMachines, setAllMachines] = useState<AssetData[]>([])
    const [dept, setDept] = useState<string>('')
    const [editPendiningGrinderData, setEditPendiningGrinderData] = useState<GradingData[]>([])

    return (
        <Context.Provider value={{ editPendingData, setEditPendingData, count, setCount, generateCaptcha, setGenerateCaptcha, typedCaptcha, setTypedCaptcha, role, setRole, dept, setDept, AllMachines, setAllMachines, editPendiningGrinderData, setEditPendiningGrinderData }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider