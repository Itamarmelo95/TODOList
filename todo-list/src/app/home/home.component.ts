import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';
import { ProjectRequest } from '../models/project-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newProjectForm: FormGroup;
  projectList: Project[] = [];
  constructor(
    private fb: FormBuilder,
    private readonly _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      projectName: [''],
      taskName: ['']
    });

    this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
      this.projectList = [...projectRequest.projects];
    });

  }

  deleteProject(projectId: string): void {
    this._projectService.deleteProject(projectId);
    this.projectList = this.projectList.filter(project => project._id !== projectId);
  }

  createProject(): void {
    let project: Project = {
      name: this.newProjectForm.get('projectName').value.trim(),
      tasks: []
    };
    if (project.name !== "") {
      this._projectService.createProject(project);
      this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
        this.projectList = [...projectRequest.projects];
      });
    }
    this.newProjectForm.reset();
  }

  addTask(project: Project): void {
    debugger;
    let task: Task = {
      name: this.newProjectForm.get('taskName').value.trim()
    };

    if (!!task && !!task.name) {
      project.tasks.push(task);
      this._projectService.updateProject(project).subscribe( () => {
        this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
          this.projectList = [...projectRequest.projects];
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
  completeTask(project: Project, taskId: string): void {
    project.tasks.find(task => task._id == taskId).completed = true;
    this._projectService.updateProject(project).subscribe( () => {
      this._projectService.getAllProjects().subscribe((projectRequest: ProjectRequest) => {
        this.projectList = [...projectRequest.projects];
      });
    });
  }
}
