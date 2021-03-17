export type ContentsDateType = 
    {
        id:number, 
        name:string, 
        todos: 
            {
                id:number, 
                title: string, 
                memo: string, 
            }[]
        
    }[]
;

export type TodoType = {
    id: number,
    title: string,
    memo: string,
}

export type BoardType = 
    {
        id:number, 
        name:string, 
        todos: 
            {
                id:number, 
                title: string, 
                memo: string, 
            }[]
        
    }
