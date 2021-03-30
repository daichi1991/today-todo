import * as React from 'react';
import styled from 'styled-components';
import {DialogContent, Dialog, DialogTitle, ClickAwayListener} from '@material-ui/core';
import { Delete }from '@material-ui/icons'
import {BoardType, TodoType} from './types';
import { ContentsContext } from '../../contexts';

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
}

export const TodoDialog:React.FC<Props> = (props) => {
    const {contentsState, setContents} = React.useContext(ContentsContext);
    const {boardId, todo, isOpen, onClose} = props;
    const [isFocusTitle, setIsFocusTitle] = useState(false);
    const [todoTitle, setTodoTitle] = useState<string>(todo.title);

    const [todoMemo, setTodoMemo] = useState<string|undefined>(todo.memo);
    const [isFocusMemo, setIsFocusMemo] = useState(false);


    const handleDeleteTodo = (boardId:number, todoId: string) =>{
        if(window.confirm('are you sure?')){
            const allBoard = [...contentsState];
            const board:BoardType = allBoard.find((item)=> item.id === boardId)!;
            const targetIndex = board.todos!.findIndex(({id}) => id===todoId );
            board.todos!.splice(targetIndex,1);
        
            setContents(allBoard);
        }
    }

    const handleEditTodoTitle = (boardId:number, todoId:string, todoTitle:string) =>{
        const allBoard = [...contentsState];
        const board:BoardType = allBoard.find((item)=> item.id===boardId)!;
        const todo:TodoType = board.todos!.find((item)=> item.id===todoId)!;
        todo.title = todoTitle;
        setContents(allBoard);
    }

    const handleTodoNameFocusAway = () =>{
        setIsFocusTitle(false);
        if(todo.title !== todoTitle){
            handleEditTodoTitle(boardId, todo.id, todoTitle);
        }
    }

    const handleEditTitle = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setTodoTitle(event.target.value)
    };

    const handleTitleFocus = () =>{
        setIsFocusTitle(true);
    }

    const handleEditTodoMemo = (boardId:number, todoId:string, todoMemo:string|undefined)=>{
        const allBoard = [...contentsState];
        const board:BoardType = allBoard.find((item)=> item.id===boardId)!;
        const todo:TodoType = board.todos!.find((item)=> item.id===todoId)!;
        todo.memo = todoMemo;
        setContents(allBoard);
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

    const handleMemoFocus = () =>{
        setIsFocusMemo(true);
    }

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
                                        {isFocusTitle?
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
                            <Delete onClick={(e) =>handleDeleteTodo(boardId,todo.id)}/>
                        </DeleteTodo>
                    </TodoHeader>
                    <DialogContent>
                        <ClickAwayListener onClickAway={handleTodoMemoFocusAway}>
                            <div onClick={handleMemoFocus}>
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