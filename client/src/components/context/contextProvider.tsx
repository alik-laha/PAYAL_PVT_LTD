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

    return (
        <Context.Provider value={{ editPendingData, setEditPendingData, count, setCount }}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider