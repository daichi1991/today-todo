import * as React from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import { AddCircle } from '@material-ui/icons'
import {TodoWrapper} from './todoWrapper';
import type { BoardType, ContentsDataType, TodoType } from './types'
import { getSubItemStyle, getSubListStyle } from './styles'
import { ContentsContext } from '../../contexts';

const {useState} = React;

const AllTodo = styled.div`
    height: 70vh;
    overflow-x: auto;
`;

const NewTodo = styled.div`
`;

const AddTodo = styled.div`
`;

interface Props {
    parentBoardId:number;
    todos: TodoType[]|undefined;
    type: number;
}




export const Todos:React.FC<Props> = (props: Props) =>{
    const {contentsState, setContents} = React.useContext(ContentsContext);
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

    const handleNewTodo = (boardId:number, todoName: string) => {
        setNewTodoName('');
        setAddform(false);
        console.log(contentsState);
        const allBoard:ContentsDataType = [...contentsState];
        const board:BoardType = allBoard.find((item)=> item.id === boardId)!;
        const todos:TodoType[]|undefined = board.todos? board.todos.filter((item) => item !== undefined):undefined;
    
        const date = new Date();
        const todoId = date.toISOString() + todoName;
    
        let newTodo:TodoType =  {
            id:todoId, 
            title: todoName,
    
        }

        if(todos){
            todos.push(newTodo);
        }

        const newTodoList = todos?todos: [newTodo];
        board.todos = newTodoList;

        setContents(allBoard);


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
                                                boardId={props.parentBoardId}
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
                <AddCircle onClick={openAddform}/>
                {addForm && 
                <AddTodo >
                        <input type="text" value={newTodoName} onChange={handleNewTodoName} placeholder="new todo"/>
                    <button onClick={(e) => handleNewTodo(props.parentBoardId, newTodoName)} >add</button>
                </AddTodo>
                }
            </NewTodo>
            </AllTodo>
        </>
    )
}

