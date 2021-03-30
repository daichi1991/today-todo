import * as React from 'react';
import styled from 'styled-components';
import { BoardType } from './types';
import {Todos} from './todos';
import {BoardMenu} from './boardMenu';
import { Menu } from '@material-ui/icons';
import { ClickAwayListener } from '@material-ui/core';
import { ContentsContext } from '../../contexts';

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
}



export const BoardWrapper:React.FC<Props> = (props:Props) => {
    const {contentsState, setContents} = React.useContext(ContentsContext);
    const {board} = props
    const [boardMenuOpen, setBoardMenuOpen] = useState<boolean>(false);
    const [boardName, setBoardName] = useState<string>(board.name);
    const [isFocusName, setIsFocusName] = useState(false);


    const handleEditeName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setBoardName(event.target.value)
    };


    const handleBoardMenu = () =>{
        setBoardMenuOpen(!boardMenuOpen);
    };

    const handelEditBoardName = (boardId:number, boardName:string) =>{
        const allBoard = [...contentsState];
        const board:BoardType = allBoard.find((item)=> item.id ===boardId)!;
        board.name = boardName;
        setContents(allBoard);
    }

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
            />
            {boardMenuOpen&&
                <BoardMenu
                    key={board.id}
                    boardId={board.id}
                    isOpen={boardMenuOpen}
                    onClose={handleBoardMenu}
                />
                    
            }
        </BoardArea>


    )
}