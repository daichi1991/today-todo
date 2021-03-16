import * as React from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {TodoWrapper} from './todoWrapper';
import type { TodoType } from './types'
import { getItemStyle, getListStyle, getSubItemStyle, getSubListStyle } from './styles'

const {useState} = React;

const AllTodo = styled.div`

`;


interface Props {
    todos: TodoType[];
    type: number;
}


export const Todos:React.FC<Props> = (props: Props) =>{
    const [dialogOpen] = useState(false);
    const todos  = props.todos;
    const type = props.type;

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
                        todos.map((todo, index)=>
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
            </AllTodo>
        </>
    )
}

