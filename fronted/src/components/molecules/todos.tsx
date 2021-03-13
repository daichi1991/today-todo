import * as React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core';

const {useState} = React;

const AllTodo = styled.div`

`;

const TodoArea = styled.div`
    background: #fff;
`;

const TodoTitle = styled.p`

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
    const [madalOpen, setModalOpen] = useState(false);

    const handleOpen = () =>{
        setModalOpen(true);
    }
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
            <TodoArea key={todoList.id} >
                <TodoTitle>{todoList.title}</TodoTitle>
            </TodoArea>
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

