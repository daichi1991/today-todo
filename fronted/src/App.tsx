import React, {useState} from 'react';
import './App.css';
import { DragDropContext} from 'react-beautiful-dnd';
import { Header } from './components/molecules/header';
import { Boards } from './components/molecules/boards';
import { CONTENTS } from './components/molecules/contentsData';
import {ContentsDataType ,TodoType, BoardType} from './components/molecules/types';
import {ContentsContext} from './contexts'


const reorder:any = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {

  const [stateItems, setStateItems] = useState<ContentsDataType>(CONTENTS);
  const contents = [...stateItems];

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

      let newItems:ContentsDataType = [...stateItems];

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

  const handleNewBoardSubmit = (boardName: string) =>{
    const items:ContentsDataType = [...stateItems];
    const aryMax = (a:number, b:number) => {
        return Math.max(a,b);
    }
    const ary = items.map(item => item.id)
    const max:number = ary.length>0?ary.reduce(aryMax)+1:1;
    const name:string = boardName;

    const newBoard:BoardType =  {
        id:max, 
        name:name,
        todos:[],
      }

    const updatedBoard = [...stateItems,newBoard];

    setStateItems(updatedBoard);

  };

  const handleNewTodoSubmit = (boardId:number, todoName: string) =>{
    const allBoard = [...stateItems];
    const board:BoardType = allBoard.find((item)=> item.id === boardId)!;
    const todos:TodoType[]|undefined = board.todos? board.todos.filter((item) => item !== undefined):undefined;

    const date = new Date();
    const todoId = date.toISOString() + todoName;

    let newTodo:TodoType =  {
        id:todoId, 
        title: todoName,

      }

    if(todos){
      todos.push(newTodo);
    }

    const newTodoList = todos?todos: [newTodo];
    board.todos = newTodoList;

    setStateItems(allBoard);

  };

  const handelDeleteBoardSubmit = (boardId:number) =>{
    const allBoard =[...stateItems];
    const targetIndex:number = allBoard.findIndex(({id}) => id ===boardId);
    allBoard.splice(targetIndex,1);

    setStateItems(allBoard);

  }

  const handleDeleteTodoSubmit = (boardId:number, todoId: string) =>{
    const allBoard = [...stateItems];
    const board:BoardType = allBoard.find((item)=> item.id === boardId)!;
    const targetIndex = board.todos!.findIndex(({id}) => id===todoId );
    board.todos!.splice(targetIndex,1);


    setStateItems(allBoard);
  };

  const handelEditBoardName = (boardId:number, boardName:string) =>{
    const allBoard = [...stateItems];
    const board:BoardType = allBoard.find((item)=> item.id ===boardId)!;
    board.name = boardName;
    setStateItems(allBoard);
  }

  const handleEditTodoTitle = (boardId:number, todoId:string, todoTitle:string) =>{
    const allBoard = [...stateItems];
    const board:BoardType = allBoard.find((item)=> item.id===boardId)!;
    const todo:TodoType = board.todos!.find((item)=> item.id===todoId)!;
    todo.title = todoTitle;
    setStateItems(allBoard);
  }

  const handleEditTodoMemo = (boardId:number, todoId:string, todoMemo:string|undefined) =>{
    const allBoard = [...stateItems];
    const board:BoardType = allBoard.find((item)=> item.id===boardId)!;
    const todo:TodoType = board.todos!.find((item)=> item.id===todoId)!;
    todo.memo = todoMemo;
    setStateItems(allBoard);
  }


  return (
    <div className="App">
      <Header title="today-todo!" />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <ContentsContext.Provider value={contents}>
          <Boards
          handleNewBoardSubmit={handleNewBoardSubmit} 
          handleNewTodoSubmit={handleNewTodoSubmit}
          handelDeleteBoardSubmit={handelDeleteBoardSubmit}
          handleDeleteTodoSubmit={handleDeleteTodoSubmit}
          handelEditBoardName={handelEditBoardName}
          handleEditTodoTitle={handleEditTodoTitle}
          handleEditTodoMemo={handleEditTodoMemo}
          />
          </ContentsContext.Provider>
      </DragDropContext>
      
    </div>
  );
}

export default App;
