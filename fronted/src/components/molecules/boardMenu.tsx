import * as React from 'react';
import styled from 'styled-components'
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core';
import { ContentsContext } from '../../contexts';

const DeleteBoard = styled.button`
`;

interface Props{
    boardId:number;
    isOpen:boolean;
    onClose:()=> void;
}

export const BoardMenu:React.FC<Props> = (props: Props)=>{
    const {contentsState, setContents} = React.useContext(ContentsContext);
    const {boardId, isOpen, onClose} = props;

    const handleDeleteBoard = (boardId:number)=>{
        console.log('deleteBoard!!!')
        const allBoard =[...contentsState];
        const targetIndex:number = allBoard.findIndex(({id}) => id ===boardId);
        allBoard.splice(targetIndex,1);
    
        setContents(allBoard);
    }

    return(
        <Dialog 
            key={boardId}
            open={isOpen}
            onClose={onClose}
        >
                <DialogContent>
                    <DeleteBoard onClick={(e)=>handleDeleteBoard(boardId)}>
                        {boardId}delete board
                    </DeleteBoard>
                </DialogContent>
        </Dialog>
    );
}