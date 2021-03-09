import * as React from 'react';
import styled from 'styled-components'

const BoardArea = styled.div`
    display: flex;
    height: auto;
    background: #f1f1f1;
`

const BoardName = styled.p`
    font-size:16px;
`

interface Props {
    name: string;
}

export const OneBoard: React.FC<Props> = (props) =>{
    const name = props.name;
    return(
            <BoardArea>
                <BoardName>{name}</BoardName>
            </BoardArea>
    )
}