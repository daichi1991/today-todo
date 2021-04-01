import axios from 'axios';
import {ContentsDataType} from './components/molecules/types'

type jsonType = ContentsDataType;


export const fetchContents = () =>{

    return axios.get('http://localhost:3000/api/v1/users/1/boards.json')
    .then(res => {
        return res.data
    })
    .catch((e) => console.error(e))
};