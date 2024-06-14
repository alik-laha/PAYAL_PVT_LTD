import { createContext } from 'react';
import { AssetData, EditPendingData, GradingData } from '../../type/type';

interface ContextType {
    editPendingData: EditPendingData[];
    setEditPendingData: (data: EditPendingData[]) => void;
    count: number;
    setCount: (count: number) => void;
    setGenerateCaptcha: (captcha: string) => void;
    generateCaptcha: string;
    typedCaptcha: string;
    setTypedCaptcha: (captcha: string) => void;
    role: string;
    setRole: (role: string) => void;
    dept: string;
    setDept: (dept: string) => void;
    AllMachines: AssetData[];
    setAllMachines: (data: AssetData[]) => void;
    editPendiningGrinderData: GradingData[];
    setEditPendiningGrinderData: (data: GradingData[]) => void;

}

const Context = createContext<ContextType>({
    editPendingData: [],
    AllMachines: [],
    setAllMachines: () => { },
    setEditPendingData: () => { },
    count: 0,
    setCount: () => { },
    generateCaptcha: '',
    setGenerateCaptcha: () => { },
    typedCaptcha: '',
    setTypedCaptcha: () => { },
    role: '',
    setRole: () => { },
    dept: '',
    setDept: () => { },
    editPendiningGrinderData: [],
    setEditPendiningGrinderData: () => { },

});

export default Context;