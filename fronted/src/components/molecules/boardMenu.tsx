import * as React from 'react';
import styled from 'styled-components'
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core';

const DeleteBoard = styled.button`
`;

interface Props{
    boardId:number;
    isOpen:boolean;
    onClose:()=> void;
    handelDeleteBoardSubmit:(boardId:number)=>void;
}

export const BoardMenu:React.FC<Props> = (props: Props)=>{
    const {boardId, isOpen, onClose} = props;

    const deleteBoardSubmit = (boardId:number)=>{
        props.handelDeleteBoardSubmit(boardId);
    }

    return(
        <Dialog 
            key={boardId}
            open={isOpen}
            onClose={onClose}
        >
                <DialogContent>
                    <DeleteBoard onClick={(e)=>deleteBoardSubmit(boardId)}>
                        {boardId}delete board
                    </DeleteBoard>
                </DialogContent>
        </Dialog>
    );
}