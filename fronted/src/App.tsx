import React, {useState} from 'react';
import './App.css';
import { DragDropContext} from 'react-beautiful-dnd';
import { Header } from './components/molecules/header';
import { Boards } from './components/molecules/boards';
import { CONTENTS } from './components/molecules/contentsData';
import {ContentsDateType ,TodoType, BoardType} from './components/molecules/types';

const reorder:any = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {

  const [stateItems, setStateItems] = useState(CONTENTS);

  function onDragEnd(result:any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === "droppableItem") {
      const items:any = reorder(stateItems, sourceIndex, destIndex);

      setStateItems(items);
    } else if (result.type === "droppableSubItem") {
      const itemSubItemMap = stateItems.reduce((acc: any, item: any) => {
        acc[item.id] = item.todos;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...stateItems];

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
        setStateItems(newItems);
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
        setStateItems(newItems);
        
      }
      
    }
  }

  const changeParent = (board:ContentsDateType ) =>{
    setStateItems(board)
  }

  const handleNewBoardSubmit = (boardName: string) =>{
    const items = stateItems;
    const aryMax = (a:number, b:number) => {
        return Math.max(a,b);
    }
    const ary = items.map(item => item.id)
    const max:number = ary.reduce(aryMax)+1;
    const name:string = boardName;

    let newBoard =  {
        id:max, 
        name:name, 
        todos: [{
          id:1, 
          title: 'new Todo', 
          memo: '', 
          }
        ]
      }

    items.push(newBoard);
    setStateItems(items);
    console.log(stateItems);

};


  return (
    <div className="App">
      <Header title="today-todo!" />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
          <Boards items={stateItems} handleNewBoardSubmit={handleNewBoardSubmit} />
      </DragDropContext>
      
    </div>
  );
}

export default App;
