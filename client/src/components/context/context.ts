import { createContext } from 'react';
import { EditPendingData } from '../../type/type';

interface ContextType {
    editPendingData: EditPendingData[];
    setEditPendingData: (data: EditPendingData[]) => void;

}

const Context = createContext<ContextType>({
    editPendingData: [],
    setEditPendingData: () => { }

});

export default Context;