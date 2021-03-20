import * as React from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {TodoWrapper} from './todoWrapper';
import type { TodoType } from './types'
import { getSubItemStyle, getSubListStyle } from './styles'

const {useState} = React;

const AllTodo = styled.div`

`;

const NewTodo = styled.div`
`;

const AddTodo = styled.div`
`;

interface Props {
    parentBoardId:number;
    todos: TodoType[]|undefined;
    type: number;
    handleNewTodoSubmit: (boardId:number, todoName: string) => void;
}




export const Todos:React.FC<Props> = (props: Props) =>{
    const [dialogOpen] = useState<boolean>(false);
    const [addForm, setAddform] = useState<boolean>(false);
    const [newTodoName, setNewTodoName] = useState<string>('');
    const todos  = props.todos;
    const type = props.type;

    const openAddform = () => {
        setAddform(!addForm);
    };

    const handleNewTodoName = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setNewTodoName(event.target.value)
    };

    const handleNewTodoSubmit = (boardId:number, todoName: string) => {
        setNewTodoName('');
        setAddform(false);
        props.handleNewTodoSubmit(boardId, todoName)
    }

    return(
        <>
        <AllTodo>
            <Droppable droppableId={type.toString()} type={`droppableSubItem`}>
                {(provided, snapshot)=>(
                    <div
                        ref={provided.innerRef}
                        style={getSubListStyle(snapshot.isDraggingOver)}
                    >
                    {
                        todos&&todos.map((todo, index)=>
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                {(provided, snapshot) =>(
                                    
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getSubItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <TodoWrapper 
                                                todo={todo}
                                                isOpen={dialogOpen}
                                                onClose={() =>{}}
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
            <NewTodo>
                <div onClick={openAddform}>
                    add todo
                </div>
                {addForm && 
                <AddTodo >
                        <input type="text" value={newTodoName} onChange={handleNewTodoName}/>
                    <button onClick={(e) => handleNewTodoSubmit(props.parentBoardId, newTodoName)} >add!</button>
                </AddTodo>
                }
            </NewTodo>
            </AllTodo>
        </>
    )
}

