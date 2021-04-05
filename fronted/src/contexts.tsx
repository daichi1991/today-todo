import * as React from 'react';
import {ContentsDataType} from './components/molecules/types'
import {fetchContents} from './apis/board'

const {useState, useEffect} = React;

export const ContentsContext = React.createContext({} as {
    contentsState:ContentsDataType,
    setContents:React.Dispatch<React.SetStateAction<ContentsDataType>>
});
export const ContentsProvider = ContentsContext.Provider;

export const Provider:React.FC = ({children}) =>{



    const [contentsState, setContents] = useState<ContentsDataType>([]);

    useEffect(() => {
        fetchContents()
        .then((data:ContentsDataType)=>
            setContents(data)
        )
    }, [])


    return (
        <ContentsContext.Provider value={{ contentsState, setContents }} >
            {children}
        </ContentsContext.Provider>
    )
}