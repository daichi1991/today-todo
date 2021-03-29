export type ContentsDataType = 
    BoardType[]
;

export type TodoType = {
    id: string,
    title: string,
    memo?: string,
};

export type BoardType = 
    {
        id:number, 
        name:string, 
        todos?: TodoType[]
        
    };
