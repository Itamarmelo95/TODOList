export interface Task {
    _id?: string;
    name?: string;
    completed?: boolean;
    project?: string;
    createdDate?: Date;
    finishDate?: Date
   }