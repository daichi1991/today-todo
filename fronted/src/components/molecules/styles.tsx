const grid = 8;

export const getItemStyle = (isDragging: boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 4px ${grid}px 4px`,
    // change background colour if dragging
    background: isDragging ? "#d1d1d1" : "white",
    border: "1px solid #d1d1d1",
    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = (isDraggingOver:boolean) => ({
    display: "flex",
    background: isDraggingOver ? "lightblue" : "white",
    padding: 0,

});

export const getSubItemStyle = (isDragging: boolean, draggableStyle:any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 0,
    margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? "#d1d1d1" : "white",
    border: "1px solid #d1d1d1",
    // styles we need to apply on draggables
    ...draggableStyle
});

export const getSubListStyle = (isDraggingOver:boolean) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: 0,

});