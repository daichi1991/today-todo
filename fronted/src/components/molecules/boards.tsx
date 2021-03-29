import * as React from 'react';
import styled from 'styled-components'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { getItemStyle, getListStyle } from './styles'
import { ContentsDataType } from './types'
import { AddCircle } from '@material-ui/icons';
import {ContentsContext} from '../../contexts';

import { Todos } from './todos'
import {BoardMenu} from './boardMenu'
import { BoardWrapper } from './boardWrapper';

const {useState} = React;

const AllBoard = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-y: auto;
    white-space: nowrap;
    margin: 10px 0 ;
    width:100vw;
    height:auto;
`;

const BoardArea = styled.div`
    margin: 0 5px;
    padding: 0 5px;
    height: auto;
    width: 300px;
`;

const BoardName = styled.p`
    font-size:16px;
`;

const NewBoard = styled.div`
    display:block;
    margin: 0 5px;
    padding: 0 5px;
    min-width: 250px;
`;

const AddBoard = styled.div`

`;

const OpenBoardMenu = styled.button`
`;

interface Props{
    handleNewBoardSubmit: (boardName:string) => void;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
    handelDeleteBoardSubmit:(boardId:number)=>void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
    handelEditBoardName: (boardId:number, boardName:string) => void;
    handleEditTodoTitle: (boardId:number, todoId:string, todoTitle:string) => void;
    handleEditTodoMemo: (boardId:number, todoId:string, todoMemo:string|undefined) => void;
};

export const Boards:React.FC<Props> = (props: Props) =>{
    const contents = React.useContext(ContentsContext);
    const [addForm, setAddform] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [addTodoForm, setAddTodoform] = useState<boolean>(false);
    const [newTodoName, setNewTodoName] = useState<string>('');

    const [boardMenuOpen, setBoardMenuOpen] = useState<boolean>(false);

    const handelBoardMenu = () =>{
        setBoardMenuOpen(!boardMenuOpen);
    };

    const openAddform = () => {
        setAddform(!addForm);
    };

    const handleNewBoardName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setNewBoardName(event.target.value)
    };
    
    const handleNewBoardSubmit = (newBoardName: string) =>{
        setAddform(false);
        setNewBoardName('')
        props.handleNewBoardSubmit(newBoardName);
    }


    return(
        <AllBoard >
            <Droppable droppableId="droppable" type="droppableItem" direction="horizontal">
                {(provided, snapshot)=>(
                    
                    <div
                        ref={provided.innerRef}   
                        style={getListStyle(snapshot.isDraggingOver)}                 
                    >                        
                        {contents.map((content,index) => 
                            <Draggable key={content.id} draggableId={content.id.toString()} index={index} >
                                {(provided,snapshot) =>(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <BoardWrapper 
                                            board={content}
                                            handleNewTodoSubmit={props.handleNewTodoSubmit}
                                            handelDeleteBoardSubmit={props.handelDeleteBoardSubmit}
                                            handleDeleteTodoSubmit={props.handleDeleteTodoSubmit}
                                            handelEditBoardName={props.handelEditBoardName}
                                            handleEditTodoTitle={props.handleEditTodoTitle}
                                            handleEditTodoMemo={props.handleEditTodoMemo}
                                        />

                                    </div>
                                )}
                            </Draggable>
                        )
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <NewBoard>
                    <AddCircle onClick={openAddform}/>
                {addForm && 
                <AddBoard >
                    <label>
                        <input type="text" value={newBoardName} onChange={handleNewBoardName} placeholder="new board"/>
                    </label>
                    <button onClick={(e) => handleNewBoardSubmit(newBoardName)} >add</button>
                </AddBoard>
                }
            </NewBoard>
            </AllBoard>
    )
}

