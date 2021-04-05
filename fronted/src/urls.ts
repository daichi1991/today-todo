const DEDAUTL_API_LOCALHOST:string = 'http://localhost:3000/api/v1';

export const boardUrl = (userId:string) => `${DEDAUTL_API_LOCALHOST}/users/${userId}/boards.json`;
export const postBoardUrl = (userId:string, boardId:string, name:string) => 
    `${DEDAUTL_API_LOCALHOST}/users/${userId}/boards.json?user_id=${boardId}&name=${name}`