import * as React from 'react';
import styled from 'styled-components';
import { BoardType, TodoType } from './types';
import {Todos} from './todos'
import {BoardMenu} from './boardMenu'

const {useState} = React;

const BoardArea = styled.div`
    margin: 0 5px;
    padding: 0 5px;
    height: auto;
    width: 300px;
`;

const BoardName = styled.p`
    font-size:16px;
`;

const OpenBoardMenu = styled.button`
`;

interface Props{
    board:BoardType;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
    handelDeleteBoardSubmit:(boardId:number)=>void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
}

export const BoardWrapper:React.FC<Props> = (props:Props) => {

    const {board} = props
    const [boardMenuOpen, setBoardMenuOpen] = useState<boolean>(false);

    const handelBoardMenu = () =>{
        setBoardMenuOpen(!boardMenuOpen);
    };

    return(
        <BoardArea key={board.id}>
        <BoardName>{board.name}</BoardName>
        <OpenBoardMenu  onClick={handelBoardMenu}>***</OpenBoardMenu>

            <Todos
                parentBoardId={board.id}
                todos={board.todos}
                type={board.id}
                handleNewTodoSubmit={props.handleNewTodoSubmit}
                handleDeleteTodoSubmit={props.handleDeleteTodoSubmit}
            />
            {boardMenuOpen&&
                <BoardMenu
                    key={board.id}
                    boardId={board.id}
                    isOpen={boardMenuOpen}
                    onClose={handelBoardMenu}
                    handelDeleteBoardSubmit={props.handelDeleteBoardSubmit}
                />
                    
            }
        </BoardArea>


    )
}