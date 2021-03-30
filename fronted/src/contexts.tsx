import * as React from 'react';
import { CONTENTS } from './components/molecules/contentsData';
import {ContentsDataType, BoardType, TodoType} from './components/molecules/types'

const {useState} = React;

export const ContentsContext = React.createContext({} as {
    contentsState:ContentsDataType,
    setContents:React.Dispatch<React.SetStateAction<ContentsDataType>>
});
export const ContentsProvider = ContentsContext.Provider;

export const Provider:React.FC = ({children}) =>{
    const [contentsState, setContents] = useState<ContentsDataType>(CONTENTS);

    return (
        <ContentsContext.Provider value={{ contentsState, setContents }} >
            {children}
        </ContentsContext.Provider>
    )
}