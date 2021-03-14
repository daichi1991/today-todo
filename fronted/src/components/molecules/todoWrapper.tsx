import * as React from 'react';
import styled from 'styled-components';
import { TodoType} from './todos';
import {TodoModal} from './todoDialog';

const {useState} = React;

const Wrapper = styled.div`
    display: flex;
    background: #fff;
    margin: 5px;
    padding: 5px;
`;

const TitleArea = styled.p`
`;


interface Props{
    todo:TodoType;
    isOpen:boolean;
    onClose:()=> void;
}

export const TodoWrapper:React.FC<Props> = (props) =>{
    const {todo} = props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleClick = () =>{
        setDialogOpen(!dialogOpen);
    }
    
    return(
        <>
            <Wrapper onClick={handleClick}>
                <TitleArea>{todo.title}</TitleArea>
            </Wrapper>
            {
                dialogOpen&&
                <TodoModal
                    todo={todo}
                    isOpen={dialogOpen}
                    onClose={handleClick}
                />
            }
        </>

    );
};