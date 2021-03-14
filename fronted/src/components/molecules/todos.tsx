import * as React from 'react';
import styled from 'styled-components';
import {TodoWrapper} from './todoWrapper';

const {useState} = React;

const AllTodo = styled.div`
    podding:50px;
`;

export type TodoType = {
    id: number;
    title: string;
    memo: string;
    position: number;
    board_id: number;
}

interface Props {
    todoList: TodoType[];
}


export const Todos:React.FC<Props> = (props: Props) =>{
    const [dialogOpen] = useState(false);

    const { todoList } = props;
    const sortedTodoList:TodoType[] = todoList.sort((n1, n2) => {
        if(n1.position > n2.position){
            return 1;
        }else if(n1.position < n2.position){
            return -1;
        }else{
            return 0;
        }
    });

    const todoListElement = sortedTodoList.map((todoList)=>{
        return(
            <TodoWrapper 
                todo={todoList}
                isOpen={dialogOpen}
                onClose={() =>{}}
            />
        )
    });

    return(
        <>
            <AllTodo>
                {todoListElement}
            </AllTodo>
        </>
    )
}

