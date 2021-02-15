import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root'})

export class UserService {
   
    constructor(private httpClient: HttpClient) {}
    
    userAuthenticate(user: User) {
        return this.httpClient.post(`http://localhost:3000/auth/authenticate/`, user);
    }
    userRegister(user: User) {
        return this.httpClient.post(`http://localhost:3000/auth/register/`, user);
    }
}