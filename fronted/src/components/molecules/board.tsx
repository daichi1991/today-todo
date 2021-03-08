import * as React from 'react';
import styled from 'styled-components'

const BoardName = styled.p`
    font-size:16px;
`

export const Board: React.FC = () =>{
    return(
        <>
            <BoardName>ボードネーム</BoardName>
        </>
    )
}