import { createContext } from 'react';
import { EditPendingData } from '../../type/type';

interface ContextType {
    editPendingData: EditPendingData[];
    setEditPendingData: (data: EditPendingData[]) => void;
    count: number;
    setCount: (count: number) => void;
    setGenerateCaptcha: (captcha: string) => void;
    generateCaptcha: string;
    typedCaptcha: string;
    setTypedCaptcha: (captcha: string) => void;

}

const Context = createContext<ContextType>({
    editPendingData: [],
    setEditPendingData: () => { },
    count: 0,
    setCount: () => { },
    generateCaptcha: '',
    setGenerateCaptcha: () => { },
    typedCaptcha: '',
    setTypedCaptcha: () => { }

});

export default Context;