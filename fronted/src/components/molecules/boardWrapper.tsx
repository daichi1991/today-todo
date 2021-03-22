import * as React from 'react';
import styled from 'styled-components';
import { BoardType, TodoType } from './types';
import {Todos} from './todos'
import {BoardMenu} from './boardMenu'

const {useState, useRef, useEffect} = React;

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

const EditName = styled.div`
`;

interface Props{
    board:BoardType;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
    handelDeleteBoardSubmit:(boardId:number)=>void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
    handelEditBoardName: (boardId:number, boardName:string) => void;
}

export const BoardWrapper:React.FC<Props> = (props:Props) => {

    const {board} = props
    const [boardMenuOpen, setBoardMenuOpen] = useState<boolean>(false);
    const [nameEditOpen, setNameEditOpen] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(board.name)

    const handleBoardMenu = () =>{
        setBoardMenuOpen(!boardMenuOpen);
    };

    const focusRef = useRef();
    const documentClickHandler = useRef();

    useEffect(() => {
        documentClickHandler.current = e => {
            console.log('documentClickHandler')

            if(focusRef.current.contains(e.target)){
                return;
            }
            setNameEditOpen(false);
            removeDocumentClickHandler();
        }
    }, []);

    const removeDocumentClickHandler = () => {
        console.log('removeDocumentClickHandler')
        
        document.removeEventListener('click', documentClickHandler.current)
    }

    const handleNameEditOpen = () =>{
        setNameEditOpen(true);

    };

    const handleEditeName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setEditName(event.target.value)
    };

    const handelEditBoardName = ()=>{
        props.handelEditBoardName(board.id, editName);
    }

    return(
        <BoardArea key={board.id}>
        <BoardName onClick={handleNameEditOpen}>
            {nameEditOpen?
            <EditName ><input type="text" value={editName} onChange={handleEditeName} onBlur={handelEditBoardName} onSubmit={handelEditBoardName}/></EditName>
            :board.name
            }
        </BoardName>
        <OpenBoardMenu  onClick={handleBoardMenu}>***</OpenBoardMenu>

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
                    onClose={handleBoardMenu}
                    handelDeleteBoardSubmit={props.handelDeleteBoardSubmit}
                />
                    
            }
        </BoardArea>


    )
}