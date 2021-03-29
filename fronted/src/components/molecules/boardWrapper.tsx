import * as React from 'react';
import styled from 'styled-components';
import { BoardType } from './types';
import {Todos} from './todos';
import {BoardMenu} from './boardMenu';
import { Menu } from '@material-ui/icons';
import { ClickAwayListener } from '@material-ui/core';

const {useState} = React;

const BoardArea = styled.div`
    margin: 0 5px;
    padding: 0 5px;
    height: auto;
    overflow-x: auto;
    width: 300px;
`;

const BoardHeader = styled.div`
    display: flex;
    width: 100%;
`;

const MenuButton = styled.div`
    margin-left:auto;
    cursor:pointer;
`;

interface Props{
    board:BoardType;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
    handelDeleteBoardSubmit:(boardId:number)=>void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
    handelEditBoardName: (boardId:number, boardName:string) => void;
    handleEditTodoTitle: (boardId:number, todoId:string, todoTitle:string) => void;
    handleEditTodoMemo: (boardId:number, todoId:string, todoMemo:string|undefined) => void;
}



export const BoardWrapper:React.FC<Props> = (props:Props) => {

    const {board, handelEditBoardName} = props
    const [boardMenuOpen, setBoardMenuOpen] = useState<boolean>(false);
    const [boardName, setBoardName] = useState<string>(board.name);
    const [isFocusName, setIsFocusName] = useState(false);


    const handleEditeName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setBoardName(event.target.value)
    };


    const handleBoardMenu = () =>{
        setBoardMenuOpen(!boardMenuOpen);
    };

    const handleBoardNameFocusAway = () =>{
        setIsFocusName(false);
        if(board.name !== boardName){
            handelEditBoardName(board.id, boardName);
        }
    }

    const handleBoadNameFocus = () =>{
        setIsFocusName(true);
    }

    return(
        <BoardArea key={board.id}>
            <BoardHeader>
                <ClickAwayListener onClickAway={handleBoardNameFocusAway}>
                    <div onClick={handleBoadNameFocus}>
                    {isFocusName?
                        <input 
                        type="text" 
                        value={boardName} 
                        onChange={handleEditeName} 
                        onKeyPress={e => {if(e.key ==='Enter'){handleBoardNameFocusAway()}}} 
                        />
                        :
                        boardName
                    }
                    </div>
                </ClickAwayListener>
                <MenuButton>
                    <Menu onClick={handleBoardMenu}/>
                </MenuButton>
                
            </BoardHeader>
            <Todos
                parentBoardId={board.id}
                todos={board.todos}
                type={board.id}
                handleNewTodoSubmit={props.handleNewTodoSubmit}
                handleDeleteTodoSubmit={props.handleDeleteTodoSubmit}
                handleEditTodoTitle={props.handleEditTodoTitle}
                handleEditTodoMemo={props.handleEditTodoMemo}
            />
            {boardMenuOpen&&
                <BoardMenu
                    key={board.id}
                    boardId={board.id}
                    isOpen={boardMenuOpen}
                    onClose={handleBoardMenu}
                    handelDeleteBoardSubmit={props.handelDeleteBoardSubmit}
                />
                    
            }
        </BoardArea>


    )
}