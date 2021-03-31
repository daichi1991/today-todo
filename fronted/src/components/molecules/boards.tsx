import * as React from 'react';
import styled from 'styled-components'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { getItemStyle, getListStyle } from './styles'
import { ContentsDataType, BoardType } from './types'
import { AddCircle } from '@material-ui/icons';
import {ContentsContext} from '../../contexts';


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




const NewBoard = styled.div`
    display:block;
    margin: 0 5px;
    padding: 0 5px;
    min-width: 250px;
`;

const AddBoard = styled.div`

`;


export const Boards:React.FC = () =>{
    const {contentsState, setContents} = React.useContext(ContentsContext);
    const [addForm, setAddform] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');

    const openAddform = () => {
        setAddform(!addForm);
    };

    const handleNewBoardName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setNewBoardName(event.target.value)
    };

    const handleNewBoard = (boardName: string) => {
        console.log('handleNewBoard!!!')
        setAddform(false);
        setNewBoardName('');
        const items:ContentsDataType = [...contentsState];
        const aryMax = (a:number, b:number) => {
            return Math.max(a,b);
        }
        const ary = items.map(item => item.id)
        const max:number = ary.length>0?ary.reduce(aryMax)+1:1;
        const name:string = boardName;
    
        const newBoard:BoardType =  {
            id:max, 
            name:name,
            todos:[],
        }
    
        const updatedBoard = [...contentsState,newBoard];
    
        setContents(updatedBoard);
    }


    return(
        <AllBoard >
            <Droppable droppableId="droppable" type="droppableItem" direction="horizontal">
                {(provided, snapshot)=>(
                    
                    <div
                        ref={provided.innerRef}   
                        style={getListStyle(snapshot.isDraggingOver)}                 
                    >                        
                        {contentsState.map((content,index) => 
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
                    <button onClick={(e) => handleNewBoard(newBoardName)} >add</button>
                </AddBoard>
                }
            </NewBoard>
            </AllBoard>
    )
}

