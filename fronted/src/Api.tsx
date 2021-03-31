import axios from 'axios';
import {ContentsDataType} from './components/molecules/types'

type jsonType = ContentsDataType;


export const getContents = (URL:string):jsonType =>{

    let return_Json:jsonType = [];

    axios
        .get<jsonType>(URL)
        .then((results)=>{
            return_Json = results.data;
            console.log(results.data);
            return return_Json;
        })
        .catch((error)=>{
            console.log('通信失敗');
            console.log(error.status);
        });

        return return_Json
};