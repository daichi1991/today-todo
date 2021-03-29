import * as React from 'react';
import styled from 'styled-components';
import { TodoType} from './types';
import {TodoDialog} from './todoDialog';

const {useState} = React;

const Wrapper = styled.div`
`;

const TitleArea = styled.p`
`;


interface Props{
    boardId:number;
    todo:TodoType;
    isOpen:boolean;
    onClose:()=> void;
    handleDeleteTodoSubmit: (boardId:number, todoId: string) => void;
    handleEditTodoTitle: (boardId:number, todoId:string, todoTitle:string) => void;
    handleEditTodoMemo: (boardId:number, todoId:string, todoMemo:string|undefined) => void;
}

export const TodoWrapper:React.FC<Props> = (props) =>{
    const {todo} = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClick = () =>{
        setDialogOpen(!dialogOpen);
    }
    
    return(
        <>
            <Wrapper key={todo.id} onClick={handleClick}>
                <TitleArea>{todo.title}</TitleArea>
            </Wrapper>
            {
                dialogOpen&&
                <TodoDialog
                    boardId={props.boardId}
                    todo={todo}
                    isOpen={dialogOpen}
                    onClose={handleClick}
                    handleDeleteTodoSubmit={props.handleDeleteTodoSubmit}
                    handleEditTodoTitle={props.handleEditTodoTitle}
                    handleEditTodoMemo={props.handleEditTodoMemo}
                />
            }
        </>

    );
};