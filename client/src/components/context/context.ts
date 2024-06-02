import { createContext } from 'react';
import { EditPendingData } from '../../type/type';

interface ContextType {
    editPendingData: EditPendingData[];
    setEditPendingData: (data: EditPendingData[]) => void;
    count: number;
    setCount: (count: number) => void;


}

const Context = createContext<ContextType>({
    editPendingData: [],
    setEditPendingData: () => { },
    count: 0,
    setCount: () => { }

});

export default Context;