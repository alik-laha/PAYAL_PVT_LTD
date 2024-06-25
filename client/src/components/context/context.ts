import { createContext } from 'react';
import { AssetData, EditPendingData, GradingData ,BoilingEntryData} from '../../type/type';

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
    AllNewMachines:AssetData[];
    setAllMachines: (data: AssetData[]) => void;
    setAllNewMachines: (data: AssetData[]) => void;
    editPendiningGrinderData: GradingData[];
    editPendingBoilingData: BoilingEntryData[];
    setEditPendiningGrinderData: (data: GradingData[]) => void;
    setEditPendingBoilingData: (data: BoilingEntryData[]) => void;
    pendingqccount: number;
    setpendingqcCount: (pendingqccount: number) => void;
    pendingreportcount: number;
    setpendingreportCount: (pendingreportcount: number) => void;
}

const Context = createContext<ContextType>({
    editPendingData: [],
    AllMachines: [],
    AllNewMachines:[],
    setAllMachines: () => { },
    setAllNewMachines: () => { },
    setEditPendingData: () => { },
    count: 0,
    setCount: () => { },
    pendingqccount:0,
    setpendingqcCount:()=>{},
    pendingreportcount:0,
    setpendingreportCount:()=>{},
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
    editPendingBoilingData: [],
    setEditPendingBoilingData: () => { }

});

export default Context;