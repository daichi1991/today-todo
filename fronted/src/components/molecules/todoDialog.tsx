import * as React from 'react';
import styled from 'styled-components';
import {DialogContent, Dialog, DialogTitle, ClickAwayListener} from '@material-ui/core';
import { Delete }from '@material-ui/icons'
import {TodoType} from './types';

const {useState} = React;


const DialogWrapper = styled.div`
    width:40vw;
    height:60vh;
`;

const TodoHeader = styled.div`
    display:flex;
    width: 95%;
`;

const DeleteTodo = styled.div`
    display: flex;
    margin-left:auto;
    justify-content: center;
    align-items: center;
    
`;

const EditMemoArea = styled.textarea`
    width:100%;
    height:30vh;
`;

interface Props{
    boardId:number;
    todo:TodoType;
    isOpen:boolean;
    onClose:()=> void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
    handleEditTodoTitle: (boardId:number, todoId:string, todoTitle:string) => void;
    handleEditTodoMemo: (boardId:number, todoId:string, todoMemo:string|undefined) => void;
}

export const TodoDialog:React.FC<Props> = (props) => {
    const {boardId, todo, isOpen, onClose, handleEditTodoTitle, handleEditTodoMemo} = props;
    const [isFocusName, setIsFocusName] = useState(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

    const [todoMemo, setTodoMemo] = useState<string|undefined>(todo.memo);
    const [isFocusMemo, setIsFocusMemo] = useState(false);

    const deleteTodo = (boardId:number, todoId: string) =>{
        window.confirm('are you sure?')&&props.handleDeleteTodoSubmit(boardId, todoId);
    }

    const handleTodoNameFocusAway = () =>{
        setIsFocusName(false);
        if(todo.title !== todoTitle){
            handleEditTodoTitle(boardId, todo.id, todoTitle);
        }
    }

    const handleEditTitle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTodoTitle(event.target.value)
    };

    const handleTitleFocus = () =>{
        setIsFocusMemo(true);
    }

    const handleTodoMemoFocusAway = () =>{
        setIsFocusMemo(false);
        if(todo.memo !== todoMemo){
            handleEditTodoMemo(boardId, todo.id, todoMemo);
        }
    }

    const handleEditMemo = (event:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setTodoMemo(event.target.value)
    };

    return(
            <Dialog 
                open={isOpen}
                onClose={onClose}
            >
                <DialogWrapper>
                    <TodoHeader>
                        <DialogTitle>
                            <div>
                                <ClickAwayListener onClickAway={handleTodoNameFocusAway}>
                                    <div onClick={handleTitleFocus}>
                                        {isFocusName?
                                            <input 
                                                type="text" 
                                                value={todoTitle}
                                                onChange={handleEditTitle}
                                                onKeyPress={e => {if(e.key ==='Enter'){handleTodoNameFocusAway()}}} 
                                            />
                                            :todoTitle
                                        }
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </DialogTitle>
                        <DeleteTodo>
                            <Delete onClick={(e) =>deleteTodo(boardId,todo.id)}/>
                        </DeleteTodo>
                    </TodoHeader>
                    <DialogContent>
                        <ClickAwayListener onClickAway={handleTodoMemoFocusAway}>
                            <div onClick={handleTitleFocus}>
                                {isFocusMemo?
                                    <EditMemoArea
                                        value={todoMemo}
                                        onChange={handleEditMemo}
                                        onKeyPress={e => {if(e.key ==='Enter'){handleTodoMemoFocusAway()}}} 
                                    />
                                    :todoMemo
                                }
                            </div>
                        </ClickAwayListener>
                    </DialogContent>
                </DialogWrapper>
            </Dialog>
    )
}