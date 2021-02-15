import { User } from './user.model'

export interface UserAuthenticated {
    token?: string;
    user?: User;
}