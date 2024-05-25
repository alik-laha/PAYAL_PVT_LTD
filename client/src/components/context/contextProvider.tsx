import Context from "./context.ts";
import { ReactNode, useState } from "react";

interface ContextProviderProps {
    children: ReactNode;
}
const ContextProvider = ({ children }: ContextProviderProps) => {

    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider