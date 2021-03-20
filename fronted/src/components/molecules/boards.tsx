import * as React from 'react';
import styled from 'styled-components'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { Todos } from './todos'
import { ContentsDateType } from './types'
import { getItemStyle, getListStyle } from './styles'

const {useState} = React;

const AllBoard = styled.div`
display: flex;
    lex-wrap: nowrap;;
    margin: 10px 0 ;
    width:100%;
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

`;

const AddBoard = styled.div`

`;

interface Props{
    items: ContentsDateType;
    handleNewBoardSubmit: (boardName:string) => void;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
};

export const Boards:React.FC<Props> = (props: Props) =>{
    const {items} = props;
    const [addForm, setAddform] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');
    const [addTodoForm, setAddTodoform] = useState<boolean>(false);
    const [newTodoName, setNewTodoName] = useState<string>('');

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
                        {items.map((item,index) => 
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index} >
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
                                        <BoardArea>
                                            <BoardName>{item.name}</BoardName>
                                                <Todos
                                                    parentBoardId={item.id}
                                                    todos={item.todos}
                                                    type={item.id}
                                                    handleNewTodoSubmit={props.handleNewTodoSubmit}
                                                    handleDeleteTodoSubmit={props.handleDeleteTodoSubmit}
                                                />
                                        </BoardArea>
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
                <div onClick={openAddform}>
                    add board
                </div>
                {addForm && 
                <AddBoard >
                    <label>
                        board name
                        <input type="text" value={newBoardName} onChange={handleNewBoardName}/>
                    </label>
                    <button onClick={(e) => handleNewBoardSubmit(newBoardName)} >add!</button>
                </AddBoard>
                }
            </NewBoard>
            </AllBoard>
    )
}