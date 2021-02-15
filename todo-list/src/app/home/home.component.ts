import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { ProjectRequest } from '../models/project-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newProjectForm: FormGroup;
  projectList: Project[] = [];
  userId: string;
  returnUrl: string;
  constructor(
    private fb: FormBuilder,
    private readonly _projectService: ProjectService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.newProjectForm = this.fb.group({
      projectName: [''],
      taskName: ['']
    });
    this.returnUrl = '/login';
    
    this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
      debugger;
      this.projectList = [...projectRequest.projects.filter(project => project.user === this.userId)];
    });

  }

  deleteProject(projectId: string): void {
    this._projectService.deleteProject(projectId);
    this.projectList = this.projectList.filter(project => project._id !== projectId);
  }

  createProject(): void {
    let project: Project = {
      name: this.newProjectForm.get('projectName').value.trim(),
      tasks: [],
      user: this.userId
    };
    if (project.name !== "") {
      this._projectService.createProject(project);
      this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
        this.projectList = [...projectRequest.projects.filter(project => project.user === this.userId)];
      });
    }
    this.newProjectForm.reset();
  }

  addTask(project: Project): void {
    debugger;
    let task: Task = {
      name: this.newProjectForm.get('taskName').value.trim(),
    };

    if (!!task && !!task.name) {
      project.tasks.push(task);
      this._projectService.updateProject(project).subscribe( () => {
        this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
          this.projectList = [...projectRequest.projects.filter(project => project.user === this.userId)];
        });
      });
    }
    this.newProjectForm.reset();
  }
  
  deleteTask(project: Project, id: string): void {
    debugger;
    project.tasks = project.tasks.filter(task => task._id !== id);
    this._projectService.updateProject(project).subscribe();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate([this.returnUrl]);
  }

  completeTask(project: Project, taskId: string): void {
    project.tasks.find(task => task._id == taskId).completed = true;
    project.tasks.find(task => task._id == taskId).finishDate =  new Date();
    this._projectService.updateProject(project).subscribe( () => {
      this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
        this.projectList = [...projectRequest.projects.filter(project => project.user === this.userId)];
      });
    });
  }
}
