import * as React from 'react';
import styled from 'styled-components'
import { Todos } from './todos'

const AllBoard = styled.div`
    display: flex;
    margin: 10px 0 ;
`

const BoardArea = styled.div`
    margin: 0 5px;
    padding: 0 5px;
    width: 400px;
    height: auto;
    background: #f1f1f1;
`

const BoardName = styled.p`
    font-size:16px;
`
const todoContents = [
    {id:1, title: "起床", memo: "おはよう", position: 1, board_id: 1},
    {id:2, title: "洗顔", memo: "ばしゃばしゃ", position: 2, board_id: 1},
    {id:3, title: "朝食", memo: "もぐもぐ", position: 3, board_id: 1}
]

type Board = {
    id: number;
    name: string;
    position: number;
};

interface Props{
    boards: Board[];
}

export const Boards:React.FC<Props> = (props: Props) =>{
        const {boards} = props;
        const sortedBoards:Board[] = boards.sort((n1, n2) =>{
            if(n1.position > n2.position){
                return 1;
            }else if(n1.position < n2.position){
                return -1;
            }else{
                return 0;
            }

        });
        const boardElements = sortedBoards.map((board) =>{
            const todoElements = todoContents.filter((todoContent) => todoContent.board_id === board.id );
            return(
                <BoardArea key={board.id}>
                    <BoardName>{board.name}</BoardName>
                    <Todos todoList={todoElements}/>
                </BoardArea>
                );
            });
        return(
            <>
                <AllBoard>
                    {boardElements}
                </AllBoard>
            </>
        )
}