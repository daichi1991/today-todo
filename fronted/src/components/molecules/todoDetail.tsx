import * as React from 'react';
import styled from 'styled-components';
import { TodoType} from './todos';

const TitleArea = styled.p`
`;

const MemoArea = styled.div`
`;

interface Props{
    todo:TodoType;
}

export const TodoDetail:React.FC<Props> = (props) =>{
    const {todo} = props;
    return(
        <>
            <TitleArea>{todo.title}</TitleArea>
            <MemoArea>{todo.memo}</MemoArea>
        </>
    );
};