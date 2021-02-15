import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectRequest } from '../models/project-request.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root'})

export class ProjectService {
   
    constructor(private httpClient: HttpClient) {}

    getAllProjects() {
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.get<ProjectRequest>('http://localhost:3000/projects', {headers: headers});
    }

    getProjectById(id: string) {
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.get<ProjectRequest>(`http://localhost:3000/projects/${id}`, {headers: headers});
    }

    deleteProject(id: string) {
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.delete(`http://localhost:3000/projects/${id}`, {headers: headers}).subscribe();
    }
    
    createProject(project: Project) {
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.post(`http://localhost:3000/projects/`, project, {headers : headers}).subscribe();
    }

    updateProject(project: Project) {
        debugger;
        let headers = new HttpHeaders({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMjkyYTg4YjYxNjRhMzM0MDdiMDU1OSIsImlhdCI6MTYxMzMxMDYwMCwiZXhwIjoxNjEzMzk3MDAwfQ.TJxn5g5MQEujZZo_l6QZepS48OIw6JqkZ2-EB0DPe5Y'});
        return this.httpClient.put(`http://localhost:3000/projects/${project._id}`, project, {headers : headers})
    }
}