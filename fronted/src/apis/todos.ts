import axios from 'axios';
import {todoUrl} from '../urls';

const userId:string = '1';
const boardId:string = '1';

export const fetchTodos = () =>{
    const getTodoUrl:string = todoUrl(userId, boardId);

    return axios.get(getTodoUrl)
    .then((res)=>{
        return res.data
    })
    .catch((e) => console.error)
};

export const postTodo = (boardId:string, todoTitle:string, todoMemo:string, todoActive:boolean, todoPos:number) =>{
    const postTodoUrl = todoUrl(userId, boardId);

    return axios.post(postTodoUrl,{
        user_id: userId,
        board_id: boardId,
        title: todoTitle,
        memo: todoMemo,
        active: todoActive,
        position: todoPos,
    })
    .then(res =>{
        console.log('success');
        return res.data
    })
    .catch((e)=> console.error(e))
}