import * as React from 'react';
import styled from 'styled-components';
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core';
import {TodoType} from './todos';

const DialogWrapper = styled.div`
    width:50vw;
    height:60vh;
`;

interface Props{
    todo:TodoType;
    isOpen:boolean;
    onClose:()=> void;
}

export const TodoModal:React.FC<Props> = (props) => {
    const {todo, isOpen, onClose} = props;
    return(
            <Dialog 
                open={isOpen}
                onClose={onClose}
            >
                <DialogWrapper>
                <DialogTitle>
                    {todo.title}
                </DialogTitle>
                <DialogContent>
                        {todo.memo}
                </DialogContent>
                </DialogWrapper>
            </Dialog>
    )
}