import * as React from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import { Header } from '../molecules/header';
import { Boards } from '../molecules/boards';
import {ContentsContext} from '../../contexts';
import {ContentsDataType ,TodoType} from '../molecules/types';

const reorder:any = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const Container: React.FC = () =>{

    const {contentsState, setContents} = React.useContext(ContentsContext);

    function onDragEnd(result:any) {
      // dropped outside the list
    if (!result.destination) {
    return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
    const items:any = reorder(contentsState, sourceIndex, destIndex);

    setContents(items);
    } else if (result.type === "droppableSubItem") {
    const itemSubItemMap = contentsState.reduce((acc: any, item: any) => {
        acc[item.id] = item.todos;
        return acc;
    }, {});

    const sourceParentId = parseInt(result.source.droppableId);
    const destParentId = parseInt(result.destination.droppableId);

    const sourceSubItems = itemSubItemMap[sourceParentId];
    const destSubItems = itemSubItemMap[destParentId];

    let newItems:ContentsDataType = [...contentsState];

    /** In this case subItems are reOrdered inside same Parent */
    if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(
        sourceSubItems,
        sourceIndex,
        destIndex
        );
        newItems = newItems.map(item => {
        if (item.id === sourceParentId) {
            item.todos = reorderedSubItems;
        }
        return item;
        });
        setContents(newItems);
    } else {
        let newSourceSubItems:TodoType[] = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map(item => {
        if (item.id === sourceParentId) {
            item.todos = newSourceSubItems;
        } else if (item.id === destParentId) {
            item.todos = newDestSubItems;
        }
        return item;
        });
        setContents(newItems);

        
        
    }
    
    }
    }


    return(
        <>
            <Header title="today-todo!" />
            <DragDropContext
            onDragEnd={onDragEnd}
            >
                <Boards/>
            </DragDropContext>
        </>
    )
}