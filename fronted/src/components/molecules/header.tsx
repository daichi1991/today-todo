import * as React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    background: black;
    height: 2rem;
    line-height: 2rem;
`

const HeaderTitle = styled.div`
    color: white;
    font-size: 1.4rem;
`

interface Props {
    title: string
}

export const Header: React.FC<Props> = (props) => {
    return(
        <HeaderWrapper>
            <HeaderTitle>
                {props.title}
            </HeaderTitle>
        </HeaderWrapper>
    )
}