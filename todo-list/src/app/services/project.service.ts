import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

export class ProjectService {
   
    constructor(private httpClient: HttpClient) {}

    getAllProjects() {
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.get<any[]>('http://localhost:3000/projects', {headers: headers});
      }

}