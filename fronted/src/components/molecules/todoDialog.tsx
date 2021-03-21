import * as React from 'react';
import styled from 'styled-components';
import {DialogContent, Dialog, DialogTitle} from '@material-ui/core';
import {TodoType} from './types';

const DialogWrapper = styled.div`
    width:50vw;
    height:60vh;
`;

const DeleteTodo = styled.div`
`;

interface Props{
    boardId:number;
    todo:TodoType;
    isOpen:boolean;
    onClose:()=> void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
}

export const TodoDialog:React.FC<Props> = (props) => {
    const {boardId, todo, isOpen, onClose} = props;

    const deleteTodo = (boardId:number, todoId: string) =>{
        window.confirm('are you usre?')&&props.handleDeleteTodoSubmit(boardId, todoId);
    }

    return(
            <Dialog 
                open={isOpen}
                onClose={onClose}
            >
                <DialogWrapper>
                    <DialogTitle>
                        {todo.title}
                    </DialogTitle>
                    <DeleteTodo onClick={(e) =>deleteTodo(boardId,todo.id)}>
                        削除
                    </DeleteTodo>
                    <DialogContent>
                            {todo.memo}
                    </DialogContent>
                </DialogWrapper>
            </Dialog>
    )
}