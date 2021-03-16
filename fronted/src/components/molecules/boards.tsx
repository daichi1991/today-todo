import * as React from 'react';
import styled from 'styled-components'
import { Droppable,Draggable } from 'react-beautiful-dnd'
import { Todos } from './todos'
import { ContentsDateType } from './types'
import { getItemStyle, getListStyle } from './styles'


const AllBoard = styled.div`
    display: flex;
    lex-wrap: nowrap;;
    margin: 10px 0 ;
    width:100%;
`

const BoardArea = styled.div`
    margin: 0 5px;
    padding: 0 5px;
    height: 80vh;
    width: 300px;
`

const BoardName = styled.p`
    font-size:16px;
`




interface Props{
    items: ContentsDateType;
}

export const Boards:React.FC<Props> = (props: Props) =>{
    const {items} = props;


    return(
        <>
        <AllBoard >
            <Droppable droppableId="droppable" type="droppableItem">
                {(provided, snapshot)=>(
                    <div
                        ref={provided.innerRef}   
                        style={getListStyle(snapshot.isDraggingOver)}                 
                    >                        
                        {items.map((item,index) => 
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index} >
                                {(provided,snapshot) =>(
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <BoardArea>
                                            <BoardName>{item.name}</BoardName>
                                            <Todos todos={item.todos} type={item.id}/>
                                            
                                        </BoardArea>
                                    </div>
                                )}
                            </Draggable>
                        )
                        }
                        {provided.placeholder}

                    </div>
                )}
            </Droppable>
            </AllBoard>
        </>
    )
}