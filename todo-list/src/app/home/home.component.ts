import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newProjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly _projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      projectName: ['']
    });

    this._projectService.getAllProjects().subscribe((projects: any[]) => {
      console.log(projects);
    });
    
  }

}
