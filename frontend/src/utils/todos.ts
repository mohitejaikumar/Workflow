export type TodoType = "To do"|"In progress"|"Under review"|"Finished"|"Not Selected";
export interface Todo{
    _id:string;
    userId:string;
    title:string;
    description:string;
    priority:"Urgent"|"Low"|"Medium";
    status:TodoType;
    deadline:string;
    startDate:string;
}



