import * as React from 'react';
import { CONTENTS } from './components/molecules/contentsData';
import {BoardType, TodoType} from './components/molecules/types'

const {useState} = React;

export const ContentsContext = React.createContext(CONTENTS);

export const handleEditTodoMemoContext = React.createContext(
    {handleEdit:(boardId:number, todoId:string, todoMemo:string|undefined) =>{}}
);