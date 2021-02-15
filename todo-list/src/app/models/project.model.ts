import { Task } from '../models/task.model';

export interface Project {
    tasks?: Task[];
    _id?: string;
    name?: string;
    user?: string
    createdDate?: Date;
   }