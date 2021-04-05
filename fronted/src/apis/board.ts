import axios from 'axios';
import {boardUrl} from '../urls';

const userId:string = '1';

export const fetchContents = () =>{
    
    const getBoardUrl:string = boardUrl(userId);

    return axios.get(getBoardUrl)
    .then(res => {
        return res.data
    })
    .catch((e) => console.error(e))
};

export const postBoard = (boardName:string ,boardPos:number) =>{
    const postboardUrl = boardUrl(userId);

    return axios.post(postboardUrl,{
        user_id: userId,
        name: boardName,
        position: boardPos,
    })
    .then(res =>{
        console.log('success')
        return res.data
    })
    .catch((e) => console.error(e))
};